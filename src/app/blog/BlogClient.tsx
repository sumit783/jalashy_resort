"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { blogPosts, type BlogPost } from "@/lib/blogData";

const categories = ["All", "Weddings", "Seasons", "Culinary", "Nature", "Travel"];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { openBooking } = useBooking();

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full border border-gold/20 bg-card/40 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-gold/15 hover:border-gold/60"
          >
            <ArrowLeft className="h-4 w-4 text-gold group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-wide text-foreground"
          >
            Jalashay<span className="text-gold">.</span>
          </Link>

          <button
            onClick={() => openBooking()}
            className="rounded-full bg-[image:var(--gradient-gold)] px-4 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs uppercase tracking-[0.4em] text-gold"
          >
            — Stories & Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-light leading-tight md:text-7xl"
          >
            The Jalashay{" "}
            <span className="text-gold-gradient italic">Journal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground"
          >
            Stories, guides, and seasonal inspirations from the lakeside —
            written for those who travel with intention.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "border border-gold/15 bg-card/30 text-muted-foreground hover:text-foreground hover:bg-gold/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex flex-col h-full overflow-hidden rounded-sm border border-border/40 bg-card/40 shimmer-border transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Cover graphic for article: ${post.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur font-semibold">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-light text-foreground leading-snug group-hover:text-gold transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-1.5 text-[11px] text-gold font-semibold uppercase tracking-wider">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
