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
];

export const LANDING_PATHS: readonly string[] = LANDING_PAGES.map((page) => page.path);
