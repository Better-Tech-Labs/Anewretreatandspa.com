import { test } from "node:test";
import assert from "node:assert/strict";
import { eventTypeFromQuery, inquireHref } from "./inquire.ts";

test("inquireHref with no type is the plain inquire page", () => {
  assert.equal(inquireHref(), "/inquire");
});

test("inquireHref adds a known event type as ?type=", () => {
  assert.equal(inquireHref("Wedding"), "/inquire?type=Wedding");
});

test("inquireHref drops an unknown type instead of linking to a broken prefill", () => {
  assert.equal(inquireHref("Weddings"), "/inquire");
});

test("multi-word types survive the round trip", () => {
  const href = inquireHref("Corporate Retreat");
  const search = href.slice(href.indexOf("?"));
  assert.equal(eventTypeFromQuery(search), "Corporate Retreat");
});

test("eventTypeFromQuery reads %20-encoded links like the corporate retreats page uses", () => {
  assert.equal(eventTypeFromQuery("?type=Corporate%20Retreat"), "Corporate Retreat");
});

test("eventTypeFromQuery ignores case so hand-typed links still work", () => {
  assert.equal(eventTypeFromQuery("?type=wedding"), "Wedding");
});

test("eventTypeFromQuery returns empty for missing or unknown types", () => {
  assert.equal(eventTypeFromQuery(""), "");
  assert.equal(eventTypeFromQuery("?utm_source=ig"), "");
  assert.equal(eventTypeFromQuery("?type=<script>"), "");
});
