import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import About from "@/components/home/About";
import Gallery from "@/components/home/Gallery";
import Rooms from "@/components/home/Rooms";
import Features from "@/components/home/Features";
import TourVideo from "@/components/home/TourVideo";
import Reviews from "@/components/home/Reviews";
import WeddingBanner from "@/components/home/WeddingBanner";
import Activities from "@/components/home/Activities";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import OfferDialog from "@/components/home/OfferDialog";

export default function Home() {
  return (
    <main className="relative">
      <OfferDialog />
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Gallery />
      <Rooms />
      <Features />
      {/* <TourVideo /> */}
      <Reviews />
      <WeddingBanner />
      <Activities />
      <Contact />
      <Footer />
    </main>
  );
}
