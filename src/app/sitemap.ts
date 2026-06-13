import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";
import { amenitiesData } from "@/lib/amenitiesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jalashayresort.com";

  // 1. Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // 2. Dynamic Blog posts
  const blogUrls = blogPosts.map((post) => {
    // Attempt to parse date or fall back to current date
    let parsedDate = new Date();
    try {
      const parsed = Date.parse(post.date);
      if (!isNaN(parsed)) {
        parsedDate = new Date(parsed);
      }
    } catch (e) {
      // Ignore and use current Date
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: parsedDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  // 3. Dynamic Amenities
  const amenityUrls = Object.keys(amenitiesData).map((slug) => ({
    url: `${baseUrl}/amenities/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogUrls, ...amenityUrls];
}
