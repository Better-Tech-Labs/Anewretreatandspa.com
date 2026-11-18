import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CornerAccent from "@/components/CornerAccent";
import HandDrawnDivider from "@/components/HandDrawnDivider";
import { EYEBROW_CLASS } from "./shared";
import type { SectionTracking } from "./types";

export interface RoomCard {
  img: string;
  /** Photo description. Falls back to the name. */
  alt?: string;
  name: string;
  desc: string;
  /** CSS object-position for photos that need a custom crop. */
  position?: string;
}

export interface RoomsContent {
  eyebrow: string;
  title: string;
  rooms: readonly RoomCard[];
}

interface RoomsGridProps extends SectionTracking {
  content: RoomsContent;
  /** Anchor id, so other pages can link straight to this section. */
  id?: string;
}

const STAGGER_SECONDS = 0.08;

export default function RoomsGrid({ content, id, trackName }: RoomsGridProps) {
  return (
    <section data-track-section={trackName} id={id} className="py-28 sm:py-36 bg-cream relative overflow-hidden">
      <CornerAccent position="top-right" />
      <CornerAccent position="bottom-left" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <HandDrawnDivider variant="simple" className="mb-6" />
          <p className={EYEBROW_CLASS}>{content.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] text-dark font-normal">{content.title}</h2>
        </AnimatedSection>
      </div>
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.rooms.map((room, i) => (
            <AnimatedSection key={room.name} delay={i * STAGGER_SECONDS}>
              <div className="w-full group cursor-pointer card-3d">
                <div className="relative aspect-[3/4] mb-5 overflow-hidden">
                  <Image
                    src={room.img}
                    alt={room.alt ?? room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={room.position ? { objectPosition: room.position } : undefined}
                  />
                </div>
                <h4 className="font-heading text-xl text-dark mb-1">{room.name}</h4>
                <p className="text-sm text-muted leading-relaxed">{room.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
