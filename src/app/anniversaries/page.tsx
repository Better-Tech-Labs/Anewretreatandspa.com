import LandingPage from "@/components/landing/LandingPage";
import { anniversariesLanding } from "@/content/landings/anniversaries";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(anniversariesLanding.meta);

export default function AnniversariesPage() {
  return <LandingPage content={anniversariesLanding} />;
}
