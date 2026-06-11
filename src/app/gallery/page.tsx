"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import FadeUp from "@/components/home/FadeUp";
import { useBooking } from "@/context/BookingContext";

import lakesideImg from "@/assets/lakeside.jpg";
import poolImg from "@/assets/pool.jpg";
import aamraiImg from "@/assets/aamrai.jpg";
import restaurantImg from "@/assets/restaurant.jpg";
import weddingImg from "@/assets/wedding-lawn.jpg";
import roomImg from "@/assets/room.jpg";
import lakesideSuiteImg from "@/assets/lakeside_suite.png";
import gardenVillaImg from "@/assets/garden_villa.png";
import mangoCottageImg from "@/assets/mango_cottage.png";
import heroResortImg from "@/assets/hero-resort.jpg";

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
    type: "image",
    title: "Lakeside Serenity",
    category: "Nature",
    image: lakesideImg,
    description: "Witness pristine mornings where the lake water reflects the golden horizon.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 2,
    type: "video",
    title: "Tropical Pool Haven",
    category: "Leisure",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-in-the-forest-40277-large.mp4",
    description: "A relaxing aerial view of our lush, tree-fringed swimming pool.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 3,
    type: "image",
    title: "Infinity Waters",
    category: "Leisure",
    image: poolImg,
    description: "Unwind at our sparkling infinity pool that merges with the tree lines.",
    aspect: "aspect-square",
  },
  {
    id: 4,
    type: "image",
    title: "Mango Grove Canopy",
    category: "Nature",
    image: aamraiImg,
    description: "A shady sanctuary cooled by decades-old mango trees (Aamrai) for peaceful walks.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    type: "video",
    title: "Golden Lake Ripples",
    category: "Nature",
    videoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ab2d719ad0c0fb2b0f4d35e19fc7db59d70&profile_id=165&oauth2_token_id=57447761",
    description: "Slow, soothing waters of the lake reflecting the golden hues of the setting sun.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 6,
    type: "image",
    title: "The Dining Pavilion",
    category: "Culinary",
    image: restaurantImg,
    description: "Indulge in curated local delicacies served with panoramic views of the water.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 7,
    type: "image",
    title: "Grand Sunset Lawn",
    category: "Celebrations",
    image: weddingImg,
    description: "Our premier lakefront wedding lawn, set up for a celebration of 100-200 guests.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 8,
    type: "image",
    title: "Plush Guest Room",
    category: "Suites",
    image: roomImg,
    description: "Elegantly styled accommodations designed to ensure maximum comfort for your wedding guests.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 9,
    type: "video",
    title: "Drone View of Our Retreat",
    category: "Architecture",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c025f73d6b0553744673892c905cc988&profile_id=139&oauth2_token_id=57447761",
    description: "An aerial showcase of our modern resort villas nested amidst dense local forestry.",
    aspect: "aspect-[16/9]",
  },
  {
    id: 10,
    type: "image",
    title: "Lakeside Suite",
    category: "Suites",
    image: lakesideSuiteImg,
    description: "Wake up to endless water views with our premium, glass-fronted suite design.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 11,
    type: "image",
    title: "Garden Villa",
    category: "Suites",
    image: gardenVillaImg,
    description: "Opening directly onto beautifully landscaped lawns for a perfect indoor-outdoor feel.",
    aspect: "aspect-[3/2]",
  },
  {
    id: 12,
    type: "image",
    title: "Mango Grove Cottage",
    category: "Suites",
    image: mangoCottageImg,
    description: "A heritage-style private cottage nestled deep in our shade-giving aamrai grove.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 13,
    type: "image",
    title: "Main Resort Entrance",
    category: "Architecture",
    image: heroResortImg,
    description: "Traditional craftsmanship meets contemporary luxury at the main entrance.",
    aspect: "aspect-[16/9]",
  },
];

const categories = ["All", "Nature", "Suites", "Leisure", "Celebrations", "Architecture", "Culinary"];

export default function GalleryPage() {
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
          {categories.map((cat, idx) => (
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
                  {/* Media Rendering */}
                  {item.type === "video" ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <video
                        src={item.videoUrl}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      {/* Video Indicator Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-wider text-gold border border-gold/20 font-semibold shadow-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                        </span>
                        Video
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.image.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl text-foreground font-light">
                      {item.title}
                    </h3>
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
              {/* Prev Button */}
              <button
                className="absolute left-0 md:left-4 z-20 p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Central Media Panel */}
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
                  />
                ) : (
                  <img
                    src={filteredItems[activeItemIndex].image.src}
                    alt={filteredItems[activeItemIndex].title}
                    className="max-h-[70vh] max-w-full rounded-sm object-contain shadow-2xl select-none"
                  />
                )}
              </motion.div>

              {/* Next Button */}
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
              <h3 className="mt-2 font-display text-3xl text-foreground font-light leading-tight">
                {filteredItems[activeItemIndex].title}
              </h3>
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
