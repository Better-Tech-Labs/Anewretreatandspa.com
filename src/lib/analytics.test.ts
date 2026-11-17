import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { trackBeginCheckout, trackBookingPaid, trackLead } from "./analytics.ts";

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

test("trackLead sends generate_lead with the lead source and event type", () => {
  setPath("/inquire");
  trackLead("inquiry_form", "wedding");
  const { name, params } = onlyEvent();
  assert.equal(name, "generate_lead");
  assert.equal(params.lead_source, "inquiry_form");
  assert.equal(params.event_type, "wedding");
  assert.equal(params.page_path, "/inquire");
});

test("trackLead falls back to the page's event type when none is given", () => {
  setPath("/corporate-retreats");
  trackLead("tour_form");
  const { params } = onlyEvent();
  assert.equal(params.lead_source, "tour_form");
  assert.equal(params.event_type, "corporate");
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
  assert.doesNotThrow(() => trackLead("inquiry_form"));
});
