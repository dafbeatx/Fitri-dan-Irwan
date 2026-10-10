import React from "react";
import { weddingData } from "@/config/wedding-data";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { CountdownSection } from "./CountdownSection";
import { BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

export function EventSection() {
  const { akad, resepsi } = weddingData.events;

  return (
    <section
      id="acara"
      aria-label="Jadwal Acara Pernikahan"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold block mb-2.5">
          Rangkaian Acara
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Waktu &amp; Tempat
        </h2>
        <BotanicalFlourishCrest className="my-2" />
        <p className="mt-2 text-xs sm:text-sm text-[#465A49] max-w-xs mx-auto leading-relaxed">
          {weddingData.events.invitationIntro}
        </p>
      </div>

      {/* Centerpiece Date Badge (23 OKT 2026) */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex flex-col items-center justify-center px-6 py-2.5 rounded-2xl bg-white border border-gold-300 shadow-xs">
          <span className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-sage-900 leading-none">
            23
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold-600 mt-1">
            OKT 2026
          </span>
        </div>
      </div>

      {/* Countdown Timer */}
      <CountdownSection />

      {/* Two Event Cards: Akad & Resepsi */}
      <div className="flex flex-col gap-6 mt-8 w-full">
        {/* Akad Nikah */}
        <div className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden">
          <FloralCardCorner position="bottom-right" size={48} className="absolute bottom-0 right-0" />
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 leading-tight">
                {akad.title}
              </h3>
              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sage-50 text-sage-700 border border-sage-200">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Sakral
              </span>
            </div>

            <div className="space-y-3 text-sm text-sage-700 mb-6 relative z-10">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{akad.day}, {akad.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{akad.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{akad.locationName}</p>
                  <p className="text-xs text-[#556858] mt-0.5 leading-relaxed">{akad.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-200/80 text-xs text-[#556858] italic relative z-10">
            {akad.notes}
          </div>
        </div>

        {/* Resepsi Pernikahan */}
        <div className="relative w-full bg-white/95 border border-gold-400/60 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden">
          <FloralCardCorner position="bottom-right" size={48} className="absolute bottom-0 right-0" />
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 leading-tight">
                {resepsi.title}
              </h3>
              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-50 text-gold-600 border border-gold-300">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Syukuran
              </span>
            </div>

            <div className="space-y-3 text-sm text-sage-700 mb-6 relative z-10">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{resepsi.day}, {resepsi.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{resepsi.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sage-900">{resepsi.locationName}</p>
                  <p className="text-xs text-[#556858] mt-0.5 leading-relaxed">{resepsi.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-200/80 text-xs text-[#556858] italic">
            {resepsi.notes}
          </div>
        </div>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
