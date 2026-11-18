import Script from "next/script";

const GA_MEASUREMENT_ID = "G-TVCEDXGDYV";
// `next dev` would otherwise send localhost visits to the production property
// (and trip the Ads URL conversion on /booking). track() no-ops without gtag.
const IS_PRODUCTION_BUILD = process.env.NODE_ENV === "production";

export default function GoogleAnalytics() {
  if (!IS_PRODUCTION_BUILD) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
