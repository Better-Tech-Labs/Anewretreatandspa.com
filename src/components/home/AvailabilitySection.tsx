"use client";

import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import InquireLink from "@/components/InquireLink";
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

const BOOKING_PATH = "/booking";

/** YYYY-MM-DD in the visitor's local time, which is what the booking page expects. */
function toDateParam(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function AvailabilitySection({ content, trackName }: { content: AvailabilityContent } & SectionTracking) {
  const router = useRouter();

  return (
    <section data-track-section={trackName} className="py-28 sm:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark font-normal mb-4">{content.title}</h2>
          <p className="text-muted text-sm">{content.hint}</p>
        </AnimatedSection>
        <AnimatedSection>
          <AvailabilityCalendar onSelectDate={(date) => router.push(`${BOOKING_PATH}?date=${toDateParam(date)}`)} />
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
