import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CornerAccent from "@/components/CornerAccent";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import InquireLink from "@/components/InquireLink";
import { prefetchFor } from "@/lib/links";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface OccasionCard {
  img: string;
  /** Photo description. Falls back to the title. */
  alt?: string;
  title: string;
  desc: string;
  /** Where "Learn More" goes. Leave out to show only the inquire link. */
  href?: string;
  /** Pre-selects the event type on the inquiry form. */
  inquireType?: string;
}

export interface OccasionsContent {
  eyebrow: string;
  title: string;
  cards: readonly OccasionCard[];
}

const STAGGER_SECONDS = 0.12;

interface OccasionCardsProps extends SectionTracking {
  content: OccasionsContent;
  /** Optional line under the cards, e.g. a pointer to what else is on offer. */
  footnote?: ReactNode;
}

export default function OccasionCards({ content, footnote, trackName }: OccasionCardsProps) {
  return (
    <section data-track-section={trackName} className="py-28 sm:py-36 bg-cream px-6 relative overflow-hidden">
      <CornerAccent position="top-left" variant="watercolor" />
      <CornerAccent position="top-right" variant="watercolor" />
      <CornerAccent position="bottom-left" />
      <CornerAccent position="bottom-right" />
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <HandDrawnDivider variant="flourish" className="mb-6" />
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] text-dark font-normal">{content.title}</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {content.cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * STAGGER_SECONDS}>
              <div className="group cursor-pointer depth-float">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden zoom-container">
                  <Image
                    src={card.img}
                    alt={card.alt ?? card.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading text-2xl text-dark mb-3">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{card.desc}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {card.href && (
                    <Link
                      href={card.href}
                      prefetch={prefetchFor(card.href)}
                      className="text-[10px] tracking-[0.3em] uppercase text-dark border-b border-dark pb-0.5 hover:text-accent hover:border-accent transition-colors"
                    >
                      Learn More<span className="sr-only"> about {card.title}</span>
                    </Link>
                  )}
                  <InquireLink variant="label" size="sm" type={card.inquireType}>
                    Inquire
                  </InquireLink>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {footnote && <div className="mt-16 text-center">{footnote}</div>}
      </div>
    </section>
  );
}
