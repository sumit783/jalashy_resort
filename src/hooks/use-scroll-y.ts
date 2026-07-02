"use client";

import { useEffect, useState } from "react";

export function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return y;
}
