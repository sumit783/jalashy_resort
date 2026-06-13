import AmenityDetailClient, { amenitiesData } from "./AmenityDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = amenitiesData[slug];

  if (!data) {
    return {
      title: "Amenity Not Found | Jalashay Resort",
    };
  }

  return {
    title: `${data.title} | Jalashay Resort`,
    description: data.longDesc.substring(0, 160) + "...",
    openGraph: {
      title: `${data.title} | Jalashay Resort`,
      description: data.longDesc,
      images: [
        {
          url: data.image,
          alt: data.title,
        },
      ],
      type: "website",
      siteName: "Jalashay Resort",
      locale: "en_IN",
    },
  };
}

export default async function AmenityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = amenitiesData[slug];

  if (!data) notFound();

  return <AmenityDetailClient slug={slug} />;
}
