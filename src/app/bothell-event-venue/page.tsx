import LandingPage from "@/components/landing/LandingPage";
import { bothellVenueLanding } from "@/content/landings/bothell-event-venue";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(bothellVenueLanding.meta);

export default function BothellVenuePage() {
  return <LandingPage content={bothellVenueLanding} />;
}
