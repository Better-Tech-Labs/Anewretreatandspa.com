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
import { SITE_URL, pageMeta } from "@/lib/seo";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
