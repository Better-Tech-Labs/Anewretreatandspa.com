import AnimatedSection from "@/components/AnimatedSection";
import { ADDRESS, MAP_EMBED_SRC, MAP_HREF } from "@/lib/contact";

interface LocationMapProps {
  /** Extra classes for the outer section, for page-specific spacing. */
  className?: string;
}

/**
 * The estate on a Google map, with search and directions. The map is a Google
 * "Locator Plus" page in a frame, so it loads only when scrolled near and none
 * of its scripts run on our own page.
 */
export default function LocationMap({ className = "" }: LocationMapProps) {
  return (
    <section aria-labelledby="location-map-heading" className={`px-6 py-24 sm:py-32 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 mb-10">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent-deep mb-4">Location</p>
              <h2 id="location-map-heading" className="font-heading text-4xl sm:text-5xl font-normal text-dark">
                Find Us
              </h2>
            </div>
            <address className="not-italic text-sm text-muted leading-relaxed">
              {ADDRESS.street}
              <br />
              {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}
              <br />
              <a
                href={MAP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[11px] tracking-[0.2em] uppercase text-dark border-b border-dark/40 pb-0.5 hover:text-accent-deep hover:border-accent-deep transition-colors"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </address>
          </div>
          <div className="h-[520px] sm:h-[560px] border border-border bg-cream">
            <iframe
              src={MAP_EMBED_SRC}
              title="Map showing ANEW Retreat and Spa in Kenmore, Washington"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
