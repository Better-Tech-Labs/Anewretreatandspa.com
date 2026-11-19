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

export interface Crumb {
  name: string;
  /** Site path starting with "/". */
  path: string;
}

/** BreadcrumbList structured data, so search results can show "Home > Weddings" instead of a bare URL. */
export function breadcrumbSchema(siteUrl: string, crumbs: readonly Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? `${siteUrl}/` : `${siteUrl}${crumb.path}`,
    })),
  };
}

export interface BusinessDetails {
  siteUrl: string;
  name: string;
  description: string;
  /** E.164 phone number, e.g. "+12064711243". */
  telephone: string;
  email: string;
  /** Site path of a representative photo. */
  imagePath: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  /** Towns and cities the venue draws guests from. */
  areasServed: readonly string[];
  amenities: readonly string[];
  /** Official profiles on other sites. */
  profiles: readonly string[];
}

/**
 * Tells search engines what the business is and where: an event venue and
 * local business in Kenmore. The street address is left out on purpose,
 * because the estate shares arrival details only with confirmed guests.
 */
export function businessSchema(details: BusinessDetails): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": `${details.siteUrl}/#business`,
    name: details.name,
    description: details.description,
    url: `${details.siteUrl}/`,
    telephone: details.telephone,
    email: details.email,
    image: `${details.siteUrl}${details.imagePath}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: details.streetAddress,
      addressLocality: details.locality,
      addressRegion: details.region,
      postalCode: details.postalCode,
      addressCountry: details.country,
    },
    areaServed: details.areasServed.map((name) => ({ "@type": "City", name })),
    amenityFeature: details.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    sameAs: details.profiles,
  };
}
