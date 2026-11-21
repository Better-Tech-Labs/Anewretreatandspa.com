"use client";

import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import InquireLink from "@/components/InquireLink";
import { track } from "@/lib/analytics";
import { inquireHref } from "@/lib/inquire";
import { prefillInquiryDate } from "@/lib/inquiryPrefill";
import { INQUIRY_FORM_ATTR } from "@/components/inquiry/InquiryForm";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface AvailabilityContent {
  eyebrow: string;
  title: string;
  hint: string;
  inquireLead: string;
  inquireType?: string;
  closingNote?: string;
}

interface AvailabilitySectionProps extends SectionTracking {
  content: AvailabilityContent;
  /** Id of an inquiry form on this page. A date click fills that form in and scrolls to it. */
  formAnchor?: string;
}

/** YYYY-MM-DD in the visitor's local time, which is what the inquiry form expects. */
function toDateParam(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function scrollToForm(anchor: string): void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const section = document.getElementById(anchor);
  // Land on the fields themselves: on phones the section opens with its intro text.
  const target = section?.querySelector(`[${INQUIRY_FORM_ATTR}]`) ?? section;
  target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}

/**
 * The live calendar. Picking an open date starts an inquiry with that date
 * filled in: on this page when it has a form, otherwise on /inquire.
 */
export default function AvailabilitySection({ content, formAnchor, trackName }: AvailabilitySectionProps) {
  const router = useRouter();

  const handleSelectDate = (date: Date) => {
    const picked = toDateParam(date);
    if (formAnchor) {
      track("calendar_inquiry_start", { destination: "on_page_form" });
      prefillInquiryDate(picked);
      scrollToForm(formAnchor);
      return;
    }
    track("calendar_inquiry_start", { destination: "inquire_page" });
    router.push(inquireHref(content.inquireType, picked));
  };

  return (
    <section data-track-section={trackName} className="py-28 sm:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark font-normal mb-4">{content.title}</h2>
          <p className="text-muted text-sm">{content.hint}</p>
        </AnimatedSection>
        <AnimatedSection>
          <AvailabilityCalendar onSelectDate={handleSelectDate} />
          <InquireLink lead={content.inquireLead} type={content.inquireType} className="text-center mt-8" />
        </AnimatedSection>
        {content.closingNote && (
          <AnimatedSection className="text-center mt-14">
            <p className="text-muted text-[15px] leading-relaxed max-w-2xl mx-auto">{content.closingNote}</p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
