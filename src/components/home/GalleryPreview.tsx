import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import { EYEBROW_CLASS, UNDERLINE_LINK_CLASS } from "./shared";
import type { CtaLink, SectionTracking } from "./types";

export interface GalleryTile {
  src: string;
  alt: string;
  /** "feature" is the large 2x2 tile, "wide" spans two columns. */
  span?: "feature" | "wide";
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  tiles: readonly GalleryTile[];
  cta: CtaLink;
}

const SPAN_CLASS: Record<NonNullable<GalleryTile["span"]>, string> = {
  feature: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
};

/** Reveal delay per tile position, in seconds. The first tile leads, the rest follow closely. */
const FIRST_FOLLOWER_DELAY = 0.08;
const FOLLOWER_STEP = 0.04;
function tileDelay(index: number): number {
  if (index === 0) return 0;
  return Number((FIRST_FOLLOWER_DELAY + (index - 1) * FOLLOWER_STEP).toFixed(2));
}

export default function GalleryPreview({ content, trackName }: { content: GalleryContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="py-36 sm:py-48 px-6">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="text-center mb-20">
          <HandDrawnDivider variant="ivy" className="mb-8" />
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-dark font-normal">{content.title}</h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[250px]">
          {content.tiles.map((tile, i) => (
            <AnimatedSection key={tile.src} delay={tileDelay(i)} className={tile.span ? SPAN_CLASS[tile.span] : undefined}>
              <Link href={content.cta.href} className="relative block h-full overflow-hidden group zoom-container">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <Link href={content.cta.href} className={UNDERLINE_LINK_CLASS}>
            {content.cta.label}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
