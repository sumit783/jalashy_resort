"use client";

import aerial from "@/assets/outsideImages/slider-2.webp";
import { useBookingModal } from "@/context/BookingModalContext";

export function CTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <section
      id="book"
      className="relative py-32 px-6 lg:px-10 flex items-center justify-center overflow-hidden min-h-[450px]"
    >
      {/* Background image — position:absolute is iOS-safe (no compositor crash) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aerial.src})` }}
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
            href="tel:+917378818818"
            className="rounded-full border border-white/60 text-white text-sm uppercase tracking-[0.2em] px-7 py-[0.85rem] font-medium hover:bg-white/10 transition"
          >
            +91 73788 18818
          </a>
        </div>
      </div>
    </section>
  );
}
