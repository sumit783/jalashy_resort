import { Trophy, Sailboat } from "lucide-react";
import FadeUp from "./FadeUp";

export default function Activities() {
  const games = ["Cricket", "Badminton", "Football"];
  return (
    <section className="relative py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <FadeUp delay={0.1}>
          <div className="relative aspect-square overflow-hidden rounded-sm shimmer-border">
            <img
              src={"/assets/lakeside.webp"}
              alt="Lakeside view at sunset"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </FadeUp>

        <FadeUp>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              — Play & Pause
            </span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Outdoor games &<br />
              <span className="text-gold-gradient italic">quiet waters</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              From spirited matches on the open ground to slow afternoons by the
              water, Jalashay is designed for guests of every pace.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {games.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/60 px-5 py-2 text-sm text-foreground"
                >
                  <Trophy className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {g}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/60 px-5 py-2 text-sm text-muted-foreground">
                <Sailboat className="h-4 w-4 text-gold" strokeWidth={1.5} />
                Boating · coming soon
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
