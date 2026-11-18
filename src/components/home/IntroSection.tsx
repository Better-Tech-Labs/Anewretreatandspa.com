import { Fragment } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import InquireLink from "@/components/InquireLink";
import type { SectionTracking } from "./types";

export interface IntroContent {
  statement: string;
  features: readonly string[];
  inquireLabel: string;
  inquireType?: string;
}

export default function IntroSection({ content, trackName }: { content: IntroContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="pt-12 pb-20 sm:pt-16 sm:pb-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <HandDrawnDivider variant="botanical" className="mb-10" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.35] text-dark mb-10 font-normal">
            {content.statement}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-muted">
            {content.features.map((feature, i) => (
              <Fragment key={feature}>
                {/* Dots only where the list sits on wide rows; on phones they end up dangling at line ends. */}
                {i > 0 && <span className="hidden sm:inline text-accent">·</span>}
                <span>{feature}</span>
              </Fragment>
            ))}
          </div>
          <InquireLink type={content.inquireType} className="mt-10">
            {content.inquireLabel}
          </InquireLink>
        </AnimatedSection>
      </div>
    </section>
  );
}
