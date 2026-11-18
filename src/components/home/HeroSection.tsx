"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import InquireLink from "@/components/InquireLink";
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

export default function HeroSection({ content, trackName }: { content: HeroContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="relative h-screen flex items-center justify-center overflow-hidden ken-burns">
      <Image src={content.image.src} alt={content.image.alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-[10px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.6em] uppercase mb-8 text-white/80"
        >
          {content.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className={`font-heading ${TITLE_SCALE_CLASS[content.titleScale ?? "display"]} mb-8 font-normal tracking-tight`}
        >
          <Lines lines={content.titleLines} />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/50 text-sm sm:text-base mb-2 max-w-lg mx-auto leading-relaxed"
        >
          {content.subtitle}
        </motion.p>
        {content.priceNote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2 mb-8"
          >
            {content.priceNote}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={content.primaryCta.href}
            className="text-[11px] tracking-[0.3em] uppercase border border-white text-white px-8 py-3.5 hover:bg-white hover:text-dark transition-all duration-500"
          >
            {content.primaryCta.label}
          </Link>
          {content.secondaryCtas.map((cta) => (
            <Link key={cta.href} href={cta.href} className={SECONDARY_CTA_CLASS}>
              {cta.label}
            </Link>
          ))}
        </motion.div>
        {content.inquireLead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}>
            <InquireLink tone="light" lead={content.inquireLead} type={content.inquireType} className="mt-7" />
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
}
