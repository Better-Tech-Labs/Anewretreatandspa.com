"use client";

import { useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import { eventTypeFromForm, trackLead } from "@/lib/analytics";
import { dateBounds, eventTypeFromQuery, validateInquiry, type InquiryErrors, type InquiryFields } from "@/lib/inquire";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { RECAPTCHA_ENABLED, RECAPTCHA_SCRIPT_SRC } from "@/lib/recaptcha";
import { Field, MessageField } from "./Field";
import InquirySent from "./InquirySent";
import { submitInquiry, type InquiryDraft } from "./submitInquiry";

const EMPTY_DRAFT: InquiryDraft = { name: "", email: "", phone: "", date: "", message: "" };
/** Order the visitor sees the fields in, so the first problem gets focus. */
const FIELD_ORDER: (keyof InquiryFields)[] = ["name", "email", "phone", "date"];
const fieldId = (key: keyof InquiryDraft) => `inquiry-${key}`;

// Browser-only values (query string, today's date) read without a hydration
// mismatch: the static export renders with the server snapshot, then updates.
const subscribeToNothing = () => () => {};
const readSearch = () => window.location.search;
const readBounds = () => {
  const { min, max } = dateBounds(new Date());
  return `${min}|${max}`;
};
const onServer = () => "";

const LINK = "text-dark border-b border-dark/40 hover:text-accent hover:border-accent transition-colors";

export default function InquirePage() {
  const eventType = eventTypeFromQuery(useSyncExternalStore(subscribeToNothing, readSearch, onServer));
  const [minDate, maxDate] = useSyncExternalStore(subscribeToNothing, readBounds, onServer).split("|");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentName, setSentName] = useState<string | null>(null);

  // After the first send attempt, re-check as they type so errors clear on fix.
  const update = (key: keyof InquiryDraft) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...draft, [key]: e.target.value };
    setDraft(next);
    if (attempted) setErrors(validateInquiry(next, new Date()));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateInquiry(draft, new Date());
    setAttempted(true);
    setErrors(found);
    setSendError(null);
    const firstProblem = FIELD_ORDER.find((key) => found[key]);
    if (firstProblem) {
      document.getElementById(fieldId(firstProblem))?.focus();
      return;
    }

    setSending(true);
    try {
      const firstName = await submitInquiry(draft, { eventType, honeypot: honeypotRef.current?.value ?? "" });
      trackLead("inquiry_form", eventTypeFromForm(eventType));
      setSentName(firstName);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sentName !== null) return <InquirySent firstName={sentName} />;

  return (
    <>
      {RECAPTCHA_ENABLED && <Script src={RECAPTCHA_SCRIPT_SRC} strategy="afterInteractive" />}

      <section aria-labelledby="inquire-heading" className="px-6 pt-28 pb-24 sm:pt-36 lg:pt-40">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow sits above both columns so the form starts level with the heading. */}
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
            {eventType ? `${eventType} inquiry` : "Inquire"}
          </p>
          <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h1 id="inquire-heading" className="font-heading text-4xl sm:text-5xl text-dark font-normal leading-tight mb-5">
                Send us a message
              </h1>
              <p className="text-muted text-[15px] leading-relaxed max-w-md mb-4">
                Takes about 30 seconds. No payment, no commitment. We&apos;ll reply within 24 hours.
              </p>
              <p className="text-[15px] text-muted">
                Rather talk now? <a href={PHONE_HREF} className={LINK}>Call {PHONE_DISPLAY}</a>
              </p>
              <div className="hidden lg:block relative aspect-[4/5] mt-12 overflow-hidden">
                <Image
                  src="/images/forest-approach.webp"
                  alt="The forest approach to ANEW"
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* lg:pt-2.5 lines the "Name" label's letters up with the heading's (the 48px font has more room above its caps). */}
            <form onSubmit={handleSubmit} noValidate className="space-y-7 lg:pt-2.5" aria-describedby={sendError ? "inquiry-send-error" : undefined}>
              <HandDrawnDivider variant="botanical" className="mb-2 lg:hidden" />

              <Field id={fieldId("name")} label="Name" value={draft.name} onChange={update("name")} error={errors.name}
                autoComplete="name" autoCapitalize="words" enterKeyHint="next" />
              <Field id={fieldId("email")} label="Email" type="email" value={draft.email} onChange={update("email")} error={errors.email}
                autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" />
              <Field id={fieldId("phone")} label="Phone" optional type="tel" value={draft.phone} onChange={update("phone")} error={errors.phone}
                hint="For a faster call back." autoComplete="tel" inputMode="tel" enterKeyHint="next" />
              <Field id={fieldId("date")} label="Roughly when?" type="date" value={draft.date} onChange={update("date")} error={errors.date}
                hint="A rough date is fine. We'll sort out the details together." min={minDate || undefined} max={maxDate || undefined} />
              <MessageField id={fieldId("message")} label="Message" optional rows={3} value={draft.message} onChange={update("message")}
                placeholder="Guest count, ideas, questions. Anything helps." />

              {/* Spam trap: hidden from people, filled in by bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              {sendError && (
                <p id="inquiry-send-error" role="alert" className="text-sm text-red-700">
                  {sendError} Or call us at <a href={PHONE_HREF} className="underline">{PHONE_DISPLAY}</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full text-[12px] tracking-[0.3em] uppercase bg-dark text-white py-4 hover:bg-accent focus-visible:bg-accent transition-colors duration-500 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>

              <div className="space-y-3 text-center">
                <p className="text-xs text-muted">
                  Goes straight to our host. Ready to book instantly instead? <Link href="/booking" className={LINK}>Book the estate</Link>
                </p>
                {RECAPTCHA_ENABLED && (
                  <p className="text-[10px] text-muted/80">
                    Protected by reCAPTCHA. Google&apos;s{" "}
                    <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{" "}
                    <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">Terms</a> apply.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
