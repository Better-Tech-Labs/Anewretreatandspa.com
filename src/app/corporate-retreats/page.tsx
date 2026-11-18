import AudienceExitLink from "@/components/AudienceExitLink";
import AvailabilitySection from "@/components/home/AvailabilitySection";
import ClosingCta from "@/components/home/ClosingCta";
import FaqSection from "@/components/home/FaqSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import HeroSection from "@/components/home/HeroSection";
import ImageBand from "@/components/home/ImageBand";
import InquirySection from "@/components/home/InquirySection";
import IntroSection from "@/components/home/IntroSection";
import OccasionCards from "@/components/home/OccasionCards";
import RoomsGrid from "@/components/home/RoomsGrid";
import SampleDay from "@/components/home/SampleDay";
import SplitFeature from "@/components/home/SplitFeature";
import StickyBookingBar from "@/components/home/StickyBookingBar";
import * as content from "@/content/corporate";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(content.meta);

/**
 * Corporate retreat layout: the homepage's blocks with corporate content,
 * wedding material removed, and the inquiry form on the page itself.
 */
export default function CorporateRetreatsPage() {
  return (
    <>
      <HeroSection content={content.hero} trackName="hero" />
      <IntroSection content={content.intro} trackName="intro" />
      <SplitFeature
        content={content.estate}
        imageSide="left"
        sectionClassName="px-6 pb-32 sm:pb-44"
        trackName="the_estate"
      />
      <ImageBand content={content.forestBand} />
      <RoomsGrid content={content.spaces} id={content.SPACES_ANCHOR} trackName="spaces" />
      <SampleDay content={content.sampleDay} trackName="sample_day" />
      <SplitFeature
        content={content.wellness}
        imageSide="right"
        sectionClassName="px-6 pb-28 sm:pb-36"
        actionsClassName="flex flex-wrap items-center gap-x-8 gap-y-4"
        trackName="wellness"
      />
      <ImageBand content={content.diningBand} heightClassName="h-[50vh] min-h-[350px]" />
      <SplitFeature
        content={content.dine}
        imageSide="left"
        imageClassName="aspect-[4/5] max-h-[600px]"
        actionsClassName="flex flex-wrap items-center gap-6"
        trackName="dine"
      />
      <OccasionCards content={content.formats} footnote={<AudienceExitLink />} trackName="formats" />
      <AvailabilitySection content={content.availability} trackName="availability" />
      <FaqSection content={content.faq} trackName="faq" />
      <GalleryPreview content={content.gallery} trackName="gallery" />
      <ClosingCta content={content.closingCta} trackName="bring_your_team" />
      <InquirySection content={content.inquiry} id={content.INQUIRE_ANCHOR} trackName="inquire" />
      <StickyBookingBar content={content.stickyBar} />
    </>
  );
}
