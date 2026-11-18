import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { homeHrefFor } from "@/lib/audience";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { useAudience } from "@/lib/useAudience";

/**
 * Shown after a successful send. The call button is the point: a visitor who
 * just reached out is the most likely to pick up the phone right now.
 * phone_click is tracked by AnalyticsListeners (cta_location "inquiry_sent").
 */
export default function InquirySent({ firstName }: { firstName: string }) {
  const homeHref = homeHrefFor(useAudience());
  return (
    <section
      data-track-section="inquiry_sent"
      aria-labelledby="inquiry-sent-heading"
      className="min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-6" aria-hidden="true" />
        <h1 id="inquiry-sent-heading" className="font-heading text-4xl text-dark mb-3 font-normal">
          Message sent{firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="text-muted text-[15px] mb-10">We&apos;ll get back to you within 24 hours.</p>

        <div className="border border-border bg-cream/50 px-6 py-8 sm:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3">Can&apos;t wait?</p>
          <p className="font-heading text-2xl text-dark leading-snug mb-7">
            Call now and we&apos;ll get back to you even sooner.
          </p>
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-3 w-full bg-dark text-white text-[12px] tracking-[0.25em] uppercase py-4 hover:bg-accent focus-visible:bg-accent transition-colors duration-500"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </div>

        <Link
          href={homeHref}
          className="inline-block mt-10 text-[11px] tracking-[0.3em] uppercase text-dark border-b border-dark pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}
