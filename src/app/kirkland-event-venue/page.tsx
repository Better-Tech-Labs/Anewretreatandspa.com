import LandingPage from "@/components/landing/LandingPage";
import { kirklandVenueLanding } from "@/content/landings/kirkland-event-venue";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(kirklandVenueLanding.meta);

export default function KirklandVenuePage() {
  return <LandingPage content={kirklandVenueLanding} />;
}
