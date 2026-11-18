import LandingPage from "@/components/landing/LandingPage";
import { weddingsLanding } from "@/content/landings/weddings";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(weddingsLanding.meta);

export default function WeddingsPage() {
  return <LandingPage content={weddingsLanding} />;
}
