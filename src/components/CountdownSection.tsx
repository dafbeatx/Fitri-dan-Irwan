"use client";

import React, { useState, useEffect } from "react";
import { weddingData } from "@/config/wedding-data";
import { CalendarPlus, Clock } from "lucide-react";

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const target = new Date(weddingData.events.targetDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real Google Calendar link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Walimatul 'Ursy Fitri & Irwan"
  )}&dates=20261023T010000Z/20261023T090000Z&details=${encodeURIComponent(
    "Undangan Pernikahan Fitri Ani Rahayu, S.Mat & Irwan Supriatna di Kediaman Mempelai Wanita, Kp. Cemplang, RT 03 RW 09 Cibungbulang, Kab. Bogor."
  )}&location=${encodeURIComponent(weddingData.events.akad.address)}`;

  return (
    <div className="my-10 max-w-xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold-600 font-semibold mb-4">
        <Clock className="w-4 h-4 text-gold-400" />
        <span>Menghitung Hari Bahagia</span>
      </div>

      {timeLeft.isPast ? (
        <div className="p-6 rounded-2xl bg-white/90 border border-gold-400/40 shadow-sm">
          <p className="font-serif-cormorant text-2xl text-sage-700 font-medium">
            Alhamdulillah, Acara Telah Berlangsung
          </p>
          <p className="text-sm text-[#465A49] mt-1">
            Terima kasih atas seluruh doa restu dan kehadiran yang telah diberikan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-white/90 border border-ivory-200 shadow-sm flex flex-col items-center justify-center"
            >
              <span className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl font-semibold text-sage-900">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#465A49] uppercase tracking-[0.25em] mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Real Save to Google Calendar CTA - R-26 */}
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-ivory-50 bg-sage-600 hover:bg-sage-700 active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-gold-400 min-h-11"
      >
        <CalendarPlus className="w-4 h-4 text-gold-100" />
        <span>Simpan Tanggal ke Google Calendar</span>
      </a>
    </div>
  );
}
