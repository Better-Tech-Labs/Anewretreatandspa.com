import { test } from "node:test";
import assert from "node:assert/strict";
import { isExternalHref, parseInlineLinks } from "./richText.ts";

test("plain text is one part", () => {
  assert.deepEqual(parseInlineLinks("Nothing to link here."), [{ text: "Nothing to link here." }]);
});

test("a site link is split out with the text around it", () => {
  assert.deepEqual(parseInlineLinks("See [corporate retreats](/corporate-retreats) for more."), [
    { text: "See " },
    { text: "corporate retreats", href: "/corporate-retreats" },
    { text: " for more." },
  ]);
});

test("several links in one paragraph", () => {
  const parts = parseInlineLinks("[A](/a) and [B](https://example.com/b)");
  assert.deepEqual(parts, [
    { text: "A", href: "/a" },
    { text: " and " },
    { text: "B", href: "https://example.com/b" },
  ]);
});

test("unsafe links stay as plain text", () => {
  for (const source of ["[x](javascript:alert(1))", "[x](//evil.example)", "[x](/\\evil.example)", "[x](http://plain.example)", "[x](data:text/html,hi)"]) {
    const parts = parseInlineLinks(source);
    assert.ok(parts.every((part) => part.href === undefined), source);
    assert.equal(parts.map((part) => part.text).join(""), source);
  }
});

test("external links are told apart from site links", () => {
  assert.equal(isExternalHref("https://example.com"), true);
  assert.equal(isExternalHref("/venue"), false);
});
