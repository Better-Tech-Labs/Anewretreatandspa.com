import AudienceExitLink from "@/components/AudienceExitLink";
import LandingPage from "@/components/landing/LandingPage";
import { corporateLanding } from "@/content/landings/corporate";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(corporateLanding.meta);

/** Corporate retreat landing page. Ad visitors are kept on this version of the site (see src/lib/audience.ts). */
export default function CorporateRetreatsPage() {
  return <LandingPage content={corporateLanding} formatsFootnote={<AudienceExitLink />} />;
}
