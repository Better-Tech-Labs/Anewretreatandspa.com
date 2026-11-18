import LandingPage from "@/components/landing/LandingPage";
import { elopementsLanding } from "@/content/landings/elopements";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(elopementsLanding.meta);

export default function ElopementsPage() {
  return <LandingPage content={elopementsLanding} />;
}
