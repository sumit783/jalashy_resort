import { Phone, Mail, MapPin } from "lucide-react";
import FadeUp from "./FadeUp";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            — Plan Your Visit
          </span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            Begin your{" "}
            <span className="text-gold-gradient italic">Jalashay</span> story
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Reach out to our hospitality team to plan a wedding, book a stay, or
            arrange a personal tour of the resort.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Phone, label: "Call", value: "+91 00000 00000" },
              { icon: Mail, label: "Email", value: "stay@jalashay.com" },
              { icon: MapPin, label: "Visit", value: "Lakeside · India" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-sm border border-border/60 bg-card/50 p-8 shimmer-border"
              >
                <c.icon
                  className="mx-auto h-5 w-5 text-gold"
                  strokeWidth={1.5}
                />
                <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-2 font-display text-xl text-foreground">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
