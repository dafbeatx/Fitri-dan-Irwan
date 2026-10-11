"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Users,
  UserPlus,
  Send,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  HelpCircle,
} from "lucide-react";

const TOUR_STORAGE_KEY = "fitri_irwan_guest_tour_seen";

export interface TourStep {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  badgeText: string;
  targetId?: string;
  tip?: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    title: "Selamat Datang di Manajemen Tamu",
    subtitle: "Pusat Kendali Undangan Digital Fitri & Irwan",
    description:
      "Halaman ini dirancang khusus untuk mempermudah Anda mengelola daftar tamu, mengelompokkan kategori (VIP, Keluarga, Teman), dan mengirimkan undangan personal langsung ke WhatsApp.",
    icon: Sparkles,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    badgeText: "Panduan Cepat",
    tip: "Tur ini hanya muncul 1 kali secara otomatis. Anda dapat membukanya kembali kapan saja melalui tombol bantuan.",
  },
  {
    title: "Statistik & Progres Pengiriman",
    subtitle: "Pantau Status Undangan Secara Real-Time",
    description:
      "Kartu di bagian atas menampilkan progres persentase undangan yang sudah dikirim vs belum dikirim. Data tersimpan otomatis di browser lokal Anda dan tersinkronisasi ke Cloud Supabase.",
    icon: Users,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    badgeText: "Langkah 1",
    targetId: "stats-card",
    tip: "Gunakan tombol Sinkronisasi untuk menyegarkan data tamu dengan database cloud.",
  },
  {
    title: "Tambah Tamu: Satu atau Masal",
    subtitle: "Input Cepat Tanpa Ribet",
    description:
      "Gunakan tab 'Satu Tamu' untuk input nama spesifik beserta nomor WhatsApp. Atau gunakan tab 'Masal' untuk menyalin puluhan nama sekaligus (satu baris per nama tamu).",
    icon: UserPlus,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/15 border-sky-500/30",
    badgeText: "Langkah 2",
    targetId: "input-card",
    tip: "Pilih kategori yang sesuai (VIP, Keluarga, Teman, Rekan) agar template sapaan otomatis menyesuaikan.",
  },
  {
    title: "Kustomisasi Kata-Kata WhatsApp",
    subtitle: "Pesan Sopan Berjenjang Sesuai Kategori",
    description:
      "Di bilah navigasi atas terdapat tombol 'Kata-Kata WA'. Anda bisa mengubah redaksi pesan undangan WhatsApp untuk VIP (formal santun), Keluarga (hangat), maupun Teman (akrab).",
    icon: FileText,
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    badgeText: "Langkah 3",
    tip: "Teks [nama] dan [link] pada template akan digantikan otomatis dengan nama tamu dan tautan personalnya.",
  },
  {
    title: "Kirim Undangan 1-Klik ke WhatsApp",
    subtitle: "Tautan Personal yang Rapi & Indah",
    description:
      "Pada setiap kartu tamu di daftar, tekan tombol 'Kirim WA' untuk membuka obrolan WhatsApp dengan pesan undangan yang sudah terisi lengkap. Anda juga bisa menyalin tautan personal atau menandai status selesai kirim.",
    icon: Send,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    badgeText: "Langkah 4",
    tip: "Centang tanda selesai kirim agar kartu berpindah status menjadi 'Terkirim' pada statistik.",
  },
];

interface GuestManagementTourProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function GuestManagementTour({ forceOpen, onClose }: GuestManagementTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Sinkronisasi forceOpen saat dipicu secara manual oleh admin
  useEffect(() => {
    if (forceOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setCurrentStep(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  // Periksa status tur pada pertama kali load halaman (hanya 1x jika belum pernah dilihat)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const hasSeenTour = localStorage.getItem(TOUR_STORAGE_KEY);
      if (!hasSeenTour) {
        // Beri delay halus agar halaman selesai merender konten utama
        const timer = setTimeout(() => {
          setIsOpen(true);
          setCurrentStep(0);
        }, 650);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage tidak tersedia (private mode dll)
    }
  }, []);

  const handleFinishTour = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    if (onClose) onClose();
  }, [onClose]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinishTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinishTour();
      } else if (e.key === "ArrowRight") {
        if (currentStep < TOUR_STEPS.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          handleFinishTour();
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, handleFinishTour]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const IconComponent = step.icon;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panduan Tur Manajemen Tamu Undangan"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#151824] border-2 border-[#2D3348] rounded-3xl p-5 sm:p-6 shadow-2xl text-neutral-200 overflow-hidden">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-emerald-400 to-amber-500" />

        {/* Close / Skip button */}
        <button
          type="button"
          onClick={handleFinishTour}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-[#202536] transition-colors cursor-pointer"
          title="Tutup panduan tur"
          aria-label="Tutup panduan tur"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step Indicator & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4 pr-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2130] border border-[#30374C] text-[11px] font-semibold text-amber-300">
            <span>{step.badgeText}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400 font-normal">
              {currentStep + 1} dari {TOUR_STEPS.length}
            </span>
          </span>

          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentStep
                    ? "w-6 bg-amber-400"
                    : "w-2 bg-[#2D3348] hover:bg-neutral-500"
                }`}
                title={`Lompat ke langkah ${idx + 1}`}
                aria-label={`Lompat ke langkah ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-3.5 pt-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${step.iconBg}`}
            >
              <IconComponent className={`w-6 h-6 ${step.iconColor}`} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {step.title}
              </h2>
              <p className="text-xs text-amber-300/80 font-medium mt-0.5">
                {step.subtitle}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {step.description}
          </p>

          {/* Pro Tip Box */}
          {step.tip && (
            <div className="p-3 rounded-2xl bg-[#1C2130]/90 border border-[#2D354A] flex items-start gap-2 text-xs text-neutral-300">
              <span className="text-amber-400 font-bold shrink-0">💡 Tips:</span>
              <span className="leading-snug">{step.tip}</span>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between gap-2.5 pt-5 mt-4 border-t border-[#232738]">
          <button
            type="button"
            onClick={handleFinishTour}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-2 px-3 rounded-xl hover:bg-[#1E2230]"
          >
            Lewati Tur
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="py-2 px-3 rounded-xl bg-[#1E2230] hover:bg-[#282C3D] text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-[#2D3348] transition-all cursor-pointer min-h-9"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-9 shadow-md ${
                isLastStep
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40"
                  : "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-950/40"
              }`}
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai &amp; Mulai</span>
                </>
              ) : (
                <>
                  <span>Lanjut</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tombol peluncur manual untuk diletakkan di header halaman
export function TourLauncherButton({ onLaunch }: { onLaunch: () => void }) {
  return (
    <button
      type="button"
      onClick={onLaunch}
      className="p-2 rounded-xl bg-[#1E212B] hover:bg-[#282C3A] text-amber-300 text-xs font-semibold flex items-center gap-1 border border-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-10 min-w-10 justify-center"
      title="Buka kembali Panduan Tur Manajemen Tamu"
      aria-label="Panduan Tur"
    >
      <HelpCircle className="w-4 h-4 text-amber-400" />
      <span className="hidden lg:inline text-xs">Panduan Tur</span>
    </button>
  );
}
