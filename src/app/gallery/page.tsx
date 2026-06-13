import GalleryClient from "./GalleryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | Jalashay Resort",
  description:
    "Explore the visual beauty of Jalashay Resort. Tour our lakeside views, luxury guest rooms, suites, swimming pool, mango grove, and open-air wedding lawns.",
  openGraph: {
    title: "Photo & Video Gallery | Jalashay Resort",
    description:
      "Explore the visual beauty of Jalashay Resort. Tour our lakeside views, luxury guest rooms, suites, swimming pool, mango grove, and open-air wedding lawns.",
    type: "website",
    siteName: "Jalashay Resort",
    images: [
      {
        url: "/assets/lakeside.webp",
        width: 1200,
        height: 900,
        alt: "Lakeside Serenity at Jalashay Resort",
      },
      {
        url: "/assets/pool.webp",
        width: 1200,
        height: 1200,
        alt: "Infinity Pool at Jalashay Resort",
      },
    ],
    locale: "en_IN",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
