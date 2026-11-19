"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before revealing, for staggering side-by-side cards. */
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

/** Below Tailwind's `sm`. Must match the phone rules for `.reveal` in globals.css. */
const PHONE_QUERY = "(max-width: 639px)";
/** Desktop waits until the element is 60px into the viewport. */
const DESKTOP_ROOT_MARGIN = "-60px";
/** Phones start 160px early, so fast scrolling never outruns the reveal. */
const PHONE_ROOT_MARGIN = "0px 0px 160px 0px";

/**
 * Fades and slides its children in the first time they scroll into view.
 * The motion itself is CSS (`.reveal` in globals.css); this component only
 * flips `data-visible` when an IntersectionObserver fires. It used to run on
 * framer-motion, which put that whole library on every page for this one effect.
 */
export default function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rootMargin = window.matchMedia(PHONE_QUERY).matches ? PHONE_ROOT_MARGIN : DESKTOP_ROOT_MARGIN;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={direction}
      data-visible={isVisible ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
