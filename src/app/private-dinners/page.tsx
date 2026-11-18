import LandingPage from "@/components/landing/LandingPage";
import { privateDinnersLanding } from "@/content/landings/private-dinners";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(privateDinnersLanding.meta);

export default function PrivateDinnersPage() {
  return <LandingPage content={privateDinnersLanding} />;
}
