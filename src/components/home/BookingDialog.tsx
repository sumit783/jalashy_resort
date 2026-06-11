"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CalendarIcon, User, Phone, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useBooking } from "@/context/BookingContext";
import { z } from "zod";

const bookingFormSchema = z.object({
  name: z.string().min(1, "Full name is required").trim(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s-]{8,15}$/, "Please enter a valid phone number")
    .trim(),
});
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

export default function BookingDialog() {
  const { isOpen, bookingQuery, closeBooking, updateBookingQuery } = useBooking();

  // Local form states, initialized when dialog opens
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingType, setBookingType] = useState("stay");
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState("2");
  const [children, setChildren] = useState("0");
  
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync context query data to local states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setBookingType(bookingQuery.bookingType);
      setCheckInDate(bookingQuery.checkInDate);
      setCheckOutDate(bookingQuery.checkOutDate);
      setGuests(bookingQuery.guests);
      setChildren(bookingQuery.children);
      setName("");
      setPhone("");
      setErrors({});
    }
  }, [isOpen, bookingQuery]);

  // Lock body scroll when dialog is open
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation with Zod
    const validationResult = bookingFormSchema.safeParse({ name, phone });

    if (!validationResult.success) {
      const fieldErrors: { name?: string; phone?: string } = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as "name" | "phone"] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Send the booking details to the backend API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          bookingType,
          checkInDate,
          checkOutDate,
          guests,
          children,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send reservation email.");
      }

      // Update global context with modified stay options
      updateBookingQuery({
        bookingType,
        checkInDate,
        checkOutDate,
        guests,
        children,
      });

      // Show success feedback
      const checkInStr = format(checkInDate, "MMM dd, yyyy");
      const checkOutStr = format(checkOutDate, "MMM dd, yyyy");
      
      toast.success("Enquiry Submitted Successfully!", {
        description: `Thank you ${name}. Our hospitality desk will call you at ${phone} to confirm your ${bookingType === "stay" ? "Stay" : "Event"} from ${checkInStr} to ${checkOutStr}.`,
        duration: 8000,
      });

      closeBooking();
    } catch (err: any) {
      console.error("Booking submission error:", err);
      toast.error("Booking Enquiry Failed", {
        description: err.message || "An unexpected error occurred. Please try again.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-background/80 backdrop-blur-md">
          {/* Backdrop Click */}
          <div className="absolute inset-0 cursor-default" onClick={closeBooking} />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card border border-border/40 rounded-2xl overflow-hidden shimmer-border shadow-soft z-10 flex flex-col p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 z-20 p-2 rounded-full border border-border/20 bg-background/60 text-foreground hover:bg-gold/15 hover:text-gold hover:border-gold/60 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                — Reservation Desk
              </span>
              <h3 className="mt-2 font-display text-3xl font-light text-foreground leading-tight">
                Complete Your Booking
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
                  <User className="h-3 w-3" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-background border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/60 text-foreground placeholder:text-muted-foreground/50 transition-colors ${
                    errors.name ? "border-destructive" : "border-border/60"
                  }`}
                  placeholder="e.g. John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="text-xs text-destructive">{errors.name}</span>
                )}
              </div>

              {/* Phone field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
                  <Phone className="h-3 w-3" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-background border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/60 text-foreground placeholder:text-muted-foreground/50 transition-colors ${
                    errors.phone ? "border-destructive" : "border-border/60"
                  }`}
                  placeholder="e.g. +91 98765 43210"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <span className="text-xs text-destructive">{errors.phone}</span>
                )}
              </div>

              {/* Category selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                  Category
                </label>
                <Select value={bookingType} onValueChange={setBookingType} disabled={isSubmitting}>
                  <SelectTrigger className="w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground focus:ring-0 focus:ring-offset-0 cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/40 text-popover-foreground">
                    <SelectItem value="stay">Stay</SelectItem>
                    <SelectItem value="event">Plan Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Check-in / Check-out Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Check-In */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                    Check-In
                  </label>
                  <Popover>
                    <PopoverTrigger asChild disabled={isSubmitting}>
                      <button className="flex items-center justify-between w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none text-left cursor-pointer hover:border-gold/40 transition-colors">
                        <span>{format(checkInDate, "MMM dd, yyyy")}</span>
                        <CalendarIcon className="h-3.5 w-3.5 text-gold opacity-80" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border-border/40" align="start">
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

                {/* Check-Out */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                    Check-Out
                  </label>
                  <Popover>
                    <PopoverTrigger asChild disabled={isSubmitting}>
                      <button className="flex items-center justify-between w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none text-left cursor-pointer hover:border-gold/40 transition-colors">
                        <span>{format(checkOutDate, "MMM dd, yyyy")}</span>
                        <CalendarIcon className="h-3.5 w-3.5 text-gold opacity-80" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border-border/40" align="start">
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
              </div>

              {/* Guests / Children Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guests */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                    Guests
                  </label>
                  <Select value={guests} onValueChange={setGuests} disabled={isSubmitting}>
                    <SelectTrigger className="w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground focus:ring-0 focus:ring-offset-0 cursor-pointer">
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

                {/* Children */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                    Children
                  </label>
                  <Select value={children} onValueChange={setChildren} disabled={isSubmitting}>
                    <SelectTrigger className="w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground focus:ring-0 focus:ring-offset-0 cursor-pointer">
                      <SelectValue placeholder="Children" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/40 text-popover-foreground">
                      <SelectItem value="0">0 Children</SelectItem>
                      <SelectItem value="1">1 Child</SelectItem>
                      <SelectItem value="2+">2+ Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 rounded-full bg-[image:var(--gradient-gold)] py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting Query...
                  </>
                ) : (
                  <>Submit Reservation Request</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
