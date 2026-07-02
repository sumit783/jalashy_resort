"use client";

export function Testimonials() {
  const items = [
    {
      q: "We hosted our wedding of 180 guests at Jalashay. The lakeside lawn backdrop during sunset was magical. The rooms were luxurious and the team went above and beyond.",
      n: "Aarav & Meera",
      t: "Lakeside Wedding",
    },
    {
      q: "A stunning retreat. The serene pool, the mango orchard (aamrai), and the delicious local menu made our weekend getaway unforgettable.",
      n: "Vikram Malhotra",
      t: "Weekend Getaway",
    },
    {
      q: "Outstanding hospitality and modern amenities. The peaceful lakeside location is perfect for deep-focus workshops and team bonding. Highly recommended!",
      n: "Priya Sharma",
      t: "Corporate Retreat",
    },
  ];
  return (
    <section className="py-28 px-6 lg:px-10 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Guest Voices
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-4">
            Stories from our <em>guests.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it) => (
            <blockquote key={it.n} className="p-8 bg-card rounded-2xl border border-border/60">
              <div className="font-display text-6xl text-[color:var(--gold)] leading-none">"</div>
              <p className="mt-4 font-light leading-relaxed text-foreground/85 italic">{it.q}</p>
              <footer className="mt-8 pt-6 border-t border-border">
                <p className="font-display text-xl">{it.n}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {it.t}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
