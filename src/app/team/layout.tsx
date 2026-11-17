import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Team | ANEW Retreat & Spa, Kenmore WA",
  description:
    "Meet the team behind ANEW Retreat & Spa, the people who host your retreat, wedding or corporate gathering near Seattle.",
  path: "/team",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
