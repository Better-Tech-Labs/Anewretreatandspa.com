import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Chef Portal | ANEW Retreat & Spa",
  description:
    "Sign in for ANEW resident chefs.",
  path: "/chef-portal",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
