"use client";

import { motion } from "motion/react";
import {
  BedDouble,
  Sparkles,
  Waves,
  Trees,
  UtensilsCrossed,
  Sailboat,
} from "lucide-react";
import FadeUp from "./FadeUp";
import Link from "next/link";
import Image from "next/image";

type Feature = {
  icon: typeof BedDouble;
  title: string;
  desc: string;
  image: string;
  video?: string;
  meta?: string;
  slug: string;
};

const features: Feature[] = [
  {
    icon: BedDouble,
    title: "49 Curated Rooms",
    desc: "26 rooms reserved for weddings and 23 thoughtfully appointed rooms for FIT travellers seeking quiet luxury.",
    image: '/roomImages/020A6091.webp',
    video: "/Website_04.webm",
    meta: "26 wedding · 23 FIT",
    slug: "curated-rooms",
  },
  {
    icon: Sparkles,
    title: "Three Open-Air Lawns",
    desc: "Sprawling, lit lawns ideal for mandaps, sangeets, receptions and corporate marquees of every scale.",
    image: '/sliderImage/slider-2.webp',
    video: "/Website_Video_02.webm",
    meta: "Up to 200 pax",
    slug: "open-air-lawns",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    desc: "A lantern-lit pool surrounded by palms — perfect for golden-hour swims and poolside soirées.",
    image: '/sliderImage/slider-4.webp',
    video: "/Website_010.webm",
    slug: "swimming-pool",
  },
  {
    icon: Trees,
    title: "Aamrai Mango Grove",
    desc: "Walk beneath a canopy of mature mango trees — the resort's most loved private corner.",
    image: "/assets/aamrai.webp",
    video: "/trees.webm",
    slug: "mango-grove",
  },
  {
    icon: UtensilsCrossed,
    title: "Lakeside Restaurant",
    desc: "Multi-cuisine dining with warm interiors and uninterrupted views over the water.",
    image: "/outdoor_images/020A6244.webp",
    video: "/Website_05.webm",
    slug: "lakeside-restaurant",
  },
  {
    icon: Sailboat,
    title: "Lakeside & Boating",
    desc: "Serene lake frontage today, with boating experiences arriving soon for our guests.",
    image: "/assets/lakeside.webp",
    video: "/boating.webm",
    meta: "Boating · coming soon",
    slug: "lakeside-boating",
  },
];

export default function Features() {
  return (
    <section id="amenities" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — Amenities
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Crafted for every{" "}
              <span className="text-gold-gradient italic">moment</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={(i % 3) * 0.1}>
              <Link href={`/amenities/${f.slug}`} className="block h-full cursor-pointer">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border/60 bg-card/60 shimmer-border"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {f.video ? (
                      <video
                        src={f.video}
                        poster={f.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        suppressHydrationWarning
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={f.image}
                        alt={`${f.title} facilities at Jalashay Resort`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    {f.meta && (
                      <div className="absolute right-4 top-4 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur">
                        {f.meta}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <f.icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                    <h3 className="mt-4 font-display text-2xl text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                    <div className="mt-auto pt-6 flex items-center gap-1 text-[10px] text-gold font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      Discover Details <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
