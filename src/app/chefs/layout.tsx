import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Private Chefs & Catering | ANEW Retreat & Spa, Kenmore WA",
  description:
    "Meet the resident chefs at ANEW. Seasonal Pacific Northwest menus for weddings, corporate retreats and private dinners at our Kenmore estate.",
  path: "/chefs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
