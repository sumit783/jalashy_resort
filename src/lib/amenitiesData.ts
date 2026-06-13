export interface AmenityDetail {
  slug: string;
  icon: any; // We'll keep dynamic reference or component mapping in rendering client
  title: string;
  subtitle: string;
  image: string;
  longDesc: string;
  highlights: string[];
  metaLabel: string;
  metaVal: string;
  galleryImages: string[];
}

export const amenitiesData: Record<string, Omit<AmenityDetail, "icon">> = {
  "curated-rooms": {
    slug: "curated-rooms",
    title: "49 Curated Rooms & Suites",
    subtitle: "Sanctuaries of Peaceful Rest",
    image: "/assets/room.webp",
    longDesc: "Jalashay Resort offers 49 elegantly curated rooms designed for quiet luxury and rest. Out of these, 26 are dedicated suites set aside specifically to host your wedding guests and family members in close comfort, ensuring your entire party stays together. An additional 23 thoughtfully appointed rooms are crafted for FIT (Free Independent Travelers) seeking a quiet escape from the hustle of city life. Enjoy modern bathrooms, hand-picked linens, and private sit-out balconies opening onto manicured lawns or the peaceful water.",
    highlights: [
      "26 Dedicated Wedding Rooms",
      "23 FIT Luxury Rooms & Cottages",
      "Private Sit-out Balconies",
      "Scenic Lake & Garden Views",
      "Premium Linens & Organic Toiletries",
      "High-Speed Wi-Fi & Work Desks",
    ],
    metaLabel: "Capacity",
    metaVal: "49 Rooms (100+ guests)",
    galleryImages: ["/assets/lakeside_suite.png", "/assets/garden_villa.png"],
  },
  "open-air-lawns": {
    slug: "open-air-lawns",
    title: "Three Open-Air Lawns",
    subtitle: "Lakeside Celebrations Under the Stars",
    image: "/assets/wedding-lawn.webp",
    longDesc: "Jalashay features three manicured, open-air lawns set against a spectacular lake view. Perfect for celebrations of every scale—from intimate pre-wedding rituals like mehndi and sangeet to grand wedding mandaps, lakeside receptions, and corporate marquees. The lawns can comfortably host gatherings from 100 up to 200 guests with effortless grace. Integrated ambient lighting, private access pathways, and dedicated catering staging areas make hosting celebrations a seamless experience.",
    highlights: [
      "Capacity for 100 to 200 Guests",
      "Stunning Lakeside Backdrop",
      "Professional Ambient & Festoon Lighting",
      "Dedicated Catering Prep Areas",
      "Impeccable Landscaping & Greenery",
      "Convenient Guest Parking & Valet Services",
    ],
    metaLabel: "Occasions",
    metaVal: "Weddings, Receptions & Events",
    galleryImages: ["/assets/lakeside.webp", "/assets/room.webp"],
  },
  "swimming-pool": {
    slug: "swimming-pool",
    title: "Swimming Pool",
    subtitle: "Sublime Swims & Poolside Soirées",
    image: "/assets/pool.webp",
    longDesc: "Our lantern-lit swimming pool is a tropical oasis sheltered by mature palms and canopy trees. The pool blends seamlessly with the natural landscape, offering a refreshing escape during warm afternoons. As the sun sets, the pool area transforms with warm lantern glow—perfect for quiet poolside soirées, mocktail receptions, or simply enjoying the evening breeze over the water.",
    highlights: [
      "Lantern-Lit Evening Ambiance",
      "Tropical Palm Canopy Borders",
      "Comfortable Cabanas & Sun Loungers",
      "Fresh Poolside Mocktail Service",
      "Dedicated Shallow Zone for Children",
      "Complimentary Premium Towels & Robes",
    ],
    metaLabel: "Hours",
    metaVal: "7:00 AM — 8:00 PM",
    galleryImages: ["/assets/restaurant.webp", "/assets/room.webp"],
  },
  "mango-grove": {
    slug: "mango-grove",
    title: "Aamrai Mango Grove",
    subtitle: "Whispering Trees & Canopy Walks",
    image: "/assets/aamrai.webp",
    longDesc: "The Aamrai is our resort's most cherished historical corner—a decades-old grove of mature mango trees that cast a dense, cool canopy over the ground. Perfect for a quiet morning walk, reading under the shade, or hosting intimate traditional outdoor lunches under the branches. The grove preserves a rustic heritage atmosphere that connects you directly with the land's traditional farming roots.",
    highlights: [
      "Ancient Mature Mango Trees",
      "Naturally Shaded Walkways",
      "Rustic Swings & Hammocks",
      "Ideal for Al Fresco Afternoon Teas",
      "Tranquil & Quiet Reading Nooks",
      "Heritage-Inspired Canopy Design",
    ],
    metaLabel: "Setting",
    metaVal: "Shaded Old-Growth Forest",
    galleryImages: ["/assets/wedding-lawn.webp", "/assets/room.webp"],
  },
  "lakeside-restaurant": {
    slug: "lakeside-restaurant",
    title: "Lakeside Restaurant",
    subtitle: "A Culinary Journey with Panoramic Vistas",
    image: "/assets/restaurant.webp",
    longDesc: "Jalashay's Lakeside Restaurant serves a curated culinary experience featuring local Konkan delicacies, contemporary Indian favorites, and classic continental cuisine. Dine inside the warm, wood-paneled pavilion or out on the open deck with uninterrupted views of the quiet lake waters. Every dish is prepared by our master chefs using fresh, locally sourced ingredients and organic herbs from our garden.",
    highlights: [
      "Indoor & Al Fresco Water-Deck Seating",
      "Local Konkani & Multi-Cuisine Menu",
      "Master Chef Curated Menus",
      "Organic Farm-to-Table Ingredients",
      "Private Dining Available for Parties",
      "Stunning Sunset View Dining",
    ],
    metaLabel: "Cuisine",
    metaVal: "Local Konkani & Multi-Cuisine",
    galleryImages: ["/assets/pool.webp", "/assets/lakeside.webp"],
  },
  "lakeside-boating": {
    slug: "lakeside-boating",
    title: "Lakeside & Boating",
    subtitle: "Tranquil Waters & Future Adventures",
    image: "/assets/lakeside.webp",
    longDesc: "With hundreds of meters of pristine lake frontage, Jalashay offers a direct connection to calm, peaceful waters. Currently, guests can enjoy lakeside walking trails, bonfire spots, and sunset viewing decks. We are actively expanding our amenities to introduce curated boating experiences—including silent electric boats, kayak rentals, and guided lake tours—allowing you to fully explore the lake's serene beauty starting next season.",
    highlights: [
      "Direct Private Lake Frontage",
      "Scenic Lakeside Walking Trails",
      "Bonfire Pits & Sunset Gazebos",
      "Kayak & Electric Boating (Coming Soon)",
      "Guided Bird-Watching Points",
      "Perfect Spot for Morning Yoga",
    ],
    metaLabel: "Status",
    metaVal: "Frontage open · Boating soon",
    galleryImages: ["/assets/pool.webp", "/assets/restaurant.webp"],
  },
};
