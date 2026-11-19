import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import SoundEngine from "@/components/SoundEngine";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsListeners from "@/components/AnalyticsListeners";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import AudienceTracker from "@/components/AudienceTracker";
import { HOME_REDIRECT_SCRIPT } from "@/lib/audience";
import { ADDRESS, CONTACT_EMAIL, PHONE_E164, SOCIAL_PROFILES } from "@/lib/contact";
import { SITE_NAME, SITE_URL, pageMeta } from "@/lib/seo";
import { businessSchema, jsonLd } from "@/lib/structuredData";


const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({
    title: "ANEW Retreat & Spa | Private Estate for Retreats & Weddings near Seattle",
    description:
      "ANEW is a private 7-bedroom retreat and spa estate in Kenmore, WA, minutes from Seattle. Book it for corporate retreats, weddings and wellness retreats.",
    path: "/",
  }),
};

/** Who and where the business is, for search engines. Facts here must match the site and the Google Business Profile. */
const BUSINESS_JSON_LD = jsonLd(
  businessSchema({
    siteUrl: SITE_URL,
    name: SITE_NAME,
    description:
      "A private 7-bedroom estate and spa on two wooded acres in Kenmore, Washington, for weddings, corporate retreats, wellness retreats and private gatherings.",
    telephone: PHONE_E164,
    email: CONTACT_EMAIL,
    imagePath: "/images/exterior-hero.webp",
    streetAddress: ADDRESS.street,
    locality: ADDRESS.locality,
    region: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    country: ADDRESS.country,
    areasServed: ["Kenmore", "Bothell", "Woodinville", "Kirkland", "Seattle"],
    amenities: ["Sauna", "Cold plunge", "Soaking tub", "Gym", "Fire pit", "Chef's kitchen"],
    profiles: SOCIAL_PROFILES,
  }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Sends returning audience visitors from "/" to their landing page before anything is drawn.
            Static string built from constants in src/lib/audience.ts; no visitor input reaches it. */}
        <script dangerouslySetInnerHTML={{ __html: HOME_REDIRECT_SCRIPT }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <SoundEngine />
          <ScrollProgress />
          <PageTransition />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BUSINESS_JSON_LD }} />
        <GoogleAnalytics />
        <AnalyticsListeners />
        <MicrosoftClarity />
        <AudienceTracker />
      </body>
    </html>
  );
}
