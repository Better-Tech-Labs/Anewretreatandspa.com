import { planCorporateRetreat } from "./plan-a-corporate-retreat-near-seattle";
import { saunaColdPlungeGuide } from "./sauna-and-cold-plunge-beginners-guide";
import { smallWeddingOrElopement } from "./small-wedding-or-elopement";
import type { BlogPost } from "./types";
import { weekendInKenmore } from "./weekend-in-kenmore-wa";

/** Every published article. Add new ones here; order doesn't matter. */
const POSTS: readonly BlogPost[] = [planCorporateRetreat, smallWeddingOrElopement, saunaColdPlungeGuide, weekendInKenmore];

/** Newest first. */
export const blogPosts: readonly BlogPost[] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
