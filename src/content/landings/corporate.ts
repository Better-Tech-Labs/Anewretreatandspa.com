/**
 * Words and photos for the corporate retreat layout (/corporate-retreats).
 * Same section blocks as the general homepage, different content and order.
 *
 * Owner facts still to confirm before this goes live: group size for meetings
 * and for sleeping, Wi-Fi and screen/projector setup, parking, and whether to
 * show a price. Nothing here states those yet.
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
import type { HeroFormContent } from "@/components/landing/HeroInquiry";
import { SPACES_ANCHOR, type LandingContent } from "@/components/landing/LandingPage";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { HERO_FORM_ANCHOR, inquireHref } from "@/lib/inquire";

/** Must match an entry in EVENT_TYPES so the inquiry form and links accept it. */
export const EVENT_TYPE = "Corporate Retreat";

/** Links further down the page go to the inquiry page, with Corporate Retreat already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);
/** The page's main Inquire buttons scroll to the form in the hero instead of leaving the page. */
const HERO_FORM_HREF = `#${HERO_FORM_ANCHOR}`;

/** What a booking includes, in the page's own words. Shown with the price in the hero. */
const INCLUDED = [
  "Whole estate, one team",
  "7 bedrooms",
  "Event Pavilion",
  "Studio Cabin",
  "Private chefs",
  "Sauna & cold plunge",
  "Tonal gym",
];

export const meta = {
  title: "Corporate Retreats near Seattle | Private Estate | ANEW",
  description:
    "Host your corporate retreat or team offsite at ANEW, a private estate and spa in Kenmore, WA. Meeting spaces, private chefs, sauna and cold plunge.",
  path: "/corporate-retreats",
};

