import Script from "next/script";

/**
 * Heatmaps and session recordings. Read at build time (static export), so set
 * CLARITY_PROJECT_ID before `npm run build`. Renders nothing when it is empty.
 */
const CLARITY_PROJECT_ID = (process.env.CLARITY_PROJECT_ID || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "").trim();
const VALID_ID = /^[a-z0-9]+$/i;

export default function MicrosoftClarity() {
  if (!CLARITY_PROJECT_ID || !VALID_ID.test(CLARITY_PROJECT_ID)) return null;
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}
