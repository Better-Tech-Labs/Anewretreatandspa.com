import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface Faq {
  q: string;
  a: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  faqs: readonly Faq[];
}

/** FAQPage structured data, so the questions can show up in search results. */
function faqSchemaJson(faqs: readonly Faq[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  // Escaping "<" keeps the content from ever closing the script tag.
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function FaqSection({ content, trackName }: { content: FaqContent } & SectionTracking) {
  return (
    <section data-track-section={trackName} className="py-28 sm:py-36 bg-cream px-6 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson(content.faqs) }} />
      <div className="max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <HandDrawnDivider variant="simple" className="mb-6" />
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading font-normal text-3xl sm:text-4xl text-dark">{content.title}</h2>
        </AnimatedSection>
        <div>
          {content.faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-border">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <h3 className="text-dark text-[15px] pr-4 group-hover:text-primary transition-colors">{faq.q}</h3>
                <ChevronDown className="w-4 h-4 text-muted shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="text-sm text-muted leading-relaxed pb-5">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
