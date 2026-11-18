"use client";

import Link from "next/link";
import { GENERAL_SITE_HREF } from "@/lib/audience";
import { applyAudienceDecision } from "@/lib/useAudience";

type Tone = "dark" | "light";

interface AudienceExitLinkProps {
  /** Sentence before the link, naming what else is on offer. */
  lead?: string;
  label?: string;
  /** "light" for dark backgrounds such as the footer. */
  tone?: Tone;
  className?: string;
}

const LEAD_TONE: Record<Tone, string> = {
  dark: "text-muted",
  light: "text-white/50",
};

const LINK_TONE: Record<Tone, string> = {
  dark: "text-dark border-dark/40 hover:text-accent hover:border-accent focus-visible:text-accent focus-visible:border-accent",
  light: "text-white/85 border-white/40 hover:text-white hover:border-white focus-visible:text-white focus-visible:border-white",
};

/**
 * The way out of an audience layout: forgets the audience and opens the general
 * site, so nobody is stuck in a version that isn't for them. The click is
 * picked up by AnalyticsListeners as cta_click.
 */
export default function AudienceExitLink({
  lead = "Planning a wedding, a spa day or a private stay?",
  label = "See everything ANEW offers",
  tone = "dark",
  className = "",
}: AudienceExitLinkProps) {
  return (
    <p className={`text-[13px] leading-relaxed ${LEAD_TONE[tone]} ${className}`}>
      {lead}{" "}
      <Link
        href={GENERAL_SITE_HREF}
        // Clearing here too means the header switches back at once, without waiting for the new page.
        onClick={() => applyAudienceDecision({ action: "clear" })}
        className={`border-b pb-px transition-colors duration-300 ${LINK_TONE[tone]}`}
      >
        {label}
      </Link>
    </p>
  );
}
