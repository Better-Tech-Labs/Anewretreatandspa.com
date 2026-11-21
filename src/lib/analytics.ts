/**
 * Thin wrapper around the GA4 gtag already loaded by GoogleAnalytics.tsx.
 * Never pass form field contents here: params describe the action, not the person.
 */

import { readAudience, type Audience } from "./audience.ts";
import { LANDING_PAGES } from "./landingPages.ts";

export type EventType = "wedding" | "corporate" | "spa" | "dining" | "general";

type ParamValue = string | number | boolean;
export type TrackParams = Record<string, ParamValue | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PATH_EVENT_TYPES: { prefix: string; type: EventType }[] = [
  { prefix: "/packages", type: "wedding" },
  { prefix: "/experiences", type: "spa" },
  { prefix: "/chefs", type: "dining" },
  // Each occasion landing page reports under its own bucket.
  ...LANDING_PAGES.map((page) => ({ prefix: page.path, type: page.analytics })),
];

const FORM_EVENT_TYPES: Record<string, EventType> = {
  wedding: "wedding",
  elopement: "wedding",
  "corporate retreat": "corporate",
  "wellness retreat": "spa",
  immersion: "spa",
  "private dinner": "dining",
};

const EVENT_TYPES: readonly EventType[] = ["wedding", "corporate", "spa", "dining", "general"];

export function eventTypeForPath(path: string): EventType {
  return PATH_EVENT_TYPES.find(({ prefix }) => path.startsWith(prefix))?.type ?? "general";
}

/** Maps a form's event-type field (see EVENT_TYPES in lib/booking) to an analytics bucket. */
export function eventTypeFromForm(value: string | null | undefined): EventType | undefined {
  if (!value) return undefined;
  return FORM_EVENT_TYPES[value.trim().toLowerCase()] ?? "general";
}

export function isEventType(value: string | null | undefined): value is EventType {
  return !!value && (EVENT_TYPES as readonly string[]).includes(value);
}

/** Value of the `audience` param for visitors who aren't in an audience layout. */
const GENERAL_AUDIENCE = "general";

/**
 * Which version of the site the visitor is seeing, from the audience cookie.
 * Register `audience` as a GA4 custom dimension to compare versions.
 */
function currentAudience(): Audience | typeof GENERAL_AUDIENCE {
  try {
    return readAudience(document.cookie) ?? GENERAL_AUDIENCE;
  } catch {
    return GENERAL_AUDIENCE; // Cookies blocked, or no document.
  }
}

/** Sends one GA4 event. Fails silently when gtag is blocked or missing. */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    const pagePath = window.location.pathname;
    const payload: TrackParams = {
      page_path: pagePath,
      event_type: eventTypeForPath(pagePath),
      ...params,
      // Last, so it always reflects the cookie rather than a caller's value.
      audience: currentAudience(),
    };
    if (!payload.event_type) payload.event_type = eventTypeForPath(pagePath);
    window.gtag?.("event", eventName, payload);
  } catch {
    // Analytics must never break the page.
  }
}

// ----------------------------------------------------------------------------
// Conversions. Only generate_lead and purchase should be GA4 key events.
// They fire after the server (or Stripe) confirms, never on page load or click.
// ----------------------------------------------------------------------------

const CURRENCY = "USD";

/** Which form produced the lead. Register `lead_source` as a GA4 custom dimension. */
export type LeadSource = "inquiry_form" | "tour_form";

/**
 * Where a form sits, e.g. "corporate_hero", "corporate_bottom", "inquire_page".
 * Register `form_location` and `inquiry_type` as GA4 custom dimensions.
 */
export type FormLocation = string;

/** `inquiry_type` when the visitor hasn't said what the event is. */
const UNSPECIFIED_INQUIRY = "unspecified";

interface FormEventParams extends TrackParams {
  form_location: FormLocation;
  inquiry_type: string;
  event_type: EventType | undefined;
}

function formParams(formLocation: FormLocation, inquiryType: string | undefined): FormEventParams {
  return {
    form_location: formLocation,
    inquiry_type: inquiryType?.trim() || UNSPECIFIED_INQUIRY,
    event_type: eventTypeFromForm(inquiryType),
  };
}

/** Funnel step: the visitor touched a form. Callers send it once per form per page view. */
export function trackFormStart(formLocation: FormLocation, inquiryType?: string): void {
  track("form_start", formParams(formLocation, inquiryType));
}

/**
 * A message the backend accepted. Sends the key event (generate_lead) and
 * inquiry_form_submit with the same parameters, so either can be reported on.
 * Call it only after the server says yes.
 */
export function trackInquirySubmit(leadSource: LeadSource, formLocation: FormLocation, inquiryType?: string): void {
  const params = { lead_source: leadSource, ...formParams(formLocation, inquiryType) };
  track("generate_lead", params);
  track("inquiry_form_submit", params);
}

/** Funnel step, not a key event: the visitor reached payment with a priced booking. */
export function trackBeginCheckout(value: number, eventType?: EventType): void {
  track("begin_checkout", { value, currency: CURRENCY, event_type: eventType });
}

/** Key event: Stripe confirmed the booking payment. */
export function trackBookingPaid(transactionId: string, value: number, eventType?: EventType): void {
  track("purchase", { transaction_id: transactionId, value, currency: CURRENCY, event_type: eventType });
}
