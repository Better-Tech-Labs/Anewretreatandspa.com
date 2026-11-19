import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import InquireLink from "@/components/InquireLink";
import { prefetchFor } from "@/lib/links";
import { Lines } from "./shared";
import type { CtaLink, SectionImage, SectionTracking } from "./types";

export interface HeroContent {
  image: SectionImage;
  eyebrow: string;
  titleLines: readonly string[];
  /** "long" steps the headline down a size so longer lines stay on one row. */
  titleScale?: "display" | "long";
  subtitle: string;
  priceNote?: string;
  primaryCta: CtaLink;
  secondaryCtas: readonly CtaLink[];
  /** Small "send an inquiry" line under the buttons. Leave out when the main button already goes to the form. */
  inquireLead?: string;
  inquireType?: string;
}

const TITLE_SCALE_CLASS: Record<NonNullable<HeroContent["titleScale"]>, string> = {
  display: "text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] leading-[0.95]",
  long: "text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.75rem] leading-[1]",
};

const SECONDARY_CTA_CLASS =
  "text-[11px] tracking-[0.3em] uppercase text-white/85 hover:text-white transition-colors duration-300";

/** Entrance delays in seconds, in reading order. */
const DELAY = { eyebrow: 0.2, subtitle: 0.5, price: 0.6, buttons: 0.7, inquire: 0.9, arrow: 1.4 };

/** Sets the start time for the `hero-fade` animation defined in globals.css. */
function fadeAfter(seconds: number): CSSProperties {
  return { "--hero-delay": `${seconds}s` } as CSSProperties;
}

/**
 * The entrance is CSS only (see `.hero-fade` and `.hero-rise` in globals.css),
 * so the headline is on screen as soon as the HTML arrives. It used to wait
 * for JavaScript, which left the page blank for many seconds on slow phones.
 * The headline never starts transparent, so browsers count it as painted at once.
 */
export default function HeroSection({ content, trackName }: { content: HeroContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="relative h-screen flex items-center justify-center overflow-hidden ken-burns">
      <Image src={content.image.src} alt={content.image.alt} fill sizes="100vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <p
          style={fadeAfter(DELAY.eyebrow)}
          className="hero-fade text-[10px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.6em] uppercase mb-8 text-white/80"
        >
          {content.eyebrow}
        </p>
        <h1 className={`hero-rise font-heading ${TITLE_SCALE_CLASS[content.titleScale ?? "display"]} mb-8 font-normal tracking-tight`}>
          <Lines lines={content.titleLines} />
        </h1>
        <p
          style={fadeAfter(DELAY.subtitle)}
          className={`hero-fade text-white/85 text-sm sm:text-base ${content.priceNote ? "mb-2" : "mb-8"} max-w-lg mx-auto leading-relaxed`}
        >
          {content.subtitle}
        </p>
        {content.priceNote && (
          <p style={fadeAfter(DELAY.price)} className="hero-fade text-white/75 text-xs tracking-[0.2em] uppercase mt-2 mb-8">
            {content.priceNote}
          </p>
        )}
        <div style={fadeAfter(DELAY.buttons)} className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={content.primaryCta.href}
            prefetch={prefetchFor(content.primaryCta.href)}
            className="text-[11px] tracking-[0.3em] uppercase border border-white text-white px-8 py-3.5 hover:bg-white hover:text-dark transition-all duration-500"
          >
            {content.primaryCta.label}
          </Link>
          {content.secondaryCtas.map((cta) => (
            <Link key={cta.href} href={cta.href} prefetch={prefetchFor(cta.href)} className={SECONDARY_CTA_CLASS}>
              {cta.label}
            </Link>
          ))}
        </div>
        {content.inquireLead && (
          <div style={fadeAfter(DELAY.inquire)} className="hero-fade">
            <InquireLink tone="light" lead={content.inquireLead} type={content.inquireType} className="mt-7" />
          </div>
        )}
      </div>
      <div style={fadeAfter(DELAY.arrow)} className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
