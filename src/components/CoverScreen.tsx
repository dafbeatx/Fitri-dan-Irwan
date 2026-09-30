"use client";

import React from "react";
import { MailOpen, Calendar } from "lucide-react";
import { BotanicalLeafCorner } from "./BotanicalDecor";

interface CoverScreenProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName: string;
}

export function CoverScreen({ isOpen, onOpen, guestName }: CoverScreenProps) {
  if (isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sampul Undangan Pernikahan Fitri dan Irwan"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5] p-4 sm:p-6 overflow-hidden transition-all duration-700"
    >
      {/* Decorative Botanical Corners */}
      <BotanicalLeafCorner position="top-left" className="absolute top-2 left-2 text-[#4E6554]/30" />
      <BotanicalLeafCorner position="top-right" className="absolute top-2 right-2 text-[#4E6554]/30" />
      <BotanicalLeafCorner position="bottom-left" className="absolute bottom-2 left-2 text-[#4E6554]/30" />
      <BotanicalLeafCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#4E6554]/30" />

      {/* Main Envelope Card */}
      <div className="relative w-full max-w-lg mx-auto bg-white/90 border border-[#C3A16A]/40 rounded-2xl p-6 sm:p-10 text-center shadow-xl backdrop-blur-sm">
        {/* Monogram Seal */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-full border-2 border-[#C3A16A] bg-[#FAF8F5] flex items-center justify-center shadow-sm">
          <span className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#3F5244] tracking-wider">
            F & I
          </span>
        </div>

        {/* Invitation Heading */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#556858] font-medium mb-2">
          Walimatul &apos;Ursy
        </p>

        <h1 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2D22] mb-3 tracking-wide">
          Fitri &amp; Irwan
        </h1>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#4E6554] font-medium mb-6">
          <Calendar className="w-4 h-4 text-[#C3A16A]" />
          <span>Sabtu, 12 Desember 2026</span>
        </div>

        {/* Recipient Details */}
        <div className="my-6 py-4 px-5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D5]">
          <p className="text-xs text-[#556858] mb-1 font-normal">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-[#1F2D22] capitalize">
            {guestName || "Tamu Undangan"}
          </p>
          <p className="text-[11px] text-[#556858] mt-1 italic">
            Mohon maaf bila ada kesalahan dalam penulisan nama atau gelar
          </p>
        </div>

        {/* Action Button (R-03: min-h 44px, clear active states) */}
        <button
          onClick={onOpen}
          type="button"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3F5244] text-[#FAF8F5] font-medium text-sm tracking-wide shadow-md hover:bg-[#324236] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#C3A16A] min-h-[44px]"
        >
          <MailOpen className="w-4 h-4 text-[#F3EBD8]" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  );
}
