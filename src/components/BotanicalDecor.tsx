import React from "react";

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 ${className}`} aria-hidden="true">
      <div className="h-px w-16 md:w-24 bg-linear-to-r from-transparent to-gold-400" />
      <svg
        className="w-6 h-6 text-sage-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22V7" />
        <path d="M12 7c-2-3-6-4-8-2 0 4 3 7 8 7" />
        <path d="M12 11c2-3 6-4 8-2 0 4-3 7-8 7" />
        <path d="M12 15c-1.5-2-4.5-2.5-6-1.5 0 2.5 2 4.5 6 4.5" />
      </svg>
      <div className="h-px w-16 md:w-24 bg-linear-to-l from-transparent to-gold-400" />
    </div>
  );
}

export function BotanicalLeafCorner({
  className = "",
  position = "top-left",
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <svg
      className={`w-16 h-16 md:w-24 md:h-24 text-[#8BA393]/40 pointer-events-none ${getTransform()} ${className}`}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10,10 Q40,15 60,35 Q40,40 10,10" />
      <path d="M10,10 Q25,45 45,65 Q30,55 10,10" />
      <path d="M10,10 Q15,40 25,75 Q15,60 10,10" />
      <path d="M20,20 Q50,25 70,5 Q55,30 20,20" />
    </svg>
  );
}

export function BismillahCalligraphy({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center py-2 ${className}`}>
      <span
        className="font-arabic-verse text-2xl md:text-3xl text-sage-700 tracking-wide block"
        dir="rtl"
        lang="ar"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </span>
    </div>
  );
}
