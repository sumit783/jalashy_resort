"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={
        isScrolled
          ? {
              backgroundColor: "rgba(20, 20, 20, 0.85)",
              backdropFilter: "blur(12px)",
              borderBottomColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 30px 80px -30px rgba(0, 0, 0, 0.6)",
            }
          : {
              backgroundColor: "rgba(0, 0, 0, 0)",
              backdropFilter: "blur(0px)",
              borderBottomColor: "rgba(0, 0, 0, 0)",
              boxShadow: "none",
            }
      }
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto max-w-6xl px-6 py-4 grid grid-cols-3 items-center">
        {/* Left Side: Drawer Menu Trigger */}
        <div className="flex justify-start">
          <motion.div
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isScrolled ? "auto" : "none" }}
          >
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold/20 text-foreground transition-colors hover:bg-gold/5 focus:outline-none">
                  <Menu className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <span className="sr-only">Open Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] border-r border-border/10 bg-background/95 backdrop-blur-md p-8 flex flex-col justify-between"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Quick links to different sections of the resort website and
                  booking details.
                </SheetDescription>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pb-6 border-b border-border/10">
                    <a
                      href="#"
                      className="font-display text-2xl tracking-wide text-foreground"
                    >
                      Jalashay<span className="text-gold">.</span>
                    </a>
                  </div>
                  <nav className="mt-14 flex flex-col gap-8">
                    <SheetClose asChild>
                      <a
                        href="#"
                        className="font-display text-3xl font-light text-foreground hover:text-gold transition-colors"
                      >
                        Home
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#experience"
                        className="font-display text-3xl font-light text-foreground hover:text-gold transition-colors"
                      >
                        Resort
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#amenities"
                        className="font-display text-3xl font-light text-foreground hover:text-gold transition-colors"
                      >
                        Amenities
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#contact"
                        className="font-display text-3xl font-light text-foreground hover:text-gold transition-colors"
                      >
                        Contact
                      </a>
                    </SheetClose>
                  </nav>
                </div>

                <div className="border-t border-border/10 pt-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    Hospitality & Booking
                  </div>
                  <div className="mt-3 font-display text-xl text-foreground">
                    stay@jalashay.com
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    +91 00000 00000
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>

        {/* Center: Centered Logo */}
        <div className="flex justify-center">
          {isScrolled && (
            <motion.div
              layoutId="logo-container"
              className="flex items-center"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                layoutId="logo-text"
                href="#"
                className="font-display text-2xl tracking-wide text-foreground"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Jalashay<span className="text-gold">.</span>
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Right Side: Book Now Button */}
        <div className="flex justify-end">
          <motion.div
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isScrolled ? "auto" : "none" }}
          >
            <button
              onClick={() => openBooking()}
              className="rounded-full bg-[image:var(--gradient-gold)] px-6 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
