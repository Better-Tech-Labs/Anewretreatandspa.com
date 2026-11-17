import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/** Indexable routes only. Add new landing pages here. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/venue", priority: 0.9 },
  { path: "/experiences", priority: 0.9 },
  { path: "/packages", priority: 0.8 },
  { path: "/inquire", priority: 0.8 },
  { path: "/gallery", priority: 0.7 },
  { path: "/chefs", priority: 0.6 },
  { path: "/local", priority: 0.6 },
  { path: "/team", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified,
    priority,
  }));
}
