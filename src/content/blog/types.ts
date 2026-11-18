/**
 * A blog article. Articles are plain data so they need no extra tooling:
 * add a file in this folder and list it in ./index.ts.
 *
 * Paragraphs and bullets may contain links written as [label](/path).
 */
export interface BlogSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  /** URL part: /blog/<slug>. Lowercase words joined by hyphens. */
  slug: string;
  title: string;
  /** One or two sentences for search results and the blog index. */
  description: string;
  /** Short label shown above the title, e.g. "Corporate Retreats". */
  category: string;
  /** Publish date, YYYY-MM-DD. */
  date: string;
  /** Last meaningful edit, YYYY-MM-DD. */
  updated?: string;
  image: { src: string; alt: string };
  /** Opening paragraphs before the first heading. */
  intro: readonly string[];
  sections: readonly BlogSection[];
  faqs?: readonly BlogFaq[];
  /** The next step offered at the end of the article. */
  cta: { heading: string; text: string; label: string; href: string };
}
