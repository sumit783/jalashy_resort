import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Jalashay Journal | Resort Blog & Stories",
  description:
    "Discover stories, updates, wedding planning guides, and seasonal monsoon travel inspirations directly from Jalashay Resort lakeside.",
  openGraph: {
    title: "The Jalashay Journal | Resort Blog & Stories",
    description:
      "Discover stories, updates, wedding planning guides, and seasonal monsoon travel inspirations directly from Jalashay Resort lakeside.",
    type: "website",
    siteName: "Jalashay Resort",
    images: [
      {
        url: "/outdoor_images/020A6244.webp",
        width: 1200,
        height: 675,
        alt: "Sunset Wedding Lawn Setup at Jalashay Resort",
      },
    ],
    locale: "en_IN",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
