import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Things To Do near Kenmore & Woodinville, WA | ANEW Retreat & Spa",
  description:
    "Wineries, trails, dining and day trips near ANEW in Kenmore, WA, from Woodinville Wine Country to Snoqualmie Falls.",
  path: "/local",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
