"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold mb-2.5">
          <Camera className="w-4 h-4 text-gold-400" />
          <span>Momen Bahagia</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Galeri Foto
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#465A49] max-w-xs mx-auto leading-relaxed">
          Setiap gambar mengabadikan ketulusan dan kebahagiaan dalam perjalanan kami.
        </p>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {gallery.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => handleOpenModal(index)}
            aria-label={`Lihat foto: ${photo.caption || photo.alt}`}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-ivory-50 border border-ivory-200 shadow-sm hover:shadow-md transition-all text-left focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {/* Visual Card / Image */}
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={360}
                height={360}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-linear-to-b from-ivory-50 to-sage-100 text-sage-600 group-hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full border border-gold-400/50 bg-white/80 flex items-center justify-center mb-2 shadow-xs">
                  <ImageIcon className="w-5 h-5 text-sage-700" />
                </div>
                <span className="font-serif-cormorant text-base sm:text-lg font-medium text-sage-900 text-center line-clamp-2">
                  {photo.caption || photo.alt}
                </span>
                <span className="text-[11px] text-[#556858] mt-1 uppercase tracking-wider">
                  Momen #{index + 1}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-sage-700/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-11 min-w-11 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 sm:left-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-11 min-w-11 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto berikutnya"
            className="absolute right-3 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors min-h-11 min-w-11 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-full max-h-[60vh] rounded-2xl bg-sage-50 border border-sage-200 overflow-hidden flex items-center justify-center mb-4 relative aspect-4/3 sm:aspect-16/10">
              {gallery[activePhotoIndex].src ? (
                <Image
                  src={gallery[activePhotoIndex].src}
                  alt={gallery[activePhotoIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <div className="p-8 flex flex-col items-center text-sage-700">
                  <Camera className="w-12 h-12 mb-3 text-gold-500" />
                  <p className="font-serif-cormorant text-xl text-sage-900">{gallery[activePhotoIndex].caption}</p>
                </div>
              )}
            </div>
            <h3 className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-sage-900">
              {gallery[activePhotoIndex].caption}
            </h3>
            <p className="text-xs text-[#556858] mt-1 mb-2">
              {gallery[activePhotoIndex].alt}
            </p>

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
