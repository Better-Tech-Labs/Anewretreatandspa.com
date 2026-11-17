import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Inquire: Retreats, Weddings & Corporate Events | ANEW Retreat & Spa",
  description:
    "Ask about dates and pricing for a corporate retreat, wedding, wellness retreat or private stay at ANEW in Kenmore, WA.",
  path: "/inquire",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
