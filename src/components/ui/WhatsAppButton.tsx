"use client";

import { motion } from "motion/react";

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const defaultMessage = "Hello! I'd like to enquire about booking and availability at Jalashay Resort.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip label */}
      <span className="mr-3 px-4 py-2 rounded-full border border-border/40 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold shadow-lg translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        Enquire on WhatsApp
      </span>

      {/* Button Circle */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-300 border border-white/20">
        {/* Breathing glow animation */}
        <span className="absolute inset-0 rounded-full opacity-30 group-hover:animate-ping pointer-events-none" />

        {/* WhatsApp SVG Icon */}
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.023-5.086-2.884-6.948C16.63 2.007 14.167 1.01 11.54 1.01 6.108 1.01 1.683 5.378 1.68 10.806c-.001 1.702.46 3.366 1.332 4.809l-.991 3.62 3.71-.973zm11.758-6.643c-.302-.15-1.78-.88-2.057-.98-.277-.101-.48-.15-.68.15-.2.3-.777.98-.952 1.18-.175.2-.35.224-.652.074-1.01-.504-1.745-.92-2.433-1.63-.443-.456-.63-.996-.13-1.5.075-.075.15-.15.225-.224.075-.075.101-.125.15-.224.05-.1.025-.187-.012-.263-.037-.075-.3-.725-.411-.994-.11-.264-.22-.228-.3-.228-.077 0-.166-.005-.256-.005-.09 0-.236.034-.36.166-.124.133-.473.462-.473 1.127 0 .666.48 1.31.548 1.4.068.09.943 1.44 2.285 2.01.319.136.569.217.763.278.32.102.612.088.843.053.258-.039.78-.32 8.89-.63.11-.31.11-.577.078-.63-.03-.05-.11-.1-.41-.25z" />
        </svg>
      </div>
    </motion.a>
  );
}
