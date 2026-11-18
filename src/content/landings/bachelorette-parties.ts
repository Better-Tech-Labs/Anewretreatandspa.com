/**
 * Words and photos for the bachelorette party layout (/bachelorette-parties).
 * Search intent: bachelorette party or girls' spa weekend near Seattle.
 *
 * Nothing here states group size, sleeping capacity, prices or what a booking
 * includes. Those go through the inquiry form until the owner confirms them.
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

/**
 * Must match an entry in EVENT_TYPES so the inquiry form and links accept it.
 * There is no bachelorette type, so these inquiries arrive as Wellness Retreat.
 */
export const EVENT_TYPE = "Wellness Retreat";

/** Every "Inquire" button goes to the inquiry page, with the event type already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Bachelorette Parties near Seattle | Private Spa Estate | ANEW",
  description:
    "Host a bachelorette party or girls' spa weekend at ANEW, a private 7-bedroom estate in Kenmore, WA with a sauna, cold plunge, massage and private chefs.",
  path: "/bachelorette-parties",
};

export const hero: HeroContent = {
  image: { src: "/images/twin-tree-stream-cabins.webp", alt: "Twin cedar trunks and mossy boulders beside the stream, with the red-roofed buildings behind, at ANEW" },
  eyebrow: "Bachelorette Parties · Kenmore, Washington",
  titleLines: ["Bachelorette Parties", "near Seattle"],
  titleScale: "long",
  subtitle: "A private estate with its own spa for the bride and her people. Sauna, massages, a chef's dinner and a fire, without leaving the property.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a timber estate and spa on two wooded acres in Kenmore, minutes from Seattle. For a bachelorette it works like a spa weekend and a house party in one: treatments in the afternoon, dinner cooked for you, and s'mores by the fire after.",
  features: [
    "The estate to yourselves",
    "7 bedrooms",
    "Massage & facials",
    "Sauna & cold plunge",
    "Private soaking tub",
    "Chef's dinner",
    "Fire pit & s'mores",
    "Minutes from Seattle",
  ],
  inquireLabel: "Tell us about the bride",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/bedroom-master.webp", alt: "Queen bed hung on ropes beneath a chandelier in the Queen Suite at ANEW" },
  eyebrow: "One Address for the Weekend",
  titleLines: ["No Group Chat", "About Who's Driving"],
  paragraphs: [
    "The usual bachelorette is a hotel block, three reservations and a lot of time in cars. Here the spa, the dinner table and the bedrooms share one property, so the plan is mostly deciding what to do next.",
    "The house has a Grand Hall with deep sofas, a kitchen where a chef does the cooking, and a Queen Suite with a bed that hangs from ropes under a chandelier. Most groups give that one to the bride.",
  ],
  actions: [
    { kind: "link", label: "Tour the Estate", href: "/venue" },
    { kind: "link", label: "Getting Married Here Too? See Weddings", href: "/weddings" },
  ],
};

export const gardenBand: ImageBandContent = {
  image: { src: "/images/garden-flowers.webp", alt: "Rhododendron in bloom beside the path to the cabin at ANEW" },
  titleLines: ["A Weekend Away", " That's Close to Home"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where the Weekend Happens",
  title: "Six Places You'll End Up",
  rooms: [
    { img: "/images/spa-sauna-anew.webp", alt: "Tiered cedar benches inside the sauna at ANEW", name: "Sauna & Cold Plunge", desc: "Tiered cedar benches with room to sit together. Do a round of heat, then dare each other into the cold plunge." },
    { img: "/images/bathroom-soaker.webp", alt: "White freestanding soaking tub by a window at ANEW", name: "Soaking Tub", desc: "A private soaking tub for whoever needs a quiet half hour away from the group. Usually the bride." },
    { img: "/images/cabin-entrance.webp", alt: "Studio Cabin with its doors open at the end of a tree-lined path at ANEW", name: "Studio Cabin", desc: "A standalone cabin for the activity part of the weekend: a flower arranging workshop, an art session, or hair and makeup before dinner." },
    { img: "/images/interior-living.webp", alt: "Sofas under an iron chandelier with windows onto the garden in the Grand Hall at ANEW", name: "Grand Hall", desc: "The living room. Slow mornings on the sofas, gifts and games in the afternoon, and somewhere warm to land if it rains." },
    { img: "/images/courtyard-firepit.webp", alt: "Courtyard seating around the stone fire pit in front of the house at ANEW", name: "Courtyard & Fire Pit", desc: "String lights, a stone fire pit and lounge seating. This is where the night finishes, with s'mores and stories about the bride." },
    { img: "/images/bedroom-garden-doors.webp", alt: "King bed beside French doors that open to the garden at ANEW", name: "Bedrooms", desc: "Seven bedrooms, from a garden suite with French doors to a bunk room with timber bunks for the friends who want a sleepover." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Saturday",
  title: "How the Main Day Can Go",
  text: "Some groups fill every hour and some plan nothing but dinner. Here is a middle version.",
  action: { kind: "link", label: "Plan Her Weekend", href: INQUIRE_HREF },
  items: [
    { time: "9:30", title: "Slow breakfast", detail: "Fresh-pressed juice and a chef's breakfast, eaten in whatever you slept in." },
    { time: "11:00", title: "Yoga or a garden walk", detail: "A class in the Event Pavilion, or a wander along the stone paths to the stream." },
    { time: "12:30", title: "Spa afternoon", detail: "Massages and facials by appointment, taken in turns. Everyone else rotates through the sauna, cold plunge and soaking tub." },
    { time: "3:30", title: "Something to make", detail: "A flower arranging workshop or a guided art session in the Studio Cabin." },
    { time: "5:30", title: "Getting ready", detail: "Music on, mirrors busy, photos in the garden while the light is good." },
    { time: "7:00", title: "Chef's dinner", detail: "A multi-course dinner in the dining room, with toasts between courses." },
    { time: "9:00", title: "S'mores at the fire pit", detail: "Blankets, string lights and the stories that only come out late." },
  ],
};

export const spa: SplitFeatureContent = {
  image: { src: "/images/sauna-cabin-night.webp", alt: "Lit stone steps leading up through the trees to the sauna cabin at night at ANEW" },
  eyebrow: "The Spa",
  titleLines: ["Treatments Here,", "Not Across Town"],
  paragraphs: [
    "Licensed therapists give deep tissue, Swedish and hot stone massage in the treatment room, solo or in pairs. Facials can be booked too. Tell us how many people want a treatment and we'll build a rotation so nobody spends the afternoon waiting.",
    "Between appointments there is the cedar sauna, the cold plunge and the soaking tub. If the group would like an outing of its own, Woodinville wine country is close by.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About Group Treatments", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-spread.webp", alt: "Salmon, salads and sides laid out on the kitchen island at ANEW" },
  eyebrow: "At the Table",
  titleLines: ["Dinner Comes to You"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/dining-room-leather.webp", alt: "Dining table with leather chairs and an orchid under timber beams at ANEW" },
  eyebrow: "Dine",
  titleLines: ["The Big Dinner,", "Without the Reservation"],
  paragraphs: [
    "A private chef cooks a multi-course dinner from local, seasonal ingredients and serves it in the dining room, by the fire or outside. You stay at the table as long as you like.",
    "Share allergies and preferences ahead of time and the menu is written around them. If the bride loves to cook, ask about a hands-on cooking class for the group.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "Every Kind of Send-Off",
  cards: [
    { img: "/images/exterior-courtyard-new.webp", alt: "Timber house with string lights over the courtyard seating at ANEW", title: "The Full Bachelorette", inquireType: EVENT_TYPE, desc: "The whole crew, a planned Saturday, a long dinner and a late fire." },
    { img: "/images/therapy-pools.webp", alt: "Sauna cabin and cold plunge tubs among the trees at ANEW", title: "Girls' Spa Weekends", inquireType: EVENT_TYPE, desc: "No wedding required. Friends, treatments, the sauna and a lot of sitting around talking." },
    { img: "/images/garden-cabin.webp", alt: "Footbridge over a dry creek bed with the cabin behind the cedars at ANEW", title: "The Quiet Version", inquireType: EVENT_TYPE, desc: "The bride, her sisters and her mom. Massages, a good meal and an early night before a busy month." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Check Her Weekend",
  hint: "Click an open date to start a booking",
  inquireLead: "Weekend taken, or still choosing between dates?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "Around the Estate",
  tiles: [
    { src: "/images/courtyard-lounge.webp", alt: "Courtyard dining table, fire pit and cabin in the evening light", span: "feature" },
    { src: "/images/bedroom-master.webp", alt: "Rope-hung bed in the Queen Suite" },
    { src: "/images/bathroom-soaker.webp", alt: "Freestanding soaking tub" },
    { src: "/images/garden-rhody-tree.webp", alt: "Rhododendron beside a gravel garden path" },
    { src: "/images/outdoor-seating.webp", alt: "Fire circle beside the stream at sunset", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Bachelorette Party FAQ",
  faqs: [
    { q: "Will other guests be at the estate during our stay?", a: "No. ANEW is booked by one group at a time, so the house, the spa and the grounds are yours for the stay." },
    { q: "How do spa treatments work for a group?", a: "Massage, facials and IV therapy are by appointment. Tell us how many people would like a treatment and which ones, and we'll schedule them in turns while the rest of the group uses the sauna, cold plunge and soaking tub." },
    { q: "Do we have to plan the whole weekend ourselves?", a: "No. Tell us what the bride likes and we'll help arrange the chef, spa appointments and activities. You can also book the estate and keep the plan loose." },
    { q: "What can we do besides the spa?", a: "Flower arranging workshops, guided art sessions, hand-building classes and cooking classes can be arranged. There are also lawn and table games on hand, including bocce, badminton and ping pong." },
    { q: "Can we bring our own photographer, decorator or other vendors?", a: "Outside vendors are welcome once they're approved ahead of the event, and they need to carry their own liability insurance. We also keep a preferred vendor list you can ask for." },
    { q: "How far ahead should we book a bachelorette weekend?", a: "For May through October we suggest booking 6 to 12 months ahead. Other months often have dates on shorter notice. Reservations need at least 3 days' notice." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/cedar-grove-night.webp", alt: "Garden path lit at night between cedar trunks at ANEW" },
  titleLines: ["Give Her", "a Weekend Here"],
  text: "Send the dates you're considering and roughly how many are coming. A real person writes back within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About the Bride",
  text: "It's a short form with nothing to pay. Add the weekend you want, your group size, and anything she'd love, and we'll reply with options and pricing.",
  eventType: EVENT_TYPE,
  points: [
    "An answer within 24 hours",
    "One group on the estate at a time",
    "Treatments, dinner and activities arranged for you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Bachelorette parties",
  note: "Private spa estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const bachelorettePartiesLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch: estate,
  band: gardenBand,
  spaces,
  day: sampleDay,
  extra: spa,
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
