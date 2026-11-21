/**
 * Words and photos for the elopement and micro wedding layout (/elopements).
 *
 * Owner facts still to confirm before this goes live: the largest group that
 * counts as a micro wedding, whether an officiant or photographer can be
 * arranged by the estate, whether a ceremony-only visit is offered, and
 * whether to show a price. Nothing here states those yet.
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
export const EVENT_TYPE = "Elopement";

/** Every "Inquire" button goes to the inquiry page, with Elopement already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Elopement Venue near Seattle | Micro Weddings | ANEW",
  description:
    "Elope at ANEW, a private estate on two wooded acres in Kenmore, WA. Say your vows by the stream or under the cedars, then stay for a chef's dinner.",
  path: "/elopements",
};

export const hero: HeroContent = {
  image: { src: "/images/outdoor-seating.webp", alt: "Garden at sunset with a small fire on a gravel terrace and a stream in front at ANEW" },
  eyebrow: "Elopements & Micro Weddings · Kenmore, Washington",
  titleLines: ["Elopement Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "Vows under old cedars, a stream nearby, and nobody watching who you didn't invite.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "Eloping near Seattle usually means a courthouse or a public park. ANEW is a third choice: a private estate in Kenmore with gardens, a stream and a cedar grove, where the two of you can marry with a few guests or with none.",
  features: [
    "Private grounds",
    "Cedar grove",
    "Streamside spots",
    "Studio Cabin",
    "Dinner by a resident chef",
    "Sauna & cold plunge",
    "Stay the night",
    "Kenmore, Washington",
  ],
  inquireLabel: "Tell us about your elopement",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/creek-stream.webp", alt: "Stream winding between garden beds and cedar trunks at ANEW" },
  eyebrow: "Elope on a Private Estate",
  titleLines: ["Skip the Production,", "Keep the Ceremony"],
  paragraphs: [
    "An elopement drops the seating chart, the head table and the months of planning. What stays is the part that matters: the two of you, the words, and a place worth remembering them in.",
    "Here that place is two wooded acres with stone paths, ferns and rhododendrons, and a stream running through. Choose your spot, bring an officiant and a photographer, and take as long as you like. No one is waiting for the room.",
    "A micro wedding works the same way with a short guest list. If the list keeps growing, have a look at our small weddings page.",
  ],
  actions: [
    { kind: "link", label: "Walk the Grounds", href: "/venue" },
    { kind: "link", label: "See Small Weddings", href: "/weddings" },
  ],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/deer-woods.webp", alt: "Two deer grazing between cedar trunks on the grounds at ANEW" },
  titleLines: ["Old Cedars, a Stream,", "and Not Much Else"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where to Say It",
  title: "Pick a Spot for Your Vows",
  rooms: [
    { img: "/images/stone-path-moss.webp", alt: "Mossy stepping stones leading through ferns toward the cedars at ANEW", name: "Garden Paths & Cedar Grove", desc: "Vows in the trees. Stone paths wind past ferns and rhododendrons to benches under the cedars, with small clearings sized for two people and an officiant." },
    { img: "/images/creek.webp", alt: "Shallow stream spilling over a rock ledge in the woods at ANEW", name: "The Stream", desc: "Vows by the water. There is seating along the bank, and the sound of the stream covers everything else." },
    { img: "/images/exterior-wide.webp", alt: "Open lawn in front of the timber estate at ANEW", name: "Ceremony Lawn", desc: "For a micro wedding. Open grass in front of the house, with enough room for a few rows of chairs and a clear aisle." },
    { img: "/images/cabin-entrance.webp", alt: "Small timber cabin with open doors beside tall trees at ANEW", name: "Studio Cabin", desc: "Where you get dressed. A cabin apart from the main house, handy if you want to stay out of each other's sight until the ceremony." },
    { img: "/images/courtyard-firepit.webp", alt: "Courtyard seating and fire pit in front of the estate at ANEW", name: "Courtyard & Fire Pit", desc: "Afterward. Open a bottle, sign the paperwork, and sit by the fire while it sinks in." },
    { img: "/images/bedroom-master.webp", alt: "Queen bed hung from ropes beneath a chandelier at ANEW", name: "Queen Suite", desc: "The wedding night. A queen bed suspended on ropes so it sways, under a chandelier and a vaulted ceiling." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Elopement",
  title: "An Afternoon, an Evening, a Morning",
  text: "There is no set schedule for an elopement here. This is one version, for a couple who stays the night.",
  action: { kind: "link", label: "Plan Your Elopement", href: INQUIRE_HREF },
  items: [
    { time: "2:00", title: "Arrive", detail: "Drop your bags, walk the paths, and settle on the exact spot now that you can see the light." },
    { time: "3:00", title: "Get dressed", detail: "One of you in the Studio Cabin, one in the house. Your photographer goes between the two." },
    { time: "4:30", title: "Vows", detail: "In the cedars or beside the stream, with your officiant and whoever you brought along." },
    { time: "5:00", title: "Portraits", detail: "Along the garden paths while the sun is low. Deer sometimes wander through around dusk." },
    { time: "6:30", title: "Wedding dinner", detail: "Several courses cooked by a resident chef, served by the fire, in the Grand Hall or outside." },
    { time: "8:30", title: "Fire and a soak", detail: "Time at the fire pit, then the soaking tub." },
    { time: "Morning", title: "Married", detail: "Sauna, cold plunge, coffee. Nowhere to be." },
  ],
};

export const wellness: SplitFeatureContent = {
  image: { src: "/images/therapy-pools.webp", alt: "Small sauna cabin with plunge tubs set into the garden at ANEW" },
  eyebrow: "Honeymoon, Day One",
  titleLines: ["Start Married Life", "in the Sauna"],
  paragraphs: [
    "Most couples leave their wedding tired. Elope here and the first thing you do as a married couple can be nothing at all.",
    "The spa is on the grounds: a wet and dry sauna, a cold plunge beside it, and a private soaking tub. Massage can be booked for one or as a couple, by appointment.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About Massage for Two", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-salmon.webp", alt: "Sliced salmon on a dark platter with salad and sauces at ANEW" },
  eyebrow: "The First Meal",
  titleLines: ["A Wedding Dinner", "at a Table for Two"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/dining-room-leather.webp", alt: "Dining room with leather chairs, timber beams and garden windows at ANEW" },
  eyebrow: "Dine",
  titleLines: ["No Reservation,", "No Drive"],
  paragraphs: [
    "Book a resident chef and your wedding dinner is a multi-course meal made from local ingredients, a few steps from where you said your vows. Eat fireside, in the Grand Hall, or outdoors on a clear night.",
    "Bringing a few guests? The same dinner scales to one shared table. Let us know about allergies or foods you avoid when you inquire.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "How Couples Elope Here",
  title: "Three Ways to Keep It Small",
  cards: [
    { img: "/images/garden-paths.webp", alt: "Flowering tree beside a curved gravel path in the gardens at ANEW", title: "Just the Two of You", inquireType: EVENT_TYPE, desc: "You, your partner, an officiant and a camera. Vows in the garden, dinner after, and no one to host." },
    { img: "/images/interior-living.webp", alt: "Sofas under an iron chandelier with tall windows onto the trees at ANEW", title: "Micro Weddings", inquireType: EVENT_TYPE, desc: "Parents, siblings, a best friend or two. A short ceremony on the lawn and one table for dinner." },
    { img: "/images/master-bedroom.webp", alt: "King bed with a lit timber headboard under a vaulted ceiling at ANEW", title: "Elope and Stay", inquireType: EVENT_TYPE, desc: "Marry in the afternoon and make the estate your first night away, with the spa waiting when you wake up." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Pick Your Day",
  hint: "Click an open date to begin",
  inquireLead: "Eloping soon, or flexible on the date?",
  inquireType: EVENT_TYPE,
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Elopement FAQ",
  faqs: [
    { q: "Can we elope with no guests at all?", a: "Yes. Plenty of couples want it to be only the two of them. Let us know that when you inquire and we'll plan around it." },
    { q: "How many people can come to a micro wedding?", a: "That depends on where you hold the ceremony and whether guests stay for dinner or overnight. Share your number when you get in touch and we'll say plainly whether it fits." },
    { q: "Do we need to bring our own officiant and photographer?", a: "You are welcome to bring both. Outside vendors are approved by us before the day, and we keep a preferred vendor list we can share if you are still looking." },
    { q: "Where on the estate can we hold the ceremony?", a: "Couples marry on the lawn, in the forest, or along the stream. If the weather turns, the Grand Hall and the Event Pavilion are indoors." },
    { q: "Can we stay the night after we elope?", a: "Yes. The estate has 7 bedrooms, including a Master Suite and a Queen Suite. Tell us your date and whether guests are staying too, and we'll confirm the options." },
    { q: "How soon can we elope?", a: "Reservations need at least 3 days' notice, and May through October fills early. Ask about your date and we'll let you know what is open." },
  ],
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "Around the Grounds",
  tiles: [
    { src: "/images/outdoor-firepit-cabin.webp", alt: "Fire pit and lounge chairs on the courtyard lawn", span: "feature" },
    { src: "/images/stone-path-moss.webp", alt: "Mossy stone path through the garden" },
    { src: "/images/bathroom-soaker.webp", alt: "Freestanding soaking tub by a window" },
    { src: "/images/deer-garden.webp", alt: "Deer standing among the cedars" },
    { src: "/images/twin-tree-stream-cabins.webp", alt: "Twin tree trunks and mossy rocks by the stream, with the estate behind", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/maple-uplit-night.webp", alt: "Maple tree lit from below along a garden path at night at ANEW" },
  titleLines: ["Elope Among", "the Cedars"],
  text: "Give us a date and tell us who is coming, even if that is no one. Expect a personal reply within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Elopement",
  text: "A few lines is enough. No payment and no obligation. Give us a date, say whether it is the two of you or a small group, and we'll take it from there.",
  eventType: EVENT_TYPE,
  formLocation: "elopements_bottom",
  showBookLink: true,
  points: [
    "An answer from a person within 24 hours",
    "Help choosing a ceremony spot",
    "Dinner, spa time and a room arranged with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Elopements",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const elopementsLanding: LandingContent = {
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
