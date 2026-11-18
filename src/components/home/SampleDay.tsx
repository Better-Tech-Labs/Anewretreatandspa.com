import AnimatedSection from "@/components/AnimatedSection";
import { EYEBROW_CLASS, SectionActionLink } from "./shared";
import type { SectionAction, SectionTracking } from "./types";

export interface DayItem {
  time: string;
  title: string;
  detail: string;
}

export interface SampleDayContent {
  eyebrow: string;
  title: string;
  text: string;
  action: SectionAction;
  items: readonly DayItem[];
}

const STAGGER_SECONDS = 0.05;

/** A day laid out hour by hour: sticky intro on the left, timeline on the right. */
export default function SampleDay({ content, trackName }: { content: SampleDayContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="py-28 sm:py-36 px-6">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8">
        <AnimatedSection className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading font-normal text-3xl sm:text-4xl text-dark leading-tight mb-6">{content.title}</h2>
          <p className="text-muted text-[15px] leading-relaxed mb-8">{content.text}</p>
          <SectionActionLink action={content.action} />
        </AnimatedSection>
        <ol className="lg:col-span-7 lg:col-start-6 border-l border-border">
          {content.items.map((item, i) => (
            <li key={item.time} className="relative pl-8 sm:pl-12 pb-10 last:pb-0">
              <span className="absolute -left-[5px] top-3 w-[9px] h-[9px] rounded-full bg-accent" aria-hidden="true" />
              <AnimatedSection delay={i * STAGGER_SECONDS} className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-6 sm:items-baseline">
                <p className="font-heading text-3xl text-dark tabular-nums">{item.time}</p>
                <div>
                  <h3 className="font-heading text-xl text-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
