/**
 * Words and photos for the Bothell town page (/bothell-event-venue).
 * ANEW is in Kenmore, not Bothell. Bothell borders Kenmore to the east, and
 * this page says so plainly wherever location comes up.
 *
 * Local places named here were checked against official pages (City of
 * Bothell, King County Parks, UW Bothell). No drive times, distances, private
 * businesses, capacity or prices are stated.
 */
import type { AvailabilityContent } from "@/components/home/AvailabilitySection";
import type { ClosingCtaContent } from "@/components/home/ClosingCta";
import type { FaqContent } from "@/components/home/FaqSection";
import type { GalleryContent } from "@/components/home/GalleryPreview";
import type { HeroContent } from "@/components/home/HeroSection";
import type { ImageBandContent } from "@/components/home/ImageBand";
import type { InquirySectionContent } from "@/components/home/InquirySection";
import type { IntroContent } from "@/components/home/IntroSection";
import type { OccasionsContent } from "@/components/home/OccasionCards";
import type { RoomsContent } from "@/components/home/RoomsGrid";
import type { SampleDayContent } from "@/components/home/SampleDay";
import type { SplitFeatureContent } from "@/components/home/SplitFeature";
import type { StickyBarContent } from "@/components/home/StickyBookingBar";
import { SPACES_ANCHOR, type LandingContent } from "@/components/landing/LandingPage";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { inquireHref } from "@/lib/inquire";

/** A town page covers every occasion, so the inquiry form opens with no type chosen. */
const INQUIRE_HREF = inquireHref();

export const meta = {
  title: "Event Venue near Bothell, WA | Weddings & Offsites | ANEW",
  description:
    "Planning a wedding, offsite or retreat near Bothell? ANEW is a private estate and spa in Kenmore, the next city west, on two wooded acres.",
  path: "/bothell-event-venue",
};

export const hero: HeroContent = {
  image: {
    src: "/images/forest-approach.webp",
    alt: "Timber estate buildings beneath tall evergreens, seen from the garden slope at ANEW",
  },
  eyebrow: "For Bothell Weddings, Offsites & Retreats · Kenmore, Washington",
  titleLines: ["Event Venue", "near Bothell"],
  subtitle: "A private estate and spa in Kenmore, the city on Bothell's west side. One group on the grounds at a time.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "Follow the Sammamish River west out of Bothell and you reach Kenmore, where it meets Lake Washington. ANEW is in Kenmore: a private 5,800 sq ft estate with its own spa, seven bedrooms and a stream through two wooded acres.",
  features: [
    "In Kenmore, beside Bothell",
    "Private use of the estate",
    "Event Pavilion",
    "Studio Cabin",
    "7 bedrooms",
    "Sauna & cold plunge",
    "Private chefs",
    "Outside vendors welcome",
  ],
  inquireLabel: "Tell us about your event",
};

