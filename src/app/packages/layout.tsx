import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wedding Packages & Estate Weekends near Seattle | ANEW Retreat & Spa",
  description:
    "Wedding and celebration packages at ANEW Retreat & Spa in Kenmore, WA. Venue rental, overnight stays for your party and an all-inclusive estate wedding weekend.",
  path: "/packages",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
