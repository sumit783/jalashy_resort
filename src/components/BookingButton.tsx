"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingModalContext";

type BookingCategory =
  | "Stay"
  | "Tour Package"
  | "Event"
  | "Wedding"
  | "Corporate Retreat"
  | "Group Booking"
  | "Restaurant Booking"
  | "Other";

interface BookingButtonProps {
  category?: BookingCategory;
  className?: string;
  children: React.ReactNode;
}

export function BookingButton({ category = "Stay", className, children }: BookingButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button onClick={() => openBookingModal(category)} className={className}>
      {children}
    </button>
  );
}
