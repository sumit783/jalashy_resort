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

      {/* Mobile menu overlay — always in DOM, animated with CSS transitions */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8 py-20"
        style={{
          backgroundColor: "oklch(0.98 0.02 85 / 0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close Menu"
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-border/60 text-foreground hover:bg-secondary transition-colors duration-200"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)",
            transition: "opacity 0.3s ease 0.15s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        {/* Gold decorative line */}
        <div
          className="absolute top-1/2 left-8 -translate-y-1/2 w-px h-32 opacity-20"
          style={{ background: "var(--gradient-gold)" }}
        />

        <nav className="flex flex-col gap-2 text-center">
          {[
            { label: "Stays",       id: "stays" },
            { label: "Experiences", id: "experiences" },
            { label: "Dining",      id: "dining" },
            { label: "Gallery",     id: "gallery" },
            { label: "Contact",     id: "contact" },
          ].map(({ label, id }, i) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={(e) => {
                setMenuOpen(false);
                handleScrollClick(e, id);
              }}
              className="group relative py-3 text-xl uppercase tracking-[0.3em] font-medium hover:text-[color:var(--gold)] transition-colors duration-200 overflow-hidden"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                transition: `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.07}s`,
              }}
            >
              <span className="relative z-10">{label}</span>
              {/* Hover underline */}
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-12 transition-all duration-300" style={{ background: "var(--gradient-gold)" }} />
            </Link>
          ))}

          <div
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease 0.48s, transform 0.4s cubic-bezier(0.4,0,0.2,1) 0.48s`,
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                openBookingModal();
              }}
              className="btn-gold hover:[&]:btn-gold-hover text-sm uppercase tracking-[0.2em] px-8 py-3.5 mt-10 w-full max-w-xs mx-auto block"
            >
              Book Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

