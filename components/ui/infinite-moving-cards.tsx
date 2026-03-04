"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  image?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current!.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--animation-duration, 80s)",
          animationDirection: "var(--animation-direction, forwards)",
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white px-8 py-6 md:w-[450px]"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-10 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span className="relative z-20 text-sm leading-[1.6] text-amber-900 font-normal">
                &ldquo;{item.quote}&rdquo;
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900">{item.name}</p>
                  <p className="text-xs text-amber-600">{item.designation}</p>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
