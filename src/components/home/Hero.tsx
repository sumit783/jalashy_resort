"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Image from "next/image";
const sliderImages = [
  "/sliderImage/slider-3.webp",
  "/sliderImage/slider-2.webp",
  "/sliderImage/slider-1.webp",
  "/sliderImage/slider-5.webp",
  "/sliderImage/slider-4.webp",
  "/sliderImage/020A6307.webp",
];
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { bookingQuery, updateBookingQuery, openBooking } = useBooking();
  const { bookingType, checkInDate, checkOutDate, guests, children } = bookingQuery;

  const setBookingType = (val: string) => updateBookingQuery({ bookingType: val });
  const setGuests = (val: string) => updateBookingQuery({ guests: val });
  const setChildren = (val: string) => updateBookingQuery({ children: val });
  const setCheckInDate = (date: Date) => updateBookingQuery({ checkInDate: date });
  const setCheckOutDate = (date: Date) => updateBookingQuery({ checkOutDate: date });

  const handleBookNow = () => {
    openBooking();
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen md:h-screen md:min-h-[640px] w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={sliderImages[currentImageIndex]}
              alt={`Jalashay Resort background slide ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background z-10" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-20 md:py-0 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold"
        >
          <span className="gold-divider" /> Lakeside Luxury{" "}
          <span className="gold-divider" />
        </motion.span>

        <div className="flex flex-col items-center select-none justify-center h-[110px] sm:h-[130px] md:h-[170px] lg:h-[220px]">
          {!isScrolled ? (
            <motion.div
              layoutId="logo-container"
              className="flex flex-col items-center"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h1
                layoutId="logo-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-6xl font-light leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Jalashay
              </motion.h1>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gold-gradient font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mt-3"
              >
                Resort
              </motion.span>
            </motion.div>
          ) : null}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          A serene lakeside escape designed for grand weddings, intimate
          getaways and timeless celebrations.
        </motion.p>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="w-full mt-12"
        >
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-2 items-center bg-card/75 border border-border/40 p-4 md:p-2 md:pl-6 rounded-2xl md:rounded-full max-w-5xl w-full mx-auto shimmer-border shadow-soft">
            {/* Category selection */}
            <div className="flex flex-col items-start w-full col-span-2 md:col-span-1 md:w-44 px-3 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gold font-medium mb-1.5">
                Category
              </label>
              <Select value={bookingType} onValueChange={setBookingType}>
                <SelectTrigger className="h-auto p-0 bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer text-foreground text-sm font-light w-full text-left justify-between pr-2">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/40 text-popover-foreground">
                  <SelectItem value="stay">Stay</SelectItem>
                  <SelectItem value="event">Plan Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-8 w-px bg-border/20 hidden md:block" />

            {/* Check-in Date */}
            <div className="flex flex-col items-start w-full col-span-1 md:w-36 px-3 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gold font-medium mb-1.5">
                Check-In
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-transparent text-foreground text-sm font-light w-full text-left border-none focus:outline-none cursor-pointer p-0 hover:text-gold transition-colors flex items-center justify-between">
                    <span>{format(checkInDate, "MMM dd, yyyy")}</span>
                    <CalendarIcon className="h-3.5 w-3.5 opacity-50 ml-2 text-gold" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-popover border-border/40"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={(date) => {
                      if (date) {
                        setCheckInDate(date);
                        if (date >= checkOutDate) {
                          const newCheckOut = new Date(date);
                          newCheckOut.setDate(newCheckOut.getDate() + 1);
                          setCheckOutDate(newCheckOut);
                        }
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="h-8 w-px bg-border/20 hidden md:block" />

            {/* Check-out Date */}
            <div className="flex flex-col items-start w-full col-span-1 md:w-36 px-3 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gold font-medium mb-1.5">
                Check-Out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-transparent text-foreground text-sm font-light w-full text-left border-none focus:outline-none cursor-pointer p-0 hover:text-gold transition-colors flex items-center justify-between">
                    <span>{format(checkOutDate, "MMM dd, yyyy")}</span>
                    <CalendarIcon className="h-3.5 w-3.5 opacity-50 ml-2 text-gold" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-popover border-border/40"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={(date) => date && setCheckOutDate(date)}
                    disabled={(date) => date <= checkInDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="h-8 w-px bg-border/20 hidden md:block" />

            {/* Guests */}
            <div className="flex flex-col items-start w-full col-span-1 md:w-28 px-3 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gold font-medium mb-1.5">
                Guests
              </label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-auto p-0 bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer text-foreground text-sm font-light w-full text-left justify-between pr-2">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/40 text-popover-foreground">
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4+">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-8 w-px bg-border/20 hidden md:block" />

            {/* Children */}
            <div className="flex flex-col items-start w-full col-span-1 md:w-30 px-3 text-left">
              <label className="text-[9px] uppercase tracking-widest text-gold font-medium mb-1.5">
                Children
              </label>
              <Select value={children} onValueChange={setChildren}>
                <SelectTrigger className="h-auto p-0 bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer text-foreground text-sm font-light w-full text-left justify-between pr-2">
                  <SelectValue placeholder="Children" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/40 text-popover-foreground">
                  <SelectItem value="0">0 Children</SelectItem>
                  <SelectItem value="1">1 Child</SelectItem>
                  <SelectItem value="2+">2+ Children</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action button */}
            <div className="w-full col-span-2 md:col-span-1 md:w-auto md:ml-auto">
              <button
                onClick={handleBookNow}
                className="w-full md:w-auto rounded-full bg-[image:var(--gradient-gold)] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-gold/70"
      >
        Scroll
      </motion.div>
    </section>
  );
}
