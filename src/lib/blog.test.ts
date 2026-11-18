import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPostDate, readingMinutes } from "./blog.ts";

test("formatPostDate writes the date out in words", () => {
  assert.equal(formatPostDate("2026-11-18"), "November 18, 2026");
  assert.equal(formatPostDate("2027-01-05"), "January 5, 2027");
});

test("formatPostDate returns a malformed date unchanged", () => {
  assert.equal(formatPostDate("soon"), "soon");
  assert.equal(formatPostDate("2026-13-01"), "2026-13-01");
});

test("readingMinutes counts every part of the article", () => {
  const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");
  const post = { intro: [words(220)], sections: [{ heading: "One", paragraphs: [words(219)], bullets: [words(220)] }], faqs: [{ q: words(110), a: words(110) }] };
  assert.equal(readingMinutes(post), 4);
});

test("readingMinutes is never less than one", () => {
  assert.equal(readingMinutes({ intro: ["Short."], sections: [] }), 1);
});
