import LandingPage from "@/components/landing/LandingPage";
import { bachelorettePartiesLanding } from "@/content/landings/bachelorette-parties";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(bachelorettePartiesLanding.meta);

export default function BachelorettePartiesPage() {
  return <LandingPage content={bachelorettePartiesLanding} />;
}
