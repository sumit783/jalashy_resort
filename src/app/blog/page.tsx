"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "perfect-wedding-at-jalashay",
    title: "A Perfect Wedding at Jalashay Resort",
    excerpt:
      "From the lantern-lit lawns to the lakeside mandap, discover why Jalashay has become the most sought-after wedding destination in the region.",
    category: "Weddings",
    date: "June 5, 2025",
    readTime: "5 min read",
    author: "Jalashay Team",
    image: "/outdoor_images/020A6244.webp",
    body: `Every great love story deserves an equally great setting. At Jalashay Resort, we have built our three open-air lawns, each uniquely designed to accommodate 100–200 guests, to host weddings that feel both grand and intimate.

From the traditional mandap under twinkling lights to the al-fresco reception as the sun dips into the lake, every moment here is designed to be unforgettable.

Our dedicated events team works months ahead with each couple, ensuring every flower arrangement, every lighting accent, and every detail of the menu reflects your vision. Because at Jalashay, we don't just host weddings — we craft memories.

**What makes a Jalashay wedding unique?**

- Three manicured open-air lawns for sangeet, mehendi, and reception
- Dedicated bridal suite with private lake views
- In-house catering with multi-cuisine options
- Accommodation for up to 49 guest rooms on-site
- Professional event coordination from arrival to farewell

Whether you're planning an intimate 50-person gathering or a 200-guest extravaganza, our team is here every step of the way.`,
  },
  {
    slug: "monsoon-experiences-at-the-lake",
    title: "Top 5 Monsoon Experiences at Jalashay",
    excerpt:
      "The monsoon season transforms Jalashay into a lush, fog-kissed paradise. Here are five experiences you must not miss during the rains.",
    category: "Seasons",
    date: "May 28, 2025",
    readTime: "4 min read",
    author: "Jalashay Team",
    image: "/home_images/020A6018.webp",
    body: `When the monsoons arrive at Jalashay, the resort undergoes a magical transformation. The lawns turn a vivid emerald, the lake rises with the season's bounty, and the air fills with the earthy scent of wet soil and mango blossoms.

Here are the five experiences that make a monsoon visit to Jalashay uniquely unforgettable:

**1. Sunrise at the Lakefront**
Watch the morning mist roll across the water's surface as the first rays of sun pierce through the clouds. Coffee in hand on your private balcony, this moment alone is worth the trip.

**2. A Walk Through the Aamrai**
The mango grove is at its most breathtaking during the monsoon. Raindrops hang from every leaf, the canopy shelters you from the shower, and the scent of wet earth and mango blossoms fills the air.

**3. Poolside in the Rain**
There's a certain joy in swimming while it rains. Our heated pool, surrounded by palms heavy with rain, becomes a meditative retreat when the skies open up.

**4. Lakeside Dining Under a Covered Pavilion**
Rain-swept views of the lake while you savour hot rasam, buttery dal, and crispy papad — the lakeside restaurant in monsoon season is pure magic.

**5. Photography at Golden Hour**
The dramatic monsoon skies create some of the most spectacular photography opportunities of the year. Every corner of the resort becomes a frame-worthy composition.`,
  },
  {
    slug: "culinary-journey-lakeside-dining",
    title: "A Culinary Journey: Lakeside Dining at Its Finest",
    excerpt:
      "Our lakeside restaurant is more than a meal — it's an immersion into flavour, view, and atmosphere that celebrates the very best of local and contemporary cuisine.",
    category: "Culinary",
    date: "May 15, 2025",
    readTime: "4 min read",
    author: "Chef's Table",
    image: "/home_images/020A5924.webp",
    body: `Food, when experienced with the right setting, transcends nourishment and becomes memory. At Jalashay's lakeside restaurant, every meal is crafted with this philosophy at its heart.

Our head chef, trained in both traditional Indian kitchens and contemporary European techniques, leads a team dedicated to showcasing the finest seasonal produce. From the spice-rich curries of the region to delicately plated continental dishes, the menu is a love letter to food itself.

**Signature Dishes You Must Try**

- **Aamrai Thali**: A curated platter of regional delicacies, featuring dishes inspired by the mango grove right outside our doors
- **Lakeside Grilled Catch**: Fresh river catch prepared on an open flame, served with herb butter and roasted vegetables
- **Mango Panna Cotta**: A dessert that celebrates the resort's most beloved fruit in its most elegant form

The restaurant accommodates both intimate dinners for two and celebratory feasts for entire wedding parties. Advance reservations are recommended for private dining experiences on the lake-facing terrace.

Whether you arrive for breakfast as the lake mist clears, or stay for a moonlit dinner, the lakeside restaurant promises a culinary experience as remarkable as the views that frame it.`,
  },
  {
    slug: "exploring-the-aamrai",
    title: "Exploring the Aamrai: Our Beloved Mango Grove",
    excerpt:
      "Nestled within the resort is a private mango grove unlike any other. Decades old and lovingly preserved, the Aamrai is Jalashay's most treasured natural sanctuary.",
    category: "Nature",
    date: "April 30, 2025",
    readTime: "3 min read",
    author: "Jalashay Team",
    image: "/sliderImage/slider-2.webp",
    body: `Long before the resort was built, the Aamrai stood — a dense grove of mature mango trees whose canopies interlock overhead to create a natural cathedral of green.

Today, the Aamrai remains one of the most beloved corners of the property. Guests return year after year to walk its shaded pathways, sit beneath the ancient trees, and simply breathe. There's a stillness here that no architecture can replicate.

**About the Grove**

The Aamrai at Jalashay comprises over 80 mature Alphonso and Kesar mango trees, many over 40 years old. In summer, the grove yields hundreds of mangoes that make their way directly into our kitchen — into our chutneys, our desserts, and our signature Aamrai thali.

**Seasonal Highlights**

- *January–March*: The trees bloom with fragrant white flowers, filling the grove with a honey-sweet scent
- *April–June*: Raw mangoes appear on the branches, gradually ripening to their characteristic gold
- *July–September*: Post-harvest, the grove is lush and rain-washed, most peaceful during the monsoons
- *October–December*: Cool, dew-covered mornings make this the perfect season for an early walk

Whether you're a nature lover, a photographer, or simply someone who needs a quiet corner away from the world, the Aamrai welcomes you.`,
  },
  {
    slug: "planning-your-destination-wedding",
    title: "Planning Your Destination Wedding: The Jalashay Guide",
    excerpt:
      "A destination wedding is one of the most meaningful gifts you can give yourself and your guests. Here's how to plan the perfect one at Jalashay Resort.",
    category: "Weddings",
    date: "April 12, 2025",
    readTime: "6 min read",
    author: "Events Team",
    image: "/outdoor_images/020A6262.webp",
    body: `The idea of a destination wedding — gathering your closest family and friends in a beautiful, away-from-it-all location — is one of the most romantic concepts in modern celebration. At Jalashay, we've had the honour of hosting hundreds of such weddings, and we've learned what makes them truly magical.

**Start with a Site Visit**

Nothing replaces being physically present at your venue. We invite all prospective couples for a complimentary site visit where you can walk the lawns, feel the lakeside breeze, and meet our events team in person. These visits typically convert uncertainty into absolute clarity.

**Plan Your Room Block Early**

With 49 rooms on the property, Jalashay can accommodate a significant portion of your guest list. We recommend blocking rooms at least 6 months in advance for peak wedding season (October–February).

**Build Your Vendor Team**

We work with a curated list of trusted photographers, decorators, musicians, and caterers who know our property well. However, we're equally welcoming of external vendors who wish to work within our space.

**The Day-of Timeline**

Our events team will build a detailed day-of timeline with you, covering everything from vendor arrival to the final farewell. We typically recommend:
- Décor setup: 6–8 hours before the event
- Bridal preparation: Begin 4 hours before the ceremony
- Guests check-in: 2 hours before proceedings begin
- Buffer time built into every segment

**Post-Wedding Stay**

Many of our couples choose to spend their first days as a married couple right here at Jalashay. Our Presidential Lakefront Suite is frequently booked as the honeymoon suite, offering private lake views and a dedicated butler service.

We would be honoured to be part of your story. Reach out to our events team to begin your Jalashay wedding journey.`,
  },
  {
    slug: "weekend-getaway-guide",
    title: "The Ultimate Weekend Getaway Guide to Jalashay",
    excerpt:
      "Just two hours from the city, Jalashay offers a complete escape — lake, grove, pool, and gourmet dining — all in one serene setting. Here's how to make the most of 48 hours.",
    category: "Travel",
    date: "March 25, 2025",
    readTime: "5 min read",
    author: "Travel Desk",
    image: "/home_images/020A5930.webp",
    body: `Sometimes the best trips aren't the longest ones. A well-planned weekend at Jalashay can feel like a complete reset — the kind of break that leaves you genuinely refreshed rather than merely rested.

Here's our suggested 48-hour itinerary for a perfect Jalashay weekend:

**Friday Evening: Arrival & Lakeside Dinner**
Check in and change into something comfortable. Head straight to the lakeside restaurant for dinner as the sun sets over the water. Order the grilled catch, a glass of something cold, and let the day dissolve.

**Saturday Morning: Sunrise & The Aamrai**
Wake before sunrise. Make your way to the lakefront with a cup of chai and watch the world come alive. After breakfast, take a guided walk through the Aamrai mango grove with one of our nature guides.

**Saturday Afternoon: Pool & Spa**
Spend the afternoon by the pool. Unwind. Read. Order fresh fruit from the pool-side menu. In the late afternoon, book a massage at our wellness corner — a blend of traditional Ayurvedic and contemporary therapies.

**Saturday Evening: Bonfire & Stars**
On clear evenings, we set up a small bonfire on the lakeside lawn. Pull up a chair, order a hot chocolate or a cocktail, and spend an hour or two under an open sky.

**Sunday Morning: Slow Breakfast & Check-Out**
Take your time over Sunday breakfast. The full spread includes everything from idli and sambar to continental eggs. Check out by noon, and carry home nothing but good memories.

Advance bookings are recommended for weekends. Contact our reservations desk to plan your visit.`,
  },
];

const categories = ["All", "Weddings", "Seasons", "Culinary", "Nature", "Travel"];

export default function BlogPage() {
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
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
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
