/**
 * Words and photos for the wellness retreat layout (/wellness-retreats).
 * Written for two readers: a group looking for a spa retreat near Seattle,
 * and a retreat leader looking for a venue to host their own program.
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
export const EVENT_TYPE = "Wellness Retreat";

/** Every "Inquire" button goes to the inquiry page, with Wellness Retreat already chosen. */
const INQUIRE_HREF = inquireHref(EVENT_TYPE);

export const meta = {
  title: "Wellness Retreats near Seattle | Private Estate & Spa | ANEW",
  description:
    "Plan a wellness retreat at ANEW, a private 7-bedroom estate and spa in Kenmore, WA. Sauna, cold plunge, yoga space and chefs. Retreat leaders welcome.",
  path: "/wellness-retreats",
};

export const hero: HeroContent = {
  image: { src: "/images/creek.webp", alt: "Stream running over a small rock ledge in the woods at ANEW" },
  eyebrow: "Wellness Retreats · Kenmore, Washington",
  titleLines: ["Wellness Retreats", "near Seattle"],
  titleScale: "long",
  subtitle: "A private estate with its own spa, a stream and old cedars. Come as a group, or bring the retreat you lead.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCtas: [
    { label: "See the Spaces", href: `#${SPACES_ANCHOR}` },
    { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
  ],
};

