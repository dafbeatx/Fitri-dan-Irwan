"use client";

import React, { useState } from "react";
import { submitRsvp } from "@/lib/supabase";
import { AttendanceStatus } from "@/types/wedding";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { BotanicalDivider } from "./BotanicalDecor";

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

  return (
    <section
      id="rsvp"
      aria-label="Konfirmasi Kehadiran Tamu"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-xl mx-auto"
    >
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold block mb-2">
          Reservasi &amp; Konfirmasi
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2D22]">
          Konfirmasi Kehadiran
        </h2>
        <p className="mt-3 text-sm text-[#556858] leading-relaxed">
          Guna kelancaran dan kenyamanan bersama, mohon berkenan mengonfirmasi kehadiran Anda sebelum tanggal acara.
        </p>
      </div>

      <div className="bg-white/90 border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 shadow-sm">
        {isSubmitted ? (
          /* Success State (R-27) */
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#E6ECE7] text-[#3F5244] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#3F5244]" />
            </div>
            <h3 className="font-serif-cormorant text-2xl font-semibold text-[#1F2D22]">
              Terima Kasih, {name}!
            </h3>
            <p className="text-sm text-[#556858] max-w-xs mx-auto">
              Konfirmasi kehadiran Anda telah berhasil kami simpan. Kehadiran serta doa restu Anda sangat berarti bagi kami.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-5 py-2 text-xs font-medium text-[#3F5244] bg-[#FAF8F5] border border-[#D0DDD2] rounded-full hover:bg-[#E6ECE7] transition-colors min-h-[44px]"
            >
              Kirim Konfirmasi Baru
            </button>
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
              <label htmlFor="rsvp-name" className="block text-xs font-semibold text-[#1F2D22] mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bapak Ahmad Kurnia"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D5] text-sm text-[#1F2D22] focus:bg-white focus:border-[#C3A16A] transition-colors"
              />
            </div>

            {/* Nomor Telepon / WA */}
            <div>
              <label htmlFor="rsvp-phone" className="block text-xs font-semibold text-[#1F2D22] mb-1.5">
                Nomor WhatsApp / Kontak (Opsional)
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D5] text-sm text-[#1F2D22] focus:bg-white focus:border-[#C3A16A] transition-colors"
              />
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <span className="block text-xs font-semibold text-[#1F2D22] mb-2">
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
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all min-h-[44px] flex items-center justify-center ${
                      attendance === item.value
                        ? "bg-[#3F5244] text-[#FAF8F5] border-[#3F5244] shadow-xs"
                        : "bg-[#FAF8F5] text-[#556858] border-[#EAE2D5] hover:bg-white"
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
                <label htmlFor="rsvp-guests" className="block text-xs font-semibold text-[#1F2D22] mb-1.5">
                  Jumlah Orang yang Hadir
                </label>
                <select
                  id="rsvp-guests"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D5] text-sm text-[#1F2D22] focus:bg-white focus:border-[#C3A16A] transition-colors"
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
              <label htmlFor="rsvp-message" className="block text-xs font-semibold text-[#1F2D22] mb-1.5">
                Pesan atau Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan catatan singkat jika ada..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D5] text-sm text-[#1F2D22] focus:bg-white focus:border-[#C3A16A] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#3F5244] text-[#FAF8F5] font-medium text-sm tracking-wide shadow-md hover:bg-[#324236] active:scale-[0.98] transition-all disabled:opacity-70 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#C3A16A]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F3EBD8]" />
                  <span>Sedang Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#F3EBD8]" />
                  <span>Kirim Konfirmasi Kehadiran</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
