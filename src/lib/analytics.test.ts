import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { trackBeginCheckout, trackBookingPaid, trackFormStart, trackInquirySubmit } from "./analytics.ts";

type GtagCall = unknown[];

let calls: GtagCall[];

function setPath(pathname: string): void {
  calls = [];
  (globalThis as { window?: unknown }).window = {
    location: { pathname },
    gtag: (...args: unknown[]) => calls.push(args),
  };
}

function onlyEvent(): { name: unknown; params: Record<string, unknown> } {
  assert.equal(calls.length, 1, "expected exactly one gtag call");
  const [command, name, params] = calls[0];
  assert.equal(command, "event");
  return { name, params: params as Record<string, unknown> };
}

beforeEach(() => setPath("/"));

function eventsNamed(): { name: unknown; params: Record<string, unknown> }[] {
  return calls.map(([, name, params]) => ({ name, params: params as Record<string, unknown> }));
}

test("a sent inquiry fires generate_lead and inquiry_form_submit with the same parameters", () => {
  setPath("/corporate-retreats");
  trackInquirySubmit("inquiry_form", "corporate_hero", "Corporate Retreat");
  const events = eventsNamed();
  assert.deepEqual(events.map((e) => e.name), ["generate_lead", "inquiry_form_submit"]);
  for (const { params } of events) {
    assert.equal(params.lead_source, "inquiry_form");
    assert.equal(params.form_location, "corporate_hero");
    assert.equal(params.inquiry_type, "Corporate Retreat");
    assert.equal(params.event_type, "corporate");
    assert.equal(params.page_path, "/corporate-retreats");
  }
});

test("an inquiry with no type reports unspecified and the page's event type", () => {
  setPath("/corporate-retreats");
  trackInquirySubmit("tour_form", "home_tour");
  const [{ params }] = eventsNamed();
  assert.equal(params.inquiry_type, "unspecified");
  assert.equal(params.event_type, "corporate");
});

test("trackFormStart sends form_start with the form location and inquiry type", () => {
  setPath("/inquire");
  trackFormStart("inquire_page", "Wedding");
  const { name, params } = onlyEvent();
  assert.equal(name, "form_start");
  assert.equal(params.form_location, "inquire_page");
  assert.equal(params.inquiry_type, "Wedding");
  assert.equal(params.event_type, "wedding");
});

test("trackBeginCheckout sends begin_checkout with value in USD", () => {
  setPath("/booking");
  trackBeginCheckout(2500, "wedding");
  const { name, params } = onlyEvent();
  assert.equal(name, "begin_checkout");
  assert.equal(params.value, 2500);
  assert.equal(params.currency, "USD");
  assert.equal(params.event_type, "wedding");
});

test("trackBookingPaid sends purchase with transaction id, value and currency", () => {
  setPath("/booking");
  trackBookingPaid("pi_123", 5500, "corporate");
  const { name, params } = onlyEvent();
  assert.equal(name, "purchase");
  assert.equal(params.transaction_id, "pi_123");
  assert.equal(params.value, 5500);
  assert.equal(params.currency, "USD");
  assert.equal(params.event_type, "corporate");
});

test("tracking never throws when gtag is blocked", () => {
  (globalThis as { window?: unknown }).window = { location: { pathname: "/" } };
  assert.doesNotThrow(() => trackInquirySubmit("inquiry_form", "inquire_page"));
});

// ---------------------------------------------------------------------------
// Audience: every event says which version of the site the visitor is seeing.
// ---------------------------------------------------------------------------
import { track } from "./analytics.ts";

function setCookie(cookie: string | (() => string)): void {
  (globalThis as { document?: unknown }).document =
    typeof cookie === "string" ? { cookie } : { get cookie() { return cookie(); } };
}

function clearDocument(): void {
  delete (globalThis as { document?: unknown }).document;
}

test("events from a corporate visitor carry audience corporate, on any page", () => {
  setPath("/venue");
  setCookie("_ga=GA1.1.1; anew_aud=corporate");
  track("cta_click", { cta_text: "Explore Spaces" });
  assert.equal(onlyEvent().params.audience, "corporate");
  clearDocument();
});

test("events from a visitor with no audience carry audience general", () => {
  setPath("/");
  setCookie("_ga=GA1.1.1");
  track("scroll_depth", { percent_scrolled: 50 });
  assert.equal(onlyEvent().params.audience, "general");
  clearDocument();
});

test("conversions carry the audience too", () => {
  setPath("/inquire");
  setCookie("anew_aud=corporate");
  trackInquirySubmit("inquiry_form", "corporate_bottom", "Corporate Retreat");
  const [{ name, params }] = eventsNamed();
  assert.equal(name, "generate_lead");
  assert.equal(params.audience, "corporate");
  clearDocument();
});

test("a tampered cookie reads as general", () => {
  setCookie("anew_aud=<script>");
  track("cta_click");
  assert.equal(onlyEvent().params.audience, "general");
  clearDocument();
});

test("blocked cookies still send the event, as general", () => {
  setCookie(() => { throw new Error("blocked"); });
  track("cta_click");
  assert.equal(onlyEvent().params.audience, "general");
  clearDocument();
});

test("a caller cannot overwrite the audience", () => {
  setCookie("anew_aud=corporate");
  track("cta_click", { audience: "wedding" });
  assert.equal(onlyEvent().params.audience, "corporate");
  clearDocument();
});

// ---------------------------------------------------------------------------
// Occasion landing pages report under their own event type.
// ---------------------------------------------------------------------------
import { eventTypeForPath } from "./analytics.ts";
import { LANDING_PAGES } from "./landingPages.ts";

test("each landing page maps to its analytics bucket", () => {
  assert.equal(eventTypeForPath("/weddings"), "wedding");
  assert.equal(eventTypeForPath("/elopements"), "wedding");
  assert.equal(eventTypeForPath("/wellness-retreats"), "spa");
  assert.equal(eventTypeForPath("/private-dinners"), "dining");
  assert.equal(eventTypeForPath("/corporate-retreats"), "corporate");
  assert.equal(eventTypeForPath("/birthday-parties"), "general");
});

test("landing page paths are unique and well formed", () => {
  const paths = LANDING_PAGES.map((page) => page.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const path of paths) assert.match(path, /^\/[a-z-]+$/);
});

test("no landing path is a prefix of another, so analytics buckets cannot be confused", () => {
  const paths = LANDING_PAGES.map((page) => page.path);
  for (const a of paths) {
    for (const b of paths) {
      if (a !== b) assert.ok(!b.startsWith(a), `${a} is a prefix of ${b}`);
    }
  }
});

test("existing pages keep their buckets", () => {
  assert.equal(eventTypeForPath("/packages"), "wedding");
  assert.equal(eventTypeForPath("/experiences"), "spa");
  assert.equal(eventTypeForPath("/chefs"), "dining");
  assert.equal(eventTypeForPath("/"), "general");
});
