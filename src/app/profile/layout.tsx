import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Your Account | ANEW Retreat & Spa",
  description:
    "Manage your ANEW bookings and account.",
  path: "/profile",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
