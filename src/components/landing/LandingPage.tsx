import type { ReactNode } from "react";
import AvailabilitySection, { type AvailabilityContent } from "@/components/home/AvailabilitySection";
import ClosingCta, { type ClosingCtaContent } from "@/components/home/ClosingCta";
import FaqSection, { type FaqContent } from "@/components/home/FaqSection";
import GalleryPreview, { type GalleryContent } from "@/components/home/GalleryPreview";
import HeroSection, { type HeroContent } from "@/components/home/HeroSection";
import ImageBand, { type ImageBandContent } from "@/components/home/ImageBand";
import InquirySection, { type InquirySectionContent } from "@/components/home/InquirySection";
import IntroSection, { type IntroContent } from "@/components/home/IntroSection";
import OccasionCards, { type OccasionsContent } from "@/components/home/OccasionCards";
import RoomsGrid, { type RoomsContent } from "@/components/home/RoomsGrid";
import SampleDay, { type SampleDayContent } from "@/components/home/SampleDay";
import SplitFeature, { type SplitFeatureContent } from "@/components/home/SplitFeature";
import StickyBookingBar, { type StickyBarContent } from "@/components/home/StickyBookingBar";

/** Anchors every landing page shares, so content files can link to them. */
export const SPACES_ANCHOR = "spaces";
export const INQUIRE_ANCHOR = "inquire";

/**
 * Everything one occasion landing page says. Sections marked optional are
 * left out of the page when the content file doesn't supply them, so a page
 * only carries what is true and useful for that occasion.
 */
export interface LandingContent {
  meta: { title: string; description: string; path: string };
  hero: HeroContent;
  intro: IntroContent;
  /** The main pitch, beside a photo. */
  pitch: SplitFeatureContent;
  band?: ImageBandContent;
  /** Rooms and spaces that matter for this occasion. */
  spaces?: RoomsContent;
  /** An hour-by-hour example of the day or stay. */
  day?: SampleDayContent;
  /** A second feature, usually the spa. */
  extra?: SplitFeatureContent;
  diningBand?: ImageBandContent;
  dine?: SplitFeatureContent;
  /** Variations of the occasion ("Built for…"). */
  formats?: OccasionsContent;
  availability?: AvailabilityContent;
  faq: FaqContent;
  gallery?: GalleryContent;
  closingCta: ClosingCtaContent;
  inquiry: InquirySectionContent;
  stickyBar: StickyBarContent;
}

interface LandingPageProps {
  content: LandingContent;
  /** Optional line under the formats cards. */
  formatsFootnote?: ReactNode;
}

/** The shared layout for occasion landing pages: the homepage's blocks in a fixed order. */
export default function LandingPage({ content, formatsFootnote }: LandingPageProps) {
  return (
    <>
      <HeroSection content={content.hero} trackName="hero" />
      <IntroSection content={content.intro} trackName="intro" />
      <SplitFeature content={content.pitch} imageSide="left" sectionClassName="px-6 pb-32 sm:pb-44" trackName="pitch" />
      {content.band && <ImageBand content={content.band} />}
      {content.spaces && <RoomsGrid content={content.spaces} id={SPACES_ANCHOR} trackName="spaces" />}
      {content.day && <SampleDay content={content.day} trackName="sample_day" />}
      {content.extra && (
        <SplitFeature
          content={content.extra}
          imageSide="right"
          // Sits flush under the sample day, which already has its own bottom padding.
          sectionClassName={content.day ? "px-6 pb-28 sm:pb-36" : undefined}
          actionsClassName="flex flex-wrap items-center gap-x-8 gap-y-4"
          trackName="extra"
        />
      )}
      {content.diningBand && <ImageBand content={content.diningBand} heightClassName="h-[50vh] min-h-[350px]" />}
      {content.dine && (
        <SplitFeature
          content={content.dine}
          imageSide="left"
          imageClassName="aspect-[4/5] max-h-[600px]"
          actionsClassName="flex flex-wrap items-center gap-6"
          trackName="dine"
        />
      )}
      {content.formats && <OccasionCards content={content.formats} footnote={formatsFootnote} trackName="formats" />}
      {content.availability && <AvailabilitySection content={content.availability} trackName="availability" />}
      <FaqSection content={content.faq} trackName="faq" />
      {content.gallery && <GalleryPreview content={content.gallery} trackName="gallery" />}
      <ClosingCta content={content.closingCta} trackName="closing_cta" />
      <InquirySection content={content.inquiry} id={INQUIRE_ANCHOR} trackName="inquire" />
      <StickyBookingBar content={content.stickyBar} />
    </>
  );
}
