"use client";

import { Star, Quote } from "lucide-react";
import FadeUp from "./FadeUp";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Aarav & Meera",
    role: "Lakeside Wedding",
    rating: 5,
    text: "We hosted our wedding of 180 guests at Jalashay. The lakeside lawn backdrop during sunset was magical. The rooms were luxurious and the team went above and beyond.",
    date: "May 2026",
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    role: "Weekend Getaway",
    rating: 5,
    text: "A stunning retreat. The serene pool, the mango orchard (aamrai), and the delicious local menu made our weekend getaway unforgettable.",
    date: "April 2026",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Corporate Retreat",
    rating: 5,
    text: "Outstanding hospitality and modern amenities. The peaceful lakeside location is perfect for deep-focus workshops and team bonding. Highly recommended!",
    date: "June 2026",
  },
  {
    id: 4,
    name: "Siddharth & Riya",
    role: "Anniversary Stay",
    rating: 5,
    text: "The lakeside suite is gorgeous. Waking up to the calm water and birds chirping was pure bliss. True luxury in the lap of nature.",
    date: "March 2026",
  },
  {
    id: 5,
    name: "Rohan Joshi",
    role: "Family Reunion",
    rating: 5,
    text: "Perfect space for group gatherings. We booked 15 rooms for a family reunion. The pool area and lawns provided excellent private spaces for our events.",
    date: "February 2026",
  },
  {
    id: 6,
    name: "Karan & Tanya",
    role: "Destination Wedding",
    rating: 5,
    text: "An absolute dream venue. The service was impeccable, food was highly praised by all guests, and the photos by the lake turned out breathtaking.",
    date: "January 2026",
  },
];

export default function Reviews() {
  // Double the reviews to create a seamless infinite scroll loop
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-32 bg-background/50"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 text-center mb-16">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            — Testimonials
          </span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            Stories from Our{" "}
            <span className="text-gold-gradient italic">Guests</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base font-light text-muted-foreground">
            Read about the memorable weddings, tranquil getaways, and pristine
            celebrations hosted at Jalashay.
          </p>
        </FadeUp>
      </div>

      {/* Testimonials Marquee */}
      <div className="relative flex w-full overflow-x-hidden py-4 select-none">
        {/* Soft edge masking for smooth fade off-screen */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex marquee pause-hover gap-6 px-3">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[380px] shrink-0 bg-card/40 border border-border/30 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-between h-[260px] hover:border-gold/40 hover:bg-card/60 transition-all duration-300 shadow-soft shimmer-border"
            >
              <div>
                {/* Header: Stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gold/20" />
                </div>

                {/* Review Text */}
                <p className="text-sm font-sans font-light leading-relaxed text-muted-foreground line-clamp-4 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Footer: User Details */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/20">
                <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-gold)] flex items-center justify-center text-primary-foreground font-semibold text-xs shadow-md">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="font-display text-base font-medium text-foreground tracking-wide">
                    {review.name}
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-gold font-medium">
                    {review.role}
                  </span>
                </div>
                <span className="ml-auto text-[10px] text-muted-foreground/60">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
