"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InquireLink from "@/components/InquireLink";
import type { CtaLink } from "./types";

export interface StickyBarContent {
  headline: string;
  note: string;
  /** Small link beside the button: the inquiry form by default. */
  inquireLabel?: string;
  inquireType?: string;
  /** Replaces the inquire link, e.g. a phone number when the button already goes to the form. */
  secondaryCta?: CtaLink;
  cta: CtaLink;
}

/** The bar slides in once the visitor has scrolled past the hero. */
const REVEAL_AFTER_PX = 600;

/** Mobile-only bar pinned to the bottom of the screen. */
export default function StickyBookingBar({ content }: { content: StickyBarContent }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > REVEAL_AFTER_PX);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-500 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="bg-dark/95 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-heading">{content.headline}</p>
          <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">{content.note}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {content.secondaryCta ? (
            <a
              href={content.secondaryCta.href}
              className="text-[10px] tracking-[0.3em] uppercase text-white/85 border-b border-white/50 pb-0.5 hover:text-white hover:border-white transition-colors duration-300"
            >
              {content.secondaryCta.label}
            </a>
          ) : (
            <InquireLink variant="label" tone="light" size="sm" type={content.inquireType}>
              {content.inquireLabel}
            </InquireLink>
          )}
          <Link
            href={content.cta.href}
            className="text-[10px] tracking-[0.25em] uppercase bg-white text-dark px-5 py-2.5 hover:bg-accent hover:text-white transition-colors"
          >
            {content.cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
