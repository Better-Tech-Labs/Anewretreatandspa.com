import type { Metadata } from "next";

export const SITE_URL = "https://anewretreatandspa.com";
export const SITE_NAME = "ANEW Retreat & Spa";
const SHARE_IMAGE = {
  url: "/images/exterior-hero.webp",
  width: 1536,
  height: 1152,
  alt: "ANEW Retreat & Spa estate in Kenmore, Washington",
};

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/venue". */
  path: string;
  /** Keep the page out of search results (account, checkout, portals). */
  noindex?: boolean;
}

/** Builds per-page metadata so every route has its own canonical, share URL, title and description. */
export function pageMeta({ title, description, path, noindex = false }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [SHARE_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
