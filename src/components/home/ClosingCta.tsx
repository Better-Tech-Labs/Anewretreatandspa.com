import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import InquireLink from "@/components/InquireLink";
import { Lines } from "./shared";
import type { CtaLink, SectionImage, SectionTracking } from "./types";

export interface ClosingCtaContent {
  image: SectionImage;
  titleLines: readonly string[];
  text: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  inquireLead?: string;
  inquireType?: string;
}

export default function ClosingCta({ content, trackName }: { content: ClosingCtaContent } & SectionTracking) {
  return (
    <section
      data-track-section={trackName}
      className="relative h-[70vh] min-h-[450px] flex items-center justify-center ken-burns overflow-hidden"
    >
      <Image src={content.image.src} alt={content.image.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <AnimatedSection>
          <HandDrawnDivider variant="flourish" color="rgba(255,255,255,0.35)" className="mb-8" />
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-6 font-normal leading-tight">
            <Lines lines={content.titleLines} />
          </h2>
          <p className="text-white/85 text-base mb-10 max-w-md mx-auto">{content.text}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={content.primaryCta.href}
              className="text-[11px] tracking-[0.3em] uppercase border border-white text-white px-8 py-3.5 hover:bg-white hover:text-dark transition-all duration-500"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="text-[11px] tracking-[0.3em] uppercase text-white/80 hover:text-white transition-colors duration-300"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
          {content.inquireLead && (
            <InquireLink tone="light" lead={content.inquireLead} type={content.inquireType} className="mt-8" />
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
