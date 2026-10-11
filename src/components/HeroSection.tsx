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

      {/* 2. Architectural Arch Framing with Fine Art Stationery Feel */}
      <div className="relative w-full max-w-xs mx-auto border border-gold-300/60 outline outline-gold-200/50 outline-offset-3 rounded-4xl p-6 sm:p-7 bg-white/90 shadow-md backdrop-blur-xs">
        {/* Delicate Eyebrow Heading with Hairline Accents */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-5 h-px bg-gold-400/60" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gold-700 font-medium">
            The Wedding Celebration
          </span>
          <span className="w-5 h-px bg-gold-400/60" />
        </div>

        {/* Harmonious Couple Names Typography */}
        <h1 className="font-serif-cormorant text-4xl sm:text-[46px] font-normal text-sage-900 tracking-wide flex flex-col items-center leading-[1.1] my-1">
          <a
            href="#mempelai"
            className="hover:text-gold-600 transition-colors"
            aria-label="Profil Mempelai Fitri"
          >
            Fitri
          </a>
          <span className="font-serif italic text-2xl sm:text-3xl text-gold-600 my-1 leading-none select-none font-light">
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
        <BotanicalFlourishCrest className="my-2.5" />

        {/* Elegant Event Information Ribbon */}
        <div className="my-3 py-2.5 px-3 rounded-2xl bg-ivory-50/80 border border-gold-200/70 text-xs text-sage-800 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-medium tracking-wide text-xs text-sage-900">
            <Calendar className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>{weddingData.events.dateFormatted}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-sage-700 font-normal">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>{weddingData.events.akad.locationName}</span>
          </div>
        </div>

        {/* Personalized Guest Badge with Floral Accents (Letter Pass) */}
        {guestName && (
          <div className="pt-2 w-full mx-auto">
            <div className="relative px-5 py-3 rounded-2xl bg-linear-to-b from-white to-ivory-50/90 border border-gold-300/70 shadow-xs overflow-hidden">
              <FloralCardCorner position="top-right" size={34} className="absolute top-0 right-0 opacity-80" />
              <FloralCardCorner position="bottom-left" size={34} className="absolute bottom-0 left-0 opacity-80" />
              <p className="text-[9px] sm:text-[10px] text-gold-700 uppercase tracking-[0.25em] font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i
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
