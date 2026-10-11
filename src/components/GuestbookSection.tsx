/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { getGuestbookEntries, addGuestbookEntry } from "@/lib/supabase";
import { GuestbookEntry, AttendanceStatus } from "@/types/wedding";
import {
  MessageSquareHeart,
  Send,
  Loader2,
  Sparkles,
  Check,
  Camera,
  X,
  Maximize2,
  Crown,
  Heart,
  Briefcase,
  GraduationCap,
  Home,
  UserCheck,
  RotateCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

interface GuestbookSectionProps {
  initialGuestName?: string;
}

// Konfigurasi Avatar Emoji & Badge Khusus untuk Setiap Kategori Relasi
export interface GuestCategoryMeta {
  key: string;
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  textColor: string;
  badgeBg: string;
  badgeBorder: string;
  avatarBg: string;
}

export function getCategoryMeta(relationship: string): GuestCategoryMeta {
  const rel = (relationship || "").toLowerCase();

  if (rel.includes("vip")) {
    return {
      key: "vip",
      label: "VIP",
      emoji: "👑",
      icon: Crown,
      textColor: "text-amber-900",
      badgeBg: "bg-amber-100/90",
      badgeBorder: "border-amber-300",
      avatarBg: "bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 text-amber-900 border-amber-300",
    };
  }

  if (rel.includes("keluarga")) {
    return {
      key: "keluarga",
      label: "Keluarga",
      emoji: "🤍",
      icon: Heart,
      textColor: "text-rose-800",
      badgeBg: "bg-rose-50/90",
      badgeBorder: "border-rose-200",
      avatarBg: "bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 text-rose-800 border-rose-200",
    };
  }

  if (rel.includes("sahabat")) {
    return {
      key: "sahabat",
      label: "Sahabat",
      emoji: "✨",
      icon: Sparkles,
      textColor: "text-emerald-800",
      badgeBg: "bg-emerald-50/90",
      badgeBorder: "border-emerald-200",
      avatarBg: "bg-gradient-to-br from-emerald-100 via-teal-200 to-sage-200 text-emerald-800 border-emerald-200",
    };
  }

  if (rel.includes("kerja") || rel.includes("kantor") || rel.includes("rekan")) {
    return {
      key: "kerja",
      label: "Rekan Kerja",
      emoji: "💼",
      icon: Briefcase,
      textColor: "text-slate-800",
      badgeBg: "bg-slate-50/90",
      badgeBorder: "border-slate-200",
      avatarBg: "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 border-slate-200",
    };
  }

  if (rel.includes("sekolah") || rel.includes("kuliah") || rel.includes("alumni")) {
    return {
      key: "alumni",
      label: "Alumni / Teman",
      emoji: "🎓",
      icon: GraduationCap,
      textColor: "text-sky-800",
      badgeBg: "bg-sky-50/90",
      badgeBorder: "border-sky-200",
      avatarBg: "bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 text-sky-800 border-sky-200",
    };
  }

  if (rel.includes("tetangga")) {
    return {
      key: "tetangga",
      label: "Tetangga",
      emoji: "🕊️",
      icon: Home,
      textColor: "text-teal-800",
      badgeBg: "bg-teal-50/90",
      badgeBorder: "border-teal-200",
      avatarBg: "bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 text-teal-800 border-teal-200",
    };
  }

  return {
    key: "umum",
    label: "Tamu Undangan",
    emoji: "🌿",
    icon: UserCheck,
    textColor: "text-sage-800",
    badgeBg: "bg-sage-50/90",
    badgeBorder: "border-sage-200",
    avatarBg: "bg-gradient-to-br from-sage-100 via-sage-200 to-sage-300 text-sage-800 border-sage-200",
  };
}

// Kompresi foto sisi klien (Canvas): resize ke maks 450px, kualitas 0.65 WebP/JPEG
// Menghasilkan ukuran mini (< 35 KB) agar sangat hemat kuota egress, log ingestion, dan database
async function compressPhotoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File yang dipilih harus berupa gambar (JPG, PNG, atau WebP)."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file foto."));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Gagal memproses gambar."));
      img.onload = () => {
        const MAX_DIMENSION = 450;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas tidak didukung pada browser Anda."));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL("image/webp", 0.65);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", 0.65);
        }

        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function GuestbookSection({ initialGuestName = "" }: GuestbookSectionProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [name, setName] = useState(initialGuestName);
  const [relationship, setRelationship] = useState("VIP (Tamu Kehormatan)");
  const [attendance, setAttendance] = useState<AttendanceStatus>("hadir");
  const [message, setMessage] = useState("");

  // Foto State (Hemat Egress & Ringan DB)
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filter Kategori State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const refreshEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getGuestbookEntries();
      setEntries(res.data);
    } catch {
      setErrorMessage("Gagal memuat ucapan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getGuestbookEntries()
      .then((res) => {
        if (isMounted) {
          setEntries(res.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setErrorMessage("Gagal memuat ucapan.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressingPhoto(true);
    setPhotoUploadError(null);

    try {
      const compressedDataUrl = await compressPhotoFile(file);
      setPhotoDataUrl(compressedDataUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengompresi foto.";
      setPhotoUploadError(msg);
      setPhotoDataUrl(null);
    } finally {
      setIsCompressingPhoto(false);
      // Reset input value agar dapat memilih file yang sama jika dihapus lalu dipilih lagi
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = () => {
    setPhotoDataUrl(null);
    setPhotoUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage("Nama dan ucapan doa wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await addGuestbookEntry({
        name: name.trim(),
        relationship,
        attendance,
        message: message.trim(),
        photo_url: photoDataUrl || undefined,
      });

      if (res.success) {
        setEntries((prev) => [res.entry, ...prev]);
        setMessage("");
        setPhotoDataUrl(null);
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 4000);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#3F5244", "#C3A16A", "#FAF8F5"],
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage("Gagal mengirim ucapan. Silakan coba lagi.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <section
      aria-label="Buku Tamu dan Doa Restu"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold mb-2.5">
          <MessageSquareHeart className="w-4 h-4 text-gold-400" />
          <span>Buku Tamu</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Ucapan &amp; Doa Restu
        </h2>
        <BotanicalFlourishCrest className="my-2" />
        <p className="mt-2 text-xs sm:text-sm text-[#465A49] max-w-xs mx-auto leading-relaxed">
          Tuliskan doa tulus dan harapan terbaik Anda untuk mengiringi langkah baru kami.
        </p>
      </div>

      <div className="flex flex-col gap-6 items-stretch w-full">
        {/* Form Column */}
        <div className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden">
          <FloralCardCorner position="top-right" size={38} className="absolute top-0 right-0" />
          <FloralCardCorner position="bottom-left" size={38} className="absolute bottom-0 left-0" />
          <h3 className="font-serif-cormorant text-xl font-semibold text-sage-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            Kirim Doa Restu
          </h3>

          {errorMessage && (
            <div
              role="alert"
              className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs"
            >
              {errorMessage}
            </div>
          )}

          {successToast && (
            <div
              role="status"
              className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Jazakumullah khairan! Doa Anda telah tersimpan.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="guest-name" className="block text-xs font-semibold text-sage-900 mb-1">
                Nama Anda <span className="text-red-500">*</span>
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap atau panggilan"
                className="input-wedding"
              />
            </div>

            <div>
              <label htmlFor="guest-rel" className="block text-xs font-semibold text-sage-900 mb-1">
                Hubungan / Relasi
              </label>
              <select
                id="guest-rel"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="input-wedding"
              >
                <option value="VIP (Tamu Kehormatan)">👑 VIP (Tamu Kehormatan)</option>
                <option value="Keluarga">🤍 Keluarga</option>
                <option value="Sahabat">✨ Sahabat</option>
                <option value="Teman Kerja">💼 Teman Kerja</option>
                <option value="Teman Sekolah / Kuliah">🎓 Teman Sekolah / Kuliah</option>
                <option value="Tetangga">🕊️ Tetangga</option>
                <option value="Tamu Undangan">🌿 Tamu Undangan</option>
              </select>

              {/* Pratinjau Avatar Emoji Bawaan */}
              {(() => {
                const meta = getCategoryMeta(relationship);
                const CategoryIcon = meta.icon;
                return (
                  <div className="mt-1.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-ivory-50/80 border border-ivory-200/80 text-[11px] text-sage-700">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-2xs ${meta.avatarBg}`}>
                        {meta.emoji}
                      </div>
                      <span>
                        Avatar bawaan: <strong className={meta.textColor}>{meta.emoji} {meta.label}</strong>
                      </span>
                    </div>
                    <span className="text-[10px] text-sage-500 flex items-center gap-1 font-medium">
                      <CategoryIcon className="w-3 h-3 text-gold-600" />
                      Otomatis
                    </span>
                  </div>
                );
              })()}
            </div>

            <div>
              <label htmlFor="guest-attendance" className="block text-xs font-semibold text-sage-900 mb-1">
                Kehadiran
              </label>
              <select
                id="guest-attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as AttendanceStatus)}
                className="input-wedding"
              >
                <option value="hadir">Berencana Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak_hadir">Berhalangan Hadir</option>
              </select>
            </div>

            <div>
              <label htmlFor="guest-msg" className="block text-xs font-semibold text-sage-900 mb-1">
                Ucapan &amp; Doa <span className="text-red-500">*</span>
              </label>
              <textarea
                id="guest-msg"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa tulus untuk Fitri dan Irwan..."
                className="input-wedding"
              />
            </div>

            {/* Lampiran Foto (Dioptimalkan Otomatis) */}
            <div>
              <label htmlFor="guest-photo-input" className="flex items-center gap-1.5 text-xs font-semibold text-sage-900 mb-1.5">
                <Camera className="w-3.5 h-3.5 text-gold-600" />
                <span>Foto Bersama / Swafoto</span>
                <span className="text-[10px] font-normal text-sage-500">(Opsional)</span>
              </label>

              <input
                ref={fileInputRef}
                id="guest-photo-input"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handlePhotoSelect}
                disabled={isSubmitting || isCompressingPhoto}
              />

              {photoUploadError && (
                <p className="text-[11px] text-red-600 mb-2">{photoUploadError}</p>
              )}

              {!photoDataUrl ? (
                <label
                  htmlFor="guest-photo-input"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-dashed border-gold-300 hover:border-gold-500 bg-gold-50/30 hover:bg-gold-50/60 text-sage-800 text-xs font-medium cursor-pointer transition-all min-h-11 active:scale-[0.99] ${
                    isCompressingPhoto ? "opacity-75 cursor-wait" : ""
                  }`}
                >
                  {isCompressingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-600" />
                      <span>Mengompresi foto otomatis...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 text-gold-600" />
                      <span>Lampirkan Foto Kenangan</span>
                    </>
                  )}
                </label>
              ) : (
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-sage-50/80 border border-sage-200">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold-300 shadow-2xs shrink-0 bg-white">
                    <img
                      src={photoDataUrl}
                      alt="Pratinjau foto ucapan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-xs font-semibold text-sage-900">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Foto siap dikirim</span>
                    </div>
                    <p className="text-[11px] text-sage-600 mt-0.5">
                      Foto otomatis dioptimalkan agar ringan &amp; cepat
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-xl text-sage-500 hover:text-red-600 hover:bg-red-50/80 transition-colors min-w-11 min-h-11 flex items-center justify-center cursor-pointer"
                    title="Hapus foto"
                    aria-label="Hapus foto terpilih"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isCompressingPhoto}
              className="btn-press w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-sage-700 text-ivory-50 font-medium text-xs sm:text-sm tracking-wide shadow-sm hover:bg-sage-800 active:scale-95 transition-all disabled:opacity-70 min-h-11 focus-visible:ring-2 focus-visible:ring-gold-400 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-100" />
                  <span>Mengirim Doa...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-gold-100" />
                  <span>Kirim Ucapan &amp; Doa</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List Column (R-27: Loading, Empty, and Populated States) */}
        <div className="w-full bg-white/90 border border-ivory-200 rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-ivory-200">
            <div>
              <h3 className="font-serif-cormorant text-xl font-semibold text-sage-900">
                Untaian Doa
              </h3>
              <p className="text-[11px] text-sage-500">
                {entries.length > 0 ? `${entries.length} doa restu tersimpan` : "Buku tamu doa restu"}
              </p>
            </div>
            <button
              type="button"
              onClick={refreshEntries}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory-100 hover:bg-ivory-200/80 text-xs text-sage-700 font-medium transition-colors cursor-pointer"
              title="Segarkan daftar doa"
            >
              <RotateCw className="w-3.5 h-3.5 text-sage-600" />
              <span>Segarkan</span>
            </button>
          </div>

          {/* Filter Kategori Tab */}
          {entries.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 scrollbar-none text-xs">
              {[
                { key: "all", label: "Semua", emoji: "💌", count: entries.length },
                {
                  key: "vip",
                  label: "VIP",
                  emoji: "👑",
                  count: entries.filter((e) => getCategoryMeta(e.relationship).key === "vip").length,
                },
                {
                  key: "keluarga",
                  label: "Keluarga",
                  emoji: "🤍",
                  count: entries.filter((e) => getCategoryMeta(e.relationship).key === "keluarga").length,
                },
                {
                  key: "sahabat",
                  label: "Sahabat",
                  emoji: "✨",
                  count: entries.filter((e) => getCategoryMeta(e.relationship).key === "sahabat").length,
                },
                {
                  key: "lainnya",
                  label: "Lainnya",
                  emoji: "🌿",
                  count: entries.filter(
                    (e) => !["vip", "keluarga", "sahabat"].includes(getCategoryMeta(e.relationship).key)
                  ).length,
                },
              ]
                .filter((f) => f.key === "all" || f.count > 0)
                .map((filter) => {
                  const isActive = selectedCategoryFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(filter.key)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-sage-700 text-ivory-50 shadow-2xs"
                          : "bg-ivory-100/80 text-sage-700 hover:bg-ivory-200 border border-ivory-200"
                      }`}
                    >
                      <span>{filter.emoji}</span>
                      <span>{filter.label}</span>
                      <span className="text-[10px] opacity-80">({filter.count})</span>
                    </button>
                  );
                })}
            </div>
          )}

          {isLoading ? (
            <div className="py-12 text-center text-[#556858] space-y-2">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-gold-400" />
              <p className="text-xs">Memuat ucapan doa...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-10 px-4 text-center space-y-2.5 bg-ivory-50/60 rounded-2xl border border-dashed border-gold-200/80">
              <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-2xl mx-auto shadow-2xs">
                💌
              </div>
              <p className="font-serif-cormorant text-xl font-medium text-sage-900">
                Belum Ada Ucapan Doa
              </p>
              <p className="text-xs text-sage-600 max-w-xs mx-auto leading-relaxed">
                Daftar doa telah dibersihkan. Jadilah yang pertama mengirimkan untaian doa dan foto kenangan terindah untuk Fitri &amp; Irwan.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-130 overflow-y-auto pr-1">
              {entries
                .filter((entry) => {
                  if (selectedCategoryFilter === "all") return true;
                  const catKey = getCategoryMeta(entry.relationship).key;
                  if (selectedCategoryFilter === "vip") return catKey === "vip";
                  if (selectedCategoryFilter === "keluarga") return catKey === "keluarga";
                  if (selectedCategoryFilter === "sahabat") return catKey === "sahabat";
                  if (selectedCategoryFilter === "lainnya") {
                    return !["vip", "keluarga", "sahabat"].includes(catKey);
                  }
                  return true;
                })
                .map((entry) => {
                  const meta = getCategoryMeta(entry.relationship);
                  const CategoryIcon = meta.icon;

                  return (
                    <article
                      key={entry.id}
                      className="p-4 rounded-2xl bg-white border border-ivory-200/90 hover:border-gold-300/60 transition-all shadow-2xs space-y-2.5"
                    >
                      {/* Baris Atas: Avatar Emoji/Foto + Nama + Ikon Badge Kategori + Kehadiran */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Avatar: Default Emoji atau Foto Pengirim */}
                          {entry.photo_url ? (
                            <div className="relative shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-300/80 shadow-2xs bg-white">
                                <img
                                  src={entry.photo_url}
                                  alt={`Foto ${entry.name}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-ivory-300 shadow-2xs flex items-center justify-center text-[10px] leading-none">
                                {meta.emoji}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 shadow-2xs border ${meta.avatarBg}`}
                            >
                              {meta.emoji}
                            </div>
                          )}

                          {/* Nama & Badge Kategori (VIP Crown, Keluarga Heart, dll) */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-semibold text-xs sm:text-sm text-sage-900 tracking-tight">
                                {entry.name}
                              </h4>

                              {/* Ikon Kategori Khusus di Samping Nama */}
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${meta.badgeBg} ${meta.badgeBorder} ${meta.textColor}`}
                                title={`Kategori: ${meta.label}`}
                              >
                                <CategoryIcon className="w-3 h-3 shrink-0" />
                                <span>{meta.label}</span>
                              </span>
                            </div>

                            <div className="text-[10px] text-sage-500 mt-0.5">
                              {formatTime(entry.created_at)}
                            </div>
                          </div>
                        </div>

                        {/* Status Kehadiran Tamu */}
                        <div className="shrink-0">
                          {entry.attendance === "hadir" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Hadir
                            </span>
                          ) : entry.attendance === "ragu" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-[10px] font-medium">
                              Masih Ragu
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sage-50 border border-sage-200 text-sage-600 text-[10px] font-medium">
                              Berhalangan
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pesan Doa */}
                      <p className="text-xs sm:text-sm text-sage-800 leading-relaxed pl-12.5 pr-1 font-normal whitespace-pre-wrap">
                        {entry.message}
                      </p>

                      {/* Lampiran Foto (jika ada) */}
                      {entry.photo_url && (
                        <div className="pl-12.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setSelectedPhotoModal(entry.photo_url || null)}
                            className="group relative block overflow-hidden rounded-xl border border-gold-200/90 shadow-2xs hover:shadow-sm transition-all max-w-45 cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-gold-400"
                            title="Ketuk untuk memperbesar foto"
                            aria-label="Lihat foto lampiran ucapan"
                          >
                            <img
                              src={entry.photo_url}
                              alt={`Foto kenangan dari ${entry.name}`}
                              loading="lazy"
                              className="max-h-36 w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-sage-900/10 group-hover:bg-sage-900/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="p-1.5 rounded-full bg-white/90 text-sage-800 shadow-xs">
                                <Maximize2 className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal Foto Diperbesar */}
      {selectedPhotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan Foto Kenangan"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoModal(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white rounded-3xl p-3 shadow-2xl border border-gold-300/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhotoModal(null)}
              aria-label="Tutup foto"
              className="absolute top-2 right-2 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors min-w-11 min-h-11 flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={selectedPhotoModal}
                alt="Foto ucapan diperbesar"
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
            </div>
            <p className="text-center text-xs text-sage-600 mt-2.5 font-medium">
              Foto Kenangan Ucapan &amp; Doa
            </p>
          </div>
        </div>
      )}

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
