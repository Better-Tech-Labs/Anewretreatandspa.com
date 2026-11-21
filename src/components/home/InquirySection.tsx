"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import InquiryForm from "@/components/inquiry/InquiryForm";
import InquirySentCard from "@/components/inquiry/InquirySentCard";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface InquirySectionContent {
  eyebrow: string;
  title: string;
  text: string;
  /** Sent with the message so the host knows what the visitor wants. Must be a real event type. */
  eventType: string;
  /** Reported to analytics as form_location, e.g. "corporate_bottom". */
  formLocation: string;
  /** Offers instant booking under the button. Off where Inquire is the page's one action. */
  showBookLink?: boolean;
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
            <InquiryForm formLocation={content.formLocation} eventType={content.eventType} onSent={setSentName} showBookLink={content.showBookLink} />
          ) : (
            <InquirySentCard firstName={sentName} />
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
