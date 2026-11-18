import Link from "next/link";
import type { ReactNode } from "react";
import { inquireHref } from "@/lib/inquire";
import { eventTypeFromForm } from "@/lib/analytics";

/**
 * Small, low-commitment path to the inquiry form, placed beside "Book" CTAs and
 * wherever a visitor is likely to have a question. Clicks are picked up by
 * AnalyticsListeners as cta_click (link_url + section), so no tracking here.
 *
 * - inline: muted lead-in sentence + underlined link ("Not ready to book? Send an inquiry")
 * - label:  tiny uppercase underlined link, like the existing "Learn More" links
 */
type Variant = "inline" | "label";
type Tone = "dark" | "light";
type Size = "sm" | "md";

interface InquireLinkProps {
  /** Pre-selects this event type on the form. Must match EVENT_TYPES, otherwise ignored. */
  type?: string;
  /** Lead-in sentence for the inline look, e.g. "Not ready to book?". */
  lead?: string;
  children?: ReactNode;
  variant?: Variant;
  /** "light" for text over photos. */
  tone?: Tone;
  /** Label size: "sm" matches the 10px card links, "md" the 11px section links. */
  size?: Size;
  className?: string;
}

const MOTION = "transition-colors duration-300";

const LABEL_SIZE: Record<Size, string> = {
  sm: "text-[10px] pb-0.5",
  md: "text-[11px] pb-1",
};

const LABEL_TONE: Record<Tone, string> = {
  dark: "text-dark border-dark hover:text-accent hover:border-accent focus-visible:text-accent focus-visible:border-accent",
  light: "text-white/85 border-white/50 hover:text-white hover:border-white focus-visible:text-white focus-visible:border-white",
};

const INLINE_LINK_TONE: Record<Tone, string> = {
  dark: "text-dark border-dark/40 hover:text-accent hover:border-accent focus-visible:text-accent focus-visible:border-accent",
  light: "text-white border-white/50 hover:border-white focus-visible:border-white",
};

const INLINE_LEAD_TONE: Record<Tone, string> = {
  dark: "text-muted",
  light: "text-white/70",
};

export default function InquireLink({
  type,
  lead,
  children = "Send an inquiry",
  variant = "inline",
  tone = "dark",
  size = "md",
  className = "",
}: InquireLinkProps) {
  const href = inquireHref(type);
  // Read by AnalyticsListeners so cta_click reports wedding/corporate/… instead of the page default.
  const eventType = type ? eventTypeFromForm(type) : undefined;

  if (variant === "label") {
    return (
      <Link
        href={href}
        data-event-type={eventType}
        className={`tracking-[0.3em] uppercase border-b ${LABEL_SIZE[size]} ${LABEL_TONE[tone]} ${MOTION} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <p className={`text-[13px] leading-relaxed ${INLINE_LEAD_TONE[tone]} ${className}`}>
      {lead && <>{lead} </>}
      <Link href={href} data-event-type={eventType} className={`border-b pb-px ${INLINE_LINK_TONE[tone]} ${MOTION}`}>
        {children}
      </Link>
    </p>
  );
}
