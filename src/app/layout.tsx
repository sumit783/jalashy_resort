import type { Metadata } from "next";
import "../styles.css";
import { Nav } from "@/components/home";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { QueryProvider } from "@/context/QueryProvider";

export const metadata: Metadata = {
  title: "Jalashay Resort — Serene Backwater Retreat",
  description:
    "Jalashay Resort — a tranquil backwater sanctuary of palm-fringed waters, heritage villas, ayurvedic wellness and coastal cuisine.",
  authors: [{ name: "Jalashay Resort" }],
  openGraph: {
    title: "Jalashay Resort — Serene Backwater Retreat",
    description:
      "A tranquil backwater sanctuary of palm-fringed waters, heritage villas, ayurvedic wellness and coastal cuisine.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <QueryProvider>
          <BookingModalProvider>
            <Nav />
            {children}
          </BookingModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}



