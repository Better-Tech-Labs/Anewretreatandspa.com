import { test } from "node:test";
import assert from "node:assert/strict";
import { breadcrumbSchema, businessSchema, faqPageSchema, jsonLd } from "./structuredData.ts";

const SITE = "https://example.com";

test("jsonLd escapes < so content can never close the script tag", () => {
  const out = jsonLd({ text: "</script><script>alert(1)</script>" });
  assert.ok(!out.includes("<"));
  assert.deepEqual(JSON.parse(out), { text: "</script><script>alert(1)</script>" });
});

test("faqPageSchema lists each question with its answer", () => {
  const schema = faqPageSchema([{ q: "Where?", a: "Kenmore." }]) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
  assert.equal(schema.mainEntity[0].name, "Where?");
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, "Kenmore.");
});

test("breadcrumbs are numbered from 1 with absolute URLs", () => {
  const schema = breadcrumbSchema(SITE, [{ name: "Home", path: "/" }, { name: "Weddings", path: "/weddings" }]) as {
    itemListElement: { position: number; name: string; item: string }[];
  };
  assert.deepEqual(schema.itemListElement.map((item) => [item.position, item.name, item.item]), [
    [1, "Home", "https://example.com/"],
    [2, "Weddings", "https://example.com/weddings"],
  ]);
});

test("business schema carries contact details, full postal address and service areas", () => {
  const schema = businessSchema({
    siteUrl: SITE,
    name: "ANEW",
    description: "A venue.",
    telephone: "+12065550100",
    email: "hello@example.com",
    imagePath: "/images/a.webp",
    streetAddress: "1 Example Rd",
    locality: "Kenmore",
    region: "WA",
    postalCode: "98028",
    country: "US",
    areasServed: ["Kenmore", "Bothell"],
    amenities: ["Sauna"],
    profiles: ["https://www.instagram.com/example"],
  }) as Record<string, unknown> & { address: Record<string, unknown>; areaServed: { name: string }[] };
  assert.equal(schema["@id"], "https://example.com/#business");
  assert.equal(schema.image, "https://example.com/images/a.webp");
  assert.equal(schema.address.addressLocality, "Kenmore");
  assert.equal(schema.address.streetAddress, "1 Example Rd");
  assert.equal(schema.address.postalCode, "98028");
  assert.deepEqual(schema.areaServed.map((area) => area.name), ["Kenmore", "Bothell"]);
});
