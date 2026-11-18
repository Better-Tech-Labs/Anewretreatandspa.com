import { test } from "node:test";
import assert from "node:assert/strict";
import { optimizedImagePath } from "./imageLoader.ts";
import { IMAGE_WIDTHS } from "./imageWidths.mjs";

test("a phone-sized request gets the smallest copy that covers it", () => {
  assert.equal(optimizedImagePath("/images/exterior-hero.webp", 375), "/images/_opt/exterior-hero-480.webp");
});

test("an exact width uses that copy", () => {
  assert.equal(optimizedImagePath("/images/creek.webp", 828), "/images/_opt/creek-828.webp");
});

test("a request larger than every copy gets the largest one", () => {
  assert.equal(optimizedImagePath("/images/creek.webp", 3840), "/images/_opt/creek-1920.webp");
});

test("every width next/image can ask for maps to a copy that exists", () => {
  for (const width of [160, 320, 480, 828, 1200, 1920]) {
    const path = optimizedImagePath("/images/creek.webp", width);
    const used = Number(/-(\d+)\.webp$/.exec(path)?.[1]);
    assert.ok(IMAGE_WIDTHS.includes(used), `${width} mapped to missing copy ${used}`);
    assert.ok(used >= width, `${width} got a smaller copy (${used})`);
  }
});

test("file names with spaces are encoded", () => {
  assert.equal(optimizedImagePath("/images/spa-sauna 2.webp", 300), "/images/_opt/spa-sauna%202-320.webp");
});

test("non-photo files are left alone", () => {
  assert.equal(optimizedImagePath("/images/anew-logo.png", 300), "/images/anew-logo.png");
  assert.equal(optimizedImagePath("/favicon.ico", 32), "/favicon.ico");
  assert.equal(optimizedImagePath("https://example.com/a.webp", 300), "https://example.com/a.webp");
});