export const hero: HeroContent = {
  image: { src: "/images/courtyard-lounge.webp", alt: "Courtyard, fire pit and timber buildings at ANEW Retreat & Spa" },
  eyebrow: "Corporate Retreats · Kenmore, Washington",
  titleLines: ["Corporate Retreats", "near Seattle"],
  titleScale: "long",
  subtitle: "A private estate and spa for your team alone. Minutes from the city, a long way from the office.",
  // Same rate the homepage and booking page show for a full day.
  priceNote: "Exclusive use of the estate from $5,500 per day",
  primaryCta: { label: "Inquire", href: HERO_FORM_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const heroForm: HeroFormContent = {
  title: "Check Your Dates",
  eventType: EVENT_TYPE,
  formLocation: "corporate_hero",
  includedLabel: "What's included",
  included: INCLUDED,
};

export const intro: IntroContent = {
  statement:
    "ANEW is a private 5,800 sq ft estate and spa on two wooded acres. Book it and your team is the only one here, with rooms to meet in, chefs in the kitchen, and a sauna waiting when the agenda ends.",
  // The feature list moved up into the hero, beside the price.
  features: [],
  inquireLabel: "Tell us about your team",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-openplan.webp", alt: "Living room with timber beams and an iron chandelier at ANEW" },
  eyebrow: "The Whole Estate, Yours",
  titleLines: ["No Lobby.", "No Other Groups."],
  paragraphs: [
    "Most offsites happen in a hotel meeting room that looks like every other hotel meeting room. ANEW is a timber estate with a stream running through the grounds, and when you book it, your team is the only one here.",
    "Hold the morning session in the Event Pavilion, break into small groups in the Studio Cabin, and eat dinner together at one table. People stay on site, so the evening doesn't end with a shuttle back to separate hotels.",
  ],
  actions: [{ kind: "link", label: "Tour the Estate", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/cedar-path.webp", alt: "Path through old cedars on the ANEW grounds" },
  titleLines: ["Minutes from the City,", " a Long Way from the Office"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where the Work Happens",
  title: "Very Different Rooms to Think In",
  rooms: [
    { img: "/images/event-hall.webp", alt: "Event Pavilion with timber beams and French doors at ANEW", name: "Event Pavilion", desc: "Main sessions. An open hall with timber beams, polished concrete floors and French doors onto the forest. Set it as a boardroom, a workshop or a long dinner." },
    { img: "/images/interior-living-wide.webp", alt: "Grand Hall living space with timber beams at ANEW", name: "Grand Hall", desc: "Whole-team time. Soaring beams, an iron chandelier and tall windows on the trees, for kickoff, meals and the end of the day." },
    { img: "/images/cabin-entrance.webp", alt: "Standalone Studio Cabin on a tree-lined path at ANEW", name: "Studio Cabin", desc: "Breakouts. A standalone cabin down a tree-lined path, far enough from the house for a small group to close the door and think." },
    { img: "/images/dining-room-leather.webp", alt: "Long dining table with leather chairs under timber beams at ANEW", name: "Dining Room", desc: "Working lunches and long dinners. One table under the beams, with the kitchen a few steps away." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Courtyard lounge with stone fire pit at ANEW", name: "Courtyard & Fire Pit", desc: "Evenings. A stone fire pit, lounge seating and string lights, where the best conversations happen after the agenda ends." },
    { img: "/images/gym-tonal-wide.webp", alt: "Gym with Tonal strength systems at ANEW", name: "The Gym", desc: "Before breakfast. Tonal strength systems, benches and room for a group stretch or a yoga session." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Day",
  title: "What One Day Here Can Look Like",
  text: "Every retreat is planned around your team and your agenda. This is one way a day tends to go.",
  action: { kind: "link", label: "Start Planning Yours", href: INQUIRE_HREF },
  items: [
    { time: "8:00", title: "Breakfast in the Grand Hall", detail: "Cooked on site by a private chef while the team wakes up to the trees." },
    { time: "9:00", title: "Morning session", detail: "Strategy work in the Event Pavilion with the French doors open to the forest." },
    { time: "12:00", title: "Lunch in the courtyard", detail: "A long table outside when the weather allows, the dining room when it doesn't." },
    { time: "1:30", title: "Breakouts", detail: "Small groups split between the Studio Cabin, the Grand Hall and the garden paths." },
    { time: "4:00", title: "Sauna and cold plunge", detail: "A contrast therapy circuit, a workout in the gym, or a quiet walk by the stream." },
    { time: "6:30", title: "Chef's dinner", detail: "One table, everyone together, nobody driving home." },
    { time: "8:30", title: "Fire pit", detail: "The agenda is over. The fire keeps going." },
  ],
};

export const wellness: SplitFeatureContent = {
  image: { src: "/images/spa-sauna-anew.webp", alt: "Cedar sauna at ANEW Retreat & Spa" },
  eyebrow: "Between Sessions",
  titleLines: ["The Part Your Team", "Will Talk About"],
  paragraphs: [
    "The spa is on site, so recovery fits between agenda items instead of replacing them. Run a sauna and cold plunge circuit after the afternoon session, or book massage and IV therapy for the group by appointment.",
    "There is a wet and dry sauna with a cedar cold plunge beside it, a private soaking tub, a gym with Tonal strength systems, and trails along a stream where deer come to drink.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About Group Spa Time", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-spread.webp", alt: "Catered spread prepared by a private chef at ANEW" },
  eyebrow: "At the Table",
  titleLines: ["Private Chefs, One Long Table"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/kitchen-sink.webp", alt: "Estate kitchen with farmhouse sink and copper fixtures at ANEW" },
  eyebrow: "Dine",
  titleLines: ["Meals Where You Are,", "on Your Schedule"],
  paragraphs: [
    "Private chefs cook in the estate kitchen, so breakfast is ready when the team is and dinner doesn't mean loading everyone into cars.",
    "Menus are seasonal and locally sourced, with allergy-specific options on request. Prefer your own caterer? Approved outside vendors are welcome.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "More Than a Meeting Room",
  cards: [
    { img: "/images/dining-room-leather.webp", alt: "Long table set for a small leadership team at ANEW", title: "Leadership Offsites", inquireType: EVENT_TYPE, desc: "A small senior team, a few hard decisions, and no one walking past the conference room window." },
    { img: "/images/event-hall.webp", alt: "Event Pavilion ready for a planning session at ANEW", title: "Planning & Workshops", inquireType: EVENT_TYPE, desc: "Quarterly or annual planning, or a facilitator-led day, with room to spread out and come back together." },
    { img: "/images/courtyard-firepit.webp", alt: "Courtyard and fire pit in front of the estate at ANEW", title: "Team Celebrations", inquireType: EVENT_TYPE, desc: "Close out a launch or a strong year somewhere that feels like a thank-you." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Find Your Dates",
  hint: "Click an open date to ask about it",
  inquireLead: "Weekdays, multi-day, or dates not showing?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "A Look Around",
  tiles: [
    { src: "/images/exterior-wide.webp", alt: "The ANEW estate from the lawn", span: "feature" },
    { src: "/images/event-hall.webp", alt: "Event Pavilion" },
    { src: "/images/creek.webp", alt: "Private stream on the grounds" },
    { src: "/images/spa-sauna-anew.webp", alt: "Cedar sauna" },
    { src: "/images/master-bedroom.webp", alt: "Master suite", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Corporate Retreat FAQ",
  faqs: [
    { q: "Where is ANEW?", a: "ANEW is in Kenmore, Washington, at the north end of Lake Washington and minutes from Seattle. Reach out and we'll share arrival details for your group." },
    { q: "Do we share the estate with other guests?", a: "No. A booking gives your team the whole estate: the house, the Event Pavilion, the Studio Cabin, the spa and the grounds." },
    { q: "Can you handle meals for the team?", a: "Yes. Private chefs cook on site in the estate kitchen, and we welcome approved outside caterers and vendors." },
    { q: "What wellness options can we add?", a: "The estate has a wet and dry sauna, a cold plunge, a soaking tub and a gym with Tonal strength systems. Massage and IV therapy are available by appointment." },
    { q: "Can we come for a day, or do we need to stay overnight?", a: "Both work. Tell us your dates and how many people are coming, and we'll suggest a setup that fits." },
    { q: "How do we get a quote?", a: "Send a message with rough dates and headcount, or call us. You'll get a personal reply within 24 hours." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/courtyard-firepit.webp", alt: "Courtyard fire pit at ANEW in the evening" },
  titleLines: ["Bring Your", "Team Here"],
  text: "Tell us your dates and headcount. You'll get a personal reply within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Team",
  text: "Takes about 30 seconds. No payment, no commitment. Share rough dates and headcount and we'll come back with options.",
  eventType: EVENT_TYPE,
  formLocation: "corporate_bottom",
  points: [
    "A personal reply within 24 hours",
    "The whole estate reserved for your team",
    "Chefs, spa time and setup arranged with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Corporate retreats",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: HERO_FORM_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const corporateLanding: LandingContent = {
  meta,
  hero,
  heroForm,
  intro,
  pitch: estate,
  band: forestBand,
  spaces,
  day: sampleDay,
  extra: wellness,
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
