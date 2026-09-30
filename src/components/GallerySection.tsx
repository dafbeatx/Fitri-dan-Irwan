"use client";

import React, { useState, useEffect, useCallback } from "react";
import { weddingData } from "@/config/wedding-data";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera } from "lucide-react";
import { BotanicalDivider } from "./BotanicalDecor";

export function GallerySection() {
  const { gallery } = weddingData;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseModal = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => ((prev ?? 0) + 1) % gallery.length);
    }
  }, [activePhotoIndex, gallery.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => ((prev ?? 0) - 1 + gallery.length) % gallery.length);
    }
  }, [activePhotoIndex, gallery.length]);

  // Keyboard navigation (R-32: Esc to close, Arrow keys to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleCloseModal, handleNext, handlePrev]);

  return (
    <section
      id="galeri"
      aria-label="Galeri Foto Kebersamaan"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold mb-2">
          <Camera className="w-4 h-4 text-[#C3A16A]" />
          <span>Momen Bahagia</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2D22]">
          Galeri Foto
        </h2>
        <p className="mt-3 text-sm text-[#556858] max-w-md mx-auto">
          Setiap gambar mengabadikan ketulusan dan kebahagiaan dalam perjalanan kami.
        </p>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {gallery.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => handleOpenModal(index)}
            aria-label={`Lihat foto: ${photo.caption || photo.alt}`}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE2D5] shadow-sm hover:shadow-md transition-all text-left focus-visible:ring-2 focus-visible:ring-[#C3A16A]"
          >
            {/* Visual Card / Placeholder */}
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FAF8F5] to-[#E6ECE7] text-[#4E6554] group-hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full border border-[#C3A16A]/50 bg-white/80 flex items-center justify-center mb-2 shadow-xs">
                <ImageIcon className="w-5 h-5 text-[#3F5244]" />
              </div>
              <span className="font-serif-cormorant text-base sm:text-lg font-medium text-[#1F2D22] text-center line-clamp-2">
                {photo.caption || photo.alt}
              </span>
              <span className="text-[11px] text-[#556858] mt-1 uppercase tracking-wider">
                Momen #{index + 1}
              </span>
            </div>

            <div className="absolute inset-0 bg-[#3F5244]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal (R-26, R-32) */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan Foto Penuh"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm"
        >
          {/* Close button (min-size 44x44px - R-03) */}
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Tutup tampilan foto"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 sm:left-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto berikutnya"
            className="absolute right-3 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-full aspect-[4/3] rounded-2xl bg-[#E6ECE7] border border-[#D0DDD2] flex flex-col items-center justify-center p-6 text-[#3F5244] mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#C3A16A] bg-white flex items-center justify-center mb-3">
                <Camera className="w-8 h-8 text-[#3F5244]" />
              </div>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#1F2D22]">
                {gallery[activePhotoIndex].caption}
              </h3>
              <p className="text-xs text-[#556858] mt-2">
                {gallery[activePhotoIndex].alt}
              </p>
            </div>

            <div className="flex items-center justify-between w-full text-xs text-[#556858] px-2">
              <span>Fitri &amp; Irwan</span>
              <span>
                {activePhotoIndex + 1} dari {gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
