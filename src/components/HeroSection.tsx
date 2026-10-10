import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { BotanicalCornerAuthentic, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";
import { weddingData } from "@/config/wedding-data";

interface HeroSectionProps {
  guestName: string;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      aria-label="Beranda Undangan"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-14 bg-linear-to-b from-ivory-50 via-white to-ivory-50 overflow-hidden"
    >
      {/* 1. Authentic Botanical Floral Corners */}
      <BotanicalCornerAuthentic
        position="top-left"
        size={95}
        className="absolute top-2 left-2 z-10"
      />
      <BotanicalCornerAuthentic
        position="top-right"
        size={95}
        className="absolute top-2 right-2 z-10"
      />
      <BotanicalCornerAuthentic
        position="bottom-left"
        size={80}
        opacity={0.65}
        className="absolute bottom-2 left-2 z-10"
      />
      <BotanicalCornerAuthentic
        position="bottom-right"
        size={80}
        opacity={0.65}
        className="absolute bottom-2 right-2 z-10"
      />

      {/* 2. Architectural Arch Framing */}
      <div className="relative w-full max-w-xs mx-auto border border-gold-300/40 rounded-4xl p-6 sm:p-7 bg-white/60 shadow-xs backdrop-blur-xs">
        <div className="inline-block px-4 py-1.5 rounded-full bg-ivory-50/90 border border-gold-400/60 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-600 font-semibold mb-3">
          The Wedding Celebration
        </div>

        <h1 className="font-serif-cormorant text-4xl sm:text-5xl font-normal text-sage-900 tracking-wider flex flex-col items-center leading-none">
          <a
            href="#mempelai"
            className="hover:text-gold-600 transition-colors"
            aria-label="Profil Mempelai Fitri"
          >
            Fitri
          </a>
          <span className="text-2xl sm:text-3xl text-gold-500 font-light italic my-2 leading-none">
            &amp;
          </span>
          <a
            href="#mempelai"
            className="hover:text-gold-600 transition-colors"
            aria-label="Profil Mempelai Irwan"
          >
            Irwan
          </a>
        </h1>

        {/* Botanical Flourish Crest Under Names */}
        <BotanicalFlourishCrest className="my-2" />

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-sage-700 font-medium mt-2">
          <div className="flex items-center gap-1.5 bg-ivory-50/90 px-3 py-1 rounded-full border border-ivory-200 tracking-wider text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{weddingData.events.dateFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ivory-50/90 px-3 py-1 rounded-full border border-ivory-200 tracking-wider text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{weddingData.events.akad.locationName}</span>
          </div>
        </div>

        {/* Personalized Guest Badge with Floral Accents */}
        {guestName && (
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative px-5 py-3 rounded-2xl bg-white/95 border border-gold-300/60 shadow-xs overflow-hidden">
              <FloralCardCorner position="top-right" size={36} className="absolute top-0 right-0" />
              <FloralCardCorner position="bottom-left" size={36} className="absolute bottom-0 left-0" />
              <p className="text-[9px] sm:text-[10px] text-[#6B7E6E] uppercase tracking-[0.3em] font-semibold">
                Kepada Yth.
              </p>
              <p className="font-serif-cormorant text-lg sm:text-xl font-semibold text-sage-900 tracking-wide capitalize mt-0.5">
                {guestName}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
