import backwater from "@/assets/outsideImages/slider-5.webp";
import aerial from "@/assets/outsideImages/020A6056.webp";
import yoga from "@/assets/outsideImages/020A6238.webp";
import villa from "@/assets/wedding-lawn.webp";

import diningJpg from "@/assets/dining.jpg";
import spaJpg from "@/assets/spa.jpg";
import image020A6170Webp from "@/assets/020A6170.webp";

export interface ExperienceData {
  slug: string;
  title: string;
  category: string;
  description: string;
  mainImage: any;
  introText: string;
  details: string[];
  gallery: any[];
}

export const experiencesData: Record<string, ExperienceData> = {
  "lakeside-sunset-deck": {
    slug: "lakeside-sunset-deck",
    title: "Lakeside Sunset Deck",
    category: "Nature",
    description: "Watch the golden sun dip below the horizon from our premier wooden deck extension.",
    mainImage: backwater,
    introText: "Extend your evening over the silent waters of Lake Suvarna. Jalashay's Sunset Deck is crafted from weather-worn teak, designed to feel entirely floating.",
    details: [
      "Open daily from 5:00 AM to 9:00 PM.",
      "High tea and custom beverage service served directly on the deck between 4:30 PM and 6:30 PM.",
      "Comfortable modular lounge seating with warm wind protection.",
    ],
    gallery: [backwater, image020A6170Webp],
  },
  "lakeside-palms-canopy": {
    slug: "lakeside-palms-canopy",
    title: "Lakeside Palms Canopy",
    category: "Nature",
    description: "Take a slow stroll along our coconut canopy trail running parallel to the lake.",
    mainImage: aerial,
    introText: "A walking sanctuary shadowed by mature coconut palms. The Lakeside Palms Canopy trail runs along the shoreline, offering breezy, shaded walks at any time of day.",
    details: [
      "Paved walking trail, accessible 24/7.",
      "Perfect for early morning jogs or peaceful late-night reflection under lighting.",
      "Direct sights of local lake birds, egrets and peaceful water lilies.",
    ],
    gallery: [aerial, image020A6170Webp, backwater],
  },
  "cozy-garden-sit-out": {
    slug: "cozy-garden-sit-out",
    title: "Cozy Garden Sit-out",
    category: "Leisure",
    description: "Unwind in our charming, secluded garden nests designed for quiet conversations.",
    mainImage: yoga,
    introText: "Find your quiet corner in our manicured gardens. Hidden amidst local shrubbery and mango trees are custom stone-laid sitouts that offer maximum privacy.",
    details: [
      "Secluded garden pods with seating for up to 6 people.",
      "Ideal for catching up on a book, private conversations, or board games.",
      "Surrounded by local flora including jasmine, frangipani, and hibiscus.",
    ],
    gallery: [yoga, spaJpg, backwater],
  },
  "lawn-side-ceremony": {
    slug: "lawn-side-ceremony",
    title: "Lawn-side Ceremony",
    category: "Celebrations",
    description: "Host grand weddings and sangeets on our sprawling manicured lawns right by the lake.",
    mainImage: villa,
    introText: "Our crown jewel venue. With capacity to comfortably host up to 350+ guests, our lawns provide a pristine green canvas against the backdrop of Lake Suvarna's tranquil waters.",
    details: [
      "Stretches over 8,000 square feet of level lawn space.",
      "Direct road/resort access for event decorators and heavy setups.",
      "Stunning sunset photography potential with the water directly behind your altar.",
    ],
    gallery: [villa, diningJpg, spaJpg],
  },
};
