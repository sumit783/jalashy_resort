"use client";

import backwater from "@/assets/sliderImage/slider-3.webp";
import aerial from "@/assets/outsideImages/Screenshot 2026-07-02 123259.png";
import yoga from "@/assets/outsideImages/020A6262.webp";
import villa from "@/assets/wedding-lawn.webp";

import Link from "next/link";
import Image from "next/image";

import poolImg from "@/assets/outsideImages/020A6311.jpg";
import spaImg from "@/assets/spa.jpg";
import cinemaImg from "@/assets/madrid-spain-seats-and-screen-of-the-open-air-cinema-cineplaza-in-the-plaza-de-matadero.webp";

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

        {/* Extra Services Section */}
        <div className="mt-32 border-t border-border/40 pt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-4 font-medium">
              To do, by the water
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground text-balance leading-tight">
              Fill your days.
            </h2>
          </div>
            
          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[450px]">
            {/* Included */}
            <div className="relative group rounded-3xl overflow-hidden border border-border/20 shadow-xl">
              <Image 
                src={poolImg} 
                alt="Included Activities" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] shadow-[0_0_10px_var(--gold)]"></span>
                  Included
                </h3>
                <ul className="space-y-4 text-white/90 font-light text-sm">
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Swimming pool</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Pool sundowner</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Sunrise trek & trail</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Indoor & outdoor games</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Karaoke nights</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Play & drawing for kids</li>
                </ul>
              </div>
            </div>

            {/* On Request */}
            <div className="relative group rounded-3xl overflow-hidden border border-border/20 shadow-xl">
              <Image 
                src={spaImg} 
                alt="On Request" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                  On Request
                </h3>
                <ul className="space-y-4 text-white/90 font-light text-sm">
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Spa</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Boating</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Select workshops</li>
                </ul>
              </div>
            </div>

            {/* Rolling Out Soon */}
            <div className="relative group rounded-3xl overflow-hidden border border-border/20 shadow-xl">
              <Image 
                src={cinemaImg} 
                alt="Rolling Out Soon" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/40"></span>
                  Rolling Out Soon
                </h3>
                <ul className="space-y-4 text-white/90 font-light text-sm">
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Live music</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Open-air cinema</li>
                  <li className="flex items-center gap-3"><span className="w-1 h-1 bg-white/50 rounded-full"></span>Workshops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
