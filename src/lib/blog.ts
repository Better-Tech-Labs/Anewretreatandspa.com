/** Small pure helpers for the blog, kept free of content imports so they can be tested. */

const WORDS_PER_MINUTE = 220;

interface Readable {
  intro: readonly string[];
  sections: readonly { heading: string; paragraphs: readonly string[]; bullets?: readonly string[] }[];
  faqs?: readonly { q: string; a: string }[];
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Whole minutes to read an article, never less than one. */
export function readingMinutes(post: Readable): number {
  const texts = [
    ...post.intro,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...(post.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ];
  const words = texts.reduce((total, text) => total + countWords(text), 0);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-11-18" -> "November 18, 2026". Built by hand so server and browser always agree. */
export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const monthName = MONTHS[month - 1];
  if (!year || !monthName || !day) return isoDate;
  return `${monthName} ${day}, ${year}`;
}
