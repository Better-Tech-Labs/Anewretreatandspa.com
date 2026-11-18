/**
 * Words and photos for the small wedding layout (/weddings).
 *
 * Owner facts still to confirm before this goes live: guest count for a
 * ceremony and for a seated dinner, how many people can stay overnight,
 * parking, music cut-off, and whether to show a price. Nothing here states
 * those yet.
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
export const EVENT_TYPE = "Wedding";

/** Every "Inquire" button goes to the inquiry page, with Wedding already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Small Wedding Venue near Seattle | Private Estate | ANEW",
  description:
    "Hold a small wedding at ANEW, a private 7-bedroom estate in Kenmore, WA. Ceremony lawn, timber halls, resident chefs and rooms for the wedding party.",
  path: "/weddings",
};

export const hero: HeroContent = {
  image: { src: "/images/exterior-wide.webp", alt: "Timber estate and front lawn beneath tall evergreens at ANEW" },
  eyebrow: "Small Weddings · Kenmore, Washington",
  titleLines: ["Small Wedding Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "A private timber estate for the ceremony, the dinner and the people you most want around you.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a 5,800 sq ft estate on two wooded acres in Kenmore. Get married on the lawn under the evergreens, sit down to dinner in a timber hall, and keep the wedding party on site in seven bedrooms.",
  features: [
    "Private estate wedding",
    "Ceremony Lawn",
    "Grand Hall",
    "Event Pavilion",
    "Getting-ready spaces",
    "7 bedrooms",
    "Resident chefs",
    "Minutes from Seattle",
  ],
  inquireLabel: "Tell us about your wedding",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-living-wide.webp", alt: "Grand Hall with a stone fireplace, timber beams and an iron chandelier at ANEW" },
  eyebrow: "A Private Estate Wedding",
  titleLines: ["A Wedding That Fits", "in One Place"],
  paragraphs: [
    "A small wedding has room for things a big one doesn't. You can talk to every guest. Dinner can be one long table. Nobody needs a bus to get from the ceremony to the reception, because it is a short walk across the courtyard.",
    "At ANEW the ceremony, the meal, the dancing and the bedrooms are all on the same property. Wedding packages run from a wedding-day rental to a two-night weekend with the estate as your home base.",
    "Planning something smaller still, with only a handful of guests or none? Our elopements page covers that.",
  ],
  actions: [
    { kind: "link", label: "View Wedding Packages", href: "/packages" },
    { kind: "link", label: "See Elopements", href: "/elopements" },
  ],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/tall-cedars.webp", alt: "Tall cedars on the hillside above the estate buildings at ANEW" },
  titleLines: ["Two Wooded Acres,", "One Wedding"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where It Happens",
  title: "From the Aisle to the Last Dance",
  rooms: [
    { img: "/images/exterior-hero.webp", alt: "Green lawn in front of the timber estate at ANEW", name: "Ceremony Lawn", desc: "The ceremony. A clipped lawn in front of the house with tall trees on every side. Set the chairs facing the evergreens and walk out from the house." },
    { img: "/images/cabin-entrance.webp", alt: "Studio Cabin with its doors open at the end of a tree-lined path at ANEW", name: "Studio Cabin", desc: "Getting ready. A standalone cabin down its own path, so one half of the wedding party can dress without running into the other." },
    { img: "/images/master-bedroom.webp", alt: "Master Suite with a reclaimed timber king bed and vaulted ceiling at ANEW", name: "Master Suite", desc: "The couple's room. A reclaimed timber king bed under a vaulted ceiling, and the most private bedroom in the house." },
    { img: "/images/event-hall.webp", alt: "Empty Event Pavilion with timber beams, concrete floor and French doors at ANEW", name: "Event Pavilion", desc: "The reception dinner. An open hall with polished concrete floors and French doors to the forest. Expandable tables are on hand, and the room is the indoor option if the ceremony moves inside." },
    { img: "/images/interior-living.webp", alt: "Grand Hall seating under an iron chandelier with tall windows behind at ANEW", name: "Grand Hall", desc: "Toasts and dancing. Timber beams, an iron chandelier and floor-to-ceiling windows, with space to clear the floor once dinner is done." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Lit fire pit ringed by lounge chairs on the courtyard lawn at ANEW", name: "Courtyard & Fire Pit", desc: "The hour after the ceremony and the end of the night. Guests gather under the string lights, then a fire for whoever is still up." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Wedding Day",
  title: "How the Day Can Unfold",
  text: "Every wedding here runs on its own timeline. This is one way a ceremony day can go when the wedding party is staying on the estate.",
  action: { kind: "link", label: "Start Planning Yours", href: INQUIRE_HREF },
  items: [
    { time: "10:00", title: "Getting ready", detail: "Hair and makeup in the Studio Cabin, the other half of the party in the house. Coffee in the kitchen for anyone who wanders through." },
    { time: "1:00", title: "Vendors arrive", detail: "Your florist, caterer and photographer set up while our on-site contact handles access and logistics." },
    { time: "3:00", title: "First look", detail: "A quiet few minutes on the garden paths by the stream before anyone else sees you." },
    { time: "4:00", title: "Ceremony on the lawn", detail: "Guests seated on the grass, tall trees behind you, the house at their backs." },
    { time: "4:30", title: "Everyone to the courtyard", detail: "Everyone moves a few steps to the courtyard while you take family photos on the lawn." },
    { time: "6:00", title: "Dinner", detail: "Long tables in the Event Pavilion with the French doors open, plated or family-style." },
    { time: "8:00", title: "Toasts and dancing", detail: "Back to the Grand Hall for the first dance under the chandelier." },
    { time: "Late", title: "Fire pit", detail: "The music winds down. The people staying over pull chairs up to the fire." },
  ],
};

export const wellness: SplitFeatureContent = {
  image: { src: "/images/spa-sauna-anew.webp", alt: "Cedar benches inside the sauna at ANEW" },
  eyebrow: "The Spa",
  titleLines: ["The Day Before,", "the Morning After"],
  paragraphs: [
    "The estate has its own spa, which is useful on either side of a wedding. Book massages for the wedding party the afternoon before, or send everyone through the sauna and cold plunge the morning after.",
    "There is a wet and dry sauna, a cold plunge and a private soaking tub. Massage is by appointment with licensed therapists.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About a Spa Day for the Wedding Party", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-salmon-platter.webp", alt: "Platter of sliced salmon beside a bowl of salad at ANEW" },
  eyebrow: "The Wedding Dinner",
  titleLines: ["Cooked Here, Served Hot"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/kitchen-sink.webp", alt: "Farmhouse sink and kitchen windows looking onto the courtyard at ANEW" },
  eyebrow: "Food",
  titleLines: ["Our Chefs", "or Your Caterer"],
  paragraphs: [
    "Resident chefs can cook the wedding dinner in the estate kitchen, which opens straight onto the courtyard. Menus are seasonal and locally sourced, with fresh salmon and garden vegetables, and can be plated or family-style. Tell us about allergies and the menu is built around them.",
    "Already have a caterer you love? Approved outside vendors are welcome, and the kitchen is set up for them. A rehearsal dinner or a farewell brunch can be added to a wedding package.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Ways to Do It",
  title: "One Day or the Whole Weekend",
  cards: [
    { img: "/images/exterior-courtyard-new.webp", alt: "Courtyard with string lights in front of the timber estate at ANEW", title: "Wedding Day Only", inquireType: EVENT_TYPE, desc: "Ceremony and reception here, with a space to get ready. Guests sleep elsewhere and you bring your own vendor team." },
    { img: "/images/bedroom-garden.webp", alt: "Garden Suite with a king bed and French doors to the patio at ANEW", title: "Wedding Weekends", inquireType: EVENT_TYPE, desc: "Two nights on the estate. Arrive early for the rehearsal and setup, get married, and wake up here the next day." },
    { img: "/images/dining-room-leather.webp", alt: "Dining table with leather chairs under timber beams at ANEW", title: "Rehearsal Dinners & Brunches", inquireType: EVENT_TYPE, desc: "A welcome gathering the night before or a slow brunch the morning after, around one table in the dining room." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Check Your Wedding Date",
  hint: "Click an open date to start planning",
  inquireLead: "Looking at next year, or a date that isn't showing?",
  inquireType: EVENT_TYPE,
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Small Wedding FAQ",
  faqs: [
    { q: "How many guests can we invite?", a: "It depends on how you use the spaces, for example a lawn ceremony with dinner in the Event Pavilion. Send us your date and the guest count you have in mind, and we'll confirm whether it works." },
    { q: "What happens if it rains on the wedding day?", a: "The Grand Hall and the Event Pavilion are both indoors. With advance notice, an outdoor ceremony can be moved inside." },
    { q: "Can we bring our own caterer, photographer and florist?", a: "Yes. Outside vendors are welcome once we have approved them, and they need to carry their own liability insurance. We also keep a preferred vendor list you can ask for." },
    { q: "Can the wedding party stay overnight?", a: "Yes. The estate has 7 bedrooms, and two of the wedding packages are built around a two-night stay. Tell us who needs a bed and we'll walk you through the rooms." },
    { q: "What wedding packages do you offer?", a: "There are three starting points: a wedding-day venue rental, a two-night estate weekend, and a two-night weekend with resident-chef dining and coordination. Each one can be adjusted. The Packages page has the details, and pricing is confirmed once we know your date and plans." },
    { q: "How far ahead should we book?", a: "For May through October we suggest 6 to 12 months ahead. Off-season dates can open up on shorter notice, so it is worth asking." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "Picture the Day Here",
  tiles: [
    { src: "/images/courtyard-firepit.webp", alt: "Timber estate with courtyard seating and lawn at ANEW", span: "feature" },
    { src: "/images/event-hall.webp", alt: "Event Pavilion with timber beams" },
    { src: "/images/creek.webp", alt: "Stream running over rocks on the grounds" },
    { src: "/images/bedroom-master.webp", alt: "Queen Suite with a rope-suspended bed and chandelier" },
    { src: "/images/garden-flowers.webp", alt: "Rhododendron in bloom beside the path to the cottage", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/exterior-courtyard-new.webp", alt: "Timber estate and courtyard fire pit at dusk at ANEW" },
  titleLines: ["Get Married", "at ANEW"],
  text: "Send us your date and a rough guest count. We reply personally within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Wedding",
  text: "It takes about 30 seconds and commits you to nothing. Share the date you're hoping for and roughly how many guests, and we'll tell you what's possible.",
  eventType: EVENT_TYPE,
  points: [
    "We write back ourselves within 24 hours",
    "Honest answers on guest count and dates",
    "Package options matched to your plans",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Small weddings",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const weddingsLanding: LandingContent = {
  meta,
  hero,
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
