import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import Tilt3D from "@/components/Tilt3D";
import { EYEBROW_CLASS, Lines, SectionActionLink } from "./shared";
import type { SectionAction, SectionImage, SectionTracking } from "./types";

export interface SplitFeatureContent {
  image: SectionImage;
  eyebrow: string;
  titleLines: readonly string[];
  paragraphs: readonly string[];
  actions: readonly SectionAction[];
}

interface SplitFeatureProps extends SectionTracking {
  content: SplitFeatureContent;
  imageSide: "left" | "right";
  /** Vertical rhythm differs per placement, so the page sets it. */
  sectionClassName?: string;
  imageClassName?: string;
  /** Wrapper for the actions row. Omit when there is a single action. */
  actionsClassName?: string;
}

const DEFAULT_SECTION_CLASS = "py-28 sm:py-36 px-6";
const DEFAULT_IMAGE_CLASS = "aspect-[4/5] lg:aspect-[3/4] max-h-[700px]";

export default function SplitFeature({
  content,
  imageSide,
  sectionClassName = DEFAULT_SECTION_CLASS,
  imageClassName = DEFAULT_IMAGE_CLASS,
  actionsClassName,
  trackName,
  eventType,
}: SplitFeatureProps) {
  const isImageLeft = imageSide === "left";
  const actions = content.actions.map((action) => <SectionActionLink key={action.label} action={action} />);

  const imageBlock = (
    <AnimatedSection
      key="image"
      direction={isImageLeft ? "left" : "right"}
      className={isImageLeft ? undefined : "order-1 lg:order-2"}
    >
      <Tilt3D className={`relative ${imageClassName} overflow-hidden`}>
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={content.image.position ? { objectPosition: content.image.position } : undefined}
        />
      </Tilt3D>
    </AnimatedSection>
  );

  const textBlock = (
    <AnimatedSection
      key="text"
      direction={isImageLeft ? "right" : "left"}
      className={isImageLeft ? "lg:pl-20 xl:pl-28" : "lg:pr-20 xl:pr-28 order-2 lg:order-1"}
    >
      <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
      <h3 className="font-heading text-3xl sm:text-4xl text-dark mb-6 font-normal leading-tight">
        <Lines lines={content.titleLines} />
      </h3>
      {content.paragraphs.map((paragraph, i) => (
        <p
          key={paragraph}
          className={`text-muted leading-relaxed ${i === content.paragraphs.length - 1 ? "mb-8" : "mb-6"} text-[15px]`}
        >
          {paragraph}
        </p>
      ))}
      {actionsClassName ? <div className={actionsClassName}>{actions}</div> : actions}
    </AnimatedSection>
  );

  return (
    <section data-track-section={trackName} data-event-type={eventType} className={sectionClassName}>
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-6 lg:gap-0 items-center">
        {isImageLeft ? [imageBlock, textBlock] : [textBlock, imageBlock]}
      </div>
    </section>
  );
}
