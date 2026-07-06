import Image from "next/image";
import img1 from "@/assets/outsideImages/020A6512.jpg";
import img2 from "@/assets/020A6391.jpg";
import img3 from "@/assets/sliderImage/slider-5.webp";

export function Dining() {
  const items = [
    { t: "Backwater Cruise", sub: "Guided Boat Tour", d: "Explore the serene Suvarna river ecosystem" },
    { t: "Historic Temples", sub: "Cultural Heritage", d: "Ancient architecture and local traditions" },
    { t: "Nature Trails", sub: "Guided Hikes", d: "Discover local flora and hidden viewpoints" },
  ];
  return (
    <section id="tourism" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16 items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              — Explore
            </p>
            <h2 className="font-display text-5xl md:text-6xl mt-4 leading-tight text-balance">
              Beyond the <em>resort.</em>
            </h2>
          </div>
          <p className="text-muted-foreground font-light leading-relaxed">
            Jalashay is surrounded by rich cultural heritage and pristine natural landscapes. Embark on curated excursions to historic temples, navigate the serene backwaters, or hike through lush forest trails.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <article key={r.t} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={[img1, img2, img3][i]}
                alt={r.t}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
                  {r.sub}
                </p>
                <h3 className="font-display text-3xl mt-2">{r.t}</h3>
                <p className="mt-2 text-sm text-white/75 font-light">{r.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
