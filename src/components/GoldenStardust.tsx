"use client";

import React, { memo } from "react";

// Predefined deterministic particles to eliminate any SSR hydration mismatches
const STARDUST_PARTICLES = [
  { left: "6%", size: 3, duration: 11, delay: 0 },
  { left: "14%", size: 2, duration: 14, delay: 2.5 },
  { left: "22%", size: 3.5, duration: 12, delay: 5.2 },
  { left: "31%", size: 2.5, duration: 16, delay: 1.1 },
  { left: "42%", size: 4, duration: 10, delay: 7.3 },
  { left: "53%", size: 2, duration: 15, delay: 3.8 },
  { left: "61%", size: 3, duration: 13, delay: 6.0 },
  { left: "72%", size: 3.5, duration: 11, delay: 8.5 },
  { left: "81%", size: 2, duration: 17, delay: 4.2 },
  { left: "92%", size: 3, duration: 12, delay: 1.8 },
  { left: "18%", size: 2.5, duration: 15, delay: 9.4 },
  { left: "37%", size: 3, duration: 13, delay: 11.2 },
  { left: "67%", size: 2, duration: 14, delay: 10.1 },
  { left: "86%", size: 3.5, duration: 12, delay: 12.5 },
];

export const GoldenStardust = memo(function GoldenStardust() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      {STARDUST_PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className="stardust-particle absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#E5C158",
            boxShadow: "0 0 6px 1.5px rgba(212, 175, 55, 0.75)",
            animation: `stardust-drift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
});
