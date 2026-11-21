"use client";

import { useState } from "react";
import Image from "next/image";
import InquiryForm from "@/components/inquiry/InquiryForm";
import InquirySentCard from "@/components/inquiry/InquirySentCard";
import { Lines } from "@/components/home/shared";
import type { HeroContent } from "@/components/home/HeroSection";
import type { SectionTracking } from "@/components/home/types";
import { HERO_FORM_ANCHOR } from "@/lib/inquire";


export interface HeroFormContent {
  /** Heading above the form. */
  title: string;
  /** Sent with the message. Must be a real event type. */
  eventType: string;
  /** Reported to analytics as form_location. */
  formLocation: string;
  /** Short "what's included" list shown with the price. Only things the page already states. */
  includedLabel: string;
  included: readonly string[];
}

interface HeroInquiryProps extends SectionTracking {
  hero: HeroContent;
  form: HeroFormContent;
}

const TEXT_LINK_CLASS =
  "text-[11px] tracking-[0.25em] uppercase text-white/85 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors duration-300";

/**
 * A landing hero with the short inquiry form in it. On wide screens the form
 * sits beside the headline, inside the first screen. On phones the photo and
 * headline come first and the form follows directly underneath.
 *
 * The photo is positioned against the headline block on phones and against the
 * whole section on wide screens (the block stops being `relative` at lg).
 */
export default function HeroInquiry({ hero, form, trackName }: HeroInquiryProps) {
  const [sentName, setSentName] = useState<string | null>(null);

  return (
    <section data-track-section={trackName} className="relative isolate overflow-hidden lg:min-h-screen lg:flex lg:items-center">
      <div className="w-full lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-[6fr_5fr] lg:gap-14 lg:items-center lg:px-6 lg:pt-28 lg:pb-10">
        <div className="relative lg:static overflow-hidden lg:overflow-visible flex items-center justify-center lg:block min-h-[78svh] lg:min-h-0 px-6 pt-28 pb-12 lg:p-0 text-center lg:text-left">
          <div className="ken-burns absolute inset-0 -z-10">
            <Image src={hero.image.src} alt={hero.image.alt} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/30" />
          </div>

          <div className="text-white max-w-xl mx-auto lg:mx-0">
            <p className="hero-fade text-[10px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-6 text-white/80" style={{ "--hero-delay": "0.2s" } as React.CSSProperties}>
              {hero.eyebrow}
            </p>
            <h1 className="hero-rise font-heading text-[2.6rem] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1] mb-6 font-normal tracking-tight">
              <Lines lines={hero.titleLines} />
            </h1>
            <p className="text-white/85 text-sm sm:text-base mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">{hero.subtitle}</p>

            {hero.priceNote && <p className="font-heading text-xl sm:text-2xl text-white mb-3">{hero.priceNote}</p>}
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">{form.includedLabel}</p>
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/85 mb-8">
              {form.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-7 gap-y-5">
              <a
                href={`#${HERO_FORM_ANCHOR}`}
                className="text-[11px] tracking-[0.3em] uppercase bg-white text-dark px-9 py-4 hover:bg-accent hover:text-white transition-colors duration-500"
              >
                {hero.primaryCta.label}
              </a>
              <div className="flex items-center gap-7">
                {hero.secondaryCtas.map((cta) => (
                  <a key={cta.href} href={cta.href} className={TEXT_LINK_CLASS}>
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id={HERO_FORM_ANCHOR} className="scroll-mt-20 bg-warm-white px-6 py-10 sm:px-10 lg:p-8 xl:p-10">
          <div className="max-w-md mx-auto lg:max-w-none">
            {sentName === null ? (
              <>
                <h2 className="font-heading text-2xl sm:text-3xl text-dark font-normal mb-6 lg:mb-5">{form.title}</h2>
                <InquiryForm formLocation={form.formLocation} eventType={form.eventType} onSent={setSentName} compact />
              </>
            ) : (
              <InquirySentCard firstName={sentName} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
