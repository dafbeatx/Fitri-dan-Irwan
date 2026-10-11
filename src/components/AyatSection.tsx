import { weddingData } from "@/config/wedding-data";
import { BismillahCalligraphy, BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

export function AyatSection() {
  const { quranVerse } = weddingData;

  return (
    <section
      aria-label="Ayat Suci Pernikahan"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto text-center"
    >
      <BismillahCalligraphy />
      <BotanicalFlourishCrest className="my-1 opacity-80" />

      <div className="relative mt-6 p-6 sm:p-7 rounded-3xl bg-white/90 border border-gold-300/60 shadow-sm overflow-hidden">
        {/* Subtle Botanical Corner Accents */}
        <FloralCardCorner position="top-left" size={44} className="absolute top-0 left-0" />
        <FloralCardCorner position="top-right" size={44} className="absolute top-0 right-0" />
        <FloralCardCorner position="bottom-left" size={44} className="absolute bottom-0 left-0" />
        <FloralCardCorner position="bottom-right" size={44} className="absolute bottom-0 right-0" />

        {/* Arabic Verse */}
        <p
          className="font-arabic-verse text-lg sm:text-xl text-sage-900 mb-5 leading-loose text-center relative z-10"
          dir="rtl"
          lang="ar"
        >
          {quranVerse.arabic}
        </p>

        {/* Translation */}
        <p className="text-xs sm:text-sm text-[#465A49] leading-relaxed italic mb-4 font-normal relative z-10 max-w-xs mx-auto">
          &ldquo;{quranVerse.translation}&rdquo;
        </p>

        {/* Surah Reference */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold relative z-10">
          ({quranVerse.surah})
        </p>
      </div>

      <BotanicalDivider className="mt-8" />
    </section>
  );
}
