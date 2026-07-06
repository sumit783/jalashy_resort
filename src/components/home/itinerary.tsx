import React from "react";
import Image from "next/image";

import arrivalImg from "@/assets/couple-talking-to-receptionist-at-hotel-lobby.webp";
import poolImg from "@/assets/outsideImages/020A6311.jpg";
import teaImg from "@/assets/highTea.webp";
import foodImage from "@/assets/food_Image.jpg"
import cinemaImg from "@/assets/madrid-spain-seats-and-screen-of-the-open-air-cinema-cineplaza-in-the-plaza-de-matadero.webp";
import trekImg from "@/assets/DJI_0586.jpg.jpeg";
import karaokeImg from "@/assets/black-microphone-karaoke-club-remote-controller-melon-strawberry-soda-drinks-yellow-tambourine-screen-singing-125689156.webp";
import breakfastImg from "@/assets/020A6320.jpg";
import checkoutImg from "@/assets/sliderImage/slider-4.webp";

const schedule = [
  { time: "2:00 PM", event: "Arrival & check-in", image: arrivalImg },
  { time: "4–7 PM", event: "Pool sundowner", image: poolImg },
  { time: "5:00 PM", event: "High tea", image: teaImg },
  { time: "8:00 PM", event: "Karaoke", sub: "Saturday live music, soon", image: karaokeImg },
  { time: "9:00 PM", event: "Seasonal buffet dinner", image: foodImage },
  { time: "Late", event: "Open-air cinema", sub: "coming soon", image: cinemaImg },
  { time: "7:00 AM", event: "Sunrise trek & trail", image: trekImg },
  { time: "9:00 AM", event: "Breakfast", image: breakfastImg },
  { time: "10:00 AM", event: "Check-out" },
];

export function Itinerary() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Header Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div className="w-12 h-[1px] bg-[color:var(--gold)] mb-6" />
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] mb-4 font-medium">
                From Dusk to Dawn
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                A day at <br className="hidden lg:block" /> Jalashay.
              </h2>
              <p className="text-muted-foreground mt-6 font-light leading-relaxed max-w-sm text-lg">
                Time moves differently here. Leave your watch behind and let the rhythm of the sun dictate your day.
              </p>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="lg:w-2/3">
            <div className="relative border-l border-border/40 pl-8 md:pl-16 space-y-24 py-8">
              {schedule.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div 
                    className="absolute top-3 w-3 h-3 rounded-full bg-background border-2 border-[color:var(--gold)] group-hover:scale-[1.8] group-hover:bg-[color:var(--gold)] transition-all duration-500 shadow-[0_0_12px_rgba(212,175,55,0.4)] z-10" 
                    style={{ left: 'calc(var(--padding-left) * -1 - 6px)' }} 
                  />
                  
                  {/* We use a local inline style variable to handle the responsive negative offset easily */}
                  <style>{`
                    .group:nth-child(${index + 1}) {
                      --padding-left: 2rem;
                    }
                    @media (min-width: 768px) {
                      .group:nth-child(${index + 1}) {
                        --padding-left: 4rem;
                      }
                    }
                  `}</style>
                  
                  <div className={`flex flex-col md:flex-row ${item.image ? 'gap-8 md:gap-12 md:items-center' : ''}`}>
                    {/* Text Content */}
                    <div className={item.image ? 'flex-1 w-full' : 'w-full'}>
                      <p className="text-[color:var(--gold)] font-medium tracking-widest text-xs uppercase mb-3">
                        {item.time}
                      </p>
                      <h3 className="text-3xl md:text-4xl text-foreground font-display mb-3">
                        {item.event}
                      </h3>
                      {item.sub && (
                        <p className="text-muted-foreground text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]/70 inline-block" />
                          {item.sub}
                        </p>
                      )}
                    </div>

                    {/* Optional Image */}
                    {item.image && (
                      <div className="flex-1 w-full relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <Image 
                          src={item.image} 
                          alt={item.event} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
