"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { OCCASION_LINKS } from "@/lib/landingPages";

interface OccasionsMenuProps {
  /** Classes shared with the other header links, so the trigger matches them in both header states. */
  triggerClassName: string;
}

/**
 * Desktop header dropdown listing every occasion page. Opens on mouse hover
 * or on click/tap, closes on Escape, an outside click, or choosing a link. The panel is
 * `invisible` while closed, which also keeps its links out of the tab order.
 */
export default function OccasionsMenu({ triggerClassName }: OccasionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      // Hover opens it for a real mouse only. A tap also fires hover events first,
      // which would open the menu and then let the click toggle it shut again.
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsOpen(false);
      }}
      // Keyboard users: tabbing on to something outside the menu closes it. A blur
      // with no next target is ignored, because Safari reports one when a link in
      // the panel is clicked, and closing then would swallow the click.
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.contains(next)) setIsOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className={`${triggerClassName} inline-flex items-center gap-1.5`}
      >
        Occasions
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* The top padding bridges the gap to the trigger, so moving the pointer down doesn't close the menu. */}
      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform] duration-200 ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="border border-border bg-warm-white py-2 shadow-[0_14px_30px_-16px_rgba(43,47,49,0.35)]">
          {OCCASION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block whitespace-nowrap px-4 py-1.5 text-[10px] font-light uppercase tracking-[0.18em] text-dark transition-colors duration-200 hover:bg-cream hover:text-primary focus-visible:bg-cream focus-visible:text-primary focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
