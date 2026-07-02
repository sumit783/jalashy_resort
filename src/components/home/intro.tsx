"use client";

import { useState } from "react";
import { useScrollY } from "@/hooks/use-scroll-y";
import Image from "next/image";
import villa from "@/assets/slider-5.webp";
import backwater from "@/assets/wedding-lawn.webp";

export function Intro() {
  const [showMore, setShowMore] = useState(false);
  const y = useScrollY();

  return (
    <section className="py-32 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Image (Scrolls slower/upwards relative to page) */}
        <div
          className="lg:col-span-3 hidden lg:block aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] will-change-transform relative"
          style={{ transform: `translate3d(0, ${y * 0.06}px, 0)` }}
        >
          <Image
            src={villa}
            alt="Jalashay Resort Overview"
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover scale-110"
          />
        </div>

        {/* Center Column - Text Content */}
        <div className="lg:col-span-6 text-center px-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — The Estate
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.1] text-balance">
            Where the lake meets <em>celebration.</em>
          </h2>
          <p className="mt-8 text-base text-muted-foreground font-light leading-relaxed">
            Set against a tranquil lakeside, Jalashay Resort is a curated retreat built for the most
            important moments of your life. From grand weddings on manicured lawns to quiet mornings
            under the mango canopy of our aamrai — every detail is crafted with intention.
          </p>

          {showMore && (
            <div className="mt-6 animate-fade-in">
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Conveniently located just a short scenic drive away, Jalashay is the perfect
                destination for those craving the perfect escape to unwind and rejuvenate amidst
                nature's embrace. Passionately designed to blend harmoniously with the surrounding
                water bodies, it features bespoke architectures and a serene sanctuary of hushed
                repose.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-8 text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--gold)] border-b border-[color:var(--gold)] pb-1 hover:text-foreground hover:border-foreground transition cursor-pointer"
          >
            {showMore ? "Learn Less" : "Learn More"}
          </button>
        </div>

        {/* Right Column - Image (Scrolls faster/downwards relative to page) */}
        <div
          className="lg:col-span-3 hidden lg:block aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] will-change-transform relative"
          style={{ transform: `translate3d(0, ${y * -0.06}px, 0)` }}
        >
          <Image
            src={backwater}
            alt="Jalashay Resort Lakeside"
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover scale-110"
          />
        </div>
      </div>
    </section>
  );
}
