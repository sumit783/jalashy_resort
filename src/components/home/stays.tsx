"use client";

import Link from "next/link";
import Image from "next/image";
import room1 from "@/assets/roomImages/020A6091.webp";
import room2 from "@/assets/roomImages/020A6097.webp";
import room3 from "@/assets/roomImages/020A6099.webp";
import room4 from "@/assets/roomImages/020A6152.webp";

export function Stays() {
  const rooms = [
    {
      name: "Lakeside Premium Room",
      price: "₹0",
      desc: "Tariff per night for 2 adults",
      img: room1,
      tag: "Balcony · Lake View",
      slug: "lakeside-premium-room",
    },
    {
      name: "Backwater Heritage Cottage",
      price: "₹0",
      desc: "Tariff per night for 2 adults",
      img: room2,
      tag: "Private Sitout · Garden View",
      slug: "backwater-heritage-cottage",
    },
    {
      name: "Royal Lakeview Suite",
      price: "₹0",
      desc: "Tariff per night for 2 adults",
      img: room3,
      tag: "Plunge Pool · Panoramic Lake View",
      slug: "royal-lakeview-suite",
    },
    {
      name: "Mango Canopy Villa",
      price: "₹0",
      desc: "Tariff per night for 2 adults",
      img: room4,
      tag: "Bathtub · Private Garden",
      slug: "mango-canopy-villa",
    },
  ];

  return (
    <section id="stays" className="py-28 px-6 lg:px-10 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Sanctuaries of rest
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-4 leading-tight">
            Our Rooms & <em>Suites</em>
          </h2>
          <p className="mt-6 text-muted-foreground font-light leading-relaxed">
            With 49 elegantly appointed rooms overall (26 dedicated to weddings and 23 for FIT
            travellers), combine hand-finished teak, panoramic lake views, and premium amenities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              {/* Room Image with Hover Overlay */}
              <Link href={`/rooms/${room.slug}`} className="relative aspect-[4/3] overflow-hidden cursor-pointer block">
                <Image
                  src={room.img}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="text-white text-xs uppercase tracking-[0.2em] font-medium border border-white/60 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition">
                    Know More
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white/95 text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full font-medium">
                  {room.tag}
                </div>
              </Link>

              {/* Room Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/rooms/${room.slug}`}>
                    <h3 className="font-display text-2xl text-foreground group-hover:text-[color:var(--gold)] transition-colors">
                      {room.name}
                    </h3>
                  </Link>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mt-2 font-medium">
                    {room.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                  <div className="text-xl font-semibold text-foreground">
                    {room.price}{" "}
                    <span className="text-xs font-light text-muted-foreground">+ Taxes</span>
                  </div>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)] hover:text-foreground font-semibold transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

