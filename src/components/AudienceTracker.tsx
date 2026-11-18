"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { decideAudience } from "@/lib/audience";
import { applyAudienceDecision } from "@/lib/useAudience";

/** True when the visitor came from another page of this site (a link opened in a new tab, a reload after browsing). */
function cameFromThisSite(): boolean {
  try {
    return document.referrer !== "" && new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Sets the audience cookie when a visitor arrives from a tagged ad link
 * (?aud=corporate) or arrives on an audience page from outside the site, and
 * clears it on ?aud=reset. The rules live in src/lib/audience.ts. Renders nothing.
 */
export default function AudienceTracker() {
  const pathname = usePathname();
  // Only the first page of a full page load can be the page the visitor arrived on.
  const isFirstPage = useRef(true);

  useEffect(() => {
    const isEntryPage = isFirstPage.current && !cameFromThisSite();
    isFirstPage.current = false;
    applyAudienceDecision(decideAudience({ search: window.location.search, pathname, isEntryPage }));
  }, [pathname]);

  return null;
}
