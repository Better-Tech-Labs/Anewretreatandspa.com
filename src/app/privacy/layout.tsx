import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | ANEW Retreat & Spa",
  description:
    "How ANEW Retreat & Spa collects, uses and protects your information.",
  path: "/privacy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
