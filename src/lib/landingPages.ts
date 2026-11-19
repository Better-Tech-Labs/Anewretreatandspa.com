import type { EventType } from "./analytics.ts";

/**
 * Every occasion landing page on the site. One list, so the sitemap, the
 * header (these pages open on a dark photo) and analytics stay in step.
 * The page content lives in src/content/landings.
 */
export interface LandingPageRef {
  path: string;
  /** Analytics bucket for events fired on this page. */
  analytics: EventType;
  /** Sitemap priority. */
  priority: number;
}

export const LANDING_PAGES: readonly LandingPageRef[] = [
  { path: "/corporate-retreats", analytics: "corporate", priority: 0.9 },
  { path: "/weddings", analytics: "wedding", priority: 0.9 },
  { path: "/wellness-retreats", analytics: "spa", priority: 0.9 },
  { path: "/elopements", analytics: "wedding", priority: 0.8 },
  { path: "/anniversaries", analytics: "general", priority: 0.8 },
  { path: "/birthday-parties", analytics: "general", priority: 0.8 },
  { path: "/bachelorette-parties", analytics: "spa", priority: 0.8 },
  { path: "/family-reunions", analytics: "general", priority: 0.8 },
  { path: "/private-dinners", analytics: "dining", priority: 0.8 },
  // Town pages: every occasion, aimed at people searching by place.
  { path: "/kenmore-event-venue", analytics: "general", priority: 0.7 },
  { path: "/bothell-event-venue", analytics: "general", priority: 0.7 },
  { path: "/woodinville-event-venue", analytics: "general", priority: 0.7 },
  { path: "/kirkland-event-venue", analytics: "general", priority: 0.7 },
];

export const LANDING_PATHS: readonly string[] = LANDING_PAGES.map((page) => page.path);

/** The header's Occasions menu: every occasion page, in the order visitors ask for them. */
export const OCCASION_LINKS: readonly { label: string; href: string }[] = [
  { label: "Weddings", href: "/weddings" },
  { label: "Elopements", href: "/elopements" },
  { label: "Corporate Retreats", href: "/corporate-retreats" },
  { label: "Wellness Retreats", href: "/wellness-retreats" },
  { label: "Bachelorette Parties", href: "/bachelorette-parties" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Anniversaries", href: "/anniversaries" },
  { label: "Family Reunions", href: "/family-reunions" },
  { label: "Private Dinners", href: "/private-dinners" },
  { label: "Wedding Packages", href: "/packages" },
];
