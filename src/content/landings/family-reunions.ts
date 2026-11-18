/**
 * Words and photos for the family reunion layout (/family-reunions).
 * Also covers graduation parties, baby showers and holiday gatherings.
 *
 * Owner facts still to confirm before this goes live: how many people the
 * estate sleeps and seats, whether children and pets are welcome, parking,
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
export const EVENT_TYPE = "Family Gathering";

/** Every "Inquire" button goes to the inquiry page, with Family Gathering already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Family Reunion Venue near Seattle | Private Estate | ANEW",
  description:
    "Gather the whole family at ANEW, a private 7-bedroom estate on two wooded acres in Kenmore, WA. Private chefs, a fire pit, lawn games and a stream.",
  path: "/family-reunions",
};

export const hero: HeroContent = {
  image: { src: "/images/hero-exterior.webp", alt: "The timber buildings of the ANEW estate seen across ferns, with a basketball hoop on the gym" },
  eyebrow: "Family Reunions · Kenmore, Washington",
  titleLines: ["Family Reunion Venue", "near Seattle"],
  titleScale: "long",
  subtitle: "One private estate for every branch of the family. Stay together, eat together, and stop splitting up between hotels.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a private 5,800 sq ft estate with 7 bedrooms on two wooded acres in Kenmore. For a reunion, that means one house where the grandparents, the cousins and everyone in between wake up under the same roof and have somewhere to go all day.",
  features: [
    "Whole estate, one family",
    "7 bedrooms",
    "Bunk Room",
    "Guest Cottage",
    "Private chefs",
    "Fire pit & s'mores",
    "Games on hand",
    "Private stream",
  ],
  inquireLabel: "Tell us about your family",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-wide.webp", alt: "Tufted sofas under an iron chandelier, with windows onto the garden at ANEW" },
  eyebrow: "Everyone in One Place",
  titleLines: ["A House Big Enough", "for the Whole Family"],
  paragraphs: [
    "Reunions usually get planned around a restaurant booking and a park shelter, with relatives scattered across town in between. Here the gathering and the place to stay are the same address, so the visiting starts at breakfast and keeps going.",
    "The Grand Hall has sofas for the long catch-up conversations. Outside there are stone paths through the cedars, a stream where deer come to drink, and a courtyard with a fire pit for the evening. Chess, bocce, badminton, ping pong and board games are on hand when someone wants a rematch.",
  ],
  actions: [{ kind: "link", label: "Tour the Estate", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/deer-woods.webp", alt: "Deer grazing among cedar trunks on the ANEW grounds" },
  titleLines: ["Two Wooded Acres,", " All to Yourselves"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where the Family Gathers",
  title: "Room to Be Together, and Room to Step Away",
  rooms: [
    { img: "/images/interior-living-wide.webp", alt: "Sofas facing a lit fireplace under a round iron chandelier in the Grand Hall at ANEW", name: "Grand Hall", desc: "The living room for the weekend. Sofas around the fireplace for old photo albums, card games and the stories that get told every year." },
    { img: "/images/dining-room-leather.webp", alt: "Dining table ringed by leather chairs under pendant lights at ANEW", name: "Dining Room", desc: "Family dinner at one table, with the kitchen a few steps away. Good for the toast, the birthday cake and the second helping." },
    { img: "/images/bunkbeds.webp", alt: "Timber bunk beds with a ladder in the Bunk Room at ANEW", name: "Bunk Room", desc: "Custom timber bunks with ladders and garden views. This is the room the cousins will argue over." },
    { img: "/images/bedroom-hearth.webp", alt: "Bed beneath a loft stair with a small wood stove in the corner at ANEW", name: "Guest Cottage", desc: "A private cottage with its own kitchen and a wood-burning stove. A quieter spot for relatives who like an early night." },
    { img: "/images/outdoor-firepit-cabin.webp", alt: "Fire burning in the courtyard fire pit with lounge chairs and a red-roofed cabin behind at ANEW", name: "Courtyard & Fire Pit", desc: "Lounge seating and string lights around the fire. S'mores after dinner, then whoever stays up latest keeps it going." },
    { img: "/images/gym-exterior.webp", alt: "Basketball hoop above the open glass doors of the gym at ANEW", name: "Games & Hoop", desc: "Basketball, bocce, soccer, badminton and ping pong for the afternoon tournament. Chess and board games for anyone sitting it out." },
    { img: "/images/creek-stream.webp", alt: "Stream running between planted banks and cedars at ANEW", name: "Gardens & Stream", desc: "Stone paths, cedar grove benches and seating by the water. An easy walk for all generations, with native berries growing along the way." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Day",
  title: "A Reunion Day at the Estate",
  text: "Your family sets the pace. This is one way a full day together can go.",
  action: { kind: "link", label: "Plan Your Reunion", href: INQUIRE_HREF },
  items: [
    { time: "9:00", title: "Slow breakfast", detail: "People drift into the kitchen and Grand Hall as they wake up. Nobody has to drive anywhere to meet." },
    { time: "10:30", title: "Walk the grounds", detail: "Stone paths through the cedars and down to the stream. Keep an eye out for deer." },
    { time: "12:30", title: "Lunch in the courtyard", detail: "Outside when the weather is kind, at the dining table when it isn't." },
    { time: "2:00", title: "The family tournament", detail: "Bocce, badminton and basketball outside, chess and ping pong for the indoor crowd." },
    { time: "4:00", title: "Quiet hour", detail: "Sauna and cold plunge for some, a nap or a bench by the water for others." },
    { time: "6:00", title: "Family dinner", detail: "A private chef cooks in the estate kitchen and everyone sits down at once." },
    { time: "8:00", title: "S'mores at the fire pit", detail: "Blankets, string lights and the stories that only come out after dark." },
  ],
};

export const wellness: SplitFeatureContent = {
  image: { src: "/images/therapy-pools.webp", alt: "Sauna cabin and cold plunge set among the trees at ANEW" },
  eyebrow: "An Hour to Yourself",
  titleLines: ["A Spa Down", "the Garden Path"],
  paragraphs: [
    "Somebody always organizes the reunion, and they rarely get to sit down. The spa is on the property, so an hour away from the group is a short walk instead of a day trip.",
    "There is a wet and dry sauna, a cold plunge, a private soaking tub and a gym with Tonal strength systems. Massage is available by appointment, so ask early if several relatives want a turn.",
  ],
  actions: [
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
    { kind: "inquire", label: "Ask About Spa Time for Your Group", inquireType: EVENT_TYPE },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-salmon.webp", alt: "Platter of salmon with a green salad behind it, prepared at ANEW" },
  eyebrow: "Family Dinner",
  titleLines: ["Nobody Stuck in the Kitchen"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/catering-spread.webp", alt: "Salmon, salads and side dishes set out on the kitchen island at ANEW" },
  eyebrow: "Dine",
  titleLines: ["Family-Style Meals,", "Cooked for You"],
  paragraphs: [
    "At most reunions the same two people cook all weekend. Bring in a private chef and they get to sit at the table with everyone else.",
    "Menus are seasonal and locally sourced, served plated or family style, with allergy-specific options on request. If your family has a caterer it loves, approved outside vendors are welcome. Hands-on cooking classes can be arranged too, for the relatives who would rather be in the kitchen.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
    { kind: "link", label: "Planning a Private Dinner?", href: "/private-dinners" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "Every Kind of Family Gathering",
  cards: [
    { img: "/images/exterior-courtyard-new.webp", alt: "Courtyard seating and string lights in front of the timber estate at ANEW", title: "Graduation Parties", inquireType: EVENT_TYPE, desc: "Celebrate the graduate with both sides of the family in the courtyard, and room for photos on the lawn." },
    { img: "/images/garden-flowers.webp", alt: "Cabin behind a blooming rhododendron and a red maple at ANEW", title: "Baby Showers", inquireType: EVENT_TYPE, desc: "An afternoon in the gardens or the Event Pavilion, with a chef handling lunch so the hosts can enjoy it." },
    { img: "/images/interior-openplan.webp", alt: "Fireplace, sofas and iron chandelier in the living room at ANEW", title: "Holiday Gatherings", inquireType: EVENT_TYPE, desc: "A fireplace, one big table and bedrooms on site, so the holiday doesn't end with a long drive home." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Find a Date That Works for Everyone",
  hint: "Choose an open date to start a booking",
  inquireLead: "Still polling the family on dates?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "Around the Estate",
  tiles: [
    { src: "/images/forest-view.webp", alt: "The estate seen from the garden slope through tall firs", span: "feature" },
    { src: "/images/bunk-rope-ladder.webp", alt: "Timber bunk beds with a ladder and a red rug" },
    { src: "/images/creek.webp", alt: "Small waterfall on the stream" },
    { src: "/images/bedroom-garden.webp", alt: "Bedroom with French doors onto the garden" },
    { src: "/images/twin-tree-stream-cabins.webp", alt: "Stream and mossy boulders below the cabins", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Family Reunion FAQ",
  faqs: [
    { q: "Can the whole family stay overnight?", a: "The estate has 7 bedrooms, including a bunk room and a separate guest cottage. Tell us your dates and how many people are coming, and we'll confirm how your group fits." },
    { q: "How far ahead should we book a reunion?", a: "For May through October we recommend booking 6 to 12 months ahead. Off-season dates may be available on shorter notice, so it is worth asking." },
    { q: "What happens if it rains?", a: "The Grand Hall and the Event Pavilion give you indoor space for meals, games and group photos, and outdoor plans can move inside with advance notice." },
    { q: "Is the estate easy to get around for older relatives?", a: "The main floor, Grand Hall, courtyard and fire pit are all at ground level. Contact us about specific accessibility needs and we'll talk them through with you." },
    { q: "Can we bring our own caterer?", a: "Yes. Outside vendors are welcome once they have been approved by ANEW before the event. Private chefs can also cook on site, subject to availability." },
    { q: "Can we host a shorter gathering, like a baby shower or graduation party?", a: "Yes, we host graduation parties, baby showers and other family celebrations. Send us the date and your group size and we'll suggest a setup that suits it." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/forest-approach.webp", alt: "The ANEW estate seen through tall evergreens from the garden" },
  titleLines: ["Get the Whole", "Family Together"],
  text: "Send us your dates and a rough count of who's coming. We'll help you work out the rest.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Family Gathering",
  text: "A few details are enough to start. No payment and no commitment. Share rough dates and group size and we'll reply with what's possible.",
  eventType: EVENT_TYPE,
  points: [
    "A personal reply from the estate",
    "Rooms, meals and group size talked through with you",
    "Help choosing dates if the family is still deciding",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Family reunions",
  note: "Private estate",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const familyReunionsLanding: LandingContent = {
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
