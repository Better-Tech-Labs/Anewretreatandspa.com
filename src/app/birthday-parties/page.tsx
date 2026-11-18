import LandingPage from "@/components/landing/LandingPage";
import { birthdayPartiesLanding } from "@/content/landings/birthday-parties";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(birthdayPartiesLanding.meta);

export default function BirthdayPartiesPage() {
  return <LandingPage content={birthdayPartiesLanding} />;
}
