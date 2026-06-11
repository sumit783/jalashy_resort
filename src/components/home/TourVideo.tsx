"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

export default function TourVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.25 });

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed or was blocked by browser policies", err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden bg-background"
    >
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-in-the-forest-40277-large.mp4"
        className="h-full w-full object-cover"
        muted
        playsInline
        loop
        suppressHydrationWarning
      />
      {/* Top and Bottom Gradient Blends to blend with the rest of the dark sections */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
