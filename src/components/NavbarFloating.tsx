"use client";

import React, { useState, useEffect } from "react";
import { Home, Users, CalendarDays, BookHeart, Image as ImageIcon, Send, Gift } from "lucide-react";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "acara", label: "Acara", icon: CalendarDays },
  { id: "kisah", label: "Kisah", icon: BookHeart },
  { id: "galeri", label: "Galeri", icon: ImageIcon },
  { id: "rsvp", label: "RSVP", icon: Send },
  { id: "hadiah", label: "Hadiah", icon: Gift },
];

export function NavbarFloating() {
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop - 200 <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navigasi Utama Undangan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[92vw] px-2 py-1.5 rounded-full bg-white/95 border border-gold-400/40 shadow-lg backdrop-blur-md"
    >
      <ul className="flex items-center gap-1 sm:gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={`Menuju bagian ${item.label}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all min-h-11 min-w-11 ${
                  isActive
                    ? "bg-sage-700 text-ivory-50 shadow-sm"
                    : "text-[#556858] hover:text-sage-900 hover:bg-ivory-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
