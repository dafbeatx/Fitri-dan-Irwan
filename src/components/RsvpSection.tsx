"use client";

import React, { useState } from "react";
import { submitRsvp } from "@/lib/supabase";
import { AttendanceStatus } from "@/types/wedding";
import { CheckCircle2, AlertCircle, Loader2, Send, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

interface RsvpSectionProps {
  initialGuestName?: string;
  onSuccess?: () => void;
}

export function RsvpSection({ initialGuestName = "", onSuccess }: RsvpSectionProps) {
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("hadir");
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Silakan masukkan nama Anda.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await submitRsvp({
        name: name.trim(),
        phone: phone.trim() || undefined,
        attendance,
        guests_count: attendance === "hadir" ? guestsCount : 1,
        message: message.trim() || undefined,
      });

      if (!res.success) {
        setErrorMessage("Terjadi kendala saat mengirim RSVP. Silakan coba kembali.");
      } else {
        setIsSubmitted(true);
        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3F5244", "#C3A16A", "#FAF8F5"],
          });
        } catch {
          // Confetti silent fail
        }
        if (onSuccess) onSuccess();
      }
    } catch {
      setErrorMessage("Koneksi gagal. Silakan periksa jaringan Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const statusText = attendance === "hadir" ? "Hadir" : attendance === "ragu" ? "Masih Ragu" : "Tidak Hadir";
    const text = `Assalamu'alaikum, konfirmasi undangan pernikahan Fitri & Irwan.%0A%0A` +
      `*Nama:* ${encodeURIComponent(name.trim() || "Tamu Undangan")}%0A` +
      `*Kehadiran:* ${encodeURIComponent(statusText)}%0A` +
      `*Jumlah Tamu:* ${encodeURIComponent(attendance === "hadir" ? `${guestsCount} Orang` : "-")}%0A` +
      `*Pesan / Doa:* ${encodeURIComponent(message.trim() || "-")}`;
    const waUrl = `https://wa.me/?text=${text}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="rsvp"
      aria-label="Konfirmasi Kehadiran Tamu"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold block mb-2.5">
          Reservasi &amp; Konfirmasi
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Konfirmasi Kehadiran
        </h2>
        <BotanicalFlourishCrest className="my-2" />
        <p className="mt-2 text-xs sm:text-sm text-[#465A49] leading-relaxed max-w-xs mx-auto">
          Guna kelancaran dan kenyamanan bersama, mohon berkenan mengonfirmasi kehadiran Anda sebelum tanggal acara.
        </p>
      </div>

      <div className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden">
        <FloralCardCorner position="top-right" size={38} className="absolute top-0 right-0" />
        <FloralCardCorner position="bottom-left" size={38} className="absolute bottom-0 left-0" />
        {isSubmitted ? (
          /* Success State (R-27) */
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-sage-100 text-sage-700 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-sage-700" />
            </div>
            <h3 className="font-serif-cormorant text-2xl font-semibold text-sage-900">
              Terima Kasih, {name}!
            </h3>
            <p className="text-sm text-[#556858] max-w-xs mx-auto">
              Konfirmasi kehadiran Anda telah berhasil kami simpan. Kehadiran serta doa restu Anda sangat berarti bagi kami.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="mt-2 px-5 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-colors min-h-11 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Kirim Bukti ke WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-5 py-2 text-xs font-medium text-sage-700 bg-ivory-50 border border-sage-200 rounded-full hover:bg-sage-100 transition-colors min-h-11"
              >
                Kirim Konfirmasi Baru
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-semibold text-sage-900 mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bapak Ahmad Kurnia"
                className="input-wedding"
              />
            </div>

            {/* Nomor Telepon / WA */}
            <div>
              <label htmlFor="rsvp-phone" className="block text-xs font-semibold text-sage-900 mb-1.5">
                Nomor WhatsApp / Kontak (Opsional)
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="input-wedding"
              />
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <span className="block text-xs font-semibold text-sage-900 mb-2">
                Konfirmasi Kehadiran <span className="text-red-500">*</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "hadir", label: "Hadir" },
                  { value: "ragu", label: "Masih Ragu" },
                  { value: "tidak_hadir", label: "Tidak Hadir" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAttendance(item.value as AttendanceStatus)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all min-h-11 flex items-center justify-center ${
                      attendance === item.value
                        ? "bg-sage-700 text-ivory-50 border-sage-700 shadow-xs"
                        : "bg-ivory-50 text-[#556858] border-ivory-200 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah Tamu (hanya jika hadir) */}
            {attendance === "hadir" && (
              <div>
                <label htmlFor="rsvp-guests" className="block text-xs font-semibold text-sage-900 mb-1.5">
                  Jumlah Orang yang Hadir
                </label>
                <select
                  id="rsvp-guests"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="input-wedding"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                  <option value={5}>5 Orang</option>
                </select>
              </div>
            )}

            {/* Catatan / Doa Singkat */}
            <div>
              <label htmlFor="rsvp-message" className="block text-xs font-semibold text-sage-900 mb-1.5">
                Pesan atau Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan catatan singkat jika ada..."
                className="input-wedding"
              />
            </div>

            {/* Submit Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-press w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-sage-700 text-ivory-50 font-medium text-sm tracking-wide shadow-md hover:bg-sage-800 active:scale-95 transition-all disabled:opacity-70 min-h-11 focus-visible:ring-2 focus-visible:ring-gold-400 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold-100" />
                    <span>Sedang Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-100" />
                    <span>Kirim Konfirmasi Kehadiran</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium text-xs hover:bg-emerald-100 active:scale-[0.98] transition-all min-h-11 focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Siapkan Draf Pesan WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
