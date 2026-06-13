"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import {
  BedDouble,
  Sparkles,
  Waves,
  Trees,
  UtensilsCrossed,
  Sailboat,
  ArrowLeft,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import FadeUp from "@/components/home/FadeUp";

export interface AmenityDetail {
  slug: string;
  icon: any;
  title: string;
  subtitle: string;
  image: any;
  longDesc: string;
  highlights: string[];
  metaLabel: string;
  metaVal: string;
  galleryImages: any[];
}

import { amenitiesData as rawAmenitiesData } from "@/lib/amenitiesData";

const iconMap: Record<string, any> = {
  "curated-rooms": BedDouble,
  "open-air-lawns": Sparkles,
  "swimming-pool": Waves,
  "mango-grove": Trees,
  "lakeside-restaurant": UtensilsCrossed,
  "lakeside-boating": Sailboat,
};

export const amenitiesData: Record<string, AmenityDetail> = Object.keys(rawAmenitiesData).reduce((acc, key) => {
  acc[key] = {
    ...rawAmenitiesData[key],
    icon: iconMap[key],
  } as AmenityDetail;
  return acc;
}, {} as Record<string, AmenityDetail>);

export default function AmenityDetailClient({ slug }: { slug: string }) {
  const { openBooking } = useBooking();

  const data = amenitiesData[slug];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl text-gold mb-4">Amenity Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested amenity page does not exist.</p>
        <Link href="/" className="rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)]">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full border border-gold/20 bg-card/40 px-3.5 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-gold/15 hover:border-gold/60 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-gold group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <Link href="/" className="font-display text-2xl sm:text-3xl tracking-wide text-foreground">
            Jalashay<span className="text-gold">.</span>
          </Link>

          <button
            onClick={() => openBooking()}
            className="rounded-full bg-[image:var(--gradient-gold)] px-4 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-background">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt={`Hero showcase: ${data.title} at Jalashay Resort`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-10 left-0 right-0 z-10 max-w-6xl mx-auto px-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-2">
            — Resort Amenity
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight">
            {data.title}
          </h1>
        </div>
      </section>

      {/* Details Grid Section */}
      <main className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
        {/* Left Column: Descriptions and Additional Gallery */}
        <div className="lg:col-span-2 space-y-10">
          <FadeUp>
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-light text-gold-gradient italic">
                {data.subtitle}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {data.longDesc}
              </p>
            </div>
          </FadeUp>

          {/* Secondary Visual Showcase */}
          <div className="pt-6 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
              Visual Showcase
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.galleryImages.map((img, idx) => (
                <FadeUp key={idx} delay={idx * 0.15}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/30 bg-card/20 shimmer-border">
                    <Image
                      src={img}
                      alt={`Scenic highlight details of ${data.title} at Jalashay Resort`}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Highlights Checklist Card */}
        <div className="lg:col-span-1">
          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-border/40 bg-card/40 p-8 shimmer-border shadow-soft flex flex-col gap-6 sticky top-28">
              <div>
                <h3 className="font-display text-2xl text-foreground font-light mb-2">
                  Amenity Details
                </h3>
                <div className="gold-divider w-12" />
              </div>

              {/* Status Metadata Items */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">{data.metaLabel}</div>
                    <div className="text-foreground font-light mt-0.5">{data.metaVal}</div>
                  </div>
                </div>
              </div>

              {/* Highlights Bullet Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Key Highlights</h4>
                <ul className="space-y-3">
                  {data.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="leading-tight">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger button */}
              <button
                onClick={() => openBooking()}
                className="w-full mt-6 rounded-full bg-[image:var(--gradient-gold)] py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
              >
                Book Your Experience
              </button>
            </div>
          </FadeUp>
        </div>
      </main>

      {/* Bottom Large CTA Banner */}
      <section className="mx-auto max-w-6xl px-6 mt-28">
        <FadeUp>
          <div className="rounded-2xl border border-border/40 bg-card/30 p-12 shimmer-border text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-soft">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold">
              — Begin Your Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Experience the tranquility of{" "}
              <span className="text-gold-gradient italic">Jalashay</span>
            </h2>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Arrange your wedding lawns, book your luxury suites, or plan a quiet getaway under the mango grove today.
            </p>
            <button
              onClick={() => openBooking()}
              className="mt-4 rounded-full bg-[image:var(--gradient-gold)] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Enquire For Reservation
            </button>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
