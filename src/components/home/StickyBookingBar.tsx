"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InquireLink from "@/components/InquireLink";
import { INQUIRY_FORM_ATTR } from "@/components/inquiry/InquiryForm";
import { prefetchFor } from "@/lib/links";
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
/** It slides away again near the end of the page, so it never sits on top of the footer's links. */
const HIDE_BEFORE_END_PX = 240;

/** True while any part of an inquiry form is on screen: the bar would sit on its fields or its Send button. */
function isInquiryFormOnScreen(): boolean {
  return Array.from(document.querySelectorAll(`[${INQUIRY_FORM_ATTR}]`)).some((form) => {
    const { top, bottom } = form.getBoundingClientRect();
    return bottom > 0 && top < window.innerHeight;
  });
}

function shouldShowBar(): boolean {
  const scrolled = window.scrollY;
  const distanceToEnd = document.documentElement.scrollHeight - (scrolled + window.innerHeight);
  return scrolled > REVEAL_AFTER_PX && distanceToEnd > HIDE_BEFORE_END_PX && !isInquiryFormOnScreen();
}

/** Mobile-only bar pinned to the bottom of the screen. */
export default function StickyBookingBar({ content }: { content: StickyBarContent }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(shouldShowBar());
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      // Off screen means out of reach too, so a hidden bar can't be tabbed to.
      inert={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-500 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="bg-dark/95 backdrop-blur-md px-4 min-[390px]:px-6 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-white text-sm font-heading whitespace-nowrap">{content.headline}</p>
          {/* The note only fits beside the buttons on wider phones. */}
          <p className="hidden min-[420px]:block text-white/60 text-[9px] tracking-[0.2em] uppercase whitespace-nowrap">{content.note}</p>
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
            prefetch={prefetchFor(content.cta.href)}
            className="text-[10px] tracking-[0.25em] uppercase bg-white text-dark px-5 py-2.5 hover:bg-accent hover:text-white transition-colors"
          >
            {content.cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
