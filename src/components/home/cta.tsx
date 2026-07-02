"use client";

import { useRef, useEffect, useState } from "react";
import aerial from "@/assets/outsideImages/slider-2.webp";
import { useBookingModal } from "@/context/BookingModalContext";

export function CTA() {
  const { openBookingModal } = useBookingModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate scroll position relative to the element's entry in viewport
      if (rect.top < viewHeight && rect.bottom > 0) {
        // Calculate offset multiplier
        const scrollPercent = (viewHeight - rect.top) / (viewHeight + rect.height);
        setOffsetY((scrollPercent - 0.5) * 80); // Move between -40px and +40px
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="book"
      ref={containerRef}
      className="relative py-32 px-6 lg:px-10 flex items-center justify-center overflow-hidden min-h-[450px]"
    >
      {/* Parallax Background Container */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform scale-125 transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${aerial.src})`,
          transform: `translate3d(0, ${offsetY}px, 0)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
          — Begin your story
        </p>
        <h2 className="font-display text-5xl md:text-7xl mt-6 leading-tight">
          Begin your lakeside <em>escape.</em>
        </h2>
        <p className="mt-8 text-lg font-light text-white/85">
          Availability is intentionally limited. Reach out to plan a wedding, book a stay, or
          arrange a personal tour.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => openBookingModal("Stay")}
            className="btn-gold hover:[&]:btn-gold-hover text-sm uppercase tracking-[0.2em]"
          >
            Reserve Your Stay
          </button>
          <a
            href="tel:+918040001212"
            className="rounded-full border border-white/60 text-white text-sm uppercase tracking-[0.2em] px-7 py-[0.85rem] font-medium hover:bg-white/10 transition"
          >
            +91 80 4000 1212
          </a>
        </div>
      </div>
    </section>
  );
}
