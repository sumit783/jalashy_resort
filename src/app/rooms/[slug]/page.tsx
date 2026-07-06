import { notFound } from "next/navigation";
import { roomsData } from "@/lib/rooms";
import Link from "next/link";
import Image from "next/image";
import { BookingButton } from "@/components/BookingButton";
import {
  Bed,
  Wifi,
  Tv,
  Coffee,
  Wind,
  Bath,
  Lock,
  Waves,
  Trees,
  Sofa,
  Bell,
  Shirt,
  Speaker,
  Utensils,
  CheckCircle,
} from "lucide-react";

function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  if (lower.includes("bed")) return <Bed className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("wi-fi") || lower.includes("wifi")) return <Wifi className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("tv")) return <Tv className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("coffee") || lower.includes("espresso") || lower.includes("mini bar") || lower.includes("kettle")) return <Coffee className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("air conditioning")) return <Wind className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("shower") || lower.includes("tub") || lower.includes("bath") || lower.includes("toiletries")) return <Bath className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("safe")) return <Lock className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("pool") || lower.includes("lake")) return <Waves className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("garden") || lower.includes("canopy")) return <Trees className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("living") || lower.includes("sitout") || lower.includes("seating") || lower.includes("loungers")) return <Sofa className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("butler") || lower.includes("valet") || lower.includes("service")) return <Bell className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("wardrobe")) return <Shirt className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("sound")) return <Speaker className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  if (lower.includes("treats") || lower.includes("dining")) return <Utensils className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
  
  return <CheckCircle className="w-5 h-5 text-[color:var(--gold)] shrink-0" />;
}

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

            <div className="mb-10 pb-10 border-b border-border/60">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Occupancy</p>
                <p className="font-display text-2xl mt-1">{data.occupancy}</p>
              </div>
            </div>
            
            <h3 className="font-display text-2xl mb-6">Amenities</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {data.amenities.map((amenity, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground font-light leading-relaxed items-center">
                  {getAmenityIcon(amenity)}
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

        {/* Tariffs Section */}
        <section className="mt-20 pt-16 border-t border-border/60">
          <div className="mb-10">
            <h4 className="font-display text-3xl text-foreground mb-3">Room Tariffs & Policies</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Per room, per night · 23 Rooms · Up to 110 Guests</p>
          </div>
            
          <div className="mt-8">
            <div className="overflow-x-auto bg-card rounded-2xl border border-border/50 shadow-sm">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/50 text-muted-foreground">
                      <th className="py-5 px-6 font-medium uppercase tracking-wider text-xs">Room Type</th>
                      <th className="py-5 px-6 font-medium uppercase tracking-wider text-xs text-right">Weekday</th>
                      <th className="py-5 px-6 font-medium uppercase tracking-wider text-xs text-right">Saturday</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {data.slug === 'couple-cottage' && (
                      <tr className="hover:bg-secondary/30 transition-colors">
                        <td className="py-5 px-6 text-foreground font-medium text-base">Couple Cottage <span className="text-xs text-muted-foreground font-normal ml-2 tracking-wider uppercase">8 Cottages</span></td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹7,500</td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹7,500</td>
                      </tr>
                    )}
                    {data.slug === 'duplex' && (
                      <tr className="hover:bg-secondary/30 transition-colors">
                        <td className="py-5 px-6 text-foreground font-medium text-base">Duplex <span className="text-xs text-muted-foreground font-normal ml-2 tracking-wider uppercase">8 Rooms</span></td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹8,500</td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹10,000</td>
                      </tr>
                    )}
                    {data.slug === 'family-room' && (
                      <tr className="hover:bg-secondary/30 transition-colors">
                        <td className="py-5 px-6 text-foreground font-medium text-base">Family Room <span className="text-xs text-muted-foreground font-normal ml-2 tracking-wider uppercase">3 Rooms</span></td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹9,000</td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹11,000</td>
                      </tr>
                    )}
                    {data.slug === 'suite' && (
                      <tr className="hover:bg-secondary/30 transition-colors">
                        <td className="py-5 px-6 text-foreground font-medium text-base">Suite <span className="text-xs text-muted-foreground font-normal ml-2 tracking-wider uppercase">4 Suites</span></td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹10,000</td>
                        <td className="py-5 px-6 text-foreground text-right text-base">₹12,000</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mt-10 text-sm">
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                  <h5 className="font-display text-xl text-[color:var(--gold)] mb-5">Additional Guests</h5>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border/30">
                      <span className="text-foreground">Extra bed · adult 10+</span>
                      <span className="font-medium text-foreground text-base">₹2,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Child · 5–10 <span className="text-muted-foreground text-xs">(bed + meals)</span></span>
                      <span className="font-medium text-foreground text-base">₹1,000 + ₹1,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                  <h5 className="font-display text-xl text-[color:var(--gold)] mb-5">Important Notes</h5>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] mt-2 shrink-0" />
                      <span>Meal plan <strong className="text-foreground font-medium">₹1,300</strong> per guest / night, additional.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] mt-2 shrink-0" />
                      <span>Children under 5 stay & dine free.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] mt-2 shrink-0" />
                      <span>Tariffs are dynamic and subject to change; taxes as applicable.</span>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </section>

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
