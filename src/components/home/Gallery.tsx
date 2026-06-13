"use client";

import { useState, useEffect, useRef } from "react";

// Custom hook for Intersection Observer lazy loading
function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import FadeUp from "./FadeUp";
import Link from "next/link";
import Image from "next/image";


const galleryItems = [
  {
    id: 1,
    title: "Lakeside Sunset Deck",
    category: "Nature",
    image: "/sliderImage/slider-5.webp",
    description: "Vibrant hues of sunset washing over the lakeside lounge chairs.",
  },
  {
    id: 2,
    title: "Waterfront Lounge Setup",
    category: "Leisure",
    image: "/home_images/020A6231.webp",
    description: "Relax by the tranquil waters with our comfortable lakeside seating options.",
  },
  {
    id: 3,
    title: "Cozy Garden Sit-out",
    category: "Leisure",
    image: "/sliderImage/slider-3.webp",
    description: "Shaded canopy sit-outs surrounded by lush lawns and coconut trees.",
  },
  {
    id: 4,
    title: "Resort Walkway At Dusk",
    category: "Nature",
    image: "/home_images/020A6018.webp",
    description: "Warm lanterns illuminating the paved garden walkway winding through the resort.",
  },
  {
    id: 5,
    title: "Luxury Bedroom Suite",
    category: "Suites",
    image: "/roomImages/020A6091.webp",
    description: "Spacious, warm-lit bedrooms featuring premium wood craft and comfortable layout.",
  },
  {
    id: 6,
    title: "Lakeside Brick Path",
    category: "Nature",
    image: "/home_images/020A6228.webp",
    description: "A scenic walking path outlining the waterfront promenade.",
  },
  {
    id: 7,
    title: "Elegant Lakeside Suite",
    category: "Suites",
    image: "/assets/lakeside_suite.png",
    description: "Panoramic lake vistas, private glass frontage, and premium finishes.",
  },
  {
    id: 8,
    title: "Premium Garden Villa",
    category: "Suites",
    image: "/assets/garden_villa.png",
    description: "Seamless indoor-outdoor living opening onto tropical manicured lawns.",
  },
  {
    id: 9,
    title: "Charming Mango Cottage",
    category: "Suites",
    image: "/assets/mango_cottage.png",
    description: "Heritage design sheltered under the resort's ancient canopy.",
  },
  {
    id: 10,
    title: "Resort Facade",
    category: "Architecture",
    image: "/assets/hero-resort.webp",
    description: "Classic architecture meeting nature's embrace at Jalashay Resort.",
  },
];
// Lazy-loading card using IntersectionObserver — image only loads when scrolled into view
function LazyGalleryCard({
  item,
  idx,
  onClick,
}: {
  item: (typeof galleryItems)[number];
  idx: number;
  onClick: () => void;
}) {
  const { ref, isVisible } = useLazyLoad();

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-sm border border-border/40 bg-card/40 cursor-pointer shimmer-border aspect-[4/3]"
      onClick={onClick}
    >
      {/* Skeleton placeholder while not visible */}
      {!isVisible && (
        <div className="absolute inset-0 bg-card/60 animate-pulse" />
      )}

      {/* Image — only rendered once in viewport */}
      {isVisible && (
        <Image
          src={item.image}
          alt={`${item.title} at Jalashay Resort`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105 opacity-0"
          style={{ opacity: 0 }}
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "1";
            (e.currentTarget as HTMLImageElement).style.transition =
              "opacity 0.6s ease, transform 1200ms ease-out";
          }}
        />
      )}

      {/* Ambient Glow / Border Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover UI Info Card */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
          {item.category}
        </span>
        <h3 className="mt-1 font-display text-2xl text-foreground font-light">
          {item.title}
        </h3>
        <span className="mt-3 flex items-center gap-1.5 text-xs text-gold font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
          <Eye className="h-3.5 w-3.5" /> View Photo
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const visibleItems = galleryItems.slice(0, 6);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % galleryItems.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev !== null
            ? (prev - 1 + galleryItems.length) % galleryItems.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    );
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
    );
  };

  return (
    <section id="gallery" className="relative py-32 bg-background/40">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — Gallery
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Lakeside luxury in{" "}
              <span className="text-gold-gradient italic">pictures</span>
            </h2>
          </div>
        </FadeUp>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence initial={false}>
            {visibleItems.map((item, idx) => (
              <LazyGalleryCard
                key={item.id}
                item={item}
                idx={idx}
                onClick={() => setActiveImageIndex(idx)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse Button */}
        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-gold)] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Explore Full Gallery
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-background/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Top Bar with counter & close */}
            <div className="flex items-center justify-between w-full z-10 max-w-6xl mx-auto">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold">
                Photo {activeImageIndex + 1} of {galleryItems.length}
              </span>
              <button
                className="p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={() => setActiveImageIndex(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Image Slider Area */}
            <div className="relative flex flex-1 items-center justify-center w-full max-w-6xl mx-auto my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                className="absolute left-0 md:left-4 z-20 p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Central Image Panel */}
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[70vh] w-full flex items-center justify-center px-12"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryItems[activeImageIndex].image}
                  alt={`${galleryItems[activeImageIndex].title} at Jalashay Resort`}
                  decoding="async"
                  loading="lazy"
                  className="max-h-[70vh] max-w-full rounded-sm object-contain shadow-2xl select-none"
                />
              </motion.div>

              {/* Next Button */}
              <button
                className="absolute right-0 md:right-4 z-20 p-3 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-foreground hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom bar with Details */}
            <div className="text-center z-10 max-w-xl mx-auto pb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                {galleryItems[activeImageIndex].category}
              </span>
              <h3 className="mt-2 font-display text-3xl text-foreground font-light leading-tight">
                {galleryItems[activeImageIndex].title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {galleryItems[activeImageIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
