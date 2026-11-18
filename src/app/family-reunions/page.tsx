import LandingPage from "@/components/landing/LandingPage";
import { familyReunionsLanding } from "@/content/landings/family-reunions";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(familyReunionsLanding.meta);

export default function FamilyReunionsPage() {
  return <LandingPage content={familyReunionsLanding} />;
}
