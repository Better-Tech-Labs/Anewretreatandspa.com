import { test } from "node:test";
import assert from "node:assert/strict";
import {
  dateBounds,
  dateFromQuery,
  eventTypeFromQuery,
  inquireHref,
  splitName,
  validateInquiry,
  type InquiryFields,
} from "./inquire.ts";

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

// --- splitName: one "Name" box, but the server and Hospitable want first/last ---

test("splitName keeps a single name as the first name", () => {
  assert.deepEqual(splitName("Jane"), { firstName: "Jane", lastName: "" });
});

test("splitName puts the first word first and the rest last", () => {
  assert.deepEqual(splitName("Mary Ann Smith"), { firstName: "Mary", lastName: "Ann Smith" });
});

test("splitName trims and collapses extra spaces", () => {
  assert.deepEqual(splitName("  Jane    Doe  "), { firstName: "Jane", lastName: "Doe" });
});

// --- dateBounds: the picker only offers dates the server will accept ---

test("dateBounds starts today in local time and stays inside the server's 3-year window", () => {
  const { min, max } = dateBounds(new Date(2026, 10, 17, 23, 30));
  assert.equal(min, "2026-11-17");
  assert.equal(max, "2029-11-15");
});

// --- validateInquiry: friendly, per-field messages ---

const TODAY = new Date(2026, 10, 17);
const valid: InquiryFields = { name: "Jane Doe", email: "jane@example.com", phone: "", date: "2026-12-05" };

test("a filled-in form with no phone has no errors", () => {
  assert.deepEqual(validateInquiry(valid, TODAY), {});
});

test("name, email and date are required", () => {
  const errors = validateInquiry({ name: " ", email: "", phone: "", date: "" }, TODAY);
  assert.deepEqual(Object.keys(errors).sort(), ["date", "email", "name"]);
});

test("a mistyped email gets its own message", () => {
  const errors = validateInquiry({ ...valid, email: "jane@example" }, TODAY);
  assert.ok(errors.email);
  assert.notEqual(errors.email, validateInquiry({ ...valid, email: "" }, TODAY).email);
});

test("phone is optional but must look like a phone number when given", () => {
  assert.deepEqual(validateInquiry({ ...valid, phone: "(206) 471-1243" }, TODAY), {});
  assert.ok(validateInquiry({ ...valid, phone: "call me" }, TODAY).phone);
});

test("past dates and dates beyond the window are rejected", () => {
  assert.ok(validateInquiry({ ...valid, date: "2026-11-16" }, TODAY).date);
  assert.ok(validateInquiry({ ...valid, date: "2030-01-01" }, TODAY).date);
  assert.deepEqual(validateInquiry({ ...valid, date: "2026-11-17" }, TODAY), {});
});

test("inquireHref carries a calendar date alongside the type", () => {
  assert.equal(inquireHref("Wedding", "2027-06-12"), "/inquire?type=Wedding&date=2027-06-12");
  assert.equal(inquireHref(undefined, "2027-06-12"), "/inquire?date=2027-06-12");
});

test("inquireHref drops a malformed date", () => {
  assert.equal(inquireHref("Wedding", "June 12"), "/inquire?type=Wedding");
});

test("dateFromQuery accepts a date the form would accept", () => {
  const now = new Date(2026, 10, 20);
  assert.equal(dateFromQuery("?type=Wedding&date=2027-06-12", now), "2027-06-12");
});

test("dateFromQuery ignores past, far-off, malformed and missing dates", () => {
  const now = new Date(2026, 10, 20);
  assert.equal(dateFromQuery("?date=2026-01-01", now), "");
  assert.equal(dateFromQuery("?date=2040-01-01", now), "");
  assert.equal(dateFromQuery("?date=%3Cscript%3E", now), "");
  assert.equal(dateFromQuery("", now), "");
});
