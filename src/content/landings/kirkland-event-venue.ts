/**
 * Words and photos for the Kirkland town page (/kirkland-event-venue).
 * A general page (all occasions) for people in Kirkland and on the Eastside
 * looking for a venue close to home: team offsites, weddings, birthdays.
 *
 * ANEW is in Kenmore, not Kirkland, and the page says so. It gives no drive
 * times or distances and names no private businesses. Local places named
 * here were checked against the City of Kirkland (kirklandwa.gov) and
 * Explore Kirkland: Marina Park, Juanita Bay Park, Juanita Beach Park and
 * the Cross Kirkland Corridor.
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
import type { SplitFeatureContent } from "@/components/home/SplitFeature";
import type { StickyBarContent } from "@/components/home/StickyBookingBar";
import { SPACES_ANCHOR, type LandingContent } from "@/components/landing/LandingPage";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { inquireHref } from "@/lib/inquire";

/** A town page covers every occasion, so the inquiry form opens with no event type chosen. */
const INQUIRE_HREF = inquireHref();

export const meta = {
  title: "Event Venue near Kirkland | Private Estate & Spa | ANEW",
  description:
    "ANEW is a private estate and spa in Kenmore, the city on Kirkland's north border. Offsites, weddings and parties with the whole property to yourselves.",
  path: "/kirkland-event-venue",
};

export const hero: HeroContent = {
  image: { src: "/images/exterior-courtyard-new.webp", alt: "Timber house with string lights over a courtyard seating area and lawn at ANEW" },
  eyebrow: "Near Kirkland · Kenmore, Washington",
  titleLines: ["Event Venue", "near Kirkland"],
  subtitle: "One city north of Kirkland, a timber estate and spa that hosts a single group at a time.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "Kirkland and Kenmore share a border and a lake. ANEW sits on the Kenmore side: a 5,800 sq ft house, an Event Pavilion, a Studio Cabin and a spa on two wooded acres. Eastside teams, couples and families rent all of it for a day or a weekend.",
  features: [
    "Kirkland's neighbor to the north",
    "Whole property, your group only",
    "Event Pavilion",
    "Ceremony Lawn",
    "7 bedrooms",
    "On-site spa",
    "Chef's Kitchen",
    "Tonal gym",
  ],
  inquireLabel: "Ask about your date",
};

export const pitch: SplitFeatureContent = {
  image: { src: "/images/exterior-side.webp", alt: "Timber house with large windows seen across a garden of shrubs and young trees at ANEW" },
  eyebrow: "Close to Home, Out of the Usual",
  titleLines: ["Not a Ballroom.", "Not a Back Room."],
  paragraphs: [
    "If you live or work in Kirkland, you already know the usual choices. A hotel ballroom comes with a hallway of other events. A restaurant's private room comes with a seating time and the main dining room on the other side of the wall.",
    "Here the property is the venue. Meet or marry in one building, eat in another, and step outside between the two. There are bedrooms on site for anyone who would like to stay, a kitchen built for chefs to work in, and a sauna and cold plunge among the trees.",
    "Because it is the next city up, guests from Kirkland get home the same night if they want to. A lot of them decide to stay over anyway.",
  ],
  actions: [{ kind: "link", label: "Explore the Venue", href: "/venue" }],
};

export const spaces: RoomsContent = {
  eyebrow: "The Spaces",
  title: "Five Places to Gather on One Property",
  rooms: [
    { img: "/images/event-hall.webp", alt: "Empty hall with a polished concrete floor, exposed beams and French doors at ANEW", name: "Event Pavilion", desc: "An open-plan hall with a polished concrete floor and French doors to the woods. Expandable tables are available, so it can be a workshop room at noon and a dinner room by evening." },
    { img: "/images/interior-openplan.webp", alt: "Two cream sofas, a fireplace and an iron chandelier beneath timber beams at ANEW", name: "Grand Hall", desc: "The main room of the house. Timber beams, a hand-forged chandelier and windows that run floor to ceiling. Good for toasts, a welcome, or the hour after dinner." },
    { img: "/images/cabin-entrance.webp", alt: "Small timber cabin with an open door beside a paved path and tall trees at ANEW", name: "Studio Cabin", desc: "A separate cabin reached by its own path. Teams use it for breakout sessions. Wedding parties use it to get dressed." },
    { img: "/images/master-bedroom.webp", alt: "Low timber bed with a backlit headboard under a ceiling fan at ANEW", name: "Master Suite", desc: "A king bed built from reclaimed timber with a backlit headboard. It is the most private of the seven bedrooms." },
    { img: "/images/gym-tonal-angle.webp", alt: "Gym with wall-mounted Tonal units, benches and a concrete wall at ANEW", name: "The Gym", desc: "Tonal strength systems on the wall, benches on the floor, and enough open space for a group stretch before the day starts." },
  ],
};

