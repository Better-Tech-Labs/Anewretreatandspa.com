"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useBotGuard } from "@/components/BotGuard";
import { trackLead } from "@/lib/analytics";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface TourContent {
  eyebrow: string;
  title: string;
  text: string;
  location: string;
  phone: { label: string; href: string };
  email: { label: string; href: string };
}

interface TourSectionProps extends SectionTracking {
  content: TourContent;
  /** Anchor id that "Schedule a Tour" links point at. */
  id?: string;
}

const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_FUNCTIONS_URL ||
  "https://us-central1-bakkers-website-847ba.cloudfunctions.net";

const EMPTY_FORM = { firstName: "", lastName: "", email: "", phone: "", date: "", time: "", message: "" };

const FIELD_CLASS =
  "w-full border-b border-border bg-transparent py-3 text-sm text-dark placeholder-muted focus:outline-none focus:border-accent transition-colors";
const DATE_FIELD_CLASS =
  "w-full border-b border-border bg-transparent py-3 text-sm text-dark focus:outline-none focus:border-accent transition-colors";
const FIELD_LABEL_CLASS = "text-[10px] tracking-[0.2em] uppercase text-muted block mb-1";

export default function TourSection({ content, id, trackName }: TourSectionProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bot = useBotGuard();

  const setField = (field: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName || !form.email || !form.date) {
      setError("Name, email, and date are required.");
      return;
    }
    if (!bot.verified || bot.isBot()) {
      setError("Please verify you're not a robot.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${FUNCTIONS_URL}/submitTour`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot: bot.honeypotRef.current || "" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      trackLead("tour_form");
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-track-section={trackName} id={id} className="py-28 sm:py-36 px-6">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <AnimatedSection direction="left">
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-6 font-normal leading-tight">{content.title}</h2>
          <p className="text-muted leading-relaxed mb-8 text-[15px] max-w-md">{content.text}</p>
          <div className="space-y-3 text-muted text-sm">
            <p>{content.location}</p>
            <p><a href={content.phone.href} className="hover:text-accent transition-colors">{content.phone.label}</a></p>
            <p><a href={content.email.href} className="hover:text-accent transition-colors">{content.email.label}</a></p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          {isSubmitted ? (
            <div className="text-center py-12">
              <p className="font-heading text-2xl text-dark mb-3">Tour Request Received</p>
              <p className="text-muted text-sm">We&apos;ll confirm your tour by email within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="First Name *" required value={form.firstName} onChange={setField("firstName")} className={FIELD_CLASS} />
                <input type="text" placeholder="Last Name" value={form.lastName} onChange={setField("lastName")} className={FIELD_CLASS} />
              </div>
              <input type="email" placeholder="Email *" required value={form.email} onChange={setField("email")} className={FIELD_CLASS} />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={setField("phone")} className={FIELD_CLASS} />
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="tourDate" className={FIELD_LABEL_CLASS}>Preferred Date *</label>
                  <input id="tourDate" type="date" required min={new Date().toISOString().split("T")[0]} value={form.date} onChange={setField("date")} className={DATE_FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="tourTime" className={FIELD_LABEL_CLASS}>Preferred Time</label>
                  <input id="tourTime" type="time" value={form.time} onChange={setField("time")} className={DATE_FIELD_CLASS} />
                </div>
              </div>
              <textarea placeholder="Anything we should know? (optional)" rows={3} value={form.message} onChange={setField("message")} className={`${FIELD_CLASS} resize-none`} />
              {/* Bot guard */}
              <div className="flex items-center gap-3 py-3 px-4 border border-border bg-cream/30">
                <button type="button" role="checkbox" aria-checked={bot.verified} aria-label="I'm not a robot" onClick={() => bot.setVerified(true)}
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${bot.verified ? "border-green-500 bg-green-500" : "border-border hover:border-dark"}`}>
                  {bot.verified && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </button>
                <span className="text-sm text-muted">{bot.verified ? "Verified" : "I'm not a robot"}</span>
              </div>
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" onChange={(e) => { bot.honeypotRef.current = e.target.value; }} />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="text-[11px] tracking-[0.3em] uppercase bg-dark text-white px-10 py-3.5 hover:bg-accent transition-colors duration-500 mt-4 disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Request a Tour"}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
