import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { BotanicalLeafCorner } from "./BotanicalDecor";

interface HeroSectionProps {
  guestName: string;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <section
      id="beranda"
      aria-label="Beranda Undangan"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 bg-linear-to-b from-ivory-50 via-white to-ivory-50 overflow-hidden"
    >
      <BotanicalLeafCorner position="top-left" className="absolute top-4 left-4 text-sage-600/30" />
      <BotanicalLeafCorner position="top-right" className="absolute top-4 right-4 text-sage-600/30" />

      <div className="relative max-w-3xl mx-auto space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full bg-ivory-50 border border-gold-400/50 text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold">
          The Wedding Celebration
        </div>

        <h1 className="font-serif-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-sage-900 tracking-wide">
          Fitri &amp; Irwan
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-sage-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Sabtu, 12 Desember 2026</span>
          </div>
          <span className="hidden sm:inline text-gold-400">•</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>Jakarta Selatan</span>
          </div>
        </div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <div className="pt-4 max-w-md mx-auto">
            <div className="px-5 py-3 rounded-2xl bg-white/90 border border-ivory-200 shadow-xs">
              <p className="text-[11px] text-[#556858] uppercase tracking-wider">
                Turut Mengundang
              </p>
              <p className="font-serif-cormorant text-lg sm:text-xl font-semibold text-sage-900 capitalize mt-0.5">
                {guestName}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
