import { notFound } from "next/navigation";
import { roomsData } from "@/lib/rooms";
import Link from "next/link";
import Image from "next/image";
import { BookingButton } from "@/components/BookingButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(roomsData).map((slug) => ({
    slug,
  }));
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params;
  const data = roomsData[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Large Hero Banner */}
      <section className="relative h-[65vh] overflow-hidden">
        <Image
          src={data.mainImage}
          alt={data.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
        <div className="absolute bottom-12 left-0 right-0 z-20 max-w-6xl mx-auto px-6">
          <span className="bg-black/50 backdrop-blur-sm text-white/95 text-[10px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full font-medium border border-white/20">
            {data.tag}
          </span>
          <h1 className="font-display text-white text-5xl md:text-7xl leading-tight mt-4">
            {data.name}
          </h1>
        </div>
      </section>

      {/* Content Details */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-6">Room Description</h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed mb-8">
              {data.longDesc}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-border/60">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Size</p>
                <p className="font-display text-2xl mt-1">{data.size}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Occupancy</p>
                <p className="font-display text-2xl mt-1">{data.occupancy}</p>
              </div>
            </div>
            
            <h3 className="font-display text-2xl mb-6">Amenities</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {data.amenities.map((amenity, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground font-light leading-relaxed items-center">
                  <span className="text-[color:var(--gold)] text-lg">✦</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Booking CTA */}
          <div className="bg-card border border-border/60 p-8 rounded-2xl h-fit shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tariff Per Night</p>
            <div className="text-4xl font-semibold text-foreground mt-2">
              {data.price} <span className="text-xs font-light text-muted-foreground">+ Taxes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 mb-6 leading-relaxed">
              {data.desc}
            </p>
            <BookingButton
              category="Stay"
              className="btn-gold hover:[&]:btn-gold-hover text-xs uppercase tracking-[0.2em] w-full text-center block py-3"
            >
              Request Booking
            </BookingButton>
          </div>
        </div>

        {/* Gallery Section */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="mt-20 border-t border-border/60 pt-16">
            <h2 className="font-display text-3xl mb-10 text-center">Room Details Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.gallery.map((img, index) => (
                <div key={index} className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm group">
                  <Image
                    src={img}
                    alt={`${data.name} detail gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-6 text-center text-xs text-primary-foreground/50 border-t border-white/10">
        <span>© {new Date().getFullYear()} Jalashay Resort. All rights reserved.</span>
      </footer>
    </div>
  );
}
