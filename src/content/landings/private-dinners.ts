/**
 * Words and photos for the private dinner layout (/private-dinners).
 * Also covers chef dinner parties and rehearsal dinners.
 *
 * Owner facts still to confirm before this goes live: how many people each
 * room seats, the alcohol and wine pairing policy, evening end times, parking,
 * and whether to show a price. Nothing here states those yet.
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

/** Must match an entry in EVENT_TYPES so the inquiry form and links accept it. */
export const EVENT_TYPE = "Private Dinner";

/** Every "Inquire" button goes to the inquiry page, with Private Dinner already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Private Dining Venue near Seattle | Chef Dinners | ANEW",
  description:
    "Host a private chef dinner party or rehearsal dinner at ANEW, a timber estate in Kenmore, WA, minutes from Seattle. Your table, your guests, nobody else.",
  path: "/private-dinners",
};

export const hero: HeroContent = {
  image: { src: "/images/dining-room-leather.webp", alt: "Dining table ringed by tan leather chairs under timber beams and pendant lights at ANEW" },
  eyebrow: "Private Dinners · Kenmore, Washington",
  titleLines: ["Private Dining Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "A chef in the kitchen, your guests at the table, and no one else in the house.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a private timber estate on two wooded acres in Kenmore, minutes from Seattle. For a dinner, it works like a restaurant with a single table: a private chef cooks a multi-course meal in the estate kitchen, and the only guests are yours.",
  features: [
    "Private chefs",
    "Multi-course menus",
    "Locally sourced",
    "Your guests only",
    "Dining Room",
    "Fireside courtyard",
    "Rehearsal dinners",
    "Minutes from Seattle",
  ],
  inquireLabel: "Tell us about your dinner",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-living.webp", alt: "Living room with an iron ring chandelier and tall windows onto the trees at ANEW" },
  eyebrow: "The Only Table Tonight",
  titleLines: ["No Second Seating.", "No Table Next to Yours."],
  paragraphs: [
    "A private room in a restaurant still shares a kitchen, a clock and a hallway with everyone else dining that night. At ANEW the dinner is the only thing happening on the property.",
    "Guests arrive to a fire in the courtyard, move inside when the first course is ready, and stay at the table as long as the conversation does. Speeches can run long. Nobody is waiting for your chairs.",
  ],
  actions: [{ kind: "link", label: "Tour the Estate", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/outdoor-seating.webp", alt: "Fire circle beside the stream at sunset, with the ANEW estate behind" },
  titleLines: ["The Evening Starts", " Before Anyone Sits Down"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where Dinner Happens",
  title: "Pick a Room for the Table",
  rooms: [
    { img: "/images/dining-room-leather.webp", alt: "Stone-topped dining table with leather chairs and a view to the garden at ANEW", name: "Dining Room", desc: "The classic choice. One table under the beams, close enough to the kitchen that plates arrive hot." },
    { img: "/images/interior-openplan.webp", alt: "Fireplace and sofas under an iron chandelier in the Grand Hall at ANEW", name: "Grand Hall", desc: "Timber beams, a hand-forged chandelier and a fireplace. Set a table here for a larger party, or use it for coffee after dessert." },
    { img: "/images/kitchen-sink.webp", alt: "Farmhouse sink under kitchen windows that look out to the courtyard at ANEW", name: "Chef's Kitchen", desc: "Where the cooking happens, with a farmhouse sink, copper fixtures and a door straight to the courtyard. Guests tend to wander in to watch." },
    { img: "/images/courtyard-firepit.webp", alt: "Fire pit and lounge seating in front of the timber estate at ANEW", name: "Courtyard & Fire Pit", desc: "Arrival, around the fire under string lights. On a warm evening, dinner can be served out here." },
    { img: "/images/event-hall.webp", alt: "Open hall with timber beams, a concrete floor and French doors at ANEW", name: "Event Pavilion", desc: "For a rehearsal dinner or a bigger guest list. An open hall with expandable tables and French doors onto the forest." },
    { img: "/images/maple-uplit-night.webp", alt: "Japanese maple and a garden path lit up at night at ANEW", name: "Garden Paths", desc: "A short walk between courses. Stone paths through cedars and ferns, for guests who want some air before dessert." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Evening",
  title: "How a Dinner Here Unfolds",
  text: "The timing and the menu are planned with you and your chef. This is one shape an evening can take.",
  action: { kind: "link", label: "Plan Your Dinner", href: INQUIRE_HREF },
  items: [
    { time: "5:30", title: "Guests arrive", detail: "Into the courtyard, where the fire is already lit." },
    { time: "6:00", title: "Around the fire", detail: "Introductions outside while the kitchen finishes the first course." },
    { time: "6:45", title: "To the table", detail: "Everyone moves inside and finds a seat under the beams." },
    { time: "7:00", title: "First courses", detail: "Seasonal starters, plated and brought out together." },
    { time: "7:45", title: "The main course", detail: "Plated or passed family style, whichever suits your group." },
    { time: "8:30", title: "Toasts and dessert", detail: "Time for speeches, with no closing staff watching the clock." },
    { time: "9:15", title: "Back to the fire", detail: "Coffee in the courtyard and a slow round of goodbyes." },
  ],
};

export const stay: SplitFeatureContent = {
  image: { src: "/images/sauna-cabin-night.webp", alt: "Stone steps lit at night leading up to a small cabin in the trees at ANEW" },
  eyebrow: "Before and After",
  titleLines: ["Dinner Can Be", "the Whole Evening"],
  paragraphs: [
    "Because the dinner is on an estate and not in a dining room downtown, you can build more around it. Start with the sauna and cold plunge in the afternoon, or end with s'mores at the fire pit.",
    "The estate has 7 bedrooms, so hosts and close friends can stay the night and skip the drive back. Tell us what you have in mind and we'll confirm what fits your dates.",
  ],
  actions: [
    { kind: "link", label: "See the Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About Staying Over", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-greens.webp", alt: "Bowl of asparagus among serving dishes prepared at ANEW" },
  eyebrow: "On the Menu",
  titleLines: ["Seasonal Food, Cooked a Few Steps Away"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/catering-spread.webp", alt: "Salmon, salads and side dishes on the kitchen island at ANEW" },
  eyebrow: "The Food",
  titleLines: ["A Menu Written", "for Your Table"],
  paragraphs: [
    "Each dinner is a multi-course meal built from locally sourced ingredients, with fresh salmon and garden vegetables when the season offers them. Serve it plated, or family style down the middle of the table.",
    "Share allergies and dietary needs when you inquire and the menu is planned around them. Chef bookings depend on availability and are confirmed with you. If you already have a chef or caterer, approved outside vendors are welcome.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "Dinners Worth Dressing Up For",
  cards: [
    { img: "/images/courtyard-lounge.webp", alt: "Outdoor dining table under an umbrella beside the fire pit lounge at ANEW", title: "Rehearsal Dinners", inquireType: EVENT_TYPE, desc: "Both families at one table the night before the wedding, with time for every toast." },
    { img: "/images/catering-salmon-platter.webp", alt: "Sliced salmon on a dark platter with salad and sauce at ANEW", title: "Chef's Dinner Parties", inquireType: EVENT_TYPE, desc: "Invite the friends you keep meaning to have over. A chef cooks and clears, and you stay in your seat." },
    { img: "/images/interior-wide.webp", alt: "Tufted sofas under an iron chandelier in the Grand Hall at ANEW", title: "Milestone Dinners", inquireType: EVENT_TYPE, desc: "An anniversary, a big birthday or a retirement, marked with a long meal and the people who matter." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Choose Your Evening",
  hint: "Select an open date to start a booking",
  inquireLead: "Have a date in mind that isn't showing?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "The Setting for Dinner",
  tiles: [
    { src: "/images/outdoor-firepit-cabin.webp", alt: "Fire burning in the courtyard fire pit, with lounge chairs and a red-roofed cabin", span: "feature" },
    { src: "/images/catering-salmon.webp", alt: "Platter of salmon with a green salad" },
    { src: "/images/interior-living-wide.webp", alt: "Lit fireplace and sofas in the Grand Hall" },
    { src: "/images/cedar-trunks-lit.webp", alt: "Cedar trunks lit from below at night" },
    { src: "/images/exterior-courtyard-new.webp", alt: "Courtyard seating and string lights in front of the estate", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Private Dinner FAQ",
  faqs: [
    { q: "Who cooks the dinner?", a: "A private chef cooks on site in the estate kitchen. Chef bookings depend on availability and are confirmed with you, so share your date early." },
    { q: "Can the menu work around allergies and dietary needs?", a: "Yes. Allergy-specific menus are available on request. Tell us about dietary needs when you inquire so the chef can plan for them." },
    { q: "Can we bring our own chef or caterer?", a: "Yes. Outside vendors are welcome, but they need to be approved by ANEW before the event and carry their own liability insurance. We also keep a preferred vendor list you can ask for." },
    { q: "Can we hold a rehearsal dinner here?", a: "Yes. Rehearsal dinners are one of the dinners we host. Send us the date and your guest count and we'll confirm which room suits the group." },
    { q: "Can some of us stay the night after dinner?", a: "The estate has 7 bedrooms. Let us know your dates and how many would like to stay, and we'll confirm what's possible." },
    { q: "How much does a private dinner cost?", a: "It depends on the date, the number of guests and the menu. Send an inquiry with those details, or call us, and we'll put together a quote." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/courtyard-firepit.webp", alt: "Fire pit and lounge seating in front of the ANEW estate" },
  titleLines: ["Set the Table", "at ANEW"],
  text: "Tell us the date, the occasion and how many places to set. We'll take it from there.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Dinner",
  text: "It takes a minute, with no payment and no commitment. Give us a date, a guest count and the occasion, and we'll reply with how it could work.",
  eventType: EVENT_TYPE,
  points: [
    "A reply from a person, not an auto-responder",
    "The property reserved for your guests alone",
    "Menu, room and timing planned with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Private dinners",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const privateDinnersLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch: estate,
  band: forestBand,
  spaces,
  day: sampleDay,
  extra: stay,
  diningBand,
  dine,
  formats,
  availability,
  faq,
  gallery,
  closingCta,
  inquiry,
  stickyBar,
};
