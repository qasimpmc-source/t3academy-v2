"use client";

import { useEffect } from "react";

// Subtle mouse-tracking parallax — moves images slightly inside .glass-card elements
export function MouseParallax() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".glass-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 100;
        const dy = (e.clientY - cy) / 100;
        const img = card.querySelector<HTMLImageElement>("img");
        if (img) {
          img.style.transform = `translate(${dx * 2}px, ${dy * 2}px) scale(1.02)`;
        }
      });
    };
    document.addEventListener("mousemove", handler, { passive: true });
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
