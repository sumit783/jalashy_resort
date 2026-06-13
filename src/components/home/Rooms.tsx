"use client";

import FadeUp from "./FadeUp";
import LazyVideo from "../ui/LazyVideo";

const rooms = [
  {
    name: "Presidential Lakefront Suite",
    desc: "Panoramic lake vistas, private glass balcony, and bespoke marble fittings.",
    image: "/roomImages/020A6091.webp",
    video: "/Website_04.webm",
  },
  {
    name: "Lakeside Premium Suite",
    desc: "Elegantly furnished with rustic teak wood and direct lake frontage sit-outs.",
    image: "/roomImages/020A6097.webp",
    video: "/Website_09.webm",
  },
  {
    name: "Heritage Garden Room",
    desc: "Plush fabrics and cozy seating areas overlooking the resort's private gardens.",
    image: "/roomImages/020A6099.webp",
    video: "/Website_08.webm",
  }
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
                {/* Video Container with 9:16 Aspect Ratio */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <LazyVideo
                    src={r.video}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
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
