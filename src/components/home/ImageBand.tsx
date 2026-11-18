import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { Lines } from "./shared";
import type { SectionImage } from "./types";

export interface ImageBandContent {
  image: SectionImage;
  eyebrow?: string;
  titleLines: readonly string[];
}

interface ImageBandProps {
  content: ImageBandContent;
  /** Height of the band. */
  heightClassName?: string;
}

const TITLE_CLASS = "font-heading text-3xl sm:text-4xl md:text-5xl font-normal";

/** Full-width photo with a short line of text over it, used between content sections. */
export default function ImageBand({ content, heightClassName = "h-[60vh] min-h-[400px]" }: ImageBandProps) {
  return (
    <section className={`relative ${heightClassName} ken-burns overflow-hidden`}>
      <Image src={content.image.src} alt={content.image.alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSection>
          {content.eyebrow ? (
            <div className="text-center text-white px-6">
              <p className="text-[11px] tracking-[0.4em] uppercase mb-4 text-white/85">{content.eyebrow}</p>
              <p className={TITLE_CLASS}>
                <Lines lines={content.titleLines} breakClassName="hidden sm:block" />
              </p>
            </div>
          ) : (
            <p className={`text-white ${TITLE_CLASS} text-center leading-tight px-6 max-w-3xl`}>
              <Lines lines={content.titleLines} breakClassName="hidden sm:block" />
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
