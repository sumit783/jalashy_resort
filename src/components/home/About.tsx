"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <FadeUp>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — The Resort
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Where the lake meets{" "}
              <span className="text-gold-gradient italic">celebration</span>.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Set against a tranquil lakeside, Jalashay Resort is a curated
              retreat built for the most important moments of your life. From
              grand weddings on manicured lawns to quiet mornings under the
              mango canopy of our aamrai — every detail is crafted with
              intention.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              With 49 elegantly appointed rooms, three open-air lawns, a
              sparkling pool and lakeside vistas, we host celebrations of 100 to
              200 guests with effortless grace.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shimmer-border">
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-0 h-[120%] w-full"
            >
              <Image
                src="/wedding-lawn.webp"
                alt="Lawn-side wedding mandap ceremonies at sunset at Jalashay Resort"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">
                Signature
              </div>
              <div className="mt-2 font-display text-2xl text-foreground">
                Lawn-side wedding ceremonies
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
