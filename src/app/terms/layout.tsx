import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Service | ANEW Retreat & Spa",
  description:
    "Booking, payment and cancellation terms for ANEW Retreat & Spa in Kenmore, WA.",
  path: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
