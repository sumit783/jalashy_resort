"use client";

import { useEffect, useRef, useState } from "react";

// Safe parallax for all browsers including iOS Safari.
// Uses position:absolute (not fixed) so the compositor doesn't crash on iOS
// when multiple parallax sections are on the same page.
// On desktop: JS scroll drives a gentle translateY shift.
// On iOS/mobile: static fill — no compositor issues, no JS scroll needed.

function useParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // default true (SSR-safe)

  useEffect(() => {
    // Detect iOS / small screens once after mount
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    const mobile = ios || window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return; // skip scroll listener on mobile

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      setOffset(rect.top * -0.18);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { sectionRef, offset, isMobile };
}

export function ParallaxBand({
  image,
  kicker,
  title,
  sub,
}: {
  image?: string;
  kicker: string;
  title: string;
  sub: string;
}) {
  const { sectionRef, offset, isMobile } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 flex items-center justify-center overflow-hidden min-h-[75vh]"
    >
      {/* Background — position:absolute is safe on iOS (no compositor crash) */}
      <div
        className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          // On desktop: subtle JS parallax shift; on mobile: static
          transform: isMobile ? "none" : `translateY(${offset}px) scale(1.12)`,
          height: isMobile ? "100%" : "130%",
          top: isMobile ? "0" : "-15%",
          willChange: isMobile ? "auto" : "transform",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/50" />

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-3xl z-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">{kicker}</p>
        <h3 className="font-display text-5xl md:text-7xl mt-4 text-balance">{title}</h3>
        <p className="mt-6 text-white/85 font-light text-lg">{sub}</p>
      </div>
    </section>
  );
}
