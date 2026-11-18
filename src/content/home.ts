/**
 * Words and photos for the general homepage. The section blocks in
 * src/components/home take this as input, so an audience-specific layout
 * (corporate, weddings, spa) is a second content file, not a second set of components.
 */
import type { AvailabilityContent } from "@/components/home/AvailabilitySection";
import type { ClosingCtaContent } from "@/components/home/ClosingCta";
import type { GalleryContent } from "@/components/home/GalleryPreview";
import type { HeroContent } from "@/components/home/HeroSection";
import type { ImageBandContent } from "@/components/home/ImageBand";
import type { IntroContent } from "@/components/home/IntroSection";
import type { OccasionsContent } from "@/components/home/OccasionCards";
import type { RoomsContent } from "@/components/home/RoomsGrid";
import type { SplitFeatureContent } from "@/components/home/SplitFeature";
import type { StickyBarContent } from "@/components/home/StickyBookingBar";
import type { TourContent } from "@/components/home/TourSection";

const BOOKING_HREF = "/booking";
const TOUR_HREF = "/#contact";
const GALLERY_HREF = "/gallery";

export const hero: HeroContent = {
  image: { src: "/images/exterior-hero.webp", alt: "ANEW" },
  eyebrow: "Pacific Northwest Retreat & Spa",
  titleLines: ["Where Strong", "Foundations Begin"],
  subtitle: "Retreats, weddings, wellness, and gatherings — minutes from Seattle.",
  priceNote: "Starting at $5,500 / night",
  primaryCta: { label: "Plan Your Celebration", href: BOOKING_HREF },
  secondaryCtas: [
    { label: "Explore the Estate", href: "/venue" },
    { label: "Schedule a Tour", href: TOUR_HREF },
  ],
  inquireLead: "Questions first?",
};

export const intro: IntroContent = {
  statement:
    "ANEW is a 5,800 sq ft retreat and spa on two woodland acres with a babbling brook that runs throughout the private estate — a place for private stays, weddings, wellness retreats, corporate escapes, and celebrations.",
  features: [
    "7 bedrooms",
    "White sandy beach",
    "Private stream",
    "Relaxing spa",
    "Wellness retreats",
    "Immersions",
    "Thermal pools",
    "Wet & dry sauna",
    "Elevated gym",
  ],
  inquireLabel: "Tell us what you're planning",
};

export const estate: SplitFeatureContent = {
  image: { src: "/images/interior-living-wide.webp", alt: "Grand living space" },
  eyebrow: "The Estate",
  titleLines: ["Rustic Grandeur,", "Modern Comfort"],
  paragraphs: [
    "Exposed timber beams, a hand-forged iron chandelier, and floor-to-ceiling windows that frame the forest. The Grand Hall seats many for a dinner you'll never forget — or opens wide for dancing beneath the stars.",
    "Every corner of ANEW tells a story through weathered barn wood, forged iron, and the quiet presence of old-growth timber.",
  ],
  actions: [{ kind: "link", label: "Explore Spaces", href: "/venue" }],
};

export const forestBand: ImageBandContent = {
  image: { src: "/images/tall-cedars.webp", alt: "Ancient cedars" },
  titleLines: ["Experience the Beating Heart", " of the Northwest"],
};

export const gather: SplitFeatureContent = {
  image: { src: "/images/outdoor-firepit-cabin.webp", alt: "Outdoor gathering space" },
  eyebrow: "Gather",
  titleLines: ["Celebrations", "Under the Canopy"],
  paragraphs: [
    "From private stays to boutique weddings on the ceremony lawn, white sandy beach, in the forest, to intimate dinners by the copper fire bowl, ANEW adapts to your vision. String lights drape the courtyard, the stream provides a natural soundtrack, and deer wander the grounds at dusk.",
    "Weddings, elopements, vow renewals, corporate retreats, birthday celebrations, graduation parties, 4th of July parties, anniversaries, baby showers, baptisms, girls spa getaways, wellness retreats, and private dinners — every gathering finds its perfect setting here.",
  ],
  actions: [
    { kind: "link", label: "Plan Your Event", href: BOOKING_HREF },
    { kind: "inquire", label: "Inquire About Weddings", inquireType: "Wedding" },
  ],
};

export const rooms: RoomsContent = {
  eyebrow: "Stay",
  title: "Welcome to Your Retreat",
  rooms: [
    { img: "/images/bedroom-garden.webp", name: "Garden Suite", desc: "King bed with French doors opening to the garden patio and a private en-suite rain shower", position: "calc(100% + 50px) center" },
    { img: "/images/master-bedroom.webp", name: "Master Suite", desc: "Reclaimed king bed, vaulted beam ceiling, and warm bedside lighting" },
    { img: "/images/bunkbeds.webp", name: "Bunk Room", desc: "Custom timber bunk beds with ladder, reclaimed wood throughout, and beautiful garden views" },
    { img: "/images/bedroom-master.webp", name: "Queen Suite", desc: "Rope-suspended queen bed that swings, antique chandelier, and vaulted ceilings" },
    { img: "/images/bedroom-hearth.webp", name: "Guest Cottage", desc: "Private guest cottage with a queen bed and three twins, exposed beams, a wood-burning stove, full kitchen, and pebbled rain shower" },
    { img: "/images/bathroom-soaker.webp", name: "Private Bath", desc: "Private soaking bath with exposed beams, wet sauna, and garden views" },
    { img: "/images/bathroom-shower.webp", name: "Rain Shower Suite", desc: "Glass walk-in shower with natural stone and soaking tub, complete with a relaxing wet sauna" },
    { img: "/images/interior-living-wide.webp", name: "Open Living", desc: "Kitchen, dining, and living area flow beneath timber beams with a barn wood coffered ceiling" },
    { img: "/images/hallway-barndoors.webp", name: "Gallery Hallway", desc: "Glass railings, sliding barn doors, and gorgeous woodland views at every turn" },
  ],
};

