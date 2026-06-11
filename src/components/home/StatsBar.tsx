"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import FadeUp from "./FadeUp";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(() => {
    // Initialize the numbers in the string as 0
    return value.replace(/\d+/g, "0");
  });

  useEffect(() => {
    if (!inView) return;

    // Find all numbers in the string
    const numbers = value.match(/\d+/g);
    if (!numbers) return;

    const targets = numbers.map(Number);
    const currentValues = targets.map(() => 0);

    const anims = targets.map((target, idx) => {
      return animate(0, target, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // premium ease-out expo
        onUpdate: (latest) => {
          currentValues[idx] = Math.round(latest);

          // Re-assemble the string with the updated values
          let matchIndex = 0;
          const formatted = value.replace(/\d+/g, () => {
            return String(currentValues[matchIndex++]);
          });
          setDisplay(formatted);
        },
      });
    });

    return () => {
      anims.forEach((a) => a.stop());
    };
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsBar() {
  const stats = [
    { value: "26", label: "Wedding Rooms" },
    { value: "23", label: "FIT Rooms" },
    { value: "3", label: "Event Lawns" },
    { value: "100–200", label: "Pax Weddings" },
  ];
  return (
    <section className="relative border-y border-border/60 bg-card/40 py-14 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08}>
            <div className="text-center">
              <div className="font-display text-5xl font-light text-gold-gradient md:text-6xl">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
