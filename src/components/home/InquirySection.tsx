"use client";

import { useState } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import InquiryForm from "@/components/inquiry/InquiryForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface InquirySectionContent {
  eyebrow: string;
  title: string;
  text: string;
  /** Sent with the message so the host knows what the visitor wants. Must be a real event type. */
  eventType: string;
  /** Short reassurances listed under the intro. */
  points: readonly string[];
}

interface InquirySectionProps extends SectionTracking {
  content: InquirySectionContent;
  /** Anchor id, so the form can be linked to directly. */
  id?: string;
}

/** The inquiry form embedded in a landing page, with the event type already chosen. */
export default function InquirySection({ content, id, trackName }: InquirySectionProps) {
  const [sentName, setSentName] = useState<string | null>(null);

  return (
    <section data-track-section={trackName} id={id} className="py-28 sm:py-36 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-start">
        <AnimatedSection direction="left">
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-6 font-normal leading-tight">{content.title}</h2>
          <p className="text-muted leading-relaxed mb-8 text-[15px] max-w-md">{content.text}</p>
          <ul className="space-y-3 text-sm text-muted mb-8 max-w-md">
            {content.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-muted">
            Rather talk now?{" "}
            <a href={PHONE_HREF} className="text-dark border-b border-dark/40 hover:text-accent hover:border-accent transition-colors">
              Call {PHONE_DISPLAY}
            </a>
          </p>
        </AnimatedSection>

        <AnimatedSection direction="right">
          {sentName === null ? (
            <InquiryForm eventType={content.eventType} onSent={setSentName} />
          ) : (
            <div role="status" className="border border-border bg-cream/50 px-6 py-10 sm:px-10 text-center">
              <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-5" aria-hidden="true" />
              <p className="font-heading text-3xl text-dark mb-3">Message sent{sentName ? `, ${sentName}` : ""}.</p>
              <p className="text-muted text-[15px] mb-8">We&apos;ll get back to you within 24 hours.</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4">Can&apos;t wait?</p>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-3 w-full bg-dark text-white text-[12px] tracking-[0.25em] uppercase py-4 hover:bg-accent focus-visible:bg-accent transition-colors duration-500"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
