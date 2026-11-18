/**
 * Google reCAPTCHA v3 (invisible, score-based) for public form endpoints.
 * Replaces the "I'm not a robot" checkbox; rate limiting and the honeypot still apply.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
/** Google's suggested starting threshold: 1.0 is very likely human, 0.0 very likely a bot. */
export const RECAPTCHA_MIN_SCORE = 0.5;

interface SiteverifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export type CaptchaOutcome =
  | { ok: true; status: "skipped" | "unverified" }
  | { ok: true; status: "passed"; score: number }
  | { ok: false; status: "missing" | "failed"; reason: string };

function judge(reply: SiteverifyResponse, expectedAction: string): CaptchaOutcome {
  if (!reply.success) {
    return { ok: false, status: "failed", reason: (reply["error-codes"] ?? []).join(",") || "unsuccessful" };
  }
  if (reply.action !== expectedAction) {
    return { ok: false, status: "failed", reason: `action ${reply.action ?? "none"}` };
  }
  if (typeof reply.score !== "number" || reply.score < RECAPTCHA_MIN_SCORE) {
    return { ok: false, status: "failed", reason: `score ${reply.score ?? "none"}` };
  }
  return { ok: true, status: "passed", score: reply.score };
}

/**
 * - No secret configured: skipped, so the form works before keys are set up.
 * - Secret but no token: rejected (bots posting straight to the endpoint).
 * - Google unreachable: let through as "unverified" so an outage never costs a lead.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  secret: string,
  expectedAction: string,
  remoteIp?: string,
  fetchImpl: typeof fetch = fetch,
): Promise<CaptchaOutcome> {
  if (!secret) return { ok: true, status: "skipped" };
  if (!token) return { ok: false, status: "missing", reason: "no token" };

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetchImpl(VERIFY_URL, { method: "POST", body });
    if (!res.ok) throw new Error(`siteverify HTTP ${res.status}`);
    return judge((await res.json()) as SiteverifyResponse, expectedAction);
  } catch (err) {
    console.error("reCAPTCHA verify unavailable, allowing as unverified:", err);
    return { ok: true, status: "unverified" };
  }
}
