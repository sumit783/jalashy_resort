"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
  poster?: string;
  className?: string;
  amount?: number; // threshold amount for intersection observer, default 0.05
  isPlaying?: boolean; // Controlled play state
}

export default function LazyVideo({
  src,
  poster,
  className,
  amount = 0.05,
  isPlaying,
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // We observe the container element because the video is dynamically mounted/unmounted
  const isInView = useInView(containerRef, { amount });

  // Determine if the video should be active (mounted & playing)
  const shouldPlay = isPlaying !== undefined ? isPlaying : isInView;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* Static poster image always loaded in background to avoid black flash */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={`${className} absolute inset-0 w-full h-full pointer-events-none`}
        />
      )}

      {/* Video element only mounted when in view to release hardware decoder resources */}
      {shouldPlay && src && (
        <video
          src={src}
          className={`${className} absolute inset-0 w-full h-full`}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          {...props}
        />
      )}
    </div>
  );
}
