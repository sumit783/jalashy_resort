"use client";

import backwater from "@/assets/sliderImage/slider-3.webp";
import aerial from "@/assets/outsideImages/Screenshot 2026-07-02 123259.png";
import yoga from "@/assets/outsideImages/020A6262.webp";
import villa from "@/assets/wedding-lawn.webp";

import Link from "next/link";
import Image from "next/image";

export function Experiences() {
  const items = [
    { t: "Lakeside Sunset Deck", cat: "Nature", img: backwater, slug: "lakeside-sunset-deck" },
    { t: "Lakeside Palms Canopy", cat: "Nature", img: aerial, slug: "lakeside-palms-canopy" },
    { t: "Cozy Garden Sit-out", cat: "Leisure", img: yoga, slug: "cozy-garden-sit-out" },
    { t: "Lawn-side Ceremony", cat: "Celebrations", img: villa, slug: "lawn-side-ceremony" },
  ];
  return (
    <section id="experiences" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Experiences
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-4 text-balance leading-tight">
            Moments that <em>linger</em> long after you leave.
          </h2>
          <p className="mt-6 text-muted-foreground font-light">
            From sunrise yoga on the deck to candlelit tasting menus — each day is curated, never
            scheduled.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((it) => (
            <Link
              key={it.t}
              href={`/experiences/${it.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer block"
            >
              <Image
                src={it.img}
                alt={it.t}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
                  {it.cat}
                </p>
                <h3 className="font-display text-2xl mt-2">{it.t}</h3>
                <span className="mt-3 inline-block text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  → explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
