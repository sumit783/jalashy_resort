"use client";

import React, { createContext, useContext, useState } from "react";

export interface BookingQuery {
  bookingType: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: string;
  children: string;
}

interface BookingContextType {
  isOpen: boolean;
  bookingQuery: BookingQuery;
  openBooking: (initialData?: Partial<BookingQuery>) => void;
  closeBooking: () => void;
  updateBookingQuery: (query: Partial<BookingQuery>) => void;
}

const defaultQuery = (): BookingQuery => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return {
    bookingType: "stay",
    checkInDate: today,
    checkOutDate: tomorrow,
    guests: "2",
    children: "0",
  };
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingQuery, setBookingQuery] = useState<BookingQuery>(defaultQuery);

  const openBooking = (initialData?: Partial<BookingQuery>) => {
    if (initialData) {
      setBookingQuery((prev) => ({ ...prev, ...initialData }));
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const updateBookingQuery = (query: Partial<BookingQuery>) => {
    setBookingQuery((prev) => ({ ...prev, ...query }));
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        bookingQuery,
        openBooking,
        closeBooking,
        updateBookingQuery,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