export const intro: IntroContent = {
  statement:
    "ANEW is a 5,800 sq ft estate and spa on two wooded acres in Kenmore. A retreat here has a hall for yoga, a sauna and cold plunge on the hillside, garden paths along a stream, and a chef cooking while you practice.",
  features: [
    "Private estate and spa",
    "7 bedrooms",
    "Wet & dry sauna",
    "Cedar cold plunge",
    "Soaking tub",
    "Event Pavilion for yoga",
    "Healing gardens",
    "Private chefs",
  ],
  inquireLabel: "Tell us about your retreat",
  inquireType: EVENT_TYPE,
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/stone-path-moss.webp", alt: "Mossy stepping stones leading through the gardens at ANEW" },
  eyebrow: "A Retreat That Stays Put",
  titleLines: ["Practice, Eat, Rest.", "All on One Property."],
  paragraphs: [
    "A lot of retreats near a city mean a studio in one place, a spa in another and a hotel somewhere else. Here the yoga floor, the sauna, the kitchen and the bedrooms are a short walk apart, so the day never gets broken up by a drive.",
    "The grounds do some of the work too. Stone paths wind through cedars, ferns and rhododendrons, with benches in the grove and seating beside the stream. Deer wander the grounds at dusk.",
  ],
  actions: [{ kind: "link", label: "Tour the Estate", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/deer-woods.webp", alt: "Two deer grazing between cedar trunks on the ANEW grounds" },
  titleLines: ["Quiet Enough", " to Hear the Stream"],
};

export const spaces: RoomsContent = {
  eyebrow: "Where the Retreat Happens",
  title: "Spaces for Moving, Soaking and Sitting Still",
  rooms: [
    { img: "/images/event-hall.webp", alt: "Empty Event Pavilion with timber beams and a polished concrete floor at ANEW", name: "Event Pavilion", desc: "The practice room. An open hall with a polished concrete floor and French doors onto the forest. Clear it for yoga or sound work, or bring in tables for a workshop." },
    { img: "/images/therapy-pools.webp", alt: "Small sauna cabin and cold plunge tubs on the wooded hillside at ANEW", name: "Sauna & Cold Plunge", desc: "The afternoon circuit. A cedar-lined sauna with the cold plunge beside it, set into the trees. Go in rounds as a group or slip out on your own." },
    { img: "/images/healing-gardens.webp", alt: "Flowering tree above ferns beside a gravel path in the gardens at ANEW", name: "Healing Gardens", desc: "Walking meditation and forest bathing. Stone paths, cedar grove benches and gathering areas along the way that suit a small class or a circle." },
    { img: "/images/gym-tonal-angle.webp", alt: "Gym with wall-mounted Tonal trainers and benches, open to the garden, at ANEW", name: "The Gym", desc: "Strength and stretch. Tonal training systems, a vibration plate, yoga mats and red light panels, with glass garage doors that open to the gardens." },
    { img: "/images/bathroom-shower.webp", alt: "Glass walk-in shower beside a freestanding soaking tub at ANEW", name: "Soaking Tub", desc: "Time alone. A private soaking tub and a rain shower for the hour between the last session and dinner." },
    { img: "/images/master-bedroom.webp", alt: "Master suite with a low timber bed under a vaulted ceiling at ANEW", name: "Bedrooms", desc: "Seven bedrooms on the estate, so the group wakes up on site and morning practice starts without anyone commuting in." },
  ],
};

export const sampleDay: SampleDayContent = {
  eyebrow: "A Sample Day",
  title: "One Day of a Retreat Here",
  text: "Your schedule is yours, or your teacher's. This is a common shape for a full day in the middle of a stay.",
  action: { kind: "link", label: "Plan Your Retreat", href: INQUIRE_HREF },
  items: [
    { time: "7:30", title: "Morning yoga", detail: "Mats down in the Event Pavilion with the doors open to the trees." },
    { time: "9:00", title: "Breakfast and fresh juice", detail: "Made in the estate kitchen while the group comes back from practice." },
    { time: "10:30", title: "Guided session", detail: "Meditation with crystal sound bowls, or forest bathing along the garden paths." },
    { time: "12:30", title: "Lunch together", detail: "A seasonal menu, with allergy-specific dishes when you ask ahead." },
    { time: "2:00", title: "Open afternoon", detail: "Massage by appointment, the soaking tub, a book on a bench by the stream." },
    { time: "4:00", title: "Sauna and cold plunge", detail: "Heat, cold, rest, repeat. As many rounds as you like." },
    { time: "6:30", title: "Dinner at one table", detail: "Cooked by a private chef, with nowhere to be afterward." },
    { time: "8:00", title: "Fire in the courtyard", detail: "Blankets, quiet talk, and an early night if you want one." },
  ],
};

export const leaders: SplitFeatureContent = {
  image: { src: "/images/interior-living-wide.webp", alt: "Grand Hall with two sofas facing a fireplace under timber beams at ANEW" },
  eyebrow: "For Retreat Leaders",
  titleLines: ["Bring Your Program.", "We Have the Place."],
  paragraphs: [
    "If you teach yoga, lead meditation or run a coaching or wellness practice, you can book the estate and run your own retreat here. You set the schedule and the content. We help with the rooms, the meals and the spa time around it.",
    "Use the Event Pavilion for group sessions, the Studio Cabin for one-on-one work, and the Grand Hall for opening and closing circles. Send us your dates, group size and a rough outline, and we'll tell you how it could fit.",
  ],
  actions: [
    { kind: "inquire", label: "Ask About Hosting a Retreat", inquireType: EVENT_TYPE },
    { kind: "link", label: "View Spa Experiences", href: "/experiences" },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-greens.webp", alt: "Bowl of asparagus with other dishes on the kitchen counter at ANEW" },
  eyebrow: "At the Table",
  titleLines: ["Food That Fits the Retreat"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/catering-salmon.webp", alt: "Platter of salmon with a green salad behind it at ANEW" },
  eyebrow: "Dine",
  titleLines: ["Cooked for Your Group,", "Around Your Schedule"],
  paragraphs: [
    "Private chefs cook in the estate kitchen with seasonal, locally sourced ingredients. Tell us how your group eats and the menu is planned to match, including allergy-specific dishes.",
    "Fresh-pressed juicing and hands-on cooking classes can be part of the program. If you work with your own caterer, approved outside vendors are welcome.",
  ],
  actions: [
    { kind: "button", label: "Inquire", href: INQUIRE_HREF },
    { kind: "link", label: "Meet the Chefs", href: "/chefs" },
  ],
};

export const formats: OccasionsContent = {
  eyebrow: "Built For",
  title: "Three Ways Groups Use ANEW",
  cards: [
    { img: "/images/stone-steps-grove.webp", alt: "Stepping stones curving through a cedar grove at ANEW", title: "Retreats You Lead", inquireType: EVENT_TYPE, desc: "Teachers, coaches and practitioners bringing their own students and their own schedule to a private venue." },
    { img: "/images/outdoor-seating.webp", alt: "Gravel fire circle beside the stream at sunset at ANEW", title: "Yoga & Meditation Weekends", inquireType: EVENT_TYPE, desc: "Movement in the morning, guided sessions in the gardens, and evenings by the fire." },
    { img: "/images/bathroom-soaker.webp", alt: "White freestanding soaking tub under a timber beam at ANEW", title: "Spa Getaways with Friends", inquireType: EVENT_TYPE, desc: "A small group, a loose plan, and most of the day spent between the sauna, the tub and the table." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Find Dates for Your Retreat",
  hint: "Click an open date to start a booking",
  inquireLead: "Planning a multi-day program or flexible on dates?",
  inquireType: EVENT_TYPE,
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "The Grounds and the Spa",
  tiles: [
    { src: "/images/twin-tree-stream-cabins.webp", alt: "Stream and mossy boulders under two tall trees, with the estate beyond", span: "feature" },
    { src: "/images/spa-sauna-anew.webp", alt: "Cedar sauna benches" },
    { src: "/images/creek-stream.webp", alt: "Stream winding through ground cover and trees" },
    { src: "/images/gym-tonal-wide.webp", alt: "Gym with four Tonal trainers" },
    { src: "/images/forest-view.webp", alt: "The estate seen through tall firs from the garden", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: "/gallery" },
};

export const faq: FaqContent = {
  eyebrow: "Planning Questions",
  title: "Wellness Retreat FAQ",
  faqs: [
    { q: "Can I host my own retreat at ANEW?", a: "Yes. Retreat leaders book the estate and run their own program here. If you're bringing outside teachers, practitioners or caterers, tell us in your inquiry. Outside vendors are approved before the event." },
    { q: "What spa and wellness facilities are on site?", a: "A wet and dry sauna, a cedar cold plunge, a private soaking tub, and a gym with Tonal strength systems, a vibration plate, yoga mats and red light panels. Massage and IV therapy are booked by appointment." },
    { q: "Can you arrange classes and guided sessions for us?", a: "Yes. Guided meditation with crystal sound bowls, forest bathing, outdoor yoga, and aromatherapy and sound sessions can be arranged. Tell us what you have in mind and we'll plan it with you." },
    { q: "Where do we practice if it rains?", a: "Indoors. The Event Pavilion and the Grand Hall both have room for a group, and the Pavilion's French doors still look out on the forest." },
    { q: "Can the kitchen handle dietary needs?", a: "Menus are seasonal and locally sourced, and allergy-specific menus are available on request. Share your group's needs when you inquire so the chef can plan around them." },
    { q: "How many people can a retreat bring?", a: "It depends on whether guests are staying overnight and how you plan to use the spaces. Tell us your dates and group size and we'll confirm what works." },
  ],
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/tall-cedars.webp", alt: "Looking up through tall cedars toward the estate roof at ANEW" },
  titleLines: ["Start Planning", "Your Retreat"],
  text: "Send your dates, your group size and what you'd like the days to hold. We reply personally within 24 hours.",
  primaryCta: { label: "Inquire", href: INQUIRE_HREF },
  secondaryCta: { label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF },
};

export const inquiry: InquirySectionContent = {
  eyebrow: "Inquire",
  title: "Tell Us About Your Retreat",
  text: "A few quick fields and no payment. Give us rough dates and a headcount, and say whether you're leading the retreat or attending one with friends.",
  eventType: EVENT_TYPE,
  points: [
    "A reply from a person within 24 hours",
    "Pricing based on your dates and group",
    "Chefs, spa time and sessions planned with you",
  ],
};

export const stickyBar: StickyBarContent = {
  headline: "Wellness retreats",
  note: "Private estate & spa",
  secondaryCta: { label: "Call", href: PHONE_HREF },
  cta: { label: "Inquire", href: INQUIRE_HREF },
};

/** The whole page, in the shape the shared landing layout takes. */
export const wellnessRetreatsLanding: LandingContent = {
  meta,
  hero,
  intro,
  pitch: estate,
  band: forestBand,
  spaces,
  day: sampleDay,
  extra: leaders,
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
