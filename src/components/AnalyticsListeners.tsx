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

const BOOKING_PATH = "/booking";
/** Where a click leads, so cta_click can be grouped without reading URLs. */
type CtaDestination = "inquire" | "booking" | "on_page" | "external" | "internal";

function destinationFor(href: string): CtaDestination {
  if (href.startsWith("#")) return href.startsWith("#inquire") ? "inquire" : "on_page";
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return "external";
    const path = url.pathname.replace(/\/$/, "");
    if (path === "/inquire") return "inquire";
    if (path === BOOKING_PATH) return "booking";
    return "internal";
  } catch {
    return "internal";
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

  // The query string is dropped: it can carry a date the visitor picked.
  track("cta_click", { ...base, link_url: href.split("?")[0], cta_destination: href ? destinationFor(href) : "on_page" });
}

function useClickTracking(): void {
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}

/**
 * booking_start: the visitor did something on the booking page (picked a date,
 * chose a duration, typed in a field). Once per page view. Opening the page,
 * or clicking a link to it, is not a start.
 */
function useBookingStart(pathname: string): void {
  useEffect(() => {
    if (pathname.replace(/\/$/, "") !== BOOKING_PATH) return;
    const main = document.querySelector("main");
    if (!main) return;
    let sent = false;

    const stop = () => {
      main.removeEventListener("input", onInput, true);
      main.removeEventListener("click", onClick, true);
    };
    const start = (startAction: string) => {
      if (sent) return;
      sent = true;
      stop();
      track("booking_start", { start_action: startAction });
    };
    const onInput = () => start("field_input");
    const onClick = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      // Buttons that aren't links: calendar days, duration blocks, Continue.
      const button = target?.closest<HTMLButtonElement>("button");
      if (button && !button.disabled && !button.closest("header, nav, footer")) start("button_click");
    };

    main.addEventListener("input", onInput, true);
    main.addEventListener("click", onClick, true);
    return stop;
  }, [pathname]);
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
  useBookingStart(pathname);
  useScrollDepth(pathname);
  useSectionViews(pathname);
  return null;
}
