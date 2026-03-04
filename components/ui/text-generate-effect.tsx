"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const [scope, setScope] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    setTimeout(() => setScope(true), 100);
  }, []);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <span
              key={word + idx}
              className="inline-block mr-2 transition-all"
              style={{
                opacity: scope ? 1 : 0,
                filter: scope ? "none" : filter ? "blur(10px)" : "none",
                transitionDelay: `${idx * (duration / wordsArray.length)}s`,
                transitionDuration: `${duration}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
