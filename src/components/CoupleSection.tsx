import Image from "next/image";
import { weddingData } from "@/config/wedding-data";
import { Heart } from "lucide-react";
import { BotanicalDivider, BotanicalFlourishCrest, FloralGarlandWreath, FloralCardCorner } from "./BotanicalDecor";

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <section
      id="mempelai"
      aria-label="Profil Pasangan Mempelai"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto text-center"
    >
      <div className="mb-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold block mb-2.5">
          Pasangan Mempelai
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wider flex flex-col items-center leading-none">
          <span>Fitri</span>
          <span className="text-xl sm:text-2xl text-gold-600 font-light italic my-1 leading-none">&amp;</span>
          <span>Irwan</span>
        </h2>

        {/* Botanical Flourish Crest */}
        <BotanicalFlourishCrest className="my-2" />

        <div className="mt-3 max-w-xs mx-auto space-y-1.5 text-xs sm:text-sm text-[#465A49] leading-relaxed">
          <p>
            Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan.
          </p>
          <p className="text-[11px] sm:text-xs text-[#556858]">
            Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan diantara putra-putri kami :
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-7 items-center w-full">
        {/* Mempelai Wanita (Fitri Ani Rahayu, S.Mat) */}
        <div className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col items-center overflow-hidden">
          <FloralCardCorner position="top-right" size={42} className="absolute top-0 right-0" />
          <FloralCardCorner position="bottom-left" size={42} className="absolute bottom-0 left-0" />

          {/* Avatar frame wrapped in bespoke Botanical Garland Wreath */}
          <div className="relative my-3 flex items-center justify-center">
            <FloralGarlandWreath size={152} className="absolute -top-3.5 -left-3.5 z-10" />
            <div className="w-28 h-28 rounded-full border-2 border-gold-400/80 p-1 bg-ivory-50 shadow-inner overflow-hidden relative z-5">
              {bride.avatar ? (
                <Image
                  src={bride.avatar}
                  alt={bride.fullName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
                  <span className="font-serif-cormorant text-4xl sm:text-5xl font-semibold">F</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-sage-700 text-ivory-50 shadow-md z-20">
              <Heart className="w-3.5 h-3.5 text-gold-100 fill-current" />
            </div>
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-1 relative z-10 tracking-wide">
            {bride.fullName}
          </h3>
          <p className="text-[11px] sm:text-xs text-gold-600 font-semibold tracking-[0.25em] uppercase mb-2.5 relative z-10">
            {bride.role}
          </p>
          <p className="text-xs sm:text-sm text-[#465A49] font-normal leading-relaxed max-w-xs relative z-10">
            {bride.parents}
          </p>
          {bride.parentOrigin && (
            <p className="text-[11px] sm:text-xs text-[#556858] mt-1.5 italic max-w-xs leading-normal relative z-10">
              ({bride.parentOrigin})
            </p>
          )}
        </div>

        {/* Mempelai Pria (Irwan Supriatna) */}
        <div className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col items-center overflow-hidden">
          <FloralCardCorner position="top-right" size={42} className="absolute top-0 right-0" />
          <FloralCardCorner position="bottom-left" size={42} className="absolute bottom-0 left-0" />

          {/* Avatar frame wrapped in bespoke Botanical Garland Wreath */}
          <div className="relative my-3 flex items-center justify-center">
            <FloralGarlandWreath size={152} className="absolute -top-3.5 -left-3.5 z-10" />
            <div className="w-28 h-28 rounded-full border-2 border-gold-400/80 p-1 bg-ivory-50 shadow-inner overflow-hidden relative z-5">
              {groom.avatar ? (
                <Image
                  src={groom.avatar}
                  alt={groom.fullName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
                  <span className="font-serif-cormorant text-4xl sm:text-5xl font-semibold">I</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-sage-700 text-ivory-50 shadow-md z-20">
              <Heart className="w-3.5 h-3.5 text-gold-100 fill-current" />
            </div>
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-sage-900 mb-1 relative z-10 tracking-wide">
            {groom.fullName}
          </h3>
          <p className="text-[11px] sm:text-xs text-gold-600 font-semibold tracking-[0.25em] uppercase mb-2.5 relative z-10">
            {groom.role}
          </p>
          <p className="text-xs sm:text-sm text-[#465A49] font-normal leading-relaxed max-w-xs relative z-10">
            {groom.parents}
          </p>
          {groom.parentOrigin && (
            <p className="text-[11px] sm:text-xs text-[#556858] mt-1.5 italic max-w-xs leading-normal relative z-10">
              ({groom.parentOrigin})
            </p>
          )}
        </div>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
