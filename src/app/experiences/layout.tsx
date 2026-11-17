import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Retreat Experiences: Spa, Private Chef & Wellness | ANEW, Kenmore WA",
  description:
    "Wellness retreats, private chef dinners, contrast therapy, Woodinville wine tours and fireside evenings at ANEW, a private estate minutes from Seattle.",
  path: "/experiences",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
