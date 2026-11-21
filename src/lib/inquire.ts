import { EVENT_TYPES } from "./booking.ts";

export const INQUIRE_PATH = "/inquire";
/** Anchor of the inquiry form inside a landing page hero. Header, hero and sticky-bar buttons scroll here. */
export const HERO_FORM_ANCHOR = "inquire-top";
/** YYYY-MM-DD. */
const DATE_SHAPE = /^\d{4}-\d{2}-\d{2}$/;
const TYPE_PARAM = "type";
const DATE_PARAM = "date";

/** The EVENT_TYPES entry matching `value` (case-insensitive), or "" if none does. */
function matchEventType(value: string | null | undefined): string {
  const wanted = value?.trim().toLowerCase();
  if (!wanted) return "";
  return EVENT_TYPES.find((t) => t.toLowerCase() === wanted) ?? "";
}

/**
 * Link to the inquiry form, pre-selecting `type` when it is a real event type
 * and pre-filling `date` (YYYY-MM-DD) when it is well formed.
 * An unknown type or a malformed date is dropped rather than linked as a broken prefill.
 */
export function inquireHref(type?: string, date?: string): string {
  const params = new URLSearchParams();
  const known = matchEventType(type);
  if (known) params.set(TYPE_PARAM, known);
  if (date && DATE_SHAPE.test(date)) params.set(DATE_PARAM, date);
  const query = params.toString();
  return query ? `${INQUIRE_PATH}?${query}` : INQUIRE_PATH;
}

/** Reads ?type= from a location.search string. Only exact event types are accepted. */
export function eventTypeFromQuery(search: string): string {
  return matchEventType(new URLSearchParams(search).get(TYPE_PARAM));
}

/** Reads ?date= from a location.search string. "" unless it is a date the form would accept. */
export function dateFromQuery(search: string, now: Date): string {
  const value = new URLSearchParams(search).get(DATE_PARAM) ?? "";
  return dateError(value, now) ? "" : value;
}

// ----------------------------------------------------------------------------
// Form helpers. Validation mirrors submitBookingInquiry in functions/src/index.ts
// so visitors see a friendly message here instead of a server error.
// ----------------------------------------------------------------------------

export interface InquiryFields {
  name: string;
  email: string;
  phone: string;
  date: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+()\-.]{7,30}$/;
const DATE_PATTERN = DATE_SHAPE;
/** The server accepts dates up to 3×365 days out; stop a day short for timezone slack. */
const MAX_DAYS_AHEAD = 3 * 365 - 1;

/** YYYY-MM-DD in the visitor's own timezone (toISOString would shift evening dates). */
function localDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Earliest and latest dates the picker should offer. */
export function dateBounds(now: Date): { min: string; max: string } {
  const max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + MAX_DAYS_AHEAD);
  return { min: localDateString(now), max: localDateString(max) };
}

/** One "Name" box → first word is the first name, the rest is the last name. */
export function splitName(full: string): { firstName: string; lastName: string } {
  const [firstName = "", ...rest] = full.trim().split(/\s+/).filter(Boolean);
  return { firstName, lastName: rest.join(" ") };
}

function dateError(date: string, now: Date): string | undefined {
  if (!date) return "Pick a rough date. You can change it later.";
  if (!DATE_PATTERN.test(date)) return "Pick a date from the calendar.";
  const { min, max } = dateBounds(now);
  if (date < min) return "Pick a date from today on.";
  if (date > max) return "Pick a date within the next 3 years.";
  return undefined;
}

/** Field → message for anything that needs fixing. Empty object means ready to send. */
export function validateInquiry(fields: InquiryFields, now: Date): InquiryErrors {
  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const errors: InquiryErrors = {};

  if (!name) errors.name = "Add your name so we know who to reply to.";
  if (!email) errors.email = "Add your email so we can reply.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email looks off. Check for typos.";
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = "That number looks off. Or leave it blank.";
  const date = dateError(fields.date.trim(), now);
  if (date) errors.date = date;

  return errors;
}