export const estate: SplitFeatureContent = {
  image: {
    src: "/images/interior-openplan.webp",
    alt: "Living room with white sofas, a patterned rug and an iron chandelier under dark timber beams at ANEW",
  },
  eyebrow: "The City Next Door",
  titleLines: ["Not in Bothell.", "Right Beside It."],
  paragraphs: [
    "To be clear about it: ANEW is in Kenmore, which borders Bothell to the west. If a search for venues in Bothell keeps returning banquet rooms and hotel meeting space, the neighboring city is worth a look.",
    "The difference is that you are renting a property, not a room inside somebody else's building. There are two halls, a standalone cabin, a courtyard with a fire pit, a spa and a house with seven bedrooms, and your group has all of it.",
    "For a wedding, that means the ceremony, the dinner and the beds share one address. For a work offsite, it means nobody slips back to the office at lunch.",
  ],
  actions: [{ kind: "link", label: "Look Around the Estate", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/cedar-sunlight.webp", alt: "Sunlight coming through tall cedars beside a gravel path at ANEW" },
  titleLines: ["One City West", "of Bothell"],
};

export const spaces: RoomsContent = {
  eyebrow: "Rooms & Grounds",
  title: "What Your Group Gets to Use",
  rooms: [
    { img: "/images/event-hall.webp", alt: "Open hall with exposed timber beams, a polished concrete floor and French doors at ANEW", name: "Event Pavilion", desc: "The room most Bothell groups ask about first. An open-plan hall with French doors to the forest that can be set for a reception, a planning day or a class." },
    { img: "/images/cabin-entrance.webp", alt: "Standalone timber cabin with an open doorway next to tall trees at ANEW", name: "Studio Cabin", desc: "A small cabin set apart from the house. Wedding parties dress here. Work teams use it when four people need to solve one problem." },
    { img: "/images/interior-living-wide.webp", alt: "Fireplace, two facing sofas and an iron chandelier in the Grand Hall at ANEW", name: "Grand Hall", desc: "The living and dining heart of the house, with a fireplace and floor-to-ceiling windows. It works for toasts, a kickoff talk or coffee before the day starts." },
    { img: "/images/bedroom-garden.webp", alt: "Bedroom with a king bed and French doors onto the garden at ANEW", name: "Garden Suite", desc: "One of seven bedrooms. A king bed, French doors to the garden patio and an en-suite rain shower." },
    { img: "/images/therapy-pools.webp", alt: "Small cedar sauna cabin with two dark plunge tubs on a deck among the trees at ANEW", name: "Sauna & Cold Plunge", desc: "A cedar-lined sauna with cold plunge tubs beside it, set into the wooded hillside above the garden." },
    { img: "/images/gym-tonal-wide.webp", alt: "Gym with four wall-mounted Tonal trainers and benches at ANEW", name: "The Gym", desc: "Tonal strength systems and open floor space, for an early workout or a group stretch." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Offsite",
  title: "A Bothell Team's Day Away",
  text: "Plenty of our inquiries from Bothell are from teams that want one day out of the office. This is a sample schedule, and yours can look different.",
  action: { kind: "link", label: "Ask About Your Dates", href: INQUIRE_HREF },
  items: [
    { time: "8:30", title: "Meet by the river in Bothell", detail: "Start at the Park at Bothell Landing, cross the footbridge and walk a stretch of the Sammamish River Trail before any laptop opens." },
    { time: "10:00", title: "First session at the estate", detail: "Everyone around one setup in the Event Pavilion, doors open if the weather is kind." },
    { time: "12:30", title: "Lunch from the kitchen", detail: "Served in the Grand Hall or out in the courtyard." },
    { time: "2:00", title: "Split up", detail: "Small groups take the Studio Cabin, the garden paths and the corners of the house." },
    { time: "4:00", title: "Heat and cold", detail: "Sauna and cold plunge for the willing, the gym or a walk along the stream for the others." },
    { time: "6:00", title: "Dinner together", detail: "A private chef cooks. The team sits at one table." },
    { time: "7:30", title: "Fire in the courtyard", detail: "Stay over in the bedrooms, or head back to Bothell, the next city east." },
  ],
};

export const aroundTown: SplitFeatureContent = {
  image: { src: "/images/creek-stream.webp", alt: "Stream running between bark paths and low green plants under cedars at ANEW" },
  eyebrow: "Around Bothell",
  titleLines: ["Add a Morning", "in Bothell"],
  paragraphs: [
    "If guests are staying in Bothell, or you want to show visitors your town, there is plenty to fold into the weekend. The Park at Bothell Landing is the city's park on the Sammamish River, with restored historic buildings, a playground and a pedestrian bridge over the water.",
    "Across that bridge is the Sammamish River Trail, a paved route that follows the river toward Woodinville and Redmond. Main Street, the old center of downtown Bothell, is close to the park and good for a walk.",
    "The University of Washington Bothell campus is also in town, next to a restored wetland along North Creek. Check each place's own page for current access before you go.",
  ],
  actions: [
    { kind: "link", label: "Browse Our Local Guide", href: "/local" },
    { kind: "inquire", label: "Ask Us a Question" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Why Bothell Groups Come",
  title: "Three Common Reasons",
  cards: [
    { img: "/images/garden-paths.webp", alt: "Rhododendron tree in bloom beside a white gravel path at ANEW", title: "Weddings near Bothell", href: "/weddings", desc: "A small wedding on a private estate, with an indoor hall ready if the forecast turns and bedrooms for the people closest to you." },
    { img: "/images/interior-living.webp", alt: "Sofas and a coffee table under an iron chandelier with garden windows behind at ANEW", title: "Company Offsites", href: "/corporate-retreats", desc: "A day or two away from the office for planning, a workshop or a thank-you, with meals handled and a sauna at the end." },
    { img: "/images/sauna-cabin-night.webp", alt: "Stone steps lit at night leading up to a glowing sauna cabin at ANEW", title: "Wellness Retreats", href: "/wellness-retreats", desc: "Bring a group, or the program you lead. The Event Pavilion takes the mats and the spa is on the same grounds." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Check the Calendar",
  hint: "Choose an open date to get started",
  inquireLead: "Comparing a few venues, or flexible on dates?",
};

export const faq: FaqContent = {
  eyebrow: "Questions from Bothell",
  title: "Bothell Venue FAQ",
  faqs: [
    { q: "Is ANEW in Bothell?", a: "No. ANEW is in Kenmore, the next city west of Bothell, at the north end of Lake Washington. We would rather you know exactly where we are before you plan around us." },
    { q: "Is ANEW a good fit for a wedding if we live in Bothell?", a: "It can be, especially for a smaller wedding. There is a ceremony lawn, two indoor halls if the weather changes, and bedrooms for the wedding party. The Weddings and Packages pages explain the options." },
    { q: "Can a Bothell company book ANEW for a team offsite?", a: "Yes. Teams use the Event Pavilion for sessions and the Studio Cabin for small groups. Send us your dates and headcount and we will suggest a layout for the day or the stay." },
    { q: "Where would our out-of-town guests sleep?", a: "The estate has 7 bedrooms, so the people closest to the event can stay on the property. Tell us who needs a room and we will walk you through them." },
    { q: "Can we bring a caterer or other vendors we already know?", a: "Yes, once we have approved them. Private chefs can also cook in the estate kitchen if you would like us to handle the food." },
    { q: "What is in the spa?", a: "A wet and dry sauna, a cold plunge, a private soaking tub and a gym with Tonal strength systems. Massage and IV therapy are available by appointment." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "Before You Visit",
  tiles: [
    { src: "/images/exterior-courtyard-new.webp", alt: "Weathered timber house with a stone fire pit on the lawn in front", span: "feature" },
    { src: "/images/cabin-entrance.webp", alt: "Studio Cabin with its door open" },
    { src: "/images/deer-garden.webp", alt: "Deer on a garden path under tall trees" },
    { src: "/images/spa-sauna-anew.webp", alt: "Cedar benches inside the sauna" },
    { src: "/images/catering-spread.webp", alt: "Platters of salmon, greens and salads on the kitchen island", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/tall-cedars.webp", alt: "Tall cedars standing over the timber buildings at ANEW" },
  titleLines: ["Coming from", "Bothell?"],
  text: "Share your date and a rough headcount. We answer every inquiry ourselves within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Event",
  text: "Let us know what you are planning, when, and for roughly how many. Sending the form is free and does not commit you to a booking.",
  eventType: "",
  points: [
    "A personal answer within 24 hours",
    "Straight talk about fit, dates and location",
    "Options for food, rooms and spa time",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Event venue near Bothell",
  note: "Private estate in Kenmore",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const bothellVenueLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch: estate,
  band: forestBand,
  spaces,
  day: sampleDay,
  extra: aroundTown,
  formats,
  availability,
  faq,
  gallery,
  closingCta,
  inquiry,
  stickyBar,
};
