import { test } from "node:test";
import assert from "node:assert/strict";
import { prefetchFor } from "./links.ts";

test("links to checkout are never prefetched", () => {
  assert.equal(prefetchFor("/booking"), false);
  assert.equal(prefetchFor("/booking?date=2027-01-01"), false);
});

test("every other link keeps the default", () => {
  for (const href of ["/", "/venue", "/weddings", "/inquire?type=Wedding", "/booking-policy", "#inquire", "tel:+12064711243"]) {
    assert.equal(prefetchFor(href), undefined, href);
  }
});
