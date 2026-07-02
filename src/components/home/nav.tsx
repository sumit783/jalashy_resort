"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBookingModal } from "@/context/BookingModalContext";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    if (!isHome) return;
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    // Reset scroll state on mount/pathname change
    setScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", on);
  }, [isHome, pathname]);

  const alwaysScrolled = !isHome;
  const isLight = scrolled || alwaysScrolled;

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 transition-all duration-500">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-6 h-14 rounded-full transition-all duration-500 ${isLight || menuOpen ? "bg-background/90 backdrop-blur-md border border-border/60 shadow-[var(--shadow-soft)]" : "bg-background/20 backdrop-blur-sm border border-white/20"}`}
      >
        <Link href="/" className="flex items-center gap-2 z-50">
          <Image
            src="/Jalashay_Logo.webp"
            alt="Jalashay Resort"
            width={100}
            height={36}
            style={{ width: "auto" }}
            className={`h-9 w-auto object-contain transition-all duration-300 ${!isLight && !menuOpen ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>
        <nav
          className={`hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isLight ? "text-foreground/80" : "text-white/90"}`}
        >
          <Link
            href="/#stays"
            onClick={(e) => handleScrollClick(e, "stays")}
            className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-[color:var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 transition"
          >
            Stays
          </Link>
          <Link
            href="/#experiences"
            onClick={(e) => handleScrollClick(e, "experiences")}
            className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-[color:var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 transition"
          >
            Experiences
          </Link>
          <Link
            href="/#dining"
            onClick={(e) => handleScrollClick(e, "dining")}
            className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-[color:var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 transition"
          >
            Dining
          </Link>
          <Link
            href="/#gallery"
            onClick={(e) => handleScrollClick(e, "gallery")}
            className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-[color:var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 transition"
          >
            Gallery
          </Link>
          <Link
            href="/#contact"
            onClick={(e) => handleScrollClick(e, "contact")}
            className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-[color:var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 transition"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 z-50">
          <button
            onClick={() => openBookingModal()}
            className="btn-gold hover:[&]:btn-gold-hover text-[10px] sm:text-xs uppercase tracking-[0.2em] px-3.5 sm:px-5 py-1.5 sm:py-2"
          >
            Book Now
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-full border border-border/60 text-foreground md:hidden hover:bg-secondary transition flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden flex flex-col justify-center px-8 py-20 animate-fade-in">
          <nav className="flex flex-col gap-6 text-center text-lg uppercase tracking-[0.25em] font-medium">
            <Link
              href="/#stays"
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, "stays");
              }}
              className="hover:text-[color:var(--gold)] transition"
            >
              Stays
            </Link>
            <Link
              href="/#experiences"
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, "experiences");
              }}
              className="hover:text-[color:var(--gold)] transition"
            >
              Experiences
            </Link>
            <Link
              href="/#dining"
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, "dining");
              }}
              className="hover:text-[color:var(--gold)] transition"
            >
              Dining
            </Link>
            <Link
              href="/#gallery"
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, "gallery");
              }}
              className="hover:text-[color:var(--gold)] transition"
            >
              Gallery
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, "contact");
              }}
              className="hover:text-[color:var(--gold)] transition"
            >
              Contact
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                openBookingModal();
              }}
              className="btn-gold hover:[&]:btn-gold-hover text-sm uppercase tracking-[0.2em] px-8 py-3.5 mt-8 w-full max-w-xs mx-auto"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

