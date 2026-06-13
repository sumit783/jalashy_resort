"use client";

import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { blogPosts } from "@/lib/blogData";

export default function BlogArticleClient({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Render body: simple markdown-like — bold, paragraphs, lists
  const renderBody = (body: string) =>
    body.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <h2
            key={i}
            className="mt-8 font-display text-2xl font-light text-foreground"
          >
            {block.replace(/\*\*/g, "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="mt-4 space-y-2 pl-5">
            {items.map((item, j) => (
              <li key={j} className="text-muted-foreground text-base leading-relaxed list-disc">
                {item.replace(/^- \*([^*]+)\*: /, (_, bold) => "").replace("- ", "")}
                {item.includes(":") && item.startsWith("- *") ? (
                  <>
                    <strong className="text-foreground">{item.match(/\*([^*]+)\*/)?.[1]}</strong>
                    {item.replace(/^- \*[^*]+\*/, "")}
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        );
      }
      // Bold inline text within paragraphs
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mt-6 text-base leading-relaxed text-muted-foreground">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="text-foreground font-medium">
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 rounded-full border border-gold/20 bg-card/40 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-gold/15 hover:border-gold/60"
          >
            <ArrowLeft className="h-4 w-4 text-gold group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Journal</span>
          </Link>

          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-wide text-foreground"
          >
            Jalashay<span className="text-gold">.</span>
          </Link>

          <Link
            href="/blog"
            className="rounded-full border border-gold/20 bg-card/40 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold hover:bg-gold/15 hover:border-gold/60 transition-all"
          >
            All Articles
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={`Feature article graphic for ${post.title} at Jalashay Resort`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      </div>

      {/* Article */}
      <main className="mx-auto max-w-3xl px-6 pb-28 -mt-12 relative z-10">
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full border border-gold/40 bg-background/60 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur font-semibold">
            {post.category}
          </span>

          <h1 className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl text-foreground">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground uppercase tracking-wider border-b border-border/20 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gold" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {post.readTime}
            </span>
            <span className="text-gold">by {post.author}</span>
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 prose-like"
        >
          {renderBody(post.body)}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 rounded-sm border border-gold/20 bg-card/40 p-8 text-center shimmer-border"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            — Experience It Yourself
          </span>
          <h3 className="mt-4 font-display text-3xl font-light text-foreground">
            Ready for your Jalashay escape?
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            From lakeside weddings to quiet weekend retreats, we'd love to welcome you.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform"
          >
            Book Your Stay <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </main>

      {/* More Articles */}
      {others.length > 0 && (
        <section className="border-t border-border/20 bg-background/60 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <span className="text-xs uppercase tracking-[0.4em] text-gold">
                — Continue Reading
              </span>
              <h2 className="mt-4 font-display text-4xl font-light">
                More from the Journal
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {others.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/40">
                      <Image
                        src={p.image}
                        alt={`Preview image of ${p.title} article`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span className="absolute top-3 left-3 rounded-full border border-gold/40 bg-background/60 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-gold font-semibold backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-light text-foreground group-hover:text-gold transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-gold font-semibold uppercase tracking-wider">
                      Read <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
