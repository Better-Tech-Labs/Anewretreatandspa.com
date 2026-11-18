"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import InquiryForm from "@/components/inquiry/InquiryForm";
import { AUDIENCE_EVENT_TYPE } from "@/lib/audience";
import { eventTypeFromQuery } from "@/lib/inquire";
import { useAudience } from "@/lib/useAudience";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import InquirySent from "./InquirySent";

// The query string read without a hydration mismatch: the static export
// renders with the server snapshot, then updates in the browser.
const subscribeToNothing = () => () => {};
const readSearch = () => window.location.search;
const onServer = () => "";

const LINK = "text-dark border-b border-dark/40 hover:text-accent hover:border-accent transition-colors";

export default function InquirePage() {
  const audience = useAudience();
  const typeFromLink = eventTypeFromQuery(useSyncExternalStore(subscribeToNothing, readSearch, onServer));
  // A plain /inquire link (header, footer) still tells the host what an audience visitor is after.
  const eventType = typeFromLink || (audience ? AUDIENCE_EVENT_TYPE[audience] : "");
  const [sentName, setSentName] = useState<string | null>(null);

  const handleSent = (firstName: string) => {
    setSentName(firstName);
    window.scrollTo({ top: 0 });
  };

  if (sentName !== null) return <InquirySent firstName={sentName} />;

  return (
    <section aria-labelledby="inquire-heading" className="px-6 pt-28 pb-24 sm:pt-36 lg:pt-40">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow sits above both columns so the form starts level with the heading. */}
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
          {eventType ? `${eventType} inquiry` : "Inquire"}
        </p>
        <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <h1 id="inquire-heading" className="font-heading text-4xl sm:text-5xl text-dark font-normal leading-tight mb-5">
              Send us a message
            </h1>
            <p className="text-muted text-[15px] leading-relaxed max-w-md mb-4">
              Takes about 30 seconds. No payment, no commitment. We&apos;ll reply within 24 hours.
            </p>
            <p className="text-[15px] text-muted">
              Rather talk now? <a href={PHONE_HREF} className={LINK}>Call {PHONE_DISPLAY}</a>
            </p>
            <div className="hidden lg:block relative aspect-[4/5] mt-12 overflow-hidden">
              <Image
                src="/images/forest-approach.webp"
                alt="The forest approach to ANEW"
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </div>
          </div>

          {/* lg:pt-2.5 lines the "Name" label's letters up with the heading's (the 48px font has more room above its caps). */}
          <InquiryForm eventType={eventType} onSent={handleSent} className="lg:pt-2.5" />
        </div>
      </div>
    </section>
  );
}
