/**
 * Words and photos for the birthday party layout (/birthday-parties).
 * Search intent: birthday party venue near Seattle, milestone birthday weekend.
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

/** Must match an entry in EVENT_TYPES so the inquiry form and links accept it. */
export const EVENT_TYPE = "Birthday";

/** Every "Inquire" button goes to the inquiry page, with Birthday already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Birthday Party Venue near Seattle | Private Estate & Spa | ANEW",
  description:
    "Celebrate a milestone birthday at ANEW, a private 7-bedroom estate in Kenmore, WA. A chef's dinner, a fire pit, lawn games and a spa near Seattle.",
  path: "/birthday-parties",
};

export const hero: HeroContent = {
  image: { src: "/images/courtyard-firepit.webp", alt: "Fire pit and lounge seating on the lawn in front of the timber estate at ANEW" },
  eyebrow: "Birthday Parties · Kenmore, Washington",
  titleLines: ["Birthday Party Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "A private estate for the birthdays that deserve more than a restaurant booking. Dinner, a fire, and bedrooms for the people staying over.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a 5,800 sq ft timber estate on two wooded acres, minutes from Seattle. Book it for a birthday and the party gets a hall for dinner, a courtyard with a fire pit, games on the grounds, and a spa for the morning after.",
  features: [
    "One party on the estate",
    "7 bedrooms",
    "Grand Hall",
    "Event Pavilion",
    "Private chef dinners",
    "Courtyard & fire pit",
    "Bocce, ping pong & more",
    "Spa on site",
  ],
  inquireLabel: "Tell us whose birthday it is",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-openplan.webp", alt: "Sofas facing the fireplace under timber beams and an iron chandelier at ANEW" },
  eyebrow: "More Than a Table for Twelve",
  titleLines: ["A Birthday That Runs", "Longer Than Dinner"],
  paragraphs: [
    "A restaurant gives you two hours and a bill. A rented hall gives you a room and a cleanup deadline. A birthday here can start with an afternoon on the grounds and keep going through dinner and the fire, and for guests who stay, into breakfast.",
    "The house is built from weathered timber and forged iron, with tall windows on the forest. It feels like somebody's very good home, which is the right setting for a toast.",
  ],
  actions: [
    { kind: "link", label: "Tour the Estate", href: "/venue" },
    { kind: "link", label: "Bringing the Whole Family? See Family Reunions", href: "/family-reunions" },
  ],
};

export const estateBand: ImageBandContent = {
  image: { src: "/images/exterior-wide.webp", alt: "The timber estate seen across the lawn with tall firs behind it at ANEW" },
  titleLines: ["Forty, Sixty,", " or No Number at All"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where the Party Happens",
  title: "Room for Every Part of the Day",
  rooms: [
    { img: "/images/event-hall.webp", alt: "Event Pavilion with exposed beams, concrete floor and French doors at ANEW", name: "Event Pavilion", desc: "The party room. An open hall with expandable tables, so it can be set for a seated birthday dinner or left open for the party." },
    { img: "/images/interior-wide.webp", alt: "Tufted sofas in the Grand Hall with a window onto the rock garden at ANEW", name: "Grand Hall", desc: "Where guests gather first. Sofas, a fireplace and an iron chandelier overhead. A good room for the speeches." },
    { img: "/images/dining-room-leather.webp", alt: "Dining table surrounded by leather chairs with pendant lights above at ANEW", name: "Dining Room", desc: "For a smaller birthday, one table with the kitchen close by and the guest of honor at the head of it." },
    { img: "/images/exterior-courtyard-new.webp", alt: "Courtyard seating and fire pit in front of the timber house at ANEW", name: "Courtyard & Fire Pit", desc: "Appetizers outside before dinner, then the stone fire pit and string lights once the candles are blown out." },
    { img: "/images/gym-exterior.webp", alt: "Basketball hoop above the open glass doors of the gym at ANEW", name: "Games on the Grounds", desc: "Bocce, badminton, ping pong, basketball and a shelf of board games. The afternoon gets competitive quickly." },
    { img: "/images/bunkbeds.webp", alt: "Timber bunk beds with a ladder in the Bunk Room at ANEW", name: "Bunk Room", desc: "Custom timber bunks with a ladder. Kids claim it at family birthdays, and so do the friends who never grew out of sleepovers." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Birthday",
  title: "From Late Breakfast to the Last Log",
  text: "Plan as much or as little as the guest of honor would want. This is one version of the day itself.",
  action: { kind: "link", label: "Plan the Birthday", href: INQUIRE_HREF },
  items: [
    { time: "10:00", title: "Late breakfast", detail: "The birthday person sleeps in. Coffee and breakfast are ready when they come down." },
    { time: "11:30", title: "Games outside", detail: "Bocce and badminton on the grass, ping pong for the ones keeping score." },
    { time: "2:00", title: "A spa hour", detail: "A massage for the guest of honor, by appointment. Sauna and cold plunge for anyone brave enough to join." },
    { time: "4:30", title: "The table gets set", detail: "Flowers, place cards and candles go out in the Event Pavilion or the dining room." },
    { time: "5:30", title: "Everyone in the courtyard", detail: "The rest of the guests arrive, and the first toast happens before anyone sits down." },
    { time: "6:30", title: "Birthday dinner", detail: "A private chef serves it plated or family-style. Speeches between courses." },
    { time: "8:30", title: "Cake, then the fire", detail: "Candles and a song, then s'mores at the fire pit for as long as the wood lasts." },
  ],
};

export const spa: SplitFeatureContent = {
  image: { src: "/images/therapy-pools.webp", alt: "Sauna cabin with cold plunge tubs in front of it on the wooded hillside at ANEW" },
  eyebrow: "The Spa",
  titleLines: ["A Gift That Doesn't", "Need Wrapping"],
  paragraphs: [
    "The spa is part of the estate, so a treatment can be the present. Book the guest of honor a massage with a licensed therapist, or set up a spa morning for the whole group the day after the party.",
    "There's a cedar-lined sauna, a cedar cold plunge and a private soaking tub, plus a gym for the friend who trains on their birthday. Massage is by appointment, so mention it when you inquire.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Add Spa Time to the Birthday", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-salmon-platter.webp", alt: "Salmon fillets with dill on a platter beside a bowl of salad at ANEW" },
  eyebrow: "At the Table",
  titleLines: ["The Birthday Dinner, Cooked Here"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/kitchen-sink.webp", alt: "Farmhouse sink under kitchen windows that look out to the courtyard at ANEW" },
  eyebrow: "Dine",
  titleLines: ["Their Favorite Meal,", "Made by a Chef"],
  paragraphs: [
    "Tell the chef what the birthday person loves to eat and the menu starts there. Dinner is cooked in the estate kitchen with seasonal, local ingredients and served plated or family-style, indoors or out.",
    "Allergy-specific menus are available on request. If you have a caterer or baker you always use, approved outside vendors are welcome too.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
    { kind: "link", label: "Only Need the Dinner? See Private Dinners", href: "/private-dinners" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "Birthdays of Every Size",
  cards: [
    { img: "/images/courtyard-firepit.webp", alt: "Timber house with courtyard seating around the fire pit at ANEW", title: "Milestone Birthdays", inquireType: EVENT_TYPE, desc: "A 30th, 40th, 50th or 60th with friends from every chapter, a seated dinner and a proper toast." },
    { img: "/images/forest-view.webp", alt: "The estate seen through tall trees from the garden steps at ANEW", title: "Birthday Weekends", inquireType: EVENT_TYPE, desc: "Close friends or family stay over. One night is the party, and the other hours are games, the sauna and long breakfasts." },
    { img: "/images/driveway-approach.webp", alt: "Gravel drive curving past rock gardens toward the estate at ANEW", title: "Surprise Parties", inquireType: EVENT_TYPE, desc: "A private property makes it easier to keep a secret. Tell us the plan when you inquire and we'll talk through the arrival with you." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Is the Birthday Weekend Open?",
  hint: "Click an open date to start a booking",
  inquireLead: "Need a specific date, or planning a surprise?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "See the Setting",
  tiles: [
    { src: "/images/exterior-courtyard-new.webp", alt: "Timber house and courtyard seating", span: "feature" },
    { src: "/images/interior-living.webp", alt: "Grand Hall sofas under an iron chandelier" },
    { src: "/images/outdoor-firepit-cabin.webp", alt: "Fire bowl and lounge chairs by the cabin" },
    { src: "/images/catering-spread.webp", alt: "Dishes laid out on the kitchen island" },
    { src: "/images/maple-uplit-night.webp", alt: "Japanese maple lit from below in the garden at night", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Birthday Party FAQ",
  faqs: [
    { q: "What is there to do for a group of mixed ages?", a: "There are bocce, badminton, ping pong, basketball, soccer and board games on the grounds, plus a bunk room with built-in timber bunks. Tell us the ages in your group when you inquire and we'll confirm what suits them." },
    { q: "Is the estate easy for older guests to get around?", a: "The main floor, Grand Hall, courtyard and fire pit are all at ground level. ANEW is mainly a walk-in estate, so let us know about any mobility needs and we'll go over arrival and access with you." },
    { q: "Can we bring our own cake, caterer or entertainment?", a: "Outside vendors are welcome with approval before the event, and each needs its own liability insurance. Ask us about anything specific you'd like to bring." },
    { q: "Can we have music at the party?", a: "Yes. Amplified music has an evening cutoff, and acoustic music and conversation can carry on after it. The house guidelines are shared when your booking is confirmed." },
    { q: "Which season is best for a birthday at ANEW?", a: "It works year-round. Summer has long evenings for eating outside. In the colder months the party moves in beside the fireplace, and the Grand Hall and Event Pavilion are there whenever the weather turns." },
    { q: "How do we find out what a birthday here costs?", a: "Pricing depends on your date, how many guests are coming, whether anyone stays overnight, and extras like a chef or spa treatments. Send an inquiry with those details and we'll reply with a quote." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/maple-uplit-night.webp", alt: "Japanese maple and garden path lit up at night at ANEW" },
  titleLines: ["Make This One", "Worth Remembering"],
  text: "Share the date, the guest count and a little about who you're celebrating. Expect a personal reply within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About the Birthday",
  text: "Under a minute, and you won't be asked to pay anything. Let us know the date you're aiming for and about how many guests, and we'll send back ideas and a quote.",
  eventType: EVENT_TYPE,
  points: [
    "Hear back within 24 hours",
    "The estate held for your party alone",
    "Dinner, games and spa time planned with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Birthday parties",
  note: "Private estate venue",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const birthdayPartiesLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch: estate,
  band: estateBand,
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
