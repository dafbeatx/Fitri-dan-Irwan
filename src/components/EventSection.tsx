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
        <span className="text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold block mb-2">
          Rangkaian Acara
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2D22]">
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
        <div className="relative bg-white/90 border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4F6F4] text-[#3F5244] border border-[#D0DDD2]">
              <Sparkles className="w-3.5 h-3.5 text-[#C3A16A]" />
              Sakral
            </span>
          </div>

          <div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#1F2D22] mb-4">
              {akad.title}
            </h3>

            <div className="space-y-3 text-sm text-[#3F5244] mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{akad.day}, {akad.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{akad.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{akad.locationName}</p>
                  <p className="text-xs text-[#556858] mt-0.5 leading-relaxed">{akad.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE2D5]/80 text-xs text-[#556858] italic">
            {akad.notes}
          </div>
        </div>

        {/* Resepsi Pernikahan */}
        <div className="relative bg-white/90 border border-[#C3A16A]/40 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF6ED] text-[#99753F] border border-[#D8BD8C]">
              <Sparkles className="w-3.5 h-3.5 text-[#C3A16A]" />
              Syukuran
            </span>
          </div>

          <div>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#1F2D22] mb-4">
              {resepsi.title}
            </h3>

            <div className="space-y-3 text-sm text-[#3F5244] mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{resepsi.day}, {resepsi.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{resepsi.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C3A16A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1F2D22]">{resepsi.locationName}</p>
                  <p className="text-xs text-[#556858] mt-0.5 leading-relaxed">{resepsi.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE2D5]/80 text-xs text-[#556858] italic">
            {resepsi.notes}
          </div>
        </div>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
