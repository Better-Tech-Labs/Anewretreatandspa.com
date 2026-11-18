import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AUDIENCE_COOKIE,
  AUDIENCE_MAX_AGE_SECONDS,
  audienceCookie,
  audienceForPath,
  audienceSignalFromQuery,
  clearAudienceCookie,
  decideAudience,
  readAudience,
} from "./audience.ts";

test("a tagged ad link names its audience", () => {
  assert.equal(audienceSignalFromQuery("?aud=corporate"), "corporate");
});

test("the tag is found among other ad parameters and ignores case", () => {
  assert.equal(audienceSignalFromQuery("?gclid=abc123&aud=Corporate&utm_source=google"), "corporate");
});

test("an unknown or missing tag is no signal", () => {
  assert.equal(audienceSignalFromQuery("?aud=pirates"), null);
  assert.equal(audienceSignalFromQuery("?aud="), null);
  assert.equal(audienceSignalFromQuery(""), null);
});

test("?aud=reset is a reset signal", () => {
  assert.equal(audienceSignalFromQuery("?aud=reset"), "reset");
});

test("the corporate page belongs to the corporate audience, with or without a trailing slash", () => {
  assert.equal(audienceForPath("/corporate-retreats"), "corporate");
  assert.equal(audienceForPath("/corporate-retreats/"), "corporate");
});

test("other pages belong to no audience", () => {
  assert.equal(audienceForPath("/"), null);
  assert.equal(audienceForPath("/venue"), null);
  assert.equal(audienceForPath("/corporate-retreats-old"), null);
});

test("arriving from a tagged ad sets the audience on any page", () => {
  assert.deepEqual(decideAudience({ search: "?aud=corporate", pathname: "/", isEntryPage: true }), { action: "set", audience: "corporate" });
});

test("arriving on the corporate page from outside sets the audience without a tag", () => {
  assert.deepEqual(decideAudience({ search: "", pathname: "/corporate-retreats", isEntryPage: true }), { action: "set", audience: "corporate" });
});

test("an ordinary page view leaves the audience alone", () => {
  assert.deepEqual(decideAudience({ search: "?utm_source=google", pathname: "/venue", isEntryPage: true }), { action: "keep" });
});

test("reset clears the audience, even on the corporate page", () => {
  assert.deepEqual(decideAudience({ search: "?aud=reset", pathname: "/corporate-retreats", isEntryPage: true }), { action: "clear" });
});

test("an unknown tag on the corporate page still sets corporate from the page", () => {
  assert.deepEqual(decideAudience({ search: "?aud=pirates", pathname: "/corporate-retreats", isEntryPage: true }), { action: "set", audience: "corporate" });
});

test("readAudience finds the cookie among others", () => {
  assert.equal(readAudience(`_ga=GA1.1.1; ${AUDIENCE_COOKIE}=corporate; other=1`), "corporate");
});

test("readAudience ignores a missing, empty or tampered cookie", () => {
  assert.equal(readAudience(""), null);
  assert.equal(readAudience("_ga=GA1.1.1"), null);
  assert.equal(readAudience(`${AUDIENCE_COOKIE}=`), null);
  assert.equal(readAudience(`${AUDIENCE_COOKIE}=<script>`), null);
  assert.equal(readAudience(`x${AUDIENCE_COOKIE}=corporate`), null);
});

test("the cookie lasts 30 days, covers the whole site and stays first-party", () => {
  const cookie = audienceCookie("corporate", { secure: true });
  assert.equal(AUDIENCE_MAX_AGE_SECONDS, 30 * 24 * 60 * 60);
  assert.equal(cookie, `${AUDIENCE_COOKIE}=corporate; Max-Age=2592000; Path=/; SameSite=Lax; Secure`);
});

test("Secure is left off for plain-http local testing", () => {
  assert.equal(audienceCookie("corporate", { secure: false }), `${AUDIENCE_COOKIE}=corporate; Max-Age=2592000; Path=/; SameSite=Lax`);
});

test("what audienceCookie writes, readAudience reads back", () => {
  const pair = audienceCookie("corporate", { secure: true }).split(";")[0];
  assert.equal(readAudience(pair), "corporate");
});

test("clearing expires the cookie immediately", () => {
  assert.equal(clearAudienceCookie({ secure: true }), `${AUDIENCE_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure`);
});

// ---------------------------------------------------------------------------
// Following the audience: where "home" is, and the early redirect script.
// ---------------------------------------------------------------------------
import {
  AUDIENCE_EVENT_TYPE,
  AUDIENCE_HOME,
  HOME_REDIRECT_SCRIPT,
  homeHrefFor,
  homeRedirectTarget,
} from "./audience.ts";
import { EVENT_TYPES } from "./booking.ts";

