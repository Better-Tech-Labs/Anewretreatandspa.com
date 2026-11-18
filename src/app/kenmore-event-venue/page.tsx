import LandingPage from "@/components/landing/LandingPage";
import { kenmoreVenueLanding } from "@/content/landings/kenmore-event-venue";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(kenmoreVenueLanding.meta);

export default function KenmoreVenuePage() {
  return <LandingPage content={kenmoreVenueLanding} />;
}
