"use client";

import { useSyncExternalStore } from "react";
import {
  audienceCookie,
  clearAudienceCookie,
  readAudience,
  type Audience,
  type AudienceDecision,
} from "@/lib/audience";

/** Fired on window whenever the audience cookie is written, so open components update. */
export const AUDIENCE_CHANGE_EVENT = "anew:audience-change";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(AUDIENCE_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(AUDIENCE_CHANGE_EVENT, onChange);
}

function readFromBrowser(): Audience | null {
  try {
    return readAudience(document.cookie);
  } catch {
    return null; // Cookies blocked: treat as a general visitor.
  }
}

// The static HTML is always the general site; the audience applies once the page is live in the browser.
const readOnServer = () => null;

/** The visitor's remembered audience, or null for a general visitor. */
export function useAudience(): Audience | null {
  return useSyncExternalStore(subscribe, readFromBrowser, readOnServer);
}

/** Writes (or clears) the audience cookie and tells open components about it. */
export function applyAudienceDecision(decision: AudienceDecision): void {
  if (decision.action === "keep") return;

  const options = { secure: window.location.protocol === "https:" };
  try {
    document.cookie =
      decision.action === "set" ? audienceCookie(decision.audience, options) : clearAudienceCookie(options);
    // Lets the header and links already on screen switch to the new audience.
    window.dispatchEvent(new Event(AUDIENCE_CHANGE_EVENT));
  } catch {
    // Cookies blocked: the visitor simply sees the general site.
  }
}
