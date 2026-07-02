"use client";

import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type BookingCategory =
  | "Stay"
  | "Tour Package"
  | "Event"
  | "Wedding"
  | "Corporate Retreat"
  | "Group Booking"
  | "Restaurant Booking"
  | "Other";

interface BookingModalContextType {
  isOpen: boolean;
  openBookingModal: (initialCategory?: BookingCategory) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<BookingCategory>("Stay");
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    children: 0,
  });

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const apiBaseUri = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  // TanStack Query Mutation for submitting enquiries
  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${apiBaseUri}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to submit enquiry");
      }
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setFormData({
        name: "",
        phoneNo: "",
        checkIn: "",
        checkOut: "",
        guests: 2,
        children: 0,
      });
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Something went wrong. Please check if backend is running.");
    },
  });

  const openBookingModal = (initialCategory?: BookingCategory) => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
    setSuccess(false);
    setErrorMsg("");
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" || name === "children" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = formData.phoneNo.trim();
    // Add country code +91 if not present
    const phoneNo = cleanPhone.startsWith("+91") ? cleanPhone : `+91${cleanPhone}`;

    submitMutation.mutate({
      ...formData,
      phoneNo,
      category,
      status: "New Enquiry",
    });
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, openBookingModal, closeBookingModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg bg-card border-border/80 rounded-[24px] p-6 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-2xl text-foreground">
              Request a <em>Booking</em>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Submit details, our representative will call you shortly.
            </DialogDescription>
          </DialogHeader>

          {/* Content / Form */}
          <div className="overflow-y-auto flex-grow pr-1">
            {success ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                  ✓
                </div>
                <h4 className="font-display text-2xl text-foreground">Enquiry Submitted!</h4>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                  Thank you. We have received your booking request and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {errorMsg && (
                  <div className="p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive">
                    {errorMsg}
                  </div>
                )}

                {/* Name field */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Amit Kumar"
                    className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                  />
                </div>

                {/* Phone field */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                    Phone Number
                  </label>
                  <div className="flex rounded-xl overflow-hidden bg-secondary/30 border border-border/60 focus-within:border-[color:var(--gold)] transition">
                    <div className="bg-secondary/50 border-r border-border/60 px-3.5 flex items-center text-sm text-foreground/70 font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      name="phoneNo"
                      required
                      value={formData.phoneNo}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                    Booking Category
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BookingCategory)}
                    className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                  >
                    <option value="Stay">Stay</option>
                    <option value="Tour Package">Tour Package</option>
                    <option value="Event">Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Retreat">Corporate Retreat</option>
                    <option value="Group Booking">Group Booking</option>
                    <option value="Restaurant Booking">Restaurant Booking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Dates Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      required
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      required
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                    />
                  </div>
                </div>

                {/* Occupancy selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                      Adults
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min={1}
                      max={30}
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                      Children
                    </label>
                    <input
                      type="number"
                      name="children"
                      min={0}
                      max={20}
                      required
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full bg-secondary/30 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[color:var(--gold)] transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full btn-gold hover:[&]:btn-gold-hover text-xs uppercase tracking-[0.2em] text-center py-3.5 mt-4 transition-all"
                >
                  {submitMutation.isPending ? "Submitting Request..." : "Request Booking"}
                </button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </BookingModalContext.Provider>
  );
}
