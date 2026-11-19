"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronDown, Menu, X, User, Phone } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { homeHrefFor } from "@/lib/audience";
import OccasionsMenu from "@/components/OccasionsMenu";
import { LANDING_PATHS, OCCASION_LINKS } from "@/lib/landingPages";
import { useAudience } from "@/lib/useAudience";

// The sign-in window and the sign-in library behind it are only fetched when someone opens it.
const AuthModal = dynamic(() => import("@/components/AuthModal"), { ssr: false });

/** Seconds between each mobile menu item appearing. */
const MENU_STAGGER_SECONDS = 0.06;

// The Occasions dropdown sits between these two groups on desktop.
const leftNavLinksBeforeOccasions = [
  { label: "About", href: "/venue" },
  { label: "Experiences", href: "/experiences" },
];
const leftNavLinksAfterOccasions = [{ label: "Boutique", href: "/boutique" }];
const leftNavLinks = [...leftNavLinksBeforeOccasions, ...leftNavLinksAfterOccasions];

const rightNavLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Inquire", href: "/inquire" },
];

const navLinks = [...leftNavLinks, ...rightNavLinks];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  // Stays true after the first open so the window can animate out when closed.
  const [hasOpenedAuth, setHasOpenedAuth] = useState(false);
  const openAuth = () => {
    setHasOpenedAuth(true);
    setAuthOpen(true);
  };
  const signOut = async () => {
    setMobileOpen(false);
    try {
      const { logOut } = await import("@/lib/auth");
      await logOut();
    } catch (error: unknown) {
      console.error("Sign out failed", error);
    }
  };
  const [mobileOccasionsOpen, setMobileOccasionsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const audience = useAudience();
  const homeHref = homeHrefFor(audience);

  // Pages with dark hero images where white nav text works
  const darkHeroPages = ["/", "/venue", "/experiences", "/gallery", "/packages", "/boutique", "/booking", ...LANDING_PATHS];
  const hasDarkHero = darkHeroPages.includes(pathname);
  const useDarkText = scrolled || !hasDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const linkClass = `whitespace-nowrap text-[11px] tracking-[0.25em] uppercase font-light transition-colors duration-300 ${
    useDarkText ? "text-dark" : "text-white"
  } hover:opacity-60`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled || !hasDarkHero
            ? "bg-warm-white/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        {/* Equal side columns keep the logo centered and the links evenly spaced around it */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-8 xl:gap-x-12">
          {/* Left nav (desktop) */}
          <div className="col-start-1 hidden lg:flex items-center justify-end gap-5 xl:gap-8">
            {leftNavLinksBeforeOccasions.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <OccasionsMenu triggerClassName={linkClass} />
            {leftNavLinksAfterOccasions.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link href={homeHref} className="col-start-2 flex items-center">
            <span
              className={`font-heading text-[1.7rem] xl:text-[2rem] tracking-[0.35em] transition-colors duration-500 font-light ${
                useDarkText ? "text-dark" : "text-white"
              }`}
            >
              ANEW
            </span>
          </Link>

          {/* Right nav (desktop) */}
          <div className="col-start-3 hidden lg:flex items-center gap-3.5 xl:gap-8">
            {rightNavLinks.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-6">
                <Link href="/profile" className={linkClass}>
                  <User className="w-4 h-4 inline mr-1" />
                  Account
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button onClick={openAuth} className={linkClass}>
                  Sign In
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 xl:gap-3 ml-auto mr-4">
              <Link
                href="/booking"
                prefetch={false}
                className={`whitespace-nowrap text-[11px] tracking-[0.25em] uppercase font-light border px-4 xl:px-5 py-2.5 transition-all duration-300 ${
                  useDarkText
                    ? "border-dark text-dark hover:bg-dark hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-dark"
                }`}
              >
                Book Now
              </Link>
              <a
                href="tel:+12064711243"
                aria-label="Call ANEW at (206) 471-1243"
                className={`flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-light border px-3.5 min-[1400px]:px-5 py-2.5 transition-all duration-300 ${
                  useDarkText
                    ? "border-dark text-dark hover:bg-dark hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-dark"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden min-[1400px]:inline">Call</span>
              </a>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              // Start collapsed each time the menu is opened.
              setMobileOccasionsOpen(false);
            }}
            className={`col-start-3 justify-self-end lg:hidden transition-colors ${useDarkText ? "text-dark" : "text-white"}`}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu. Always in the page and faded with CSS; `invisible` keeps it out of the tab order while closed. */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 bg-dark flex flex-col items-center gap-8 overflow-y-auto px-6 pt-24 pb-12 lg:hidden transition-[opacity,visibility] duration-[400ms] ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
            {/* Spacers centre the list when it fits and let it scroll from the top when it does not. */}
            <div className="flex-1" aria-hidden="true" />
            {navLinks.map((link, i) => (
              <div
                key={link.label}
                className={mobileOpen ? "menu-item-in" : undefined}
                style={{ animationDelay: `${i * MENU_STAGGER_SECONDS}s` }}
              >
                <Link href={link.href} onClick={() => setMobileOpen(false)} className="text-white text-[13px] tracking-[0.3em] uppercase font-light hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <button
                type="button"
                aria-expanded={mobileOccasionsOpen}
                aria-controls="mobile-occasions"
                onClick={() => setMobileOccasionsOpen((open) => !open)}
                className="inline-flex items-center gap-2 text-white text-[13px] tracking-[0.3em] uppercase font-light hover:text-accent transition-colors"
              >
                Occasions
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileOccasionsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileOccasionsOpen && (
                <ul id="mobile-occasions" className="mt-5 flex flex-col items-center gap-4">
                  {OCCASION_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-white/70 text-[11px] tracking-[0.25em] uppercase font-light hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="text-white text-[13px] tracking-[0.3em] uppercase font-light hover:text-accent transition-colors">Account</Link>
                <button onClick={signOut} className="text-white/50 text-[13px] tracking-[0.3em] uppercase font-light hover:text-accent transition-colors">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { setMobileOpen(false); openAuth(); }} className="text-white text-[13px] tracking-[0.3em] uppercase font-light hover:text-accent transition-colors">Sign In</button>
            )}
            <Link href="/booking" prefetch={false} onClick={() => setMobileOpen(false)} className="text-[13px] tracking-[0.3em] uppercase font-light border border-white text-white px-8 py-3 hover:bg-white hover:text-dark transition-all">
              Book Now
            </Link>
            <a href="tel:+12064711243" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-[13px] tracking-[0.3em] uppercase font-light border border-white text-white px-8 py-3 hover:bg-white hover:text-dark transition-all">
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <div className="flex-1" aria-hidden="true" />
      </div>

      {hasOpenedAuth && <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />}
    </>
  );
}
