"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { BotanicalCornerAuthentic, BotanicalFlourishCrest, FloralGarlandWreath } from "./BotanicalDecor";

export function ClosingSection() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Discreet secret shortcut: 5 rapid taps on the developer logo opens /admin
  const handleSecretTap = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    const nextCount = tapCount + 1;
    if (nextCount >= 5) {
      router.push("/admin");
      setTapCount(0);
    } else {
      setTapCount(nextCount);
      resetTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 2500);
    }
  };

  // Keyboard shortcut: Ctrl + Shift + A opens /admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [router]);

  return (
    <footer
      aria-label="Penutup dan Doa Restu"
      className="relative pt-12 pb-24 px-4 text-center bg-ivory-50 overflow-hidden w-full"
    >
      <BotanicalCornerAuthentic
        position="top-left"
        size={85}
        opacity={0.8}
        className="absolute top-2 left-2 z-10"
      />
      <BotanicalCornerAuthentic
        position="top-right"
        size={85}
        opacity={0.8}
        className="absolute top-2 right-2 z-10"
      />

      <div className="max-w-xs mx-auto space-y-5 relative z-10">
        <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
          <FloralGarlandWreath size={72} className="absolute inset-0 m-auto z-10" />
          <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center z-5">
            <Heart className="w-4 h-4 text-sage-700 fill-current" />
          </div>
        </div>

        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-normal text-sage-900 tracking-wide">
          Terima Kasih
        </h2>

        <p className="text-xs sm:text-sm text-[#465A49] leading-relaxed max-w-xs mx-auto">
          Atas kehadiran dan do&apos;a restu Bapak/Ibu/Saudara/i, kami ucapkan terimakasih
        </p>

        <p className="font-arabic-verse text-lg sm:text-xl text-sage-800 py-1">
          جَزَاكُمُ اللَّهُ خَيْرًا كَثِيرًا
        </p>

        <div className="pt-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold mb-2.5">
            Kami Yang Berbahagia
          </p>
          <p className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wider leading-tight">
            Fitri &amp; Irwan
          </p>
          <BotanicalFlourishCrest className="my-1.5 opacity-80" />
          <p className="text-xs text-[#556858] mt-1">
            Beserta segenap keluarga besar kedua mempelai
          </p>
        </div>

        <div className="pt-8 border-t border-ivory-200 text-[11px] text-[#556858] flex flex-col items-center">
          <p className="font-serif-cormorant text-sm text-sage-900 font-medium tracking-wide">
            Undangan Pernikahan Digital Fitri &amp; Irwan
          </p>
          <p className="mt-0.5 text-xs text-[#556858]">
            Dibuat dengan penuh rasa cinta, doa, dan rasa syukur
          </p>

          {/* Developer Credit: Aurovia Creative */}
          <div className="mt-6 pt-5 border-t border-ivory-200/70 w-full max-w-xs flex flex-col items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold-600 font-semibold">
              Designed &amp; Developed by
            </span>
            <div
              onClick={handleSecretTap}
              className="h-9 sm:h-10 flex items-center justify-center my-0.5 select-none cursor-default active:scale-95 transition-transform"
              role="presentation"
            >
              <Image
                src="/images/Logo-Aurovia-Creative.svg"
                alt="Aurovia Creative"
                width={136}
                height={50}
                className="h-8 sm:h-9 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-[10px] text-sage-600/70 tracking-wide">
              Aurovia Creative • Digital Invitation Specialist
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
