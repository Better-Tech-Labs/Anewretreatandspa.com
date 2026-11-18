/**
 * Serialises structured data for a <script type="application/ld+json"> tag.
 * Escaping "<" means the content can never close the script tag.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

interface QuestionAndAnswer {
  q: string;
  a: string;
}

/** FAQPage structured data, so questions can show up in search results. */
export function faqPageSchema(faqs: readonly QuestionAndAnswer[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
