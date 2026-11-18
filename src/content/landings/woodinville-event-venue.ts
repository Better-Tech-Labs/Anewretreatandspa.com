/**
 * Words and photos for the Woodinville town page (/woodinville-event-venue).
 * A general page (all occasions) for people searching near Woodinville or
 * planning a wine country weekend with a group.
 *
 * ANEW is in Kenmore, not Woodinville, and the page says so. It gives no
 * drive times or distances and names no private businesses. Local places
 * named here were checked against woodinvillewinecountry.com (the four
 * tasting-room districts) and King County Parks (Sammamish River Trail).
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

/** A town page covers every occasion, so the inquiry form opens with no event type chosen. */
const INQUIRE_HREF = inquireHref();

export const meta = {
  title: "Private Event Venue near Woodinville | Estate & Spa | ANEW",
  description:
    "A private estate and spa in Kenmore, WA, close to Woodinville wine country. 7 bedrooms, resident chefs and a sauna for your group alone.",
  path: "/woodinville-event-venue",
};

export const hero: HeroContent = {
  image: { src: "/images/interior-living.webp", alt: "Living room with an iron chandelier, deep sofas and tall windows onto the trees at ANEW" },
  eyebrow: "Near Woodinville · Kenmore, Washington",
  titleLines: ["Private Event Venue", "near Woodinville"],
  titleScale: "long",
  subtitle: "Spend the afternoon in wine country. Come back to an estate that belongs to your group for the night.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a private estate and spa in Kenmore. Bothell is the next city east, and Woodinville lies just beyond it. Groups book the whole place for a wine country weekend, a wedding or a long dinner, and nobody else is on the property while they are here.",
  features: [
    "Near Woodinville wine country",
    "Located in Kenmore",
    "One group at a time",
    "7 bedrooms",
    "Resident chefs",
    "Sauna & cold plunge",
    "Stone fire pit",
    "Two wooded acres",
  ],
  inquireLabel: "Tell us what you're planning",
};

export const pitch: SplitFeatureContent = {
  image: { src: "/images/exterior-wide.webp", alt: "The ANEW estate seen across the lawn with tall evergreens behind it" },
  eyebrow: "Why Groups Stay Here",
  titleLines: ["A Tasting Room Closes.", "The Estate Doesn't."],
  paragraphs: [
    "Woodinville is a good place to spend an afternoon. The harder question for a group is what happens afterward. An event space at a tasting room is yours for a few hours. A block of hotel rooms puts everyone on a different floor.",
    "ANEW is a 5,800 sq ft timber house with seven bedrooms, a Chef's Kitchen, an on-site spa and a courtyard with a stone fire pit. Your group has all of it. Dinner is cooked here, the sauna is a short walk from the table, and the people you came with are still around at breakfast.",
    "It also works without the wine. Some groups never leave the grounds, and hold the ceremony, the birthday or the reunion right here.",
  ],
  actions: [{ kind: "link", label: "Tour the Estate", href: "/venue" }],
};

export const band: ImageBandContent = {
  image: { src: "/images/stone-steps-grove.webp", alt: "Stepping-stone path curving through a grove of tall evergreens at ANEW" },
  eyebrow: "After the Tasting Rooms",
  titleLines: ["Somewhere Quiet", "to Come Back To"],
};

