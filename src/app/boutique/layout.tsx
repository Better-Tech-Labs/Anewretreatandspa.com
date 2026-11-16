import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Boutique | ANEW Retreat & Spa",
  description:
    "Curated goods, gifts and keepsakes from ANEW Retreat & Spa.",
  path: "/boutique",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
