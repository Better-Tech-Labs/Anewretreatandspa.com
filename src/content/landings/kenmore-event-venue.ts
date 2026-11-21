/**
 * Words and photos for the Kenmore town page (/kenmore-event-venue).
 * ANEW is in Kenmore, so this is the hometown page: all occasions, with the
 * cards routing to the occasion pages.
 *
 * Local places named here were checked against official pages (City of
 * Kenmore parks directory, Washington State Parks). No drive times, distances,
 * private businesses, capacity or prices are stated.
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
  title: "Event Venue in Kenmore, WA | Weddings & Retreats | ANEW",
  description:
    "ANEW is a private estate and spa in Kenmore, WA for weddings, retreats, birthdays and dinners. Timber halls, 7 bedrooms and a sauna on two wooded acres.",
  path: "/kenmore-event-venue",
};

export const hero: HeroContent = {
  image: {
    src: "/images/garden-cabin.webp",
    alt: "Low timber building with a red metal roof seen through tall evergreens at ANEW, with a wooden footbridge in the foreground",
  },
  eyebrow: "Private Estate & Spa · Kenmore, Washington",
  titleLines: ["Event Venue", "in Kenmore, WA"],
  titleScale: "long",
  subtitle: "Weddings, retreats and family occasions on a private estate at the north end of Lake Washington.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "Kenmore sits where the Sammamish River runs into Lake Washington. ANEW is here too: a 5,800 sq ft timber estate and spa on two wooded acres, booked by one group at a time.",
  features: [
    "Located in Kenmore",
    "One group at a time",
    "Grand Hall",
    "Event Pavilion",
    "Ceremony lawn",
    "7 bedrooms",
    "On-site spa",
    "Chefs in the kitchen",
  ],
  inquireLabel: "Tell us what you're hosting",
};

export const estate: SplitFeatureContent = {
  image: {
    src: "/images/interior-living.webp",
    alt: "Sofas under an iron chandelier with tall windows onto the garden in the Grand Hall at ANEW",
  },
  eyebrow: "A Venue in Your Own Town",
  titleLines: ["A Whole Estate,", "Here in Kenmore"],
  paragraphs: [
    "Kenmore is mostly homes, parks and shoreline. When there is something to celebrate, people here tend to look at a restaurant's back room, a hotel ballroom in another city, or a community hall. ANEW is a different kind of place, and it is already in town.",
    "Reserve the estate and nobody else is on the property. You get a timber Grand Hall, an Event Pavilion with French doors to the forest, a courtyard with a stone fire pit, a ceremony lawn and seven bedrooms. No one turns your table for a later seating, and relatives who traveled can sleep where the party was.",
    "It suits the occasions a town actually has: a wedding, a sixtieth birthday, a reunion, a team that needs a day away from its desks.",
  ],
  actions: [
    { kind: "link", label: "Tour the Estate", href: "/venue" },
    { kind: "link", label: "View Packages", href: "/packages" },
  ],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/deer-woods.webp", alt: "Two deer grazing between cedar trunks on the ANEW grounds" },
  titleLines: ["Kenmore's Lake Is Close.", "The Woods Are Right Here."],
};

export const spaces: RoomsContent = {
  eyebrow: "The Spaces",
  title: "Six Places to Gather on One Property",
  rooms: [
    { img: "/images/interior-living-wide.webp", alt: "Grand Hall with two white sofas, a fireplace and an iron chandelier under timber beams at ANEW", name: "Grand Hall", desc: "The main room of the house. Timber beams, a hand-forged iron chandelier and a fireplace, with windows that look into the trees. Good for a seated dinner or an evening on your feet." },
    { img: "/images/event-hall.webp", alt: "Empty hall with a polished concrete floor, timber ceiling beams and open French doors at ANEW", name: "Event Pavilion", desc: "A separate open hall with a polished concrete floor. Expandable tables are available, so it can be a dining room on Saturday and a workshop or yoga floor on Sunday." },
    { img: "/images/exterior-courtyard-new.webp", alt: "Lawn and stone fire pit in front of the weathered timber house at ANEW", name: "Ceremony Lawn", desc: "Clipped grass in front of the house with tall trees around it. Most outdoor ceremonies happen here, and it doubles as a place for lawn games." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Fire burning in a stone fire pit with lounge chairs on the lawn at ANEW", name: "Courtyard & Fire Pit", desc: "Lounge seating around a stone fire pit, with string lights overhead. This is where a gathering usually ends up once the plates are cleared." },
    { img: "/images/cabin-entrance.webp", alt: "Small timber cabin with its door open beside a row of tall trees at ANEW", name: "Studio Cabin", desc: "A standalone cabin reached by its own path. Use it for getting ready, a small meeting, or a quiet room away from the main house." },
    { img: "/images/spa-sauna-anew.webp", alt: "Tiered cedar benches inside the sauna at ANEW", name: "The Spa", desc: "A wet and dry sauna, a cold plunge and a private soaking tub. Massage with licensed therapists is by appointment." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Saturday in Kenmore",
  title: "From the State Park to the Fire Pit",
  text: "If your guests are in town for the weekend, the day can begin outdoors in Kenmore and finish at the estate. Here is one way to plan it.",
  action: { kind: "link", label: "Plan Your Own Day", href: INQUIRE_HREF },
  items: [
    { time: "9:00", title: "Trails at Saint Edward State Park", detail: "Walk down through the forest to the Lake Washington shore, then back up past the old seminary building." },
    { time: "11:30", title: "Log Boom Park", detail: "A stop on the beach at the top of the lake. Seaplanes take off and land on this stretch of water." },
    { time: "1:00", title: "Settle in at the estate", detail: "Bags go to the bedrooms. Lunch comes out of the estate kitchen." },
    { time: "2:30", title: "Sauna and cold plunge", detail: "A few rounds of hot and cold for those who want it. The rest find a chair by the stream." },
    { time: "4:30", title: "The other guests arrive", detail: "Everyone gathers in the courtyard while the tables are set inside." },
    { time: "6:00", title: "Dinner in the Grand Hall", detail: "Cooked on site and served under the timber beams." },
    { time: "8:30", title: "Fire pit", detail: "String lights on, fire lit, and no closing time posted on a door." },
  ],
};

export const aroundTown: SplitFeatureContent = {
  image: { src: "/images/cedar-path.webp", alt: "Bark path curving past a large cedar trunk and blooming rhododendrons at ANEW" },
  eyebrow: "Around Kenmore",
  titleLines: ["What to Pair", "with a Stay Here"],
  paragraphs: [
    "Saint Edward State Park is Kenmore's big forest park, with trails that lead down to the Lake Washington shoreline and a playground near the top. It is a good morning for guests who arrive a day early.",
    "The Burke-Gilman Trail, a paved path for walking and cycling, passes through Kenmore along the north end of the lake. Log Boom Park sits right on it, with a beach, picnic tables and a playground.",
    "Kenmore is also known for the seaplanes that use the top of the lake. You can watch them from the waterfront. Our local guide and our weekend article go into more detail.",
  ],
  actions: [
    { kind: "link", label: "See the Local Guide", href: "/local" },
    { kind: "link", label: "Read: A Weekend in Kenmore", href: "/blog/weekend-in-kenmore-wa" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "What People Host Here",
  title: "Pick Your Occasion",
  cards: [
    { img: "/images/tall-cedars.webp", alt: "Tall cedars rising above the timber buildings at ANEW", title: "Weddings", href: "/weddings", desc: "A lawn ceremony, a timber hall for dinner, and bedrooms for the wedding party, all without leaving Kenmore." },
    { img: "/images/catering-spread.webp", alt: "Platters of salmon, vegetables and salads laid out on the kitchen island at ANEW", title: "Birthday Parties", href: "/birthday-parties", desc: "For the birthdays with a zero on the end. A chef's dinner, a fire afterward, and room for friends to stay the night." },
    { img: "/images/deer-garden.webp", alt: "Deer standing on a garden path beneath tall trees at ANEW", title: "Family Reunions", href: "/family-reunions", desc: "One house for every branch of the family, with grass for the kids and a long table for everybody else." },
    { img: "/images/kitchen-sink.webp", alt: "Farmhouse sink below kitchen windows that look out at a red-roofed building at ANEW", title: "Private Dinners", href: "/private-dinners", desc: "A chef, a single table and the house to yourselves for the evening." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "See Which Dates Are Open",
  hint: "Click an open date to begin",
  inquireLead: "Not sure of the date yet, or planning far ahead?",
};

export const faq: FaqContent = {
  eyebrow: "Local Questions",
  title: "Kenmore Venue FAQ",
  faqs: [
    { q: "Where in Kenmore is ANEW?", a: "ANEW is a private estate in Kenmore, Washington, the city at the north end of Lake Washington between Lake Forest Park and Bothell. Because it is a private property, we share arrival details once you are in touch with us." },
    { q: "What kinds of events can we hold at ANEW?", a: "Weddings and elopements, corporate and wellness retreats, birthdays, anniversaries, family reunions and private dinners. If yours is not on that list, ask. Most gatherings that fit a private estate can work here." },
    { q: "Will other groups be on the property during our event?", a: "No. The estate takes one booking at a time, so the house, the halls, the spa and the grounds are yours for the length of it." },
    { q: "Can guests from out of town stay overnight?", a: "Yes. The estate has 7 bedrooms. Tell us who needs a bed and we will go through the rooms with you." },
    { q: "What can our guests do in Kenmore with a free morning?", a: "Saint Edward State Park has forest trails down to the lake. The Burke-Gilman Trail runs through town for walking and cycling, and Log Boom Park is on the waterfront. Our local guide lists more ideas." },
    { q: "Can we see the estate before we decide?", a: "Yes. Send an inquiry or call, and we will set up a time to walk the house and grounds with you." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "The Estate in Photos",
  tiles: [
    { src: "/images/forest-view.webp", alt: "Timber estate buildings below tall evergreens, seen across a planted slope at ANEW", span: "feature" },
    { src: "/images/event-hall.webp", alt: "Event Pavilion with timber beams and a concrete floor" },
    { src: "/images/creek-stream.webp", alt: "Stream winding between bark paths and green groundcover" },
    { src: "/images/master-bedroom.webp", alt: "Timber platform bed with a lit headboard under a vaulted ceiling" },
    { src: "/images/bedroom-garden.webp", alt: "Bedroom with a white bed and French doors opening to the garden", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/exterior-courtyard-new.webp", alt: "Weathered timber house with string lights over the courtyard at ANEW" },
  titleLines: ["Host It", "in Kenmore"],
  text: "Tell us the occasion and the dates you have in mind. A real person writes back within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us What You're Planning",
  text: "A few lines is enough: the occasion, rough dates and about how many people. There is nothing to pay and nothing to sign at this stage.",
  eventType: "",
  formLocation: "kenmore_event_venue_bottom",
  showBookLink: true,
  points: [
    "A reply from us within 24 hours",
    "The estate held for your group only",
    "Help choosing rooms, food and spa time",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Event venue in Kenmore",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const kenmoreVenueLanding: LandingContent = {
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
