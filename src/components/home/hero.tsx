"use client";

import { useEffect, useRef, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

const heroBgVideo = "/Website_01.webm";

// iOS Safari does not reliably fire scroll events during momentum scroll,
// so we use CSS-based parallax via background-attachment or a pure CSS
// transform approach with will-change on a wrapper. For maximum iOS compat
// we detect iOS and fall back to a static (no-parallax) treatment there.
function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream);
  }, []);
  return isIOS;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

export function Hero() {
  const y = useScrollY();
  const isIOS = useIsIOS();
  const { openBookingModal } = useBookingModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  // On iOS, <video autoPlay> is often blocked until the user interacts.
  // Calling .play() programmatically after mount (still requires muted + playsInline)
  // suppresses the native play-button overlay shown by Safari.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Ensure attributes are set programmatically for iOS compatibility
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented – video stays paused, no crash.
      });
    }
  }, []);

  // On iOS we skip the JS-driven parallax transform (it jitters / doesn't work
  // during momentum scroll). Instead we let the video stay fixed-size.
  const parallaxStyle = isIOS
    ? {}
    : { transform: `translate3d(0, ${y * 0.3}px, 0) scale(1.05)` };

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={parallaxStyle}
      >
        <video
          ref={videoRef}
          src={heroBgVideo}
          autoPlay
          muted
          loop
          playsInline
          // disablePictureInPicture and x-webkit-airplay suppress extra iOS overlays
          disablePictureInPicture
          // @ts-ignore – non-standard iOS Safari attribute
          x-webkit-airplay="deny"
          className="w-full h-full object-cover"
          onError={(e) => console.error("Video failed to load:", e)}
          suppressHydrationWarning
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col justify-center px-8 lg:px-12 pt-20">
        <p className="text-[color:var(--gold)] text-xs uppercase tracking-[0.4em] mb-6">
          — Lakeside Luxury
        </p>
        <h1 className="font-display text-white text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-balance max-w-5xl">
          Jalashay <em className="italic">Resort</em>
        </h1>
        <p className="text-white/90 mt-8 max-w-lg text-lg font-light leading-relaxed">
          A serene lakeside escape designed for grand weddings, intimate getaways and timeless
          celebrations.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => openBookingModal("Stay")}
            className="btn-gold hover:[&]:btn-gold-hover text-sm uppercase tracking-[0.2em]"
          >
            Reserve Your Stay
          </button>
          <a
            href="#gallery"
            className="rounded-full border border-white/60 text-white text-sm uppercase tracking-[0.2em] px-7 py-[0.85rem] font-medium hover:bg-white/10 transition"
          >
            Explore Gallery
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/70 text-[10px] uppercase tracking-[0.4em]">
        Est. 2014
      </div>
    </section>
  );
}
