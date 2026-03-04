"use client";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
    icon?: ReactNode;
  }[];
  className?: string;
}

export function FloatingNav({ navItems, className }: FloatingNavProps) {
  return (
    <div
      className={cn(
        "flex max-w-fit mx-auto fixed top-6 inset-x-0 z-50 rounded-full border border-amber-200/50 bg-white/80 backdrop-blur-md shadow-lg shadow-amber-100/20 px-6 py-3 items-center justify-center gap-6",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <a
          key={idx}
          href={navItem.link}
          className="relative flex items-center gap-1.5 text-sm font-medium text-amber-900 hover:text-amber-600 transition-colors duration-200"
        >
          {navItem.icon && <span className="block">{navItem.icon}</span>}
          <span>{navItem.name}</span>
        </a>
      ))}
    </div>
  );
}
