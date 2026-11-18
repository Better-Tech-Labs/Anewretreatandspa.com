/**
 * Google reCAPTCHA v3 (invisible) on the client. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY
 * before `npm run build`; without it nothing loads and the server skips the check
 * (its RECAPTCHA_SECRET_KEY is empty too). The server makes the real decision.
 */

const SITE_KEY = (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "").trim();
const STEP_TIMEOUT_MS = 5000;

export const RECAPTCHA_ENABLED = SITE_KEY !== "";
export const RECAPTCHA_SCRIPT_SRC = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;

interface Grecaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("reCAPTCHA timed out")), ms);
    promise.then(
      (value) => { window.clearTimeout(timer); resolve(value); },
      (err) => { window.clearTimeout(timer); reject(err); },
    );
  });
}

/**
 * Token for `action`, or "" when reCAPTCHA isn't configured or didn't load
 * (e.g. blocked by an extension). The server rejects "" only when it has a secret.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  if (!RECAPTCHA_ENABLED || typeof window === "undefined") return "";
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) return "";
  try {
    await withTimeout(new Promise<void>((resolve) => grecaptcha.ready(resolve)), STEP_TIMEOUT_MS);
    return await withTimeout(grecaptcha.execute(SITE_KEY, { action }), STEP_TIMEOUT_MS);
  } catch {
    return "";
  }
}
