import React from "react";
import { Heart } from "lucide-react";
import { BotanicalLeafCorner } from "./BotanicalDecor";

export function ClosingSection() {
  return (
    <footer
      aria-label="Penutup dan Doa Restu"
      className="relative pt-16 pb-28 px-4 sm:px-6 text-center bg-[#FAF8F5] overflow-hidden"
    >
      <BotanicalLeafCorner position="top-left" className="absolute top-2 left-2 text-[#4E6554]/20" />
      <BotanicalLeafCorner position="top-right" className="absolute top-2 right-2 text-[#4E6554]/20" />

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#E6ECE7] text-[#3F5244] flex items-center justify-center">
          <Heart className="w-5 h-5 text-[#3F5244] fill-current" />
        </div>

        <h2 className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F2D22]">
          Terima Kasih
        </h2>

        <p className="text-sm text-[#556858] leading-relaxed">
          Ungkapan terima kasih yang tulus dari lubuk hati kami yang terdalam atas kehadiran, doa restu, serta kehangatan yang Bapak/Ibu/Saudara/i berikan kepada kami.
        </p>

        <p className="font-arabic-verse text-lg sm:text-xl text-[#3F5244] py-2">
          جَزَاكُمُ اللَّهُ خَيْرًا كَثِيرًا
        </p>

        <div className="pt-6">
          <p className="text-xs uppercase tracking-widest text-[#99753F] font-semibold mb-2">
            Kami yang Berbahagia
          </p>
          <p className="font-serif-cormorant text-3xl sm:text-4xl font-semibold text-[#1F2D22]">
            Fitri &amp; Irwan
          </p>
          <p className="text-xs text-[#556858] mt-2">
            Beserta segenap keluarga besar kedua mempelai
          </p>
        </div>

        <div className="pt-8 border-t border-[#EAE2D5] text-[11px] text-[#556858]">
          <p>Undangan Pernikahan Digital Fitriani &amp; Irwan</p>
          <p className="mt-1">Dibuat dengan cinta, doa, dan rasa syukur</p>
        </div>
      </div>
    </footer>
  );
}
