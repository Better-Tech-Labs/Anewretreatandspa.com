import { CheckCircle2, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/** Replaces an embedded inquiry form once the message is sent. The call button is the point. */
export default function InquirySentCard({ firstName }: { firstName: string }) {
  return (
    <div role="status" className="border border-border bg-cream/50 px-6 py-10 sm:px-10 text-center">
      <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-5" aria-hidden="true" />
      <p className="font-heading text-3xl text-dark mb-3">Message sent{firstName ? `, ${firstName}` : ""}.</p>
      <p className="text-muted text-[15px] mb-8">We&apos;ll get back to you within 24 hours.</p>
      <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4">Can&apos;t wait?</p>
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-3 w-full bg-dark text-white text-[12px] tracking-[0.25em] uppercase py-4 hover:bg-accent focus-visible:bg-accent transition-colors duration-500"
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        Call {PHONE_DISPLAY}
      </a>
    </div>
  );
}
