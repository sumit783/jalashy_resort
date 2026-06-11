"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Gift } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export default function OfferDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    // Check if the dialog has been viewed in the current session
    const isViewed = sessionStorage.getItem("isViewed");
    if (!isViewed) {
      // Delay showing the dialog slightly for a more premium experience
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("isViewed", "true");
  };

  const handleBookNow = () => {
    setIsOpen(false);
    sessionStorage.setItem("isViewed", "true");
    openBooking({ bookingType: "stay" });
  };

  // Prevent scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-card border border-border/40 rounded-2xl overflow-hidden shimmer-border shadow-soft z-10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full border border-border/20 bg-background/60 text-foreground hover:bg-gold/15 hover:text-gold hover:border-gold/60 transition-all cursor-pointer shadow-md"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image Container with aspect ratio */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={"/assets/lakeside_suite.png"}
                alt="Luxury Lakeside Suite"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              {/* Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-[9px] uppercase tracking-widest text-primary-foreground font-semibold shadow-md">
                <Gift className="h-3 w-3 animate-bounce" /> Special Offer
              </div>
            </div>

            {/* Offer details */}
            <div className="p-8 text-center flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                — Limited Time Invitation
              </span>
              <h3 className="mt-4 font-display text-3xl font-light text-foreground leading-tight">
                Escape to Lakeside Luxury
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Book your stay directly this week and receive a complimentary room upgrade, lake-view dining voucher, and 20% off all suites.
              </p>
              
              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="mt-8 w-full rounded-full bg-[image:var(--gradient-gold)] py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Claim Offer & Book Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
