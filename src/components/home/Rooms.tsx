"use client";

import FadeUp from "./FadeUp";
import lakesideSuiteImg from "@/assets/lakeside_suite.png";
import gardenVillaImg from "@/assets/garden_villa.png";
import mangoCottageImg from "@/assets/mango_cottage.png";

const rooms = [
  {
    name: "Lakeside Suite",
    desc: "Panoramic lake vistas, private glass frontage, and bespoke marble fittings.",
    image: lakesideSuiteImg,
  },
  {
    name: "Garden Villa",
    desc: "Seamless indoor-outdoor living opening onto tropical manicured lawns.",
    image: gardenVillaImg,
  },
  {
    name: "Mango Grove Cottage",
    desc: "Rustic heritage design sheltered under the resort's old aamrai canopy.",
    image: mangoCottageImg,
  },
];

export default function Rooms() {
  return (
    <section className="relative py-32 bg-background/20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — Rooms & Suites
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Sanctuaries of{" "}
              <span className="text-gold-gradient italic">rest</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {rooms.map((r, i) => (
            <FadeUp key={r.name} delay={i * 0.12}>
              <div className="group relative flex flex-col overflow-hidden rounded-sm border border-border/40 bg-card/40 shimmer-border">
                {/* Image Container with 9:16 Aspect Ratio */}
                <div className="relative aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={r.image.src}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Overlay Content at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                      Luxury Suite
                    </span>
                    <h3 className="mt-2 font-display text-3xl text-foreground font-light">
                      {r.name}
                    </h3>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
