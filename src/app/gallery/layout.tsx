import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Photo Gallery: Estate, Spa & Grounds | ANEW Retreat & Spa",
  description:
    "Photos of the ANEW estate in Kenmore, WA: bedrooms, Grand Hall, courtyard, sauna and cold plunge, healing gardens and the private stream.",
  path: "/gallery",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
