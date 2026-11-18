/**
 * Words and photos for the anniversary and vow renewal layout (/anniversaries).
 *
 * Owner facts still to confirm before this goes live: group size for a seated
 * anniversary dinner and for sleeping, whether a dinner-only evening is
 * offered, parking, and whether to show a price. Nothing here states those yet.
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
export const EVENT_TYPE = "Family Gathering";

/** Every "Inquire" button goes to the inquiry page, with Family Gathering already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Anniversary & Vow Renewal Venue near Seattle | ANEW",
  description:
    "Celebrate an anniversary or renew your vows at ANEW, a private estate and spa in Kenmore, WA. Family dinners, garden ceremonies and a spa for two.",
  path: "/anniversaries",
};

export const hero: HeroContent = {
  image: { src: "/images/maple-uplit-night.webp", alt: "Japanese maple lit from below in the gardens at night at ANEW" },
  eyebrow: "Anniversaries & Vow Renewals · Kenmore, Washington",
  titleLines: ["Anniversary Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "Renew your vows in the garden, then sit down to dinner with the family you built.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "A restaurant gives you a table for two hours. ANEW gives you a private estate and spa in Kenmore for the anniversary itself: a vow renewal on the lawn, a chef cooking for the family, and bedrooms on site so the night doesn't end at the door.",
  features: [
    "Vow renewals",
    "Anniversary dinners",
    "Ceremony Lawn",
    "Resident chefs",
    "Massage for two",
    "Fire pit evenings",
    "7 bedrooms",
    "Lawn games",
  ],
  inquireLabel: "Tell us about your anniversary",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-wide.webp", alt: "Living room with tufted sofas, an iron chandelier and windows onto the garden at ANEW" },
  eyebrow: "An Anniversary Worth the Trip",
  titleLines: ["Dinner, the Toast", "and Somewhere to Stay"],
  paragraphs: [
    "Big anniversaries tend to bring people in from different cities. Children fly home. Old friends drive up. It helps to have one address where everyone can gather, eat and stay as late as they want.",
    "The estate is 5,800 sq ft of barn wood and timber on two wooded acres. Hold the toast in the Grand Hall, let the grandchildren loose on the lawn, and walk the garden paths together before dinner.",
    "Renewing your vows? Stand on the lawn with the trees behind you, or pick a quieter place along the stream. If you'd like something closer to a second wedding, our small weddings page shows how that works here.",
  ],
  actions: [
    { kind: "link", label: "Tour the Estate", href: "/venue" },
    { kind: "link", label: "See Small Weddings", href: "/weddings" },
  ],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/garden-flowers.webp", alt: "Pink rhododendron blooming beside a gravel path to a timber cottage at ANEW" },
  titleLines: ["Same Vows,", "a Few Decades On"],
};

export const spaces: RoomsContent = {
  eyebrow: "Around the Estate",
  title: "Rooms for the Toast, the Meal and the Morning",
  rooms: [
    { img: "/images/exterior-wide.webp", alt: "Lawn and timber estate framed by evergreens at ANEW", name: "Ceremony Lawn", desc: "The vow renewal. Level grass in front of the house, bordered by tall trees, with space for family to stand close." },
    { img: "/images/interior-openplan.webp", alt: "Grand Hall with sofas facing a fireplace under timber beams at ANEW", name: "Grand Hall", desc: "The toast. Sofas by the fireplace for the grandparents, beams overhead, and tall windows onto the woods." },
    { img: "/images/dining-room-leather.webp", alt: "Dining table set with leather chairs beneath pendant lights at ANEW", name: "Dining Room", desc: "The anniversary dinner. Everyone at a single table, close enough to hear the stories." },
    { img: "/images/courtyard-firepit.webp", alt: "Courtyard with umbrella tables and fire pit seating at ANEW", name: "Courtyard & Fire Pit", desc: "After dinner. S'mores for the kids, a nightcap for the adults, and string lights overhead." },
    { img: "/images/bedroom-garden.webp", alt: "King bed beside French doors opening to a garden patio at ANEW", name: "Garden Suite", desc: "For the two of you. A king bed, French doors to the garden patio, and an en-suite rain shower." },
    { img: "/images/healing-gardens.webp", alt: "Flowering tree in a bed of green ground cover beside a gravel path at ANEW", name: "Healing Gardens", desc: "A walk before dinner. Stone paths through cedars, ferns and rhododendrons, with benches in the grove and seats by the stream." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Anniversary",
  title: "One Saturday, Start to Finish",
  text: "Your celebration is planned with you, so no two look alike. Here is one way an anniversary with family might run.",
  action: { kind: "link", label: "Plan Your Celebration", href: INQUIRE_HREF },
  items: [
    { time: "1:00", title: "Massage for two", detail: "The two of you start in the treatment room while the house is still quiet." },
    { time: "3:00", title: "Family arrives", detail: "Hugs in the courtyard. Someone finds the bocce set and the ping pong table." },
    { time: "4:30", title: "Vow renewal", detail: "On the lawn, with children and grandchildren standing around you." },
    { time: "5:00", title: "Photos and a toast", detail: "Family pictures in the garden, then glasses raised in the Grand Hall." },
    { time: "6:30", title: "Anniversary dinner", detail: "A resident chef serves a seasonal menu in the dining room. This is when the speeches happen." },
    { time: "8:30", title: "Fire pit", detail: "S'mores, old stories, and the same songs you danced to the first time." },
    { time: "Sunday", title: "Slow morning", detail: "Coffee on the patio and a walk by the stream before anyone packs a bag." },
  ],
};

export const wellness: SplitFeatureContent = {
  image: { src: "/images/bathroom-soaker.webp", alt: "Freestanding soaking tub beneath timber beams with garden windows at ANEW" },
  eyebrow: "For the Couple",
  titleLines: ["A Few Hours", "Without the Family"],
  paragraphs: [
    "An anniversary is about two people, even when the whole family wants a piece of it. The spa gives you somewhere to slip off to.",
    "Book a couples massage in the treatment room, sit in the sauna, try the cold plunge if you're feeling brave, or fill the soaking tub and close the door. Spa treatments are by appointment, so mention them when you inquire.",
    "Coming as a group of friends for a spa weekend instead? Our wellness retreats page is the better fit.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "link", label: "See Wellness Retreats", href: "/wellness-retreats" },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-greens.webp", alt: "Bowl of asparagus with platters of salmon behind it at ANEW" },
  eyebrow: "The Meal",
  titleLines: ["An Anniversary Dinner", "Made for Your Table"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/catering-spread.webp", alt: "Kitchen counter laid with salmon, salads and stacked plates at ANEW" },
  eyebrow: "Dine",
  titleLines: ["Cook the Menu", "Around Your Story"],
  paragraphs: [
    "The resident chefs build menus from what is in season nearby. Ask for the dish from your wedding, the meal from your honeymoon, or simply the salmon. Dinner can be plated course by course or passed family-style.",
    "Allergy-specific menus are available on request, which matters when four generations share a table. If the evening is only a dinner, our private dinners page covers that.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
    { kind: "link", label: "See Private Dinners", href: "/private-dinners" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Celebrations We Host",
  title: "However You Mark the Year",
  cards: [
    { img: "/images/garden-rhody-tree.webp", alt: "Rhododendron in bloom above a pale gravel path at ANEW", title: "Vow Renewals", inquireType: EVENT_TYPE, desc: "A short ceremony outdoors with the people who were there the first time, and the ones who have arrived since." },
    { img: "/images/interior-living.webp", alt: "Sofas and a coffee table under an iron chandelier at ANEW", title: "Milestone Anniversaries", inquireType: EVENT_TYPE, desc: "The 25th, the 40th, the 50th. A family dinner with toasts, and beds for the relatives who traveled." },
    { img: "/images/bathroom-shower.webp", alt: "Soaking tub beside a glass walk-in stone shower at ANEW", title: "A Getaway for Two", inquireType: EVENT_TYPE, desc: "No party. A quiet night away with a chef's dinner, the sauna and nobody else's schedule." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Find Your Anniversary Date",
  hint: "Click an open date to get started",
  inquireLead: "Planning a surprise, or need a specific weekend?",
  inquireType: EVENT_TYPE,
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Anniversary & Vow Renewal FAQ",
  faqs: [
    { q: "Can we renew our vows at ANEW?", a: "Yes. Vow renewals are held outdoors on the lawn or in the gardens, and the Grand Hall and Event Pavilion are available indoors. Bring your own officiant, or have a family member lead it." },
    { q: "Can we book the estate for only the two of us?", a: "Yes. Some couples come alone for a private stay with dinner and spa time. Message us with your dates and we'll confirm what is available." },
    { q: "Is the estate manageable for older relatives?", a: "The main floor, the Grand Hall, the courtyard and the fire pit are all at ground level. Please tell us about any specific accessibility needs so we can talk them through before you book." },
    { q: "Can a chef cook our anniversary dinner?", a: "Yes. Resident chefs cook on site, subject to their availability, so ask early. Share any dietary needs when you book. You may also bring an approved outside caterer." },
    { q: "What is there for the family to do besides dinner?", a: "Chess, bocce ball, basketball, soccer, badminton, ping pong and board games are on hand. There are garden paths and a stream to walk, a fire pit for the evening, and we can arrange private tastings in nearby Woodinville wine country." },
    { q: "How do we find out what it costs?", a: "Pricing depends on your date, the size of your group and what you add. Send those details through the inquiry form and we'll reply with options." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "See Where You'll Celebrate",
  tiles: [
    { src: "/images/exterior-courtyard-new.webp", alt: "Timber estate with string lights over the courtyard", span: "feature" },
    { src: "/images/dining-room-leather.webp", alt: "Dining room with leather chairs" },
    { src: "/images/creek-stream.webp", alt: "Stream winding through the gardens" },
    { src: "/images/bedroom-garden-doors.webp", alt: "Garden Suite with French doors" },
    { src: "/images/deer-woods.webp", alt: "Deer grazing under the cedars", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/outdoor-seating.webp", alt: "Sunset over the gardens and a gravel fire terrace at ANEW" },
  titleLines: ["Mark the Year", "Together"],
  text: "Let us know the date and who you'd like around you. A real person answers within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Anniversary",
  text: "Half a minute, nothing to pay, nothing to sign. Tell us which anniversary it is, a date or two that could work, and about how many people you'd bring.",
  eventType: EVENT_TYPE,
  points: [
    "A reply from our team within 24 hours",
    "Ideas for a vow renewal or family dinner",
    "Chef, spa and rooms planned with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Anniversaries",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const anniversariesLanding: LandingContent = {
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
