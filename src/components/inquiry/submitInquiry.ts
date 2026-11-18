import { splitName, type InquiryFields } from "@/lib/inquire";
import { getRecaptchaToken } from "@/lib/recaptcha";

const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_FUNCTIONS_URL ||
  "https://us-central1-bakkers-website-847ba.cloudfunctions.net";

/** Must match INQUIRY_CAPTCHA_ACTION in functions/src/index.ts. */
const CAPTCHA_ACTION = "inquiry";

export interface InquiryDraft extends InquiryFields {
  message: string;
}

interface SubmitOptions {
  /** Event type carried in from the link (?type=), "" when none. */
  eventType: string;
  /** Hidden spam-trap value; real visitors leave it empty. */
  honeypot: string;
}

const STATUS_MESSAGES: Record<number, string> = {
  429: "A few messages went out quickly. Wait a minute and try again.",
};
const FALLBACK_MESSAGE = "Something went wrong sending your message. Please try again.";

/**
 * Sends a validated draft. Resolves with the visitor's first name; throws an Error
 * whose message is safe to show them.
 */
export async function submitInquiry(draft: InquiryDraft, { eventType, honeypot }: SubmitOptions): Promise<string> {
  const { firstName, lastName } = splitName(draft.name);
  const captchaToken = await getRecaptchaToken(CAPTCHA_ACTION);

  let res: Response;
  try {
    res = await fetch(`${FUNCTIONS_URL}/submitBookingInquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        date: draft.date,
        message: draft.message.trim(),
        eventType,
        honeypot,
        captchaToken,
      }),
    });
  } catch {
    throw new Error("We couldn't reach our server. Check your connection and try again.");
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(STATUS_MESSAGES[res.status] ?? data.error ?? FALLBACK_MESSAGE);
  }
  return firstName;
}
