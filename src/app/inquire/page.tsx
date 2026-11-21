"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import InquiryForm from "@/components/inquiry/InquiryForm";
import { AUDIENCE_EVENT_TYPE } from "@/lib/audience";
import { dateFromQuery, eventTypeFromQuery } from "@/lib/inquire";
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
  const search = useSyncExternalStore(subscribeToNothing, readSearch, onServer);
  // A plain /inquire link (header, footer) still tells the host what an audience visitor is after.
  const typeFromLink = eventTypeFromQuery(search) || (audience ? AUDIENCE_EVENT_TYPE[audience] : "");
  // null until the visitor changes the type themselves; until then the link decides.
  const [chosenType, setChosenType] = useState<string | null>(null);
  const eventType = chosenType ?? typeFromLink;
  const dateFromLink = search ? dateFromQuery(search, new Date()) : "";
  const [sentName, setSentName] = useState<string | null>(null);

  const handleSent = (firstName: string) => {
    setSentName(firstName);
    window.scrollTo({ top: 0 });
  };

  if (sentName !== null) return <InquirySent firstName={sentName} />;

  const callLine = (
    <p className="text-[15px] text-muted">
      Rather talk now? <a href={PHONE_HREF} className={LINK}>Call {PHONE_DISPLAY}</a>
    </p>
  );

  return (
    <section aria-labelledby="inquire-heading" className="px-6 pt-24 pb-24 sm:pt-36 lg:pt-40">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow sits above both columns so the form starts level with the heading. */}
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-3 sm:mb-4">
          {eventType ? `${eventType} inquiry` : "Inquire"}
        </p>
        <div className="grid lg:grid-cols-[5fr_6fr] gap-6 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            {/* Kept short on phones so the form's first fields are on the first screen. */}
            <h1 id="inquire-heading" className="font-heading text-3xl sm:text-5xl text-dark font-normal leading-tight lg:mb-5">
              Send us a message
            </h1>
            <div className="hidden lg:block">
              {callLine}
              <div className="relative aspect-[4/5] mt-12 overflow-hidden">
                <Image
                  src="/images/forest-approach.webp"
                  alt="The forest approach to ANEW"
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            {/* lg:pt-2.5 lines the first label's letters up with the heading's (the 48px font has more room above its caps). */}
            <InquiryForm
              formLocation="inquire_page"
              eventType={eventType}
              onEventTypeChange={setChosenType}
              prefillDate={dateFromLink}
              onSent={handleSent}
              showBookLink
              className="lg:pt-2.5"
            />
            <div className="lg:hidden text-center mt-8">{callLine}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
