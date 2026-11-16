import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Private 7-Bedroom Estate & Spa near Seattle | ANEW, Kenmore WA",
  description:
    "Tour the ANEW estate: a 5,800 sq ft, 7-bedroom private retreat on two woodland acres in Kenmore, WA, with sauna, cold plunge, gym, Grand Hall and ceremony lawn.",
  path: "/venue",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
