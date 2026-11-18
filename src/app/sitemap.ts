import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { LANDING_PAGES } from "@/lib/landingPages";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

interface Route {
  path: string;
  priority: number;
  /** YYYY-MM-DD when known; otherwise the build date is used. */
  lastModified?: string;
}

const BLOG_POST_PRIORITY = 0.6;

/** Indexable routes only. Landing pages and blog articles are added from their own lists. */
const STATIC_ROUTES: Route[] = [
  { path: "/", priority: 1.0 },
  { path: "/venue", priority: 0.9 },
  { path: "/experiences", priority: 0.9 },
  { path: "/packages", priority: 0.8 },
  { path: "/inquire", priority: 0.8 },
  { path: "/gallery", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/chefs", priority: 0.6 },
  { path: "/local", priority: 0.6 },
  { path: "/team", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const routes: Route[] = [
    ...STATIC_ROUTES,
    ...LANDING_PAGES.map(({ path, priority }) => ({ path, priority })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: BLOG_POST_PRIORITY,
      lastModified: post.updated ?? post.date,
    })),
  ];

  return routes.map(({ path, priority, lastModified }) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: lastModified ? new Date(lastModified) : buildDate,
    priority,
  }));
}
