"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { eventTypeForPath, isEventType, track, type EventType } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 90];
const SECTION_VISIBLE_MS = 1000;
const SECTION_MIN_RATIO = 0.5;
const SECTION_OBSERVER_STEPS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const MAX_LABEL_LENGTH = 80;

function labelFor(el: Element): string {
  const text = (el.textContent || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
  return text.slice(0, MAX_LABEL_LENGTH);
}

function locationFor(el: Element): string {
  if (el.closest("header, nav")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("aside")) return "sidebar";
  const named = el.closest("[data-track-section]");
  if (named) return named.getAttribute("data-track-section") || "page";
  const section = el.closest("section");
  if (!section) return "page";
  if (section.id) return section.id;
  return section === document.querySelector("main section") ? "hero" : "page";
}

function eventTypeFor(el: Element, path: string): EventType {
  const declared = el.closest("[data-event-type]")?.getAttribute("data-event-type");
  return isEventType(declared) ? declared : eventTypeForPath(path);
}

function isBookingLink(anchor: HTMLAnchorElement): boolean {
  try {
    const url = new URL(anchor.href, window.location.origin);
    return url.origin === window.location.origin && url.pathname.replace(/\/$/, "") === "/booking";
  } catch {
    return false;
  }
}

function handleClick(event: MouseEvent): void {
  const target = event.target instanceof Element ? event.target : null;
  const el = target?.closest<HTMLElement>("a[href], button[data-cta]");
  if (!el) return;

  const path = window.location.pathname;
  const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") || "" : "";
  const base = {
    cta_text: labelFor(el),
    cta_location: locationFor(el),
    event_type: eventTypeFor(el, path),
  };

  if (href.startsWith("tel:")) {
    track("phone_click", { cta_location: base.cta_location, event_type: base.event_type });
    return;
  }
  if (href.startsWith("mailto:")) {
    track("email_click", { cta_location: base.cta_location, event_type: base.event_type });
    return;
  }

  track("cta_click", { ...base, link_url: href });
  if (el instanceof HTMLAnchorElement && isBookingLink(el)) {
    track("booking_start", base);
  }
}

function useClickTracking(): void {
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}

function useScrollDepth(pathname: string): void {
  useEffect(() => {
    const sent = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          track("scroll_depth", { percent_scrolled: threshold });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}

function useSectionViews(pathname: string): void {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sent = new Set<string>();
    const timers = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = entry.target.getAttribute("data-track-section");
          if (!name || sent.has(name)) continue;
          // Sections taller than two viewports can never be half visible, so
          // filling half the viewport counts as well.
          const halfVisible =
            entry.intersectionRatio >= SECTION_MIN_RATIO ||
            entry.intersectionRect.height >= window.innerHeight * SECTION_MIN_RATIO;
          const pending = timers.get(entry.target);

          if (halfVisible && pending === undefined) {
            const timer = window.setTimeout(() => {
              timers.delete(entry.target);
              if (sent.has(name)) return;
              sent.add(name);
              observer.unobserve(entry.target);
              track("section_view", {
                section_name: name,
                event_type: eventTypeFor(entry.target, pathname),
              });
            }, SECTION_VISIBLE_MS);
            timers.set(entry.target, timer);
          } else if (!halfVisible && pending !== undefined) {
            window.clearTimeout(pending);
            timers.delete(entry.target);
          }
        }
      },
      { threshold: SECTION_OBSERVER_STEPS },
    );

    document.querySelectorAll("[data-track-section]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);
}

/** Site-wide GA4 behavior tracking. Renders nothing. */
export default function AnalyticsListeners() {
  const pathname = usePathname();
  useClickTracking();
  useScrollDepth(pathname);
  useSectionViews(pathname);
  return null;
}
