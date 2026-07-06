"use client";

import {
  Hero,
  Intro,
  ParallaxBand,
  Experiences,
  Stays,
  Dining,
  Amenities,
  Gallery,
  Testimonials,
  CTA,
  Footer,
  Itinerary,
} from "@/components/home";
import backwater from "@/assets/sliderImage/slider-5.webp";

export default function Page() {
  return (
    <div className="bg-background">
      <Hero />
      <Intro />
      <ParallaxBand
        image={backwater.src}
        kicker="— A Place Apart"
        title="Silence, at last."
        sub="Twelve acres by the lake. No cars. No clocks."
      />
      <Stays />
      <Experiences />
      <Itinerary />
      <Dining />
      <Amenities />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

