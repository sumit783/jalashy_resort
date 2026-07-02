import Link from "next/link";
import Image from "next/image";
import { galleryMedia } from "@/lib/gallery-media";

export default function GalleryPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] overflow-hidden bg-primary flex items-center justify-center pt-14">
        <div className="relative text-center text-white px-6 max-w-2xl z-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">— The Complete Collection</p>
          <h1 className="font-display text-4xl md:text-6xl mt-4">Jalashay Resort Gallery</h1>
          <p className="mt-4 text-white/80 font-light text-sm">
            Explore every corner, accommodation, ceremony, and tranquil lakeside vista of our estate.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryMedia.map((item, i) => {
            // Cycle through different spans to create a continuous mesh effect
            const patternIndex = i % 8;
            let gridSpanClass = "md:col-span-1 md:row-span-1";
            if (patternIndex === 0) gridSpanClass = "md:col-span-2 md:row-span-2"; // large square
            else if (patternIndex === 2) gridSpanClass = "md:col-span-1 md:row-span-2"; // tall
            else if (patternIndex === 5) gridSpanClass = "md:col-span-2 md:row-span-1"; // wide

            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl relative group shadow-sm bg-secondary ${gridSpanClass}`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    suppressHydrationWarning
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                  <span className="text-white text-xs uppercase tracking-widest font-medium">
                    {item.alt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-6 text-center text-xs text-primary-foreground/50 border-t border-white/10">
        <span>© {new Date().getFullYear()} Jalashay Resort. All rights reserved.</span>
      </footer>
    </div>
  );
}
