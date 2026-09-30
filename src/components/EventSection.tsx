import React from "react";
import { weddingData } from "@/config/wedding-data";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { CountdownSection } from "./CountdownSection";
import { BotanicalDivider } from "./BotanicalDecor";

export function EventSection() {
  const { akad, resepsi } = weddingData.events;

  return (
    <section
      id="acara"
      aria-label="Jadwal Acara Pernikahan"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
          Rangkaian Acara
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-sage-900">
          Waktu &amp; Tempat
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#556858] max-w-lg mx-auto">
          Dengan penuh rasa syukur, kami mengundang kehadiran Bapak/Ibu/Saudara/i pada:
        </p>
      </div>

      {/* Countdown Timer */}
      <CountdownSection />

      {/* Two Event Cards: Akad & Resepsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10">
        {/* Akad Nikah */}
        <div className="relative bg-white/90 border border-ivory-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sage-50 text-sage-700 border border-sage-200">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Sakral
            </span>
          </div>

          <div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-4">
              {akad.title}
            </h3>

            <div className="space-y-3 text-sm text-sage-700 mb-6">
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

          <div className="pt-4 border-t border-ivory-200/80 text-xs text-[#556858] italic">
            {akad.notes}
          </div>
        </div>

        {/* Resepsi Pernikahan */}
        <div className="relative bg-white/90 border border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-50 text-gold-600 border border-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Syukuran
            </span>
          </div>

          <div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-4">
              {resepsi.title}
            </h3>

            <div className="space-y-3 text-sm text-sage-700 mb-6">
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
