import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { BookingProvider } from "@/context/BookingContext";
import BookingDialog from "@/components/home/BookingDialog";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "../styles.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jalashayresort.com"),
  title: "Jalashay Resort — Lakeside Weddings & Premium Stays",
  description:
    "Jalashay Resort offers 49 luxury rooms and suites, 3 open-air wedding lawns, swimming pool, aamrai mango grove, lakeside views and dining — ideal for lakeside events.",
  authors: [{ name: "Jalashay Resort" }],
  openGraph: {
    title: "Jalashay Resort — Lakeside Weddings & Premium Stays",
    description:
      "A premium lakeside resort for unforgettable weddings, events, and serene weekend getaways.",
    type: "website",
    siteName: "Jalashay Resort",
    images: [
      {
        url: "/assets/hero-resort.webp",
        width: 1200,
        height: 675,
        alt: "Jalashay Resort Entrance View",
      },
      {
        url: "/Jalashay_Logo.webp",
        width: 800,
        height: 800,
        alt: "Jalashay Resort Logo",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jalashay Resort — Lakeside Weddings & Premium Stays",
    description:
      "A premium lakeside resort for unforgettable weddings, events, and serene weekend getaways.",
    images: ["/assets/hero-resort.webp"],
  },
  icons: {
    icon: "/Jalashay_Logo.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <BookingProvider>
          {children}
          <BookingDialog />
          <WhatsAppButton />
        </BookingProvider>
        <Toaster theme="dark" position="bottom-right" closeButton richColors />
      </body>
    </html>
  );
}
