import LandingPage from "@/components/landing/LandingPage";
import { wellnessRetreatsLanding } from "@/content/landings/wellness-retreats";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(wellnessRetreatsLanding.meta);

export default function WellnessRetreatsPage() {
  return <LandingPage content={wellnessRetreatsLanding} />;
}
