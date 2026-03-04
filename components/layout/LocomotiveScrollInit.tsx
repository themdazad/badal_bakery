"use client";
import { useEffect } from "react";

// Locomotive Scroll v5 — initialises on mount
// Import CSS globally via layout or globals.css
export default function LocomotiveScrollInit() {
  useEffect(() => {
    let scroll: { destroy?: () => void } | null = null;

    const init = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
          duration: 1.4,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        },
      });
    };

    init();

    return () => {
      scroll?.destroy?.();
    };
  }, []);

  return null;
}
