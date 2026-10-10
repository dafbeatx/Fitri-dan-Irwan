"use client";

import React, { useState, useEffect } from "react";
import { Home, Users, CalendarDays, Send, Gift } from "lucide-react";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "acara", label: "Acara", icon: CalendarDays },
  { id: "rsvp", label: "RSVP", icon: Send },
  { id: "hadiah", label: "Hadiah", icon: Gift },
];

export function NavbarFloating() {
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Jika masih di bagian paling atas (Hero / Beranda), selalu aktifkan beranda
      if (window.scrollY < 200) {
        setActiveSection("beranda");
        return;
      }

      // 2. Jika scroll mendekati bagian paling bawah halaman
      const scrollBottom = window.innerHeight + window.scrollY;
      const isNearBottom = scrollBottom >= document.documentElement.scrollHeight - 100;
      if (isNearBottom) {
        const hadiahEl = document.getElementById("hadiah");
        if (hadiahEl) {
          const rect = hadiahEl.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.75) {
            setActiveSection("hadiah");
            return;
          }
        }
      }

      // 3. Cek posisi elemen section relatif terhadap viewport (titik pemicu 35% dari atas layar)
      const triggerPoint = window.innerHeight * 0.35;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          setActiveSection(item.id);
          return;
        }
      }

      setActiveSection("beranda");
    };

    // Jalankan segera saat komponen dipasang
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Navigasi Utama Undangan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[calc(100vw-2rem)] sm:max-w-85 px-2 py-1.5 rounded-full bg-white/95 border border-gold-400/40 shadow-lg backdrop-blur-md"
    >
      <ul className="flex items-center gap-1 sm:gap-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-label={`Menuju bagian ${item.label}`}
                aria-current={isActive ? "page" : undefined}
                className={`btn-press flex items-center justify-center p-2.5 rounded-full text-xs font-medium transition-all duration-150 active:scale-85 min-h-10 min-w-10 ${
                  isActive
                    ? "bg-sage-700 text-ivory-50 shadow-sm scale-105"
                    : "text-[#556858] hover:text-sage-900 hover:bg-ivory-50 active:bg-ivory-100"
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="sr-only">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
