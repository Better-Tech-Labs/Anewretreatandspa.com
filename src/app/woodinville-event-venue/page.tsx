import LandingPage from "@/components/landing/LandingPage";
import { woodinvilleVenueLanding } from "@/content/landings/woodinville-event-venue";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(woodinvilleVenueLanding.meta);

export default function WoodinvilleVenuePage() {
  return <LandingPage content={woodinvilleVenueLanding} />;
}
