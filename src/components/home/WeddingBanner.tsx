"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import FadeUp from "./FadeUp";

export default function WeddingBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative h-[90vh] min-h-[600px] overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[140%]">
        <img
          src={"/assets/wedding-lawn.webp"}
          alt="Wedding mandap"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </motion.div>
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            — For Weddings
          </span>
          <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] md:text-7xl">
            The address for a <br />
            <span className="text-gold-gradient italic">
              100–200 pax wedding
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            26 rooms dedicated to your guests. Three lawns to stage every
            ritual. A lakeside backdrop that turns every photograph into a
            memory.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-gold)] px-10 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.03]"
          >
            Enquire for Your Date
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
