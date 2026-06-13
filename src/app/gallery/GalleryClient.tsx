"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeUp from "@/components/home/FadeUp";
import { useBooking } from "@/context/BookingContext";

interface GalleryItem {
  id: number;
  type: "image" | "video";
  title: string;
  category: string;
  image?: any;
  videoUrl?: string;
  description: string;
  aspect: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "video",
    title: "Lakeside Serenity",
    category: "Nature",
    image: "/assets/lakeside.webp",
    videoUrl: "/Website_01.webm",
    description: "Witness pristine mornings where the lake water reflects the golden horizon.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 2,
    type: "video",
    title: "Infinity Waters",
    category: "Leisure",
    image: "/assets/pool.webp",
    videoUrl: "/Website_03.webm",
    description: "Unwind at our sparkling infinity pool that merges with the tree lines.",
    aspect: "aspect-square",
  },
  {
    id: 3,
    type: "video",
    title: "Mango Grove Canopy",
    category: "Nature",
    image: "/assets/aamrai.webp",
    videoUrl: "/trees.webm",
    description: "A shady sanctuary cooled by decades-old mango trees (Aamrai) for peaceful walks.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 4,
    type: "video",
    title: "The Dining Pavilion",
    category: "Culinary",
    image: "/assets/restaurant.webp",
    videoUrl: "/Website_05.webm",
    description: "Indulge in curated local delicacies served with panoramic views of the water.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 5,
    type: "video",
    title: "Grand Sunset Lawn",
    category: "Celebrations",
    image: "/assets/wedding-lawn.webp",
    videoUrl: "/Website_Video_02.webm",
    description: "Our premier lakefront wedding lawn, set up for a celebration of 100-200 guests.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 6,
    type: "video",
    title: "Plush Guest Room",
    category: "Suites",
    image: "/assets/room.webp",
    videoUrl: "/Website_04.webm",
    description: "Elegantly styled accommodations designed to ensure maximum comfort for your wedding guests.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 7,
    type: "video",
    title: "Lakeside Suite",
    category: "Suites",
    image: "/assets/lakeside_suite.webp",
    videoUrl: "/Website_09.webm",
    description: "Wake up to endless water views with our premium, glass-fronted suite design.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 8,
    type: "video",
    title: "Garden Villa",
    category: "Suites",
    image: "/assets/garden_villa.webp",
    videoUrl: "/Website_08.webm",
    description: "Opening directly onto beautifully landscaped lawns for a perfect indoor-outdoor feel.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 9,
    type: "video",
    title: "Mango Grove Cottage",
    category: "Suites",
    image: "/assets/mango_cottage.webp",
    videoUrl: "/Website_010.webm",
    description: "A heritage-style private cottage nestled deep in our shade-giving aamrai grove.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 10,
    type: "video",
    title: "Main Resort Entrance",
    category: "Architecture",
    image: "/assets/hero-resort.webp",
    videoUrl: "/boating.webm",
    description: "Traditional craftsmanship meets contemporary luxury at the main entrance.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 11,
    type: "image",
    title: "Lakeside Palms Canopy",
    category: "Nature",
    image: "/outdoor_images/020A6239.webp",
    description: "Pristine lakeside pathways decorated with tall coconut palms and lawns.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 12,
    type: "image",
    title: "Lakefront Promenade",
    category: "Nature",
    image: "/outdoor_images/020A6241.webp",
    description: "Take a quiet stroll along the waterfront promenade offering endless vistas.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 13,
    type: "image",
    title: "Sunset Wedding Lawn",
    category: "Celebrations",
    image: "/outdoor_images/020A6244.webp",
    description: "Sprawling open-air lawns perfect for hosting grand events and wedding sangeets.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 14,
    type: "image",
    title: "Green Oasis Walkway",
    category: "Nature",
    image: "/outdoor_images/020A6254.webp",
    description: "Scenic green trails winding through the resort's meticulously landscaped gardens.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 15,
    type: "image",
    title: "Twilight Lake View",
    category: "Nature",
    image: "/outdoor_images/020A6262.webp",
    description: "Watch the colors of twilight blend over the calm waters of the resort's private lakefront.",
    aspect: "aspect-square",
  },
  {
    id: 16,
    type: "image",
    title: "Lakeside Premium Room",
    category: "Suites",
    image: "/roomImages/020A6091.webp",
    description: "An elegantly furnished room combining rustic warmth with modern luxury.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 17,
    type: "image",
    title: "Heritage Luxury Room",
    category: "Suites",
    image: "/roomImages/020A6097.webp",
    description: "Plush fabrics and cozy seating areas overlooking the garden canopy.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 18,
    type: "image",
    title: "Presidential Bedchamber",
    category: "Suites",
    image: "/roomImages/020A6099.webp",
    description: "Unwind in state-of-the-art bedding designed for deep, peaceful rest.",
    aspect: "aspect-square",
  },
  {
    id: 19,
    type: "image",
    title: "Executive Deluxe Suite",
    category: "Suites",
    image: "/roomImages/020A6152.webp",
    description: "Beautifully styled room with dedicated vanity, storage space and modern aesthetics.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 20,
    type: "image",
    title: "Garden View Deluxe",
    category: "Suites",
    image: "/roomImages/020A6170.webp",
    description: "Wake up to fresh garden views in this contemporary, space-optimized retreat.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 21,
    type: "image",
    title: "Golden Hour Resort Entrance",
    category: "Architecture",
    image: "/sliderImage/slider-1.webp",
    description: "The architectural gateway of Jalashay Resort catching the evening sun.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 22,
    type: "image",
    title: "Aamrai Mango Orchard Pathway",
    category: "Nature",
    image: "/sliderImage/slider-2.webp",
    description: "Sunlight filtering through the canopy of mature mango trees.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 23,
    type: "image",
    title: "Lakeside Infinity Pool Deck",
    category: "Leisure",
    image: "/sliderImage/slider-3.webp",
    description: "Take in the panoramic water horizon from our lounge deck by the pool.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 24,
    type: "image",
    title: "Premium Lakefront Villas",
    category: "Architecture",
    image: "/sliderImage/slider-4.webp",
    description: "Traditional roofing meets modern glass facades directly fronting the lake.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 25,
    type: "image",
    title: "Grand Ballroom & Marquee",
    category: "Celebrations",
    image: "/sliderImage/slider-5.webp",
    description: "Stunning open structure designed to hold memorable corporate and wedding celebrations.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 26,
    type: "image",
    title: "Lakeside Sunset Lawn",
    category: "Celebrations",
    image: "/sliderImage/020A6307.webp",
    description: "A magical lakefront setting, pristine for hosting wedding vows and receptions.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 27,
    type: "image",
    title: "Lakeside Canopy Suite",
    category: "Suites",
    image: "/sliderImage/020A6063.webp",
    description: "Ultra-private suite offering private balcony views of the calm lake.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 28,
    type: "image",
    title: "Deluxe Twin Suite",
    category: "Suites",
    image: "/sliderImage/020A6071.webp",
    description: "Comfortable twin-bed setups designed with modern minimalist architecture.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 29,
    type: "image",
    title: "Lakeside Evening Pathway",
    category: "Nature",
    image: "/sliderImage/slider-3.webp",
    description: "Beautifully lit brick pathways wrapping around the waterfront.",
    aspect: "aspect-square",
  },
  {
    id: 30,
    type: "image",
    title: "Waterfront Sitting Lounge",
    category: "Leisure",
    image: "/sliderImage/020A6269.webp",
    description: "Cozy sit-outs directly on the lakeside edge, ideal for morning tea.",
    aspect: "aspect-[4/3]",
  },
];

