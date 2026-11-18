"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const SLIDE_PX = 40;
/** On phones a sideways slide would poke past the screen edge, so everything rises instead. */
const PHONE_SLIDE_PX = 24;

const directionOffsets = {
  up: { y: SLIDE_PX, x: 0 },
  down: { y: -SLIDE_PX, x: 0 },
  left: { x: SLIDE_PX, y: 0 },
  right: { x: -SLIDE_PX, y: 0 },
};
const phoneOffset = { x: 0, y: PHONE_SLIDE_PX };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
/** Below Tailwind's `sm`: one column, where content arrives one piece at a time. */
const PHONE_QUERY = "(max-width: 639px)";

function subscribeTo(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}
const subscribeMotion = subscribeTo(REDUCED_MOTION_QUERY);
const subscribePhone = subscribeTo(PHONE_QUERY);
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getIsPhone = () => window.matchMedia(PHONE_QUERY).matches;
const onServer = () => false;

const DESKTOP_DURATION = 0.7;
const PHONE_DURATION = 0.45;
/** Start revealing this far before the element reaches the screen, so fast scrolling never outruns it. */
const DESKTOP_VIEW_MARGIN = "-60px";
const PHONE_VIEW_MARGIN = "0px 0px 160px 0px";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, onServer);
  const isPhone = useSyncExternalStore(subscribePhone, getIsPhone, onServer);
  const isInView = useInView(ref, { once: true, margin: isPhone ? PHONE_VIEW_MARGIN : DESKTOP_VIEW_MARGIN });
  const offset = isPhone ? phoneOffset : directionOffsets[direction];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration: isPhone ? PHONE_DURATION : DESKTOP_DURATION,
        // Stagger delays are for side-by-side cards. In a phone's single column they only make each card late.
        delay: isPhone ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
