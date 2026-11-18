/**
 * Tiny inline-link syntax for blog and page copy kept in content files:
 * "See our [corporate retreats](/corporate-retreats) page." Only site paths
 * and https links become links; anything else stays as plain text.
 */

export interface TextPart {
  text: string;
  /** Present when this part is a link. */
  href?: string;
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** A site path: one leading slash, not "//" or "/\\", which browsers treat as another host. */
const SITE_PATH_PATTERN = /^\/(?![/\\])/;

function isSafeHref(href: string): boolean {
  return SITE_PATH_PATTERN.test(href) || href.startsWith("https://");
}

export function parseInlineLinks(source: string): TextPart[] {
  const parts: TextPart[] = [];
  let cursor = 0;

  for (const match of source.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (!isSafeHref(href)) continue; // Left in place as plain text.
    if (start > cursor) parts.push({ text: source.slice(cursor, start) });
    parts.push({ text: label, href });
    cursor = start + whole.length;
  }
  if (cursor < source.length) parts.push({ text: source.slice(cursor) });
  return parts;
}

/** True for links that leave the site. */
export function isExternalHref(href: string): boolean {
  return href.startsWith("https://");
}
