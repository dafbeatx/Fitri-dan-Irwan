import React from "react";
import { weddingData } from "@/config/wedding-data";
import { BismillahCalligraphy, BotanicalDivider } from "./BotanicalDecor";

export function AyatSection() {
  const { quranVerse } = weddingData;

  return (
    <section
      aria-label="Ayat Suci Pernikahan"
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center"
    >
      <BismillahCalligraphy />

      <div className="mt-8 p-6 sm:p-10 rounded-2xl bg-white/80 border border-[#EAE2D5] shadow-sm">
        {/* Arabic Verse */}
        <p
          className="font-arabic-verse text-xl sm:text-2xl md:text-3xl text-[#1F2D22] mb-6 leading-loose text-center"
          dir="rtl"
          lang="ar"
        >
          {quranVerse.arabic}
        </p>

        {/* Translation */}
        <p className="text-sm sm:text-base text-[#3F5244] leading-relaxed italic mb-4 font-normal">
          &ldquo;{quranVerse.translation}&rdquo;
        </p>

        {/* Surah Reference */}
        <p className="text-xs uppercase tracking-widest text-[#99753F] font-semibold">
          ({quranVerse.surah})
        </p>
      </div>

      <BotanicalDivider className="mt-8" />
    </section>
  );
}
