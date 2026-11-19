/** Shared shapes for the homepage section blocks, so each audience layout only supplies content. */

export interface SectionImage {
  src: string;
  alt: string;
  /** CSS object-position, for photos that need a custom crop. */
  position?: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

/**
 * A call to action under a block of copy. `describes` names what a vague label
 * such as "Learn More" leads to, for screen readers and search engines.
 */
export type SectionAction =
  | { kind: "link"; label: string; href: string; describes?: string }
  | { kind: "button"; label: string; href: string; describes?: string }
  | { kind: "inquire"; label: string; inquireType?: string };

/** Hooks read by AnalyticsListeners (section_view and cta_location). */
export interface SectionTracking {
  /** Value for data-track-section. */
  trackName?: string;
  /** Overrides the page's default event_type for clicks inside the section. */
  eventType?: string;
}