export const diningBand: ImageBandContent = {
  image: { src: "/images/catering-spread.webp", alt: "Farm to table dining" },
  eyebrow: "A Taste of ANEW",
  titleLines: ["Farm-to-Table Dining"],
};

export const dine: SplitFeatureContent = {
  image: { src: "/images/kitchen-sink.webp", alt: "Chef's kitchen" },
  eyebrow: "Dine",
  titleLines: ["From Our Kitchen", "to Your Table"],
  paragraphs: [
    "The estate's commercial-grade kitchen features a farmhouse sink, copper fixtures, and direct courtyard access — ready for your private chef or preferred caterer.",
    "Seasonal, locally sourced menus featuring fresh salmon, garden vegetables, and artisan preparations. From intimate plated dinners to relaxed family-style feasts under the stars. Allergy-specific menus available on request, alongside fresh-pressed juicing and hands-on cooking classes.",
  ],
  actions: [
    { kind: "button", label: "Book a Chef", href: "/inquire" },
    { kind: "link", label: "Learn More", href: BOOKING_HREF },
  ],
};

export const occasions: OccasionsContent = {
  eyebrow: "Group & Gather",
  title: "Your Occasion, Our Setting",
  cards: [
    { img: "/images/exterior-hero.webp", title: "Weddings", href: "/weddings", inquireType: "Wedding", desc: "Ceremony lawns flanked by towering trees, fire copper bowl receptions under string lights, and 13 beds for the wedding party." },
    { img: "/images/interior-living-wide.webp", title: "Retreats", href: "/corporate-retreats", inquireType: "Corporate Retreat", desc: "Inspire your team in a setting that sparks creativity. The Grand Hall, breakout spaces, and nature trails await." },
    { img: "/images/outdoor-seating.webp", title: "Celebrations", href: BOOKING_HREF, desc: "Boutique weddings, vow renewals, anniversaries, birthdays, graduation parties, 4th of July parties, baby showers, girls spa getaways, baptisms, private dinners, s'mores by the fire, etc. — every occasion finds its setting." },
  ],
};

export const availability: AvailabilityContent = {
  eyebrow: "Availability",
  title: "Find Your Date",
  hint: "Click a date to begin planning your event",
  inquireLead: "Date taken, or want to hold one?",
  closingNote:
    "ANEW Retreat & Spa is a distinctive retreat destination in the Pacific Northwest — a property that guests return to, that retreat leaders cultivate programs around, and that the wellness travel community recognizes as something genuinely rare.",
};

export const gallery: GalleryContent = {
  eyebrow: "Gallery",
  title: "A Glimpse of ANEW",
  tiles: [
    { src: "/images/exterior-wide.webp", alt: "Estate wide view", span: "feature" },
    { src: "/images/master-bedroom.webp", alt: "Master suite" },
    { src: "/images/creek.webp", alt: "Private stream" },
    { src: "/images/bathroom-soaker.webp", alt: "Spa bath" },
    { src: "/images/deer-garden.webp", alt: "Deer in the garden", span: "wide" },
  ],
  cta: { label: "View Full Gallery", href: GALLERY_HREF },
};

export const closingCta: ClosingCtaContent = {
  image: { src: "/images/forest-view.webp", alt: "ANEW" },
  titleLines: ["Begin Your", "ANEW Story"],
  text: "Let us help you craft an event as extraordinary as the setting.",
  primaryCta: { label: "Plan Your Celebration", href: BOOKING_HREF },
  secondaryCta: { label: "Schedule a Tour", href: TOUR_HREF },
  inquireLead: "Not ready to book?",
};

export const tour: TourContent = {
  eyebrow: "Visit",
  title: "Schedule a Tour",
  text: "Nothing compares to experiencing ANEW in person. Walk the grounds, feel the atmosphere, and envision your celebration.",
  location: "Kenmore, WA",
  phone: { label: "(206) 471-1243", href: "tel:+12064711243" },
  email: { label: "Admin@anewretreatandspa.com", href: "mailto:Admin@anewretreatandspa.com" },
};

export const stickyBar: StickyBarContent = {
  headline: "From $5,500/night",
  note: "Limited dates available",
  inquireLabel: "Inquire",
  cta: { label: "Book Now", href: BOOKING_HREF },
};
