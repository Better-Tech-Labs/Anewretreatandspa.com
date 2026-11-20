import { privateChefDinner } from "./how-a-private-chef-dinner-works";
import { planFamilyReunion } from "./how-to-plan-a-family-reunion";
import { bacheloretteWeekend } from "./plan-a-bachelorette-weekend-near-seattle";
import { planCorporateRetreat } from "./plan-a-corporate-retreat-near-seattle";
import { wellnessWeekend } from "./plan-a-wellness-weekend-with-friends";
import { weddingVenueQuestions } from "./questions-to-ask-a-small-wedding-venue";
import { saunaColdPlungeGuide } from "./sauna-and-cold-plunge-beginners-guide";
import { smallWeddingOrElopement } from "./small-wedding-or-elopement";
import { teamOffsiteIdeas } from "./team-offsite-ideas-near-seattle";
import type { BlogPost } from "./types";
import { weekendInKenmore } from "./weekend-in-kenmore-wa";

/** Every published article. Add new ones here; order doesn't matter. */
const POSTS: readonly BlogPost[] = [
  planCorporateRetreat,
  smallWeddingOrElopement,
  saunaColdPlungeGuide,
  weekendInKenmore,
  teamOffsiteIdeas,
  weddingVenueQuestions,
  bacheloretteWeekend,
  planFamilyReunion,
  privateChefDinner,
  wellnessWeekend,
];

/** Newest first. */
export const blogPosts: readonly BlogPost[] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
