"use client";

export function Amenities() {
  const items = [
    {
      t: "49 Curated Rooms",
      d: "26 rooms reserved for weddings and 23 for FIT travellers seeking quiet luxury.",
    },
    {
      t: "Three Open-Air Lawns",
      d: "Sprawling, lit lawns ideal for mandaps, sangeets, receptions, and events.",
    },
    {
      t: "Swimming Pool",
      d: "A lantern-lit pool surrounded by palms — perfect for golden-hour swims.",
    },
    {
      t: "Aamrai Mango Grove",
      d: "Walk beneath a canopy of mature mango trees — our most loved private corner.",
    },
    {
      t: "Lakeside Restaurant",
      d: "Multi-cuisine dining with warm interiors and views over the water.",
    },
    {
      t: "Lakeside & Boating",
      d: "Serene lake frontage today, with boating experiences arriving soon.",
    },
    { t: "Library Lounge", d: "Rare books, fireside reading, single-origin coffee." },
    { t: "Chauffeur Service", d: "Vintage classic fleet on call for custom day trips." },
  ];
  return (
    <section className="py-28 px-6 lg:px-10 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Amenities
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-4">
            Crafted for every <em>moment.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div
              key={it.t}
              className="p-6 rounded-2xl bg-card border border-border/60 hover:border-[color:var(--gold)] transition"
            >
              <h3 className="font-display text-2xl">{it.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed">
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
