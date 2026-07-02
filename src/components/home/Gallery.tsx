"use client";

import Link from "next/link";
import Image from "next/image";
import { galleryMedia } from "@/lib/gallery-media";

export function Gallery() {
  // Show first 7 items on the homepage
  const previewMedia = galleryMedia.slice(0, 7);

  return (
    <section id="gallery" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Gallery
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-4">
            Lakeside luxury in <em>pictures.</em>
          </h2>
          <p className="mt-6 text-muted-foreground font-light max-w-xl mx-auto">
            Every corner of Jalashay tells its own slow story.
          </p>
        </div>

        {/* Mesh / Masonry style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {previewMedia.map((item, i) => {
            // Define custom mesh span classes based on index
            let gridSpanClass = "";
            if (i === 0) gridSpanClass = "md:col-span-2 md:row-span-2"; // Large feature item
            else if (i === 1) gridSpanClass = "md:col-span-1 md:row-span-1";
            else if (i === 2) gridSpanClass = "md:col-span-1 md:row-span-2"; // Tall item
            else if (i === 3) gridSpanClass = "md:col-span-1 md:row-span-1";
            else if (i === 4) gridSpanClass = "md:col-span-2 md:row-span-1"; // Wide item
            else if (i === 5) gridSpanClass = "md:col-span-1 md:row-span-1";
            else if (i === 6) gridSpanClass = "md:col-span-1 md:row-span-1";

            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl relative group shadow-sm ${gridSpanClass}`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                    suppressHydrationWarning
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                  />
                )}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                  <span className="text-white text-xs uppercase tracking-widest font-medium">
                    {item.alt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="rounded-full border border-border/80 text-foreground text-xs uppercase tracking-[0.2em] px-8 py-3.5 font-medium hover:bg-foreground hover:text-background transition-colors inline-block"
          >
            View All Media
          </Link>
        </div>
      </div>
    </section>
  );
}

