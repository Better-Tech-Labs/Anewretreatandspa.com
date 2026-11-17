import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book Your Stay or Event | ANEW Retreat & Spa",
  description:
    "Check availability and reserve your date at ANEW Retreat & Spa in Kenmore, WA.",
  path: "/booking",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