const CORPORATE_COOKIE = `${AUDIENCE_COOKIE}=corporate`;

interface Visit {
  pathname: string;
  search?: string;
  hash?: string;
  cookie?: string;
}

/** Runs the real inline script against a fake location/document and reports where it sent the visitor. */
function runRedirectScript({ pathname, search = "", hash = "", cookie = "" }: Visit): string | null {
  let target: string | null = null;
  const location = { pathname, search, hash, replace: (url: string) => { target = url; } };
  new Function("location", "document", HOME_REDIRECT_SCRIPT)(location, { cookie });
  return target;
}

const REDIRECT_CASES: { name: string; visit: Visit; expected: string | null }[] = [
  { name: "a corporate visitor going home lands on the corporate page", visit: { pathname: "/", cookie: CORPORATE_COOKIE }, expected: "/corporate-retreats" },
  { name: "a visitor with no audience stays on the general homepage", visit: { pathname: "/" }, expected: null },
  { name: "search engines (no cookie, no tag) see the general homepage", visit: { pathname: "/", cookie: "_ga=GA1.1.1" }, expected: null },
  { name: "a tagged ad link to the homepage goes straight to the corporate page and keeps the ad parameters", visit: { pathname: "/", search: "?aud=corporate&gclid=abc" }, expected: "/corporate-retreats?aud=corporate&gclid=abc" },
  { name: "ad parameters survive for a returning corporate visitor", visit: { pathname: "/", search: "?utm_source=google", cookie: CORPORATE_COOKIE }, expected: "/corporate-retreats?utm_source=google" },
  { name: "?aud=reset shows the general homepage even with the cookie set", visit: { pathname: "/", search: "?aud=reset", cookie: CORPORATE_COOKIE }, expected: null },
  { name: "a link to a homepage section (/#contact) is left alone", visit: { pathname: "/", hash: "#contact", cookie: CORPORATE_COOKIE }, expected: null },
  { name: "other pages are never redirected", visit: { pathname: "/venue", cookie: CORPORATE_COOKIE }, expected: null },
  { name: "the corporate page itself is not redirected", visit: { pathname: "/corporate-retreats", cookie: CORPORATE_COOKIE }, expected: null },
  { name: "a tampered cookie is ignored", visit: { pathname: "/", cookie: `${AUDIENCE_COOKIE}=constructor` }, expected: null },
  { name: "an unknown tag is ignored", visit: { pathname: "/", search: "?aud=toString" }, expected: null },
];

for (const { name, visit, expected } of REDIRECT_CASES) {
  test(`redirect: ${name}`, () => {
    const { pathname, search = "", hash = "", cookie = "" } = visit;
    assert.equal(homeRedirectTarget({ pathname, search, hash, cookieHeader: cookie }), expected);
  });

  test(`redirect script agrees: ${name}`, () => {
    assert.equal(runRedirectScript(visit), expected);
  });
}

test("the redirect script survives a browser that blocks cookies", () => {
  const location = { pathname: "/", search: "", hash: "", replace: () => { throw new Error("should not redirect"); } };
  const document = { get cookie(): string { throw new Error("blocked"); } };
  assert.doesNotThrow(() => new Function("location", "document", HOME_REDIRECT_SCRIPT)(location, document));
});

test("home for a corporate visitor is the corporate page, otherwise the homepage", () => {
  assert.equal(homeHrefFor("corporate"), AUDIENCE_HOME.corporate);
  assert.equal(homeHrefFor(null), "/");
});

test("every audience's inquiry type is one the inquiry form accepts", () => {
  for (const type of Object.values(AUDIENCE_EVENT_TYPE)) {
    assert.ok(EVENT_TYPES.includes(type), `${type} is not in EVENT_TYPES`);
  }
});

import { GENERAL_SITE_HREF } from "./audience.ts";

test("the way-out link clears the audience and is never redirected back", () => {
  const [pathname, query] = GENERAL_SITE_HREF.split("?");
  const search = `?${query}`;
  assert.equal(pathname, "/");
  assert.deepEqual(decideAudience({ search, pathname, isEntryPage: false }), { action: "clear" });
  assert.equal(homeRedirectTarget({ pathname, search, hash: "", cookieHeader: CORPORATE_COOKIE }), null);
  assert.equal(runRedirectScript({ pathname, search, cookie: CORPORATE_COOKIE }), null);
});

test("browsing to the corporate page from inside the site does not change the audience", () => {
  assert.deepEqual(decideAudience({ search: "", pathname: "/corporate-retreats", isEntryPage: false }), { action: "keep" });
});

test("a tagged link still sets the audience mid-visit", () => {
  assert.deepEqual(decideAudience({ search: "?aud=corporate", pathname: "/venue", isEntryPage: false }), { action: "set", audience: "corporate" });
});
