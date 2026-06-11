"use client";

import { use, useEffect } from "react";
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
  Clock,
  MapPin,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import FadeUp from "@/components/home/FadeUp";



interface AmenityDetail {
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

const amenitiesData: Record<string, AmenityDetail> = {
  "curated-rooms": {
    slug: "curated-rooms",
    icon: BedDouble,
    title: "49 Curated Rooms & Suites",
    subtitle: "Sanctuaries of Peaceful Rest",
    image: "/assets/room.webp",
    longDesc: "Jalashay Resort offers 49 elegantly curated rooms designed for quiet luxury and rest. Out of these, 26 are dedicated suites set aside specifically to host your wedding guests and family members in close comfort, ensuring your entire party stays together. An additional 23 thoughtfully appointed rooms are crafted for FIT (Free Independent Travelers) seeking a quiet escape from the hustle of city life. Enjoy modern bathrooms, hand-picked linens, and private sit-out balconies opening onto manicured lawns or the peaceful water.",
    highlights: [
      "26 Dedicated Wedding Rooms",
      "23 FIT Luxury Rooms & Cottages",
      "Private Sit-out Balconies",
      "Scenic Lake & Garden Views",
      "Premium Linens & Organic Toiletries",
      "High-Speed Wi-Fi & Work Desks",
    ],
    metaLabel: "Capacity",
    metaVal: "49 Rooms (100+ guests)",
    galleryImages: ["/assets/lakeside_suite.png", "/assets/garden_villa.png"],
  },
  "open-air-lawns": {
    slug: "open-air-lawns",
    icon: Sparkles,
    title: "Three Open-Air Lawns",
    subtitle: "Lakeside Celebrations Under the Stars",
    image: "/assets/wedding-lawn.webp",
    longDesc: "Jalashay features three manicured, open-air lawns set against a spectacular lake view. Perfect for celebrations of every scale—from intimate pre-wedding rituals like mehndi and sangeet to grand wedding mandaps, lakeside receptions, and corporate marquees. The lawns can comfortably host gatherings from 100 up to 200 guests with effortless grace. Integrated ambient lighting, private access pathways, and dedicated catering staging areas make hosting celebrations a seamless experience.",
    highlights: [
      "Capacity for 100 to 200 Guests",
      "Stunning Lakeside Backdrop",
      "Professional Ambient & Festoon Lighting",
      "Dedicated Catering Prep Areas",
      "Impeccable Landscaping & Greenery",
      "Convenient Guest Parking & Valet Services",
    ],
    metaLabel: "Occasions",
    metaVal: "Weddings, Receptions & Events",
    galleryImages: ["/assets/lakeside.webp", "/assets/room.webp"],
  },
  "swimming-pool": {
    slug: "swimming-pool",
    icon: Waves,
    title: "Swimming Pool",
    subtitle: "Sublime Swims & Poolside Soirées",
    image: "/assets/pool.webp",
    longDesc: "Our lantern-lit swimming pool is a tropical oasis sheltered by mature palms and canopy trees. The pool blends seamlessly with the natural landscape, offering a refreshing escape during warm afternoons. As the sun sets, the pool area transforms with warm lantern glow—perfect for quiet poolside soirées, mocktail receptions, or simply enjoying the evening breeze over the water.",
    highlights: [
      "Lantern-Lit Evening Ambiance",
      "Tropical Palm Canopy Borders",
      "Comfortable Cabanas & Sun Loungers",
      "Fresh Poolside Mocktail Service",
      "Dedicated Shallow Zone for Children",
      "Complimentary Premium Towels & Robes",
    ],
    metaLabel: "Hours",
    metaVal: "7:00 AM — 8:00 PM",
    galleryImages: ["/assets/restaurant.webp", "/assets/room.webp"],
  },
  "mango-grove": {
    slug: "mango-grove",
    icon: Trees,
    title: "Aamrai Mango Grove",
    subtitle: "Whispering Trees & Canopy Walks",
    image: "/assets/aamrai.webp",
    longDesc: "The Aamrai is our resort's most cherished historical corner—a decades-old grove of mature mango trees that cast a dense, cool canopy over the ground. Perfect for a quiet morning walk, reading under the shade, or hosting intimate traditional outdoor lunches under the branches. The grove preserves a rustic heritage atmosphere that connects you directly with the land's traditional farming roots.",
    highlights: [
      "Ancient Mature Mango Trees",
      "Naturally Shaded Walkways",
      "Rustic Swings & Hammocks",
      "Ideal for Al Fresco Afternoon Teas",
      "Tranquil & Quiet Reading Nooks",
      "Heritage-Inspired Canopy Design",
    ],
    metaLabel: "Setting",
    metaVal: "Shaded Old-Growth Forest",
    galleryImages: ["/assets/wedding-lawn.webp", "/assets/room.webp"],
  },
  "lakeside-restaurant": {
    slug: "lakeside-restaurant",
    icon: UtensilsCrossed,
    title: "Lakeside Restaurant",
    subtitle: "A Culinary Journey with Panoramic Vistas",
    image: "/assets/restaurant.webp",
    longDesc: "Jalashay's Lakeside Restaurant serves a curated culinary experience featuring local Konkan delicacies, contemporary Indian favorites, and classic continental cuisine. Dine inside the warm, wood-paneled pavilion or out on the open deck with uninterrupted views of the quiet lake waters. Every dish is prepared by our master chefs using fresh, locally sourced ingredients and organic herbs from our garden.",
    highlights: [
      "Indoor & Al Fresco Water-Deck Seating",
      "Local Konkani & Multi-Cuisine Menu",
      "Master Chef Curated Menus",
      "Organic Farm-to-Table Ingredients",
      "Private Dining Available for Parties",
      "Stunning Sunset View Dining",
    ],
    metaLabel: "Cuisine",
    metaVal: "Local Konkani & Multi-Cuisine",
    galleryImages: ["/assets/pool.webp", "/assets/lakeside.webp"],
  },
  "lakeside-boating": {
    slug: "lakeside-boating",
    icon: Sailboat,
    title: "Lakeside & Boating",
    subtitle: "Tranquil Waters & Future Adventures",
    image: "/assets/lakeside.webp",
    longDesc: "With hundreds of meters of pristine lake frontage, Jalashay offers a direct connection to calm, peaceful waters. Currently, guests can enjoy lakeside walking trails, bonfire spots, and sunset viewing decks. We are actively expanding our amenities to introduce curated boating experiences—including silent electric boats, kayak rentals, and guided lake tours—allowing you to fully explore the lake's serene beauty starting next season.",
    highlights: [
      "Direct Private Lake Frontage",
      "Scenic Lakeside Walking Trails",
      "Bonfire Pits & Sunset Gazebos",
      "Kayak & Electric Boating (Coming Soon)",
      "Guided Bird-Watching Points",
      "Perfect Spot for Morning Yoga",
    ],
    metaLabel: "Status",
    metaVal: "Frontage open · Boating soon",
    galleryImages: ["/assets/pool.webp", "/assets/restaurant.webp"],
  },
};

export default function AmenityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
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
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover"
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
                    <img
                      src={img}
                      alt="Resort scenery detail"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
