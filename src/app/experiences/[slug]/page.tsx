import { notFound } from "next/navigation";
import { experiencesData } from "@/lib/experiences";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(experiencesData).map((slug) => ({
    slug,
  }));
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const data = experiencesData[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Large Hero Banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={data.mainImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10" />
        <div className="absolute bottom-12 left-0 right-0 z-20 max-w-6xl mx-auto px-6">
          <p className="text-[color:var(--gold)] text-xs uppercase tracking-[0.4em] mb-3">
            — {data.category} Experience
          </p>
          <h1 className="font-display text-white text-5xl md:text-7xl leading-tight">
            {data.title}
          </h1>
        </div>
      </section>

      {/* Content Details */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-6">About the Experience</h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed mb-8">
              {data.introText}
            </p>
            
            <h3 className="font-display text-2xl mb-4">Highlights & Details</h3>
            <ul className="space-y-4">
              {data.details.map((detail, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground font-light leading-relaxed">
                  <span className="text-[color:var(--gold)] font-bold">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar CTA */}
          <div className="bg-card border border-border/60 p-8 rounded-2xl h-fit shadow-sm">
            <h3 className="font-display text-2xl mb-4">Plan Your Visit</h3>
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-6 leading-relaxed">
              Available exclusively for guests staying at Jalashay Resort or booking events.
            </p>
            <Link href="/#book" className="btn-gold hover:[&]:btn-gold-hover text-xs uppercase tracking-[0.2em] w-full text-center block py-3">
              Book Stay
            </Link>
          </div>
        </div>

        {/* Gallery Section */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="mt-20 border-t border-border/60 pt-16">
            <h2 className="font-display text-3xl mb-10 text-center">Visual Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.gallery.map((img, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group">
                  <Image
                    src={img}
                    alt={`${data.title} gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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