const categories = ["All", "Nature", "Suites", "Leisure", "Celebrations", "Architecture", "Culinary"];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const { openBooking } = useBooking();

  // Filter items
  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === "Escape") {
        setActiveItemIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setActiveItemIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, filteredItems]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItemIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveItemIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveItemIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  };

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

      {/* Main Page Area */}
      <main className="mx-auto max-w-6xl px-6 mt-20">
        {/* Title & Description */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — Visual Story
            </span>
            <h1 className="mt-6 font-display text-5xl font-light leading-tight md:text-7xl">
              Our Lakeside <span className="text-gold-gradient italic">Haven</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Explore the quiet corners, lakeside vistas, and curated spaces designed to
              elevate every celebration. A glimpse into the Jalashay experience.
            </p>
          </FadeUp>
        </div>

        {/* Filter Bar */}
        <div className="mb-12 flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveItemIndex(null);
              }}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "border border-gold/15 bg-card/30 text-muted-foreground hover:text-foreground hover:bg-gold/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Mesh Columns Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid group relative overflow-hidden rounded-sm border border-border/40 bg-card/40 cursor-pointer shimmer-border w-full flex"
                onClick={() => setActiveItemIndex(idx)}
              >
                <div className={`relative w-full ${item.aspect}`}>
                  {item.type === "video" ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <video
                        src={item.videoUrl}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        autoPlay
                        suppressHydrationWarning
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-wider text-gold border border-gold/20 font-semibold shadow-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                        </span>
                        Video
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={`${item.title} at Jalashay Resort`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                      {item.category}
                    </span>
                    <h2 className="mt-1 font-display text-2xl text-foreground font-light">
                      {item.title}
                    </h2>
                    <span className="mt-3 flex items-center gap-1.5 text-xs text-gold font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {item.type === "video" ? (
                        <>
                          <Play className="h-3.5 w-3.5 fill-current" /> Play Video
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> View Photo
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-background/97 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveItemIndex(null)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full z-10 max-w-6xl mx-auto">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold">
                {filteredItems[activeItemIndex].type === "video" ? "Video" : "Photo"}{" "}
                {activeItemIndex + 1} of {filteredItems.length}
              </span>
              <button
                className="p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={() => setActiveItemIndex(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Slider Area */}
            <div className="relative flex flex-1 items-center justify-center w-full max-w-6xl mx-auto my-4 overflow-hidden">
              <button
                className="absolute left-0 md:left-4 z-20 p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <motion.div
                key={activeItemIndex}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[70vh] w-full flex items-center justify-center px-12"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[activeItemIndex].type === "video" ? (
                  <video
                    src={filteredItems[activeItemIndex].videoUrl}
                    className="max-h-[70vh] max-w-full rounded-sm shadow-2xl select-none"
                    controls
                    autoPlay
                    playsInline
                    suppressHydrationWarning
                  />
                ) : (
                  <img
                    src={filteredItems[activeItemIndex].image}
                    alt={`${filteredItems[activeItemIndex].title} at Jalashay Resort`}
                    decoding="async"
                    loading="lazy"
                    className="max-h-[70vh] max-w-full rounded-sm object-contain shadow-2xl select-none"
                  />
                )}
              </motion.div>

              <button
                className="absolute right-0 md:right-4 z-20 p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom details */}
            <div className="text-center z-10 max-w-xl mx-auto pb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                {filteredItems[activeItemIndex].category}
              </span>
              <h2 className="mt-2 font-display text-3xl text-foreground font-light leading-tight">
                {filteredItems[activeItemIndex].title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {filteredItems[activeItemIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
