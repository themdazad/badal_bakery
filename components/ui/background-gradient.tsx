"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) {
  return (
    <div className={cn("relative p-[2px] rounded-2xl group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-2xl z-[1] opacity-60 group-hover:opacity-100 transition duration-500",
          "bg-[radial-gradient(circle_at_top_right,_#fcd34d,_#f97316,_#b45309)]",
          animate && "animate-[gradient-border_3s_ease_infinite]",
          "bg-[length:200%_200%]"
        )}
      />
      <div className={cn("relative z-10 rounded-2xl bg-white", className)}>
        {children}
      </div>
    </div>
  );
}
