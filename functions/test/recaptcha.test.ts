import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyRecaptcha } from "../src/recaptcha.ts";

const SECRET = "test-secret";
const ACTION = "inquiry";

type FetchCall = { url: string; body: URLSearchParams };

function fakeGoogle(reply: object, calls: FetchCall[] = []): typeof fetch {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: init?.body as URLSearchParams });
    return new Response(JSON.stringify(reply), { status: 200 });
  }) as typeof fetch;
}

test("without a secret the check is skipped so the form keeps working before keys exist", async () => {
  const outcome = await verifyRecaptcha("", "", ACTION);
  assert.deepEqual(outcome, { ok: true, status: "skipped" });
});

test("with a secret, a request without a token is rejected", async () => {
  const outcome = await verifyRecaptcha(undefined, SECRET, ACTION, undefined, fakeGoogle({ success: true }));
  assert.equal(outcome.ok, false);
  assert.equal(outcome.status, "missing");
});

test("a human score for the right action passes and sends secret, token and IP to Google", async () => {
  const calls: FetchCall[] = [];
  const outcome = await verifyRecaptcha("tok", SECRET, ACTION, "1.2.3.4", fakeGoogle({ success: true, score: 0.9, action: ACTION }, calls));
  assert.deepEqual(outcome, { ok: true, status: "passed", score: 0.9 });
  assert.equal(calls[0].url, "https://www.google.com/recaptcha/api/siteverify");
  assert.equal(calls[0].body.get("secret"), SECRET);
  assert.equal(calls[0].body.get("response"), "tok");
  assert.equal(calls[0].body.get("remoteip"), "1.2.3.4");
});

test("a low score is rejected", async () => {
  const outcome = await verifyRecaptcha("tok", SECRET, ACTION, undefined, fakeGoogle({ success: true, score: 0.3, action: ACTION }));
  assert.equal(outcome.ok, false);
  assert.equal(outcome.status, "failed");
});

test("a token minted for a different action is rejected", async () => {
  const outcome = await verifyRecaptcha("tok", SECRET, ACTION, undefined, fakeGoogle({ success: true, score: 0.9, action: "login" }));
  assert.equal(outcome.ok, false);
});

test("an invalid or reused token is rejected", async () => {
  const outcome = await verifyRecaptcha("tok", SECRET, ACTION, undefined, fakeGoogle({ success: false, "error-codes": ["timeout-or-duplicate"] }));
  assert.equal(outcome.ok, false);
  assert.equal(outcome.status, "failed");
});

test("if Google can't be reached the message is let through as unverified, never lost", async () => {
  const down = (async () => { throw new Error("ECONNRESET"); }) as typeof fetch;
  const original = console.error;
  console.error = () => {};
  try {
    const outcome = await verifyRecaptcha("tok", SECRET, ACTION, undefined, down);
    assert.deepEqual(outcome, { ok: true, status: "unverified" });
  } finally {
    console.error = original;
  }
});
