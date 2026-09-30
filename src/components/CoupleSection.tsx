import React from "react";
import { weddingData } from "@/config/wedding-data";
import { Heart } from "lucide-react";
import { BotanicalDivider } from "./BotanicalDecor";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <section
      id="mempelai"
      aria-label="Profil Pasangan Mempelai"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center"
    >
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold block mb-2">
          Pasangan Mempelai
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-sage-900">
          Fitri &amp; Irwan
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#556858] max-w-xl mx-auto leading-relaxed">
          Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud
          menyelenggarakan syukuran pernikahan putra-putri kami tercinta:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Mempelai Wanita (Fitri) */}
        <div className="bg-white/90 border border-ivory-200 rounded-3xl p-8 shadow-sm flex flex-col items-center">
          {/* Avatar frame */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-gold-400 p-1.5 bg-ivory-50 shadow-inner">
              <div className="w-full h-full rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
                <span className="font-serif-cormorant text-4xl sm:text-5xl font-semibold">F</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-sage-700 text-ivory-50 shadow-md">
              <Heart className="w-4 h-4 text-gold-100 fill-current" />
            </div>
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-1">
            {bride.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-gold-600 font-medium tracking-wide mb-3">
            {bride.role}
          </p>
          <p className="text-sm text-[#556858] leading-relaxed max-w-xs mb-4">
            {bride.parents}
          </p>

          <a
            href={`https://instagram.com/${bride.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Kunjungi Instagram ${bride.shortName}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200 hover:bg-sage-100 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 min-h-11"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@{bride.instagram}</span>
          </a>
        </div>

        {/* Mempelai Pria (Irwan) */}
        <div className="bg-white/90 border border-ivory-200 rounded-3xl p-8 shadow-sm flex flex-col items-center">
          {/* Avatar frame */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-gold-400 p-1.5 bg-ivory-50 shadow-inner">
              <div className="w-full h-full rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
                <span className="font-serif-cormorant text-4xl sm:text-5xl font-semibold">I</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-sage-700 text-ivory-50 shadow-md">
              <Heart className="w-4 h-4 text-gold-100 fill-current" />
            </div>
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-1">
            {groom.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-gold-600 font-medium tracking-wide mb-3">
            {groom.role}
          </p>
          <p className="text-sm text-[#556858] leading-relaxed max-w-xs mb-4">
            {groom.parents}
          </p>

          <a
            href={`https://instagram.com/${groom.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Kunjungi Instagram ${groom.shortName}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200 hover:bg-sage-100 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 min-h-11"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@{groom.instagram}</span>
          </a>
        </div>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
