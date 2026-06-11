import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { BookingProvider } from "@/context/BookingContext";
import BookingDialog from "@/components/home/BookingDialog";
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
  title: "Jalashay Resort — Lakeside Weddings & Premium Stays",
  description:
    "Jalashay Resort offers 26 rooms, 3 lawns, swimming pool, aamrai, lakeside views and a restaurant — ideal for 100–200 pax weddings and serene getaways.",
  authors: [{ name: "Jalashay Resort" }],
  openGraph: {
    title: "Jalashay Resort — Lakeside Weddings & Stays",
    description:
      "A premium lakeside resort for unforgettable weddings and serene getaways.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
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
        </BookingProvider>
        <Toaster theme="dark" position="bottom-right" closeButton richColors />
      </body>
    </html>
  );
}