export const spaces: RoomsContent = {
  eyebrow: "The Estate",
  title: "Rooms for the Evening and the Morning After",
  rooms: [
    { img: "/images/interior-living-wide.webp", alt: "Two sofas facing a lit fireplace under timber beams in the Grand Hall at ANEW", name: "Grand Hall", desc: "Where the group lands when it gets back. Sofas around the fireplace, an iron chandelier overhead and tall windows on the forest." },
    { img: "/images/kitchen-sink.webp", alt: "Farmhouse sink with copper taps below windows facing the courtyard at ANEW", name: "Chef's Kitchen", desc: "A farmhouse sink, copper fixtures and a door straight to the courtyard. Resident chefs cook dinner here while you are still deciding where to sit." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Fire burning in a wide stone-ringed bowl with lounge chairs on the lawn at ANEW", name: "Courtyard & Fire Pit", desc: "Lounge seating, string lights and a stone fire pit on the lawn. Most evenings end out here." },
    { img: "/images/bedroom-master.webp", alt: "Bed hung on thick ropes below a chandelier in the Queen Suite at ANEW", name: "Queen Suite", desc: "One of seven bedrooms. The queen bed hangs from ropes and swings a little, under exposed beams and a vaulted ceiling." },
    { img: "/images/bunkbeds.webp", alt: "Timber bunk beds with a ladder and a shaggy rug in the Bunk Room at ANEW", name: "Bunk Room", desc: "Reclaimed timber bunks with ladder access. Friends on a weekend away tend to claim it first." },
    { img: "/images/spa-sauna-anew.webp", alt: "Tiered cedar benches lit from above inside the sauna at ANEW", name: "Spa & Wellness Center", desc: "Sauna, cold plunge and a private soaking tub on the property, with massage and IV therapy by appointment." },
  ],
};

export const day: SampleDayContent = {
  eyebrow: "A Wine Country Saturday",
  title: "Tasting Rooms by Day, the Estate by Night",
  text: "One way a Saturday can go when your group is staying at ANEW and spending the afternoon in Woodinville. The tasting day is yours to plan: ANEW does not run wine tours, so book your own tastings and transport ahead of time.",
  action: { kind: "link", label: "Plan a Weekend Like This", href: INQUIRE_HREF },
  items: [
    { time: "9:30", title: "A slow start", detail: "Coffee in the Grand Hall and a walk along the stream before anyone has to be anywhere." },
    { time: "Noon", title: "Tasting rooms in Woodinville", detail: "Wine country is split into districts. Choose one, such as Hollywood or the Warehouse District, and stay put for the afternoon." },
    { time: "4:30", title: "Back to Kenmore", detail: "Shoes off at the door. The rest of the day happens on the property." },
    { time: "5:00", title: "Sauna and cold plunge", detail: "A round or two of hot and cold, or a turn in the soaking tub, while dinner gets started." },
    { time: "7:00", title: "Dinner at one table", detail: "A resident chef cooks a multi-course meal in the estate kitchen from locally sourced ingredients." },
    { time: "9:00", title: "The fire pit", detail: "Chairs pulled in close, string lights on, and no closing time to watch." },
  ],
};

export const aroundTown: SplitFeatureContent = {
  image: { src: "/images/therapy-pools.webp", alt: "Small sauna cabin and dark plunge tubs set among garden shrubs and trees at ANEW" },
  eyebrow: "Around Woodinville",
  titleLines: ["What to Pair", "with a Stay"],
  paragraphs: [
    "Woodinville wine country is organized into four districts: Hollywood, the Warehouse District, West Valley and Downtown. Each has its own feel, so it is worth choosing one for the day instead of trying to cover them all.",
    "For a morning without a glass in hand, the Sammamish River Trail is a paved King County trail that follows the river from Bothell through Woodinville and on to Redmond. People walk it, run it and ride it.",
    "Then plan the estate part. Book massages for the day after, and tell us what you have booked in town so meals and spa time fit around it.",
  ],
  actions: [
    { kind: "link", label: "See the Local Guide", href: "/local" },
    { kind: "link", label: "Browse Experiences", href: "/experiences" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "What Brings Groups Here",
  title: "Start with the Occasion",
  cards: [
    { img: "/images/bathroom-soaker.webp", alt: "Freestanding white soaking tub beside a window in a bathroom at ANEW", title: "Bachelorette Weekends", href: "/bachelorette-parties", desc: "Tasting rooms on Saturday, spa time on Sunday, and one house where the whole group wakes up together." },
    { img: "/images/bedroom-garden-doors.webp", alt: "Bedroom with a white bed and French doors opening onto greenery at ANEW", title: "Anniversaries", href: "/anniversaries", desc: "A night or two away for the two of you, or a dinner with the people who were at the wedding." },
    { img: "/images/catering-salmon-platter.webp", alt: "Sliced salmon on a dark platter next to a bowl of green salad at ANEW", title: "Private Dinners", href: "/private-dinners", desc: "A chef, one table and an evening with nobody waiting for your seats." },
    { img: "/images/garden-flowers.webp", alt: "Pink rhododendron in bloom above a gravel path to the cottage at ANEW", title: "Weddings", href: "/weddings", desc: "A lawn ceremony under tall trees, dinner in a timber hall and bedrooms on site for the wedding party." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "See Which Weekends Are Open",
  hint: "Click an open date to begin",
  inquireLead: "Building a trip around a Woodinville event or release weekend?",
};

export const faq: FaqContent = {
  eyebrow: "Good to Know",
  title: "Woodinville Visitors Ask",
  faqs: [
    { q: "Is ANEW in Woodinville?", a: "No. ANEW is in Kenmore, at the north end of Lake Washington. Bothell sits to the east of Kenmore and Woodinville lies beyond Bothell. We send arrival details once you book." },
    { q: "Can we stay at ANEW and spend a day wine tasting in Woodinville?", a: "Yes, a weekend can be planned that way. Stay at the estate, spend an afternoon in the tasting-room districts, and come back for dinner and the fire pit." },
    { q: "Does ANEW arrange wine tours or transport to the tasting rooms?", a: "No. ANEW does not run wine tours, arrange tastings or provide transport. Plan and book the tasting day yourselves, and tell us your timing so meals and spa appointments can be planned around it." },
    { q: "Can we hold the event at ANEW itself instead of in Woodinville?", a: "Yes. The estate hosts weddings, dinners, birthdays, reunions and retreats on the property. Indoors there is the Grand Hall and the Event Pavilion, and outdoors the Ceremony Lawn and the courtyard." },
    { q: "Who cooks if we eat at the estate?", a: "Resident chefs cook in the estate kitchen, and menus follow the season. Approved outside caterers are welcome too. Mention allergies when you inquire." },
    { q: "How do we find out if our dates and group size work?", a: "Send the dates and a rough headcount through the inquiry form, or call. A person replies within 24 hours and tells you plainly whether the estate fits." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "The Estate in Photos",
  tiles: [
    { src: "/images/deer-woods.webp", alt: "Two deer grazing on a mossy slope between tall tree trunks at ANEW", span: "feature" },
    { src: "/images/catering-salmon.webp", alt: "Platter of salmon with a salad bowl behind it" },
    { src: "/images/creek-stream.webp", alt: "Narrow stream running between green banks under the trees" },
    { src: "/images/cabin-entrance.webp", alt: "Small timber cabin with its door open at the end of a paved path" },
    { src: "/images/interior-openplan.webp", alt: "Sofas, a fireplace and an iron chandelier under timber beams", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/exterior-courtyard-new.webp", alt: "Timber house with string lights above courtyard seating and a lawn at ANEW" },
  titleLines: ["Plan Your Woodinville", "Weekend from Here"],
  text: "Give us your dates and the size of your group. A person answers within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About the Weekend",
  text: "A few lines is enough: when you are coming, roughly how many people, and whether wine country is part of the plan. There is nothing to pay and nothing to sign at this stage.",
  eventType: "",
  points: [
    "A reply from a person within 24 hours",
    "The estate held for your group alone",
    "Meals and spa time planned around your day in town",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Near Woodinville",
  note: "Private estate & spa",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const woodinvilleVenueLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch,
  band,
  spaces,
  day,
  extra: aroundTown,
  formats,
  availability,
  faq,
  gallery,
  closingCta,
  inquiry,
  stickyBar,
};