export const aroundTown: SplitFeatureContent = {
  image: { src: "/images/garden-paths.webp", alt: "Young flowering tree beside a gravel path and low green ground cover at ANEW" },
  eyebrow: "Around Kirkland",
  titleLines: ["Lake in the Morning,", "Forest by Afternoon"],
  paragraphs: [
    "Kirkland faces the water. Marina Park sits on the downtown waterfront, with a beach and a public dock. Elsewhere on the shore, Juanita Beach Park has a lakefront walking path, and Juanita Bay Park protects a stretch of wildlife habitat on the bay.",
    "The Cross Kirkland Corridor is a walking and cycling trail that runs through the city along a former rail line. It is an easy way for out-of-town guests to see Kirkland on foot before an event.",
    "ANEW is the other half of that day. Kenmore is at the top of the same lake, but the estate is all cedar, fern and stream. Guests who spend the morning by the water in Kirkland arrive here to something that looks nothing like it.",
  ],
  actions: [
    { kind: "link", label: "Read the Local Guide", href: "/local" },
    { kind: "link", label: "See Estate Experiences", href: "/experiences" },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-spread.webp", alt: "Bowls of salmon, salad and sides laid out on a kitchen counter at ANEW" },
  eyebrow: "Food",
  titleLines: ["Dinner Comes from", "the Next Room"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/kitchen-sink.webp", alt: "White farmhouse sink with copper taps under windows looking at the courtyard at ANEW" },
  eyebrow: "Chefs & Catering",
  titleLines: ["A Working Kitchen,", "Not a Warming Tray"],
  paragraphs: [
    "The Chef's Kitchen opens directly onto the courtyard, and resident chefs cook in it. Food goes from the stove to your table without a van ride in between.",
    "Menus change with the season and lean on local ingredients. If your company or your family already has a caterer, bring them. Outside vendors are welcome once we have approved them.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Find Your Event",
  title: "What Kirkland Groups Book",
  cards: [
    { img: "/images/gym-tonal-wide.webp", alt: "Long gym with Tonal units along a concrete wall and benches at ANEW", title: "Corporate Retreats", href: "/corporate-retreats", desc: "A team offsite away from the office and the usual conference room, with spaces to meet, eat and unwind." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Stone-ringed fire bowl and lounge chairs on the lawn before a copper-roofed cottage at ANEW", title: "Weddings", href: "/weddings", desc: "Ceremony on the lawn, dinner in the Pavilion, and bedrooms on site for the wedding party." },
    { img: "/images/interior-living-wide.webp", alt: "Sofas facing a lit fireplace under a chandelier in the Grand Hall at ANEW", title: "Birthday Parties", href: "/birthday-parties", desc: "A milestone year marked with a chef's dinner and a house full of the people you invited." },
    { img: "/images/spa-sauna-anew.webp", alt: "Cedar sauna benches under warm overhead light at ANEW", title: "Wellness Retreats", href: "/wellness-retreats", desc: "Sauna, cold plunge, movement in the Pavilion and quiet garden paths for a small group." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Check the Calendar",
  hint: "Pick an open date to get started",
  inquireLead: "Need a weekday for a team offsite, or a date further out?",
};

export const faq: FaqContent = {
  eyebrow: "Questions",
  title: "Kirkland Hosts Ask",
  faqs: [
    { q: "Is ANEW in Kirkland?", a: "No. ANEW is in Kenmore, the city that borders Kirkland to the north, where Lake Washington ends. We share exact arrival details with confirmed groups." },
    { q: "Is ANEW a good fit for a company offsite?", a: "Yes. Eastside teams use the Event Pavilion for the main session, the Studio Cabin for breakouts and the Grand Hall for meals. Our corporate retreats page goes into more detail." },
    { q: "Can we book a single day, without an overnight stay?", a: "Day events and overnight stays are both possible. Let us know which you have in mind and how many people are coming, and we will tell you what works." },
    { q: "We are getting married and most of our guests live in Kirkland. Does that work?", a: "It does. Guests can go home after the reception, and the estate has 7 bedrooms if the wedding party would like to stay on the property. See the weddings page for packages." },
    { q: "Will another event be happening while we are there?", a: "No. The estate takes one booking at a time, so the house, the Pavilion, the cabin, the spa and the grounds are yours for the length of your event." },
    { q: "Can guests use the spa during an event?", a: "The sauna, cold plunge and soaking tub are on the property. Massage and IV therapy are booked by appointment, so mention them when you inquire and we will schedule them into your day." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "See the Property",
  tiles: [
    { src: "/images/deer-woods.webp", alt: "Deer grazing on a mossy bank among tall trunks at ANEW", span: "feature" },
    { src: "/images/bathroom-soaker.webp", alt: "Freestanding white soaking tub by a window" },
    { src: "/images/cedar-path.webp", alt: "Bark path passing a large cedar trunk and ferns" },
    { src: "/images/catering-greens.webp", alt: "Bowl of green vegetables on a kitchen counter" },
    { src: "/images/interior-living.webp", alt: "Sofas and tall windows under a round iron chandelier", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/exterior-ferns.webp", alt: "Timber estate buildings behind ferns and garden plantings at ANEW" },
  titleLines: ["Host It Just", "North of Kirkland"],
  text: "Share the date, the occasion and a rough guest count. You will hear back from us within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Start with a Date",
  text: "Tell us what you are hosting and when. It is a short form with no deposit and no obligation, and it goes to a person on our team.",
  eventType: "",
  points: [
    "An answer within 24 hours",
    "One booking on the property at a time",
    "Help choosing rooms, food and spa time for your group",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Near Kirkland",
  note: "Estate, spa & event spaces",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const kirklandVenueLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch,
  spaces,
  extra: aroundTown,
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
