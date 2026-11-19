import AudienceHomeRedirect from "@/components/AudienceHomeRedirect";
import AvailabilitySection from "@/components/home/AvailabilitySection";
import ClosingCta from "@/components/home/ClosingCta";
import GalleryPreview from "@/components/home/GalleryPreview";
import HeroSection from "@/components/home/HeroSection";
import ImageBand from "@/components/home/ImageBand";
import IntroSection from "@/components/home/IntroSection";
import LocationMap from "@/components/LocationMap";
import OccasionCards from "@/components/home/OccasionCards";
import RoomsGrid from "@/components/home/RoomsGrid";
import SplitFeature from "@/components/home/SplitFeature";
import StickyBookingBar from "@/components/home/StickyBookingBar";
import TourSection from "@/components/home/TourSection";
import * as content from "@/content/home";

/**
 * General homepage. Each section is a reusable block fed by src/content/home.ts;
 * the order and spacing here are what make this the "general" layout.
 */
export default function HomePage() {
  return (
    <>
      <AudienceHomeRedirect />
      <HeroSection content={content.hero} trackName="hero" />
      <IntroSection content={content.intro} trackName="intro" />
      <SplitFeature
        content={content.estate}
        imageSide="left"
        sectionClassName="px-6 pb-32 sm:pb-44"
        trackName="the_estate"
      />
      <ImageBand content={content.forestBand} />
      <SplitFeature
        content={content.gather}
        imageSide="right"
        actionsClassName="flex flex-wrap items-center gap-x-8 gap-y-4"
        trackName="gather"
      />
      <RoomsGrid content={content.rooms} id="events" trackName="stay" />
      <ImageBand content={content.diningBand} heightClassName="h-[50vh] min-h-[350px]" />
      <SplitFeature
        content={content.dine}
        imageSide="left"
        imageClassName="aspect-[4/5] max-h-[600px]"
        actionsClassName="flex items-center gap-6"
        trackName="dine"
        eventType="dining"
      />
      <OccasionCards content={content.occasions} trackName="group_and_gather" />
      <AvailabilitySection content={content.availability} trackName="availability" />
      <GalleryPreview content={content.gallery} trackName="gallery" />
      <ClosingCta content={content.closingCta} trackName="begin_your_story" />
      <TourSection content={content.tour} id="contact" trackName="visit" />
      <LocationMap className="pt-0 sm:pt-0" />
      <StickyBookingBar content={content.stickyBar} />
    </>
  );
}
