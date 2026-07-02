"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxBand({
  image,
  video,
  kicker,
  title,
  sub,
}: {
  image?: string;
  video?: string;
  kicker: string;
  title: string;
  sub: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how far the section is relative to the viewport
      if (rect.top < viewHeight && rect.bottom > 0) {
        // Use rect.top to create a viewport-relative parallax shift
        setOffset(rect.top * -0.2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[75vh] flex items-center justify-center overflow-hidden"
    >
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-[140%] object-cover z-0"
          style={{
            transform: `translate3d(0, ${offset}px, 0)`,
            top: "-20%",
          }}
          suppressHydrationWarning
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundAttachment: "fixed",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/45 z-10" />
      <div className="relative text-center text-white px-6 max-w-3xl z-20">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">{kicker}</p>
        <h3 className="font-display text-5xl md:text-7xl mt-4 text-balance">{title}</h3>
        <p className="mt-6 text-white/85 font-light text-lg">{sub}</p>
      </div>
    </section>
  );
}


