"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RotateCcw,
  RotateCw,
  Check,
  ExternalLink,
  Palette,
  Smartphone,
  Type,
  Image as ImageIcon,
  Flower2,
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Save,
  Music,
  Play,
  Pause,
  Lock,
  Unlock,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  X,
  FileText,
  Monitor,
  CheckCircle2,
  Link2,
  Database,
  Copy,
} from "lucide-react";
import { CoverScreen } from "@/components/CoverScreen";
import {
  CoverConfig,
  CANVA_TEMPLATES,
  useCoverConfig,
  saveCoverConfig,
  saveCoverConfigCloud,
  resetCoverConfig,
  CanvasElementTransform,
  ThemeTemplate,
} from "@/lib/coverConfig";

// Interactive Full Preview Modal components
import { HeroSection } from "@/components/HeroSection";
import { AyatSection } from "@/components/AyatSection";
import { CoupleSection } from "@/components/CoupleSection";
import { EventSection } from "@/components/EventSection";
import { VenueMapSection } from "@/components/VenueMapSection";
import { RsvpSection } from "@/components/RsvpSection";
import { GuestbookSection } from "@/components/GuestbookSection";
import { GiftSection } from "@/components/GiftSection";
import { ClosingSection } from "@/components/ClosingSection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { NavbarFloating } from "@/components/NavbarFloating";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GoldenStardust } from "@/components/GoldenStardust";
import { weddingData } from "@/config/wedding-data";

export type CanvaTab =
  | "templates"
  | "text"
  | "elements"
  | "uploads"
  | "background"
  | "layers"
  | "pages"
  | "music";

export const FLORAL_COLOR_PRESETS = [
  { name: "Royal Gold", hex: "#C3A16A" },
  { name: "Sage Green", hex: "#4E6554" },
  { name: "Rose Gold", hex: "#D48B8B" },
  { name: "Classic Ivory", hex: "#FAF8F5" },
  { name: "Charcoal", hex: "#2C3E2D" },
];

export const BUTTON_COLOR_PRESETS = [
  { name: "Coral Rose (Contoh)", hex: "#F43F5E" },
  { name: "Ruby Crimson", hex: "#E11D48" },
  { name: "Sage Green", hex: "#3F5244" },
  { name: "Royal Gold", hex: "#C3A16A" },
  { name: "Deep Charcoal", hex: "#1F2D22" },
  { name: "Emerald Islamic", hex: "#065F46" },
];

export const BG_COLOR_PRESETS = [
  { name: "Putih Murni", hex: "#FFFFFF" },
  { name: "Ivory Lembut", hex: "#FAF8F5" },
  { name: "Krem Hangat", hex: "#FAF6ED" },
  { name: "Soft Sage", hex: "#F4F6F4" },
  { name: "Dark Luxury", hex: "#181A1B" },
];

export interface WeddingFontOption {
  id: string;
  name: string;
  desc: string;
  category: "script" | "serif";
  fontFamily: string;
  badge?: string;
}

export const WEDDING_FONTS: WeddingFontOption[] = [
  // SCRIPT & CURSIVE FROM public/fonts/script
  { id: "greatvibes", name: "Great Vibes", desc: "Klasik & Luwes (Sesuai Contoh)", category: "script", fontFamily: "'Great Vibes', cursive", badge: "Asli" },
  { id: "pinyon", name: "Pinyon Script", desc: "Royal & Elegan Berkelas", category: "script", fontFamily: "'Pinyon Script', cursive", badge: "Royal" },
  { id: "alexbrush", name: "Alex Brush", desc: "Cursive Halus & Mengalir", category: "script", fontFamily: "'Alex Brush', cursive", badge: "Populer" },
  { id: "allura", name: "Allura", desc: "Modern, Bersih & Terbaca", category: "script", fontFamily: "'Allura', cursive" },
  { id: "parisienne", name: "Parisienne", desc: "Romantis Bergaya Paris", category: "script", fontFamily: "'Parisienne', cursive" },
  { id: "dancingscript", name: "Dancing Script", desc: "Kasual Dinamis & Ceria", category: "script", fontFamily: "'Dancing Script', cursive", badge: "Dinamis" },
  { id: "sacramento", name: "Sacramento", desc: "Ramping, Kaligrafi Tipis", category: "script", fontFamily: "'Sacramento', cursive" },
  { id: "courgette", name: "Courgette", desc: "Tegas, Berbobot & Mewah", category: "script", fontFamily: "'Courgette', cursive" },
  { id: "tangerine", name: "Tangerine", desc: "Kaligrafi Tinggi Elegan", category: "script", fontFamily: "'Tangerine', cursive", badge: "Elegan" },
  { id: "montecarlo", name: "Monte Carlo", desc: "Dekoratif Sastra Klasik", category: "script", fontFamily: "'Monte Carlo', cursive" },
  { id: "monsieurladoulaise", name: "Monsieur La Doulaise", desc: "Kaligrafi Kerajaan Eropa", category: "script", fontFamily: "'Monsieur La Doulaise', cursive", badge: "Vintage" },
  { id: "herrvonmuellerhoff", name: "Herr Von Muellerhoff", desc: "Goresan Tangan Aristokrat", category: "script", fontFamily: "'Herr Von Muellerhoff', cursive" },
  { id: "italianno", name: "Italianno", desc: "Gaya Italia Artistik", category: "script", fontFamily: "'Italianno', cursive" },
  { id: "rougescript", name: "Rouge Script", desc: "Luwes Romantis & Manis", category: "script", fontFamily: "'Rouge Script', cursive" },
  { id: "waterbrush", name: "Water Brush", desc: "Sapuan Kuas Modern", category: "script", fontFamily: "'Water Brush', cursive" },
  { id: "windsong", name: "WindSong", desc: "Ekspresif & Kontemporer", category: "script", fontFamily: "'WindSong', cursive" },
  { id: "cherish", name: "Cherish", desc: "Penuh Kasih & Anggun", category: "script", fontFamily: "'Cherish', cursive" },
  { id: "petitformal", name: "Petit Formal Script", desc: "Formal & Bersih", category: "script", fontFamily: "'Petit Formal Script', cursive" },
  { id: "charm", name: "Charm", desc: "Pesona Kaligrafi Memikat", category: "script", fontFamily: "'Charm', cursive" },

  // SERIF & DISPLAY FROM public/fonts/serif
  { id: "cinzel", name: "Cinzel", desc: "Kapital Klasik Romawi", category: "serif", fontFamily: "'Cinzel', serif", badge: "Monumen" },
  { id: "cinzeldecorative", name: "Cinzel Decorative", desc: "Serif Berhias Megah", category: "serif", fontFamily: "'Cinzel Decorative', serif", badge: "Mewah" },
  { id: "playfair", name: "Playfair Display", desc: "Editorial Klasik Mewah", category: "serif", fontFamily: "'Playfair Display', serif", badge: "Tren" },
  { id: "italiana", name: "Italiana", desc: "Fashion & Modern Luxury", category: "serif", fontFamily: "'Italiana', serif" },
  { id: "bellefair", name: "Bellefair", desc: "Serif Ramping Eksklusif", category: "serif", fontFamily: "'Bellefair', serif" },
  { id: "marcellus", name: "Marcellus", desc: "Proporsi Elegan Proporsional", category: "serif", fontFamily: "'Marcellus', serif" },
  { id: "bodonimoda", name: "Bodoni Moda", desc: "Kontras Tinggi Glamor", category: "serif", fontFamily: "'Bodoni Moda', serif" },
  { id: "yeseva", name: "Yeseva One", desc: "Lengkung Feminin Romantis", category: "serif", fontFamily: "'Yeseva One', serif" },
  { id: "prata", name: "Prata", desc: "Tetradikal & Harmonis", category: "serif", fontFamily: "'Prata', serif" },
];

export const AUDIO_PRESETS = [
  {
    id: "you-are-mine",
    title: "Spencer Combs (Feat Holley Maher) - You Are Mine",
    artist: "Spencer Combs & Holley Maher",
    category: "Romantic Pop Acoustic (Pilihan Utama)",
    src: "/audio/spencer-combs-you-are-mine.mp3",
    badge: "Utama",
  },
  {
    id: "kita-ke-sana-vocal",
    title: "Hindia - Kita Ke Sana (Vocal)",
    artist: "Hindia",
    category: "Indie Pop Romantic",
    src: "/audio/kita-ke-sana-vocal.mp3",
    badge: "Vokal",
  },
  {
    id: "kita-ke-sana-karaoke",
    title: "Kita Ke Sana (Instrumental / Karaoke)",
    artist: "Acoustic Karaoke",
    category: "Instrumental Lembut Akustik",
    src: "/audio/kita-ke-sana-karaoke.mp3",
    badge: "Karaoke",
  },
  {
    id: "wedding-melody",
    title: "Instrumental Wedding Melody",
    artist: "Wedding Orchestra",
    category: "Piano & Strings Klasik",
    src: "/audio/wedding-melody.mp3",
    badge: "Melodi",
  },
];

export const CANVA_ASSET_IDS = Array.from({ length: 19 }, (_, i) => i + 1);

export interface CanvasLayerItem {
  id: string;
  name: string;
  type: "text" | "photo" | "ornament" | "button" | "monogram" | "divider";
  category: string;
}

export const CANVAS_LAYERS: CanvasLayerItem[] = [
  { id: "monogram", name: "Monogram Seal", type: "monogram", category: "Dekorasi Atas" },
  { id: "title", name: "Judul Acara (The Wedding Of)", type: "text", category: "Tipografi" },
  { id: "divider", name: "Garis Pembatas Bunga", type: "divider", category: "Dekorasi" },
  { id: "names", name: "Nama Mempelai (Fitri & Irwan)", type: "text", category: "Tipografi Utama" },
  { id: "photo", name: "Foto Mempelai (Kubah / Arch)", type: "photo", category: "Media Utama" },
  { id: "ornament", name: "Ornamen Canva Asset 1-19", type: "ornament", category: "Ornamen Sudut" },
  { id: "salutation", name: "Salam & Kepada Yth", type: "text", category: "Teks Tamu" },
  { id: "guestName", name: "Nama Tamu Undangan", type: "text", category: "Teks Tamu" },
  { id: "button", name: "Tombol 'Buka Undangan'", type: "button", category: "Aksi Interaktif" },
  { id: "closingNote", name: "Catatan Penutup Puitis", type: "text", category: "Teks Penutup" },
];

export interface WeddingSectionItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  badge: string;
}

export const WEDDING_SECTIONS: WeddingSectionItem[] = [
  { id: "cover", number: "01", title: "Sampul Undangan (Cover Screen)", desc: "Amplop pembuka interaktif dengan nama tamu, foto mempelai, & tombol buka", badge: "Sedang Diedit" },
  { id: "hero", number: "02", title: "Hero & Hitung Mundur", desc: "Foto utama, hitung mundur menuju 15 Mei 2026, dan salam pembuka", badge: "Section 1" },
  { id: "ayat", number: "03", title: "Ayat Suci QS Ar-Rum: 21", desc: "Kutipan firman Allah SWT tentang kasih sayang & rahmat pernikahan", badge: "Section 2" },
  { id: "couple", number: "04", title: "Profil Pasangan Mempelai", desc: "Profil Fitri & Irwan lengkap dengan nama orang tua & pas foto resmi", badge: "Section 3" },
  { id: "event", number: "05", title: "Rangkaian Acara Pernikahan", desc: "Jadwal Akad Nikah & Resepsi pernikahan beserta waktu & alamat lengkap", badge: "Section 4" },
  { id: "map", number: "06", title: "Peta Lokasi & Navigasi", desc: "Peta digital Google Maps dan tombol rute penunjuk jalan ke gedung", badge: "Section 5" },
  { id: "rsvp", number: "07", title: "Konfirmasi Kehadiran (RSVP)", desc: "Formulir interaktif tamu untuk konfirmasi hadir atau berhalangan", badge: "Section 6" },
  { id: "guestbook", number: "08", title: "Buku Tamu & Doa Restu", desc: "Daftar ucapan selamat dan doa keberkahan dari sanak famili & sahabat", badge: "Section 7" },
  { id: "gift", number: "09", title: "Amplop Digital (Wedding Gift)", desc: "BCA 7410805477 a.n Irwan Supriatna dengan fitur salin rekening instan", badge: "Section 8" },
  { id: "closing", number: "10", title: "Penutup & Aurovia Creative", desc: "Salam terima kasih keluarga besar & kredit pengembang Aurovia Creative", badge: "Section 9" },
];

export default function AdminCanvaPage() {
  const persistedConfig = useCoverConfig();
  const [configDraft, setConfigDraft] = useState<CoverConfig | null>(null);

  const config = configDraft ?? persistedConfig;
  const setConfig = useCallback((action: React.SetStateAction<CoverConfig>) => {
    setConfigDraft((prev) => {
      const current = prev ?? persistedConfig;
      return typeof action === "function" ? action(current) : action;
    });
  }, [persistedConfig]);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [cloudSyncMessage, setCloudSyncMessage] = useState<string | null>(null);
  const [isCloudSaved, setIsCloudSaved] = useState<boolean>(false);
  const [showSqlHelpModal, setShowSqlHelpModal] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  // Auto-save draft to localStorage with a 600ms debounce
  useEffect(() => {
    if (!configDraft) return;
    const timer = setTimeout(() => {
      saveCoverConfig(configDraft);
      setSaveStatus("saved");
      const clearTimer = setTimeout(() => setSaveStatus("idle"), 1500);
      return () => clearTimeout(clearTimer);
    }, 600);
    return () => clearTimeout(timer);
  }, [configDraft]);

  // Navigation & Viewport State
  const [activeTab, setActiveTab] = useState<CanvaTab>("templates");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [testGuestName, setTestGuestName] = useState("Bapak/Ibu Tamu Undangan");
  const [activeTemplateId, setActiveTemplateId] = useState<string>(
    persistedConfig.activeTemplateId || "asli_fitri_irwan"
  );
  const [fontCategory, setFontCategory] = useState<"all" | "script" | "serif">("all");
  const [fontSearch, setFontSearch] = useState<string>("");

  // Canva Selection & Interactive Elements
  const [selectedElementId, setSelectedElementId] = useState<string | null>("names");

  // Full Screen Preview Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isFullPreviewCoverOpen, setIsFullPreviewCoverOpen] = useState<boolean>(false);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<CoverConfig[]>([persistedConfig]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const pushHistory = useCallback((newConfig: CoverConfig) => {
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, newConfig].slice(-30);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevConfig = history[historyIndex - 1];
      setHistoryIndex((prev) => prev - 1);
      setConfigDraft(prevConfig);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextConfig = history[historyIndex + 1];
      setHistoryIndex((prev) => prev + 1);
      setConfigDraft(nextConfig);
    }
  }, [historyIndex, history]);

  // Audio Preview state
  const [previewTrack, setPreviewTrack] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  // File Upload Refs
  const groomFileInputRef = useRef<HTMLInputElement>(null);
  const brideFileInputRef = useRef<HTMLInputElement>(null);
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  // Transform modifiers
  const updateElementTransform = useCallback((
    id: string,
    updater: (prev: CanvasElementTransform) => CanvasElementTransform,
    saveHistory = false
  ) => {
    setConfig((prev) => {
      const current = prev.elementTransforms?.[id] || { x: 0, y: 0, scale: 1, rotate: 0 };
      const nextTransform = updater(current);
      const nextConfig = {
        ...prev,
        elementTransforms: {
          ...prev.elementTransforms,
          [id]: nextTransform,
        },
      };
      if (saveHistory) {
        pushHistory(nextConfig);
      }
      return nextConfig;
    });
  }, [setConfig, pushHistory]);

  const nudgeElement = useCallback((id: string, dx: number, dy: number) => {
    updateElementTransform(id, (prev) => {
      if (prev.locked) return prev;
      return {
        ...prev,
        x: (prev.x || 0) + dx,
        y: (prev.y || 0) + dy,
      };
    }, true);
  }, [updateElementTransform]);

  const resetElementTransform = useCallback((id: string) => {
    updateElementTransform(id, () => ({ x: 0, y: 0, scale: 1, rotate: 0, locked: false }), true);
  }, [updateElementTransform]);

  const toggleElementLock = useCallback((id: string) => {
    updateElementTransform(id, (prev) => ({ ...prev, locked: !prev.locked }), true);
  }, [updateElementTransform]);

  // Keyboard Shortcuts: Undo, Redo, Deselect, Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      const isInput = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
        if (!isInput) {
          e.preventDefault();
          handleUndo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))) {
        if (!isInput) {
          e.preventDefault();
          handleRedo();
        }
      }
      if (e.key === "Escape") {
        setSelectedElementId(null);
      }
      if (!isInput && selectedElementId) {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          nudgeElement(selectedElementId, -step, 0);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          nudgeElement(selectedElementId, step, 0);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          nudgeElement(selectedElementId, 0, -step);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          nudgeElement(selectedElementId, 0, step);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, selectedElementId, nudgeElement]);

  // Audio preview toggle
  const togglePreview = (src: string) => {
    if (previewTrack === src && isPlayingPreview) {
      previewAudioRef.current?.pause();
      setIsPlayingPreview(false);
    } else {
      setPreviewTrack(src);
      if (previewAudioRef.current) {
        previewAudioRef.current.src = src;
        previewAudioRef.current.currentTime = 0;
        previewAudioRef.current
          .play()
          .then(() => setIsPlayingPreview(true))
          .catch((err) => {
            console.warn("Preview playback error:", err);
            setIsPlayingPreview(false);
          });
      }
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/") && !file.name.endsWith(".mp3")) {
      alert("Harap pilih file audio (.mp3).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const title = file.name.replace(/\.[^/.]+$/, "");
        setConfig((prev) => ({ ...prev, audioTrack: dataUrl, audioTitle: title }));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    setCloudSyncMessage("Menyinkronkan ke Cloud Supabase...");

    const res = await saveCoverConfigCloud(config);
    setConfigDraft(null);
    setSaveStatus("saved");

    if (res.savedToSupabase) {
      setIsCloudSaved(true);
      setCloudSyncMessage("Tersimpan ke Cloud Supabase (Otomatis tampil di HP & semua perangkat)!");
      setTimeout(() => {
        setSaveStatus("idle");
        setTimeout(() => setCloudSyncMessage(null), 3500);
      }, 2500);
    } else {
      setIsCloudSaved(false);
      if (
        res.error &&
        (res.error.includes("wedding_config") ||
          res.error.includes("schema cache") ||
          res.error.includes("relation"))
      ) {
        setCloudSyncMessage("Tersimpan di cache lokal. Perlu aktivasi tabel cloud Supabase.");
        setShowSqlHelpModal(true);
      } else {
        setCloudSyncMessage(res.error ? `Tersimpan lokal (${res.error})` : "Tersimpan di perangkat lokal");
      }
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleReset = () => {
    if (confirm("Kembalikan seluruh desain dan foto sampul ke contoh bawaan Fitri & Irwan?")) {
      resetCoverConfig();
      setConfigDraft(null);
      setActiveTemplateId("asli_fitri_irwan");
      setSelectedElementId(null);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const applyTemplate = (tmpl: ThemeTemplate) => {
    setActiveTemplateId(tmpl.id);
    const updated = { ...config, ...tmpl.config, activeTemplateId: tmpl.id };
    setConfig(updated);
    pushHistory(updated);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "groomImage" | "brideImage" | "cardBgImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG, PNG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setConfig((prev) => {
          const next = { ...prev, [field]: dataUrl };
          pushHistory(next);
          return next;
        });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Selected element metadata
  const selectedLayer = CANVAS_LAYERS.find((l) => l.id === selectedElementId);
  const selectedTransform = selectedElementId
    ? config.elementTransforms?.[selectedElementId] || { x: 0, y: 0, scale: 1, rotate: 0 }
    : null;

  // Filter fonts
  const filteredFonts = WEDDING_FONTS.filter((f) => {
    const matchesCategory = fontCategory === "all" || f.category === fontCategory;
    const matchesSearch =
      !fontSearch ||
      f.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
      f.desc.toLowerCase().includes(fontSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0F1014] text-neutral-200 select-none">
      {/* Hidden Audio Player for audio previews */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setIsPlayingPreview(false)}
        className="hidden"
      />

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={groomFileInputRef}
        onChange={(e) => handleFileUpload(e, "groomImage")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={brideFileInputRef}
        onChange={(e) => handleFileUpload(e, "brideImage")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cardFileInputRef}
        onChange={(e) => handleFileUpload(e, "cardBgImage")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={audioFileInputRef}
        onChange={handleAudioUpload}
        accept="audio/*,.mp3"
        className="hidden"
      />

      {/* ========================================================================= */}
      {/* 1. TOP TOOLBAR (CANVA HEADER) */}
      {/* ========================================================================= */}
      <header className="h-14 bg-[#18191E] border-b border-[#2D2F36] px-4 flex items-center justify-between shrink-0 z-40">
        {/* Left: Branding & Project Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-amber-500 via-rose-500 to-indigo-500 flex items-center justify-center shadow-md">
            <span className="font-serif-cormorant font-black text-white text-base">C</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white tracking-wide">
                Canva Studio Undangan
              </span>
              <span className="text-[11px] text-amber-400 font-medium px-2 py-0.5 rounded-full bg-[#272930] border border-[#3A3C45]">
                Fitri &amp; Irwan
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  configDraft
                    ? "bg-amber-400"
                    : isCloudSaved
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "bg-emerald-400"
                } animate-pulse`}
              />
              <span className="truncate max-w-50" title={cloudSyncMessage || ""}>
                {cloudSyncMessage
                  ? cloudSyncMessage
                  : configDraft
                  ? "Menyimpan perubahan..."
                  : saveStatus === "saved"
                  ? isCloudSaved
                    ? "Cloud tersinkron!"
                    : "Tersimpan!"
                  : "Tersimpan otomatis"}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Undo/Redo & Zoom Controls */}
        <div className="flex items-center gap-2 bg-[#202126] border border-[#2F323A] px-2 py-1 rounded-xl">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className={`p-1.5 rounded-lg transition-all ${
              historyIndex > 0
                ? "text-neutral-200 hover:text-white hover:bg-[#2B2D33] cursor-pointer"
                : "text-neutral-600 cursor-not-allowed"
            }`}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg transition-all ${
              historyIndex < history.length - 1
                ? "text-neutral-200 hover:text-white hover:bg-[#2B2D33] cursor-pointer"
                : "text-neutral-600 cursor-not-allowed"
            }`}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#353842] mx-1" />

          {/* Zoom Out */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
            className="p-1.5 text-neutral-300 hover:text-white hover:bg-[#2B2D33] rounded-lg cursor-pointer"
            title="Perkecil Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-neutral-200 px-1 min-w-10 text-center font-medium">
            {zoomLevel}%
          </span>

          {/* Zoom In */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
            className="p-1.5 text-neutral-300 hover:text-white hover:bg-[#2B2D33] rounded-lg cursor-pointer"
            title="Perbesar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Fit */}
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="p-1.5 text-neutral-300 hover:text-white hover:bg-[#2B2D33] rounded-lg cursor-pointer"
            title="Fit to Screen (100%)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Preview Modal, Reset & Save Actions */}
        <div className="flex items-center gap-2">
          {/* Interactive Preview Button */}
          <button
            type="button"
            onClick={() => {
              setIsFullPreviewCoverOpen(false);
              setIsPreviewModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272930] hover:bg-[#32353E] border border-[#3E424D] text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span>Pratinjau Tamu</span>
          </button>

          {/* Reset Template Button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#272930] transition-all cursor-pointer"
            title="Kembalikan Desain Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Manual Save Button */}
          <button
            type="button"
            onClick={handleSave}
            title={cloudSyncMessage || "Simpan desain ke Cloud Supabase agar tampil sama di HP"}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer ${
              isCloudSaved
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {saveStatus === "saved" ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{isCloudSaved ? "Cloud Tersinkron!" : "Tersimpan!"}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{saveStatus === "saving" ? "Menyimpan..." : "Simpan Desain"}</span>
              </>
            )}
          </button>

          {/* Live Web Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-400 hover:bg-gold-500 text-sage-900 text-xs font-bold shadow-md transition-all"
          >
            <span>Buka Undangan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE: LEFT TOOLSTRIP + FLYOUT + CANVAS + PROPERTIES PANEL */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ----------------------------------------------------------------------- */}
        {/* A. LEFT TOOLSTRIP (CANVA ICONS) */}
        {/* ----------------------------------------------------------------------- */}
        <aside className="w-18 bg-[#15161A] border-r border-[#272930] flex flex-col items-center py-2.5 gap-1 shrink-0 z-30 select-none">
          {/* Templates */}
          <button
            type="button"
            onClick={() => setActiveTab("templates")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "templates"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <LayoutTemplate className="w-4 h-4 text-amber-400" />
            <span>Desain</span>
          </button>

          {/* Text */}
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "text"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <Type className="w-4 h-4 text-purple-400" />
            <span>Teks</span>
          </button>

          {/* Elements */}
          <button
            type="button"
            onClick={() => setActiveTab("elements")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "elements"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <Flower2 className="w-4 h-4 text-pink-400" />
            <span>Elemen</span>
          </button>

          {/* Uploads / Photos */}
          <button
            type="button"
            onClick={() => setActiveTab("uploads")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "uploads"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Foto</span>
          </button>

          {/* Background */}
          <button
            type="button"
            onClick={() => setActiveTab("background")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "background"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Latar</span>
          </button>

          {/* Layers */}
          <button
            type="button"
            onClick={() => setActiveTab("layers")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "layers"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Layers</span>
          </button>

          {/* Pages / Sections */}
          <button
            type="button"
            onClick={() => setActiveTab("pages")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "pages"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Bagian</span>
          </button>

          {/* Music */}
          <button
            type="button"
            onClick={() => setActiveTab("music")}
            className={`w-14 h-13 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
              activeTab === "music"
                ? "bg-[#25272E] text-white shadow-xs"
                : "text-neutral-400 hover:text-white hover:bg-[#1C1E24]"
            }`}
          >
            <Music className="w-4 h-4 text-teal-400" />
            <span>Musik</span>
          </button>
        </aside>

        {/* ----------------------------------------------------------------------- */}
        {/* B. LEFT FLYOUT DRAWER (TOOL DETAILS & PRESETS) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-80 sm:w-88 bg-[#1D1E24] border-r border-[#2B2D35] flex flex-col shrink-0 overflow-y-auto z-20 shadow-xl">
          {/* Drawer Header */}
          <div className="p-3.5 border-b border-[#2C2E38] flex items-center justify-between">
            <h2 className="font-semibold text-xs text-white flex items-center gap-2 tracking-wide uppercase">
              {activeTab === "templates" && <><LayoutTemplate className="w-4 h-4 text-amber-400" /> Desain Tema Undangan</>}
              {activeTab === "text" && <><Type className="w-4 h-4 text-purple-400" /> Pilihan Font &amp; Tipografi</>}
              {activeTab === "elements" && <><Flower2 className="w-4 h-4 text-pink-400" /> Ornamen &amp; Aset Seni</>}
              {activeTab === "uploads" && <><ImageIcon className="w-4 h-4 text-cyan-400" /> Foto Mempelai &amp; Media</>}
              {activeTab === "background" && <><Palette className="w-4 h-4 text-emerald-400" /> Warna &amp; Filter Latar</>}
              {activeTab === "layers" && <><Layers className="w-4 h-4 text-indigo-400" /> Panel Layer Kanvas</>}
              {activeTab === "pages" && <><FileText className="w-4 h-4 text-rose-400" /> Bagian / Section Undangan</>}
              {activeTab === "music" && <><Music className="w-4 h-4 text-teal-400" /> Backsound &amp; Pemutar Musik</>}
            </h2>
          </div>

          {/* Drawer Content */}
          <div className="p-4 space-y-4">
            {/* TAB 1: TEMPLATES */}
            {activeTab === "templates" && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Pilih gaya desain bawaan Canva Studio. Seluruh foto, warna, dan bingkai akan disesuaikan secara harmonis.
                </p>
                <div className="space-y-2.5">
                  {CANVA_TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => applyTemplate(tmpl)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        activeTemplateId === tmpl.id
                          ? "bg-[#262831] border-amber-400 shadow-md ring-1 ring-amber-400/40"
                          : "bg-[#22242B] border-[#31343E] hover:border-neutral-500 hover:bg-[#282A33]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-white flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: tmpl.thumbnailColor }}
                          />
                          {tmpl.name}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#18191E] text-neutral-300 border border-[#353844]">
                          {tmpl.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-normal line-clamp-2">
                        {tmpl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: TEXT & FONTS */}
            {activeTab === "text" && (
              <div className="space-y-4">
                {/* Search Font */}
                <input
                  type="text"
                  placeholder="Cari font..."
                  value={fontSearch}
                  onChange={(e) => setFontSearch(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-[#25272F] border border-[#353844] text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                />

                {/* Font Category Filter */}
                <div className="flex rounded-lg bg-[#25272F] p-1 border border-[#353844]">
                  <button
                    type="button"
                    onClick={() => setFontCategory("all")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                      fontCategory === "all" ? "bg-[#333642] text-white font-semibold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Semua ({WEDDING_FONTS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontCategory("script")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                      fontCategory === "script" ? "bg-[#333642] text-white font-semibold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Kaligrafi (19)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontCategory("serif")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                      fontCategory === "serif" ? "bg-[#333642] text-white font-semibold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Serif (9)
                  </button>
                </div>

                {/* Font List */}
                <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                  {filteredFonts.map((sf) => (
                    <button
                      key={sf.id}
                      type="button"
                      onClick={() => {
                        setConfig((p) => ({ ...p, scriptFont: sf.id }));
                        setSelectedElementId("names");
                      }}
                      className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        config.scriptFont === sf.id
                          ? "bg-[#2A2B35] border-purple-400 text-white font-semibold shadow-xs"
                          : "bg-[#22242B] border-[#31343E] text-neutral-300 hover:border-neutral-500 hover:bg-[#282A33]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold">{sf.name}</span>
                        {sf.badge && (
                          <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-[#18191E] text-amber-300 border border-[#353844]">
                            {sf.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-lg text-neutral-100 truncate my-0.5"
                        style={{ fontFamily: sf.fontFamily }}
                      >
                        Fitri &amp; Irwan
                      </p>
                      <p className="text-[10px] text-neutral-400">{sf.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ELEMENTS & ASSETS 1-19 */}
            {activeTab === "elements" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                    <span>Aset Ornamen Canva (Asset 1-19)</span>
                    {config.selectedAssetId && (
                      <button
                        type="button"
                        onClick={() => setConfig((p) => ({ ...p, selectedAssetId: null }))}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Hapus Aset
                      </button>
                    )}
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {CANVA_ASSET_IDS.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setConfig((p) => ({ ...p, selectedAssetId: id }));
                          setSelectedElementId("ornament");
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          config.selectedAssetId === id
                            ? "bg-[#2A2B35] border-pink-400 ring-2 ring-pink-400/40"
                            : "bg-[#22242B] border-[#31343E] hover:border-neutral-500 hover:bg-[#282A33]"
                        }`}
                      >
                        <div className="w-10 h-10 relative flex items-center justify-center">
                          <Image
                            src={`/Asset/thumbs/${id}.webp`}
                            alt={`Ornamen ${id}`}
                            width={40}
                            height={40}
                            className="object-contain max-h-10"
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 mt-1">#{id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sudut Bunga Botanical */}
                <div className="pt-3 border-t border-[#2C2E38] space-y-2">
                  <h3 className="text-xs font-semibold text-white">Gaya Sudut Bunga</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(
                      [
                        { id: "asli", name: "Bunga Asli" },
                        { id: "eucalyptus", name: "Eucalyptus" },
                        { id: "vintage_rose", name: "Mawar Vintage" },
                        { id: "luxury_gold", name: "Royal Gold" },
                        { id: "minimalist", name: "Minimalis" },
                        { id: "none", name: "Tanpa Sudut" },
                      ] as const
                    ).map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setConfig((p) => ({ ...p, floralCornerStyle: style.id }))}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          config.floralCornerStyle === style.id
                            ? "bg-[#2A2B35] border-pink-400 text-white font-semibold"
                            : "bg-[#22242B] border-[#31343E] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Garis Pembatas Divider */}
                <div className="pt-3 border-t border-[#2C2E38] space-y-2">
                  <h3 className="text-xs font-semibold text-white">Pemisah Divider</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(
                      [
                        { id: "star", name: "Bintang ✦" },
                        { id: "rings", name: "Cincin Kawin" },
                        { id: "leaf_flourish", name: "Daun Sulur" },
                        { id: "arabesque", name: "Arabesque" },
                        { id: "minimal_line", name: "Garis Tipis" },
                        { id: "none", name: "Tanpa Pembatas" },
                      ] as const
                    ).map((div) => (
                      <button
                        key={div.id}
                        type="button"
                        onClick={() => {
                          setConfig((p) => ({ ...p, floralDividerStyle: div.id }));
                          setSelectedElementId("divider");
                        }}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          config.floralDividerStyle === div.id
                            ? "bg-[#2A2B35] border-amber-400 text-white font-semibold"
                            : "bg-[#22242B] border-[#31343E] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {div.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: UPLOADS & PHOTOS */}
            {activeTab === "uploads" && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-400">
                  Gunakan pas foto resmi Irwan &amp; Fitri yang telah terintegrasi atau unggah foto pengganti.
                </p>

                {/* Foto Kartu Sampul */}
                <div className="p-3 rounded-xl bg-[#22242B] border border-[#31343E] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Foto Kubah / Sampul Utama</span>
                    <button
                      type="button"
                      onClick={() => cardFileInputRef.current?.click()}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#2F323E] hover:bg-[#3D404F] text-cyan-300 font-medium cursor-pointer"
                    >
                      Unggah File
                    </button>
                  </div>
                  <div className="h-28 relative rounded-lg overflow-hidden bg-neutral-900 border border-[#393C47]">
                    <Image
                      src={config.cardBgImage || "/images/fitri-irwan-asli.png"}
                      alt="Sampul"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Pas Foto Irwan */}
                <div className="p-3 rounded-xl bg-[#22242B] border border-[#31343E] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Pas Foto Irwan Supriatna</span>
                    <button
                      type="button"
                      onClick={() => groomFileInputRef.current?.click()}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#2F323E] hover:bg-[#3D404F] text-cyan-300 font-medium cursor-pointer"
                    >
                      Ganti Foto
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 relative rounded-lg overflow-hidden bg-neutral-900 border border-[#393C47] shrink-0">
                      <Image
                        src={config.groomImage || "/images/pas-foto-irwan-transparent.png"}
                        alt="Irwan"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs text-neutral-400">
                      Pas foto resmi pengantin pria dengan latar merah transparan.
                    </span>
                  </div>
                </div>

                {/* Pas Foto Fitri */}
                <div className="p-3 rounded-xl bg-[#22242B] border border-[#31343E] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Pas Foto Fitri</span>
                    <button
                      type="button"
                      onClick={() => brideFileInputRef.current?.click()}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#2F323E] hover:bg-[#3D404F] text-cyan-300 font-medium cursor-pointer"
                    >
                      Ganti Foto
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 relative rounded-lg overflow-hidden bg-neutral-900 border border-[#393C47] shrink-0">
                      <Image
                        src={config.brideImage || "/images/pas-foto-fitri-transparent.png"}
                        alt="Fitri"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs text-neutral-400">
                      Pas foto resmi pengantin wanita dengan latar merah transparan.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: BACKGROUND & COLORS */}
            {activeTab === "background" && (
              <div className="space-y-4">
                {/* Preset Warna Kartu */}
                <div>
                  <label className="text-xs font-semibold text-white block mb-2">
                    Warna Latar Belakang Kartu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BG_COLOR_PRESETS.map((bg) => (
                      <button
                        key={bg.hex}
                        type="button"
                        onClick={() => setConfig((p) => ({ ...p, cardBgColor: bg.hex }))}
                        className={`p-2.5 rounded-lg border text-left text-xs flex items-center gap-2 cursor-pointer transition-all ${
                          config.cardBgColor?.toLowerCase() === bg.hex.toLowerCase()
                            ? "bg-[#2A2B35] border-emerald-400 text-white font-semibold"
                            : "bg-[#22242B] border-[#31343E] text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border border-black/20"
                          style={{ backgroundColor: bg.hex }}
                        />
                        <span>{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Efek Foto */}
                <div className="pt-3 border-t border-[#2C2E38] space-y-3">
                  <label className="text-xs font-semibold text-white block">
                    Filter &amp; Efek Foto Pasangan
                  </label>
                  <label className="flex items-center justify-between text-xs text-neutral-300 cursor-pointer bg-[#22242B] p-2.5 rounded-lg border border-[#31343E]">
                    <span>Hitam Putih (Grayscale Klasik)</span>
                    <input
                      type="checkbox"
                      checked={config.isGrayscale}
                      onChange={(e) => setConfig((p) => ({ ...p, isGrayscale: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>

                  <div>
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Kontras Foto</span>
                      <span className="font-mono text-white">{config.contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="140"
                      value={config.contrast}
                      onChange={(e) => setConfig((p) => ({ ...p, contrast: Number(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Kecerahan (Brightness)</span>
                      <span className="font-mono text-white">{config.brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="130"
                      value={config.brightness}
                      onChange={(e) => setConfig((p) => ({ ...p, brightness: Number(e.target.value) }))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: LAYERS */}
            {activeTab === "layers" && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400">
                  Klik layer untuk menyeleksi elemen di kanvas. Anda dapat mengunci atau mengatur posisi elemen.
                </p>
                <div className="space-y-1.5">
                  {CANVAS_LAYERS.map((layer) => {
                    const isSelected = selectedElementId === layer.id;
                    const transform = config.elementTransforms?.[layer.id];
                    const isLocked = Boolean(transform?.locked);
                    const hasOffset = Boolean(transform && (transform.x || transform.y || transform.rotate));

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedElementId(layer.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#2B2D38] border-indigo-400 shadow-md ring-1 ring-indigo-400/40 text-white"
                            : "bg-[#22242B] border-[#31343E] text-neutral-300 hover:border-neutral-500 hover:bg-[#282A33]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? "bg-indigo-400" : "bg-neutral-500"
                            }`}
                          />
                          <div>
                            <p className="text-xs font-semibold leading-tight">{layer.name}</p>
                            <p className="text-[10px] text-neutral-400">
                              {hasOffset
                                ? `X: ${transform?.x || 0}px, Y: ${transform?.y || 0}px`
                                : layer.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => toggleElementLock(layer.id)}
                            className={`p-1 rounded-md transition-all ${
                              isLocked
                                ? "text-amber-400 bg-amber-400/10"
                                : "text-neutral-500 hover:text-white"
                            }`}
                            title={isLocked ? "Buka Kunci" : "Kunci Elemen"}
                          >
                            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          </button>

                          {hasOffset && (
                            <button
                              type="button"
                              onClick={() => resetElementTransform(layer.id)}
                              className="p-1 text-neutral-500 hover:text-rose-400 rounded-md"
                              title="Reset Posisi Elemen"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: PAGES / SECTIONS */}
            {activeTab === "pages" && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400">
                  Daftar seluruh bagian undangan digital Fitri &amp; Irwan.
                </p>
                <div className="space-y-2">
                  {WEDDING_SECTIONS.map((sec) => (
                    <div
                      key={sec.id}
                      className="p-3 rounded-xl bg-[#22242B] border border-[#31343E] hover:border-neutral-500 transition-all flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-amber-400 font-bold">
                            {sec.number}
                          </span>
                          <span className="text-xs font-semibold text-white">{sec.title}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-normal">{sec.desc}</p>
                      </div>
                      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[#18191E] text-neutral-300 border border-[#353844] shrink-0">
                        {sec.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: MUSIC */}
            {activeTab === "music" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Preset Musik Pengiring</span>
                  <button
                    type="button"
                    onClick={() => audioFileInputRef.current?.click()}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#2F323E] hover:bg-[#3D404F] text-teal-300 font-medium cursor-pointer"
                  >
                    Unggah MP3
                  </button>
                </div>

                <div className="space-y-2">
                  {AUDIO_PRESETS.map((audio) => {
                    const isSelected = config.audioTrack === audio.src;
                    const isPlaying = previewTrack === audio.src && isPlayingPreview;

                    return (
                      <div
                        key={audio.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-[#252830] border-teal-400 shadow-md ring-1 ring-teal-400/40"
                            : "bg-[#22242B] border-[#31343E] hover:border-neutral-500"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white truncate max-w-44">
                            {audio.title}
                          </span>
                          <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[#18191E] text-teal-300 border border-[#353844]">
                            {audio.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 mb-2">{audio.category}</p>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePreview(audio.src)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#30333E] hover:bg-[#3E4250] text-xs text-white cursor-pointer"
                          >
                            {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                            <span>{isPlaying ? "Jeda" : "Dengarkan"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setConfig((p) => ({
                                ...p,
                                audioTrack: audio.src,
                                audioTitle: audio.title,
                              }))
                            }
                            className={`flex-1 py-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-teal-600 text-white"
                                : "bg-[#2C2E37] text-neutral-300 hover:text-white"
                            }`}
                          >
                            {isSelected ? "Sedang Aktif" : "Pilih Lagu"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* C. CENTER CANVAS (INTERACTIVE CANVA WORKSPACE) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="flex-1 flex flex-col bg-[#121316] overflow-hidden relative">
          {/* Canvas Sub-toolbar */}
          <div className="h-10 bg-[#1A1B20] border-b border-[#292B32] px-4 flex items-center justify-between text-xs text-neutral-400 select-none">
            <div className="flex items-center gap-3">
              <span className="text-neutral-200 font-medium">Viewport Kanvas Mobile: 375 &times; 667 px</span>
              <span className="text-[#3E4148]">|</span>
              {selectedElementId ? (
                <span className="text-amber-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Elemen Terpilih: {selectedLayer?.name || selectedElementId}
                </span>
              ) : (
                <span className="text-neutral-400">Klik elemen di kanvas untuk memilih dan mengedit</span>
              )}
            </div>

            {/* Selection Quick Actions */}
            {selectedElementId && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => resetElementTransform(selectedElementId)}
                  className="px-2 py-0.5 rounded-md bg-[#25272F] hover:bg-[#32353E] text-neutral-300 text-[11px] font-medium cursor-pointer"
                  title="Kembalikan posisi elemen ke asal"
                >
                  Reset Posisi
                </button>
                <button
                  type="button"
                  onClick={() => toggleElementLock(selectedElementId)}
                  className="px-2 py-0.5 rounded-md bg-[#25272F] hover:bg-[#32353E] text-neutral-300 text-[11px] font-medium cursor-pointer flex items-center gap-1"
                >
                  {selectedTransform?.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                  <span>{selectedTransform?.locked ? "Terkunci" : "Kunci"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedElementId(null)}
                  className="p-1 hover:text-white rounded-md text-neutral-400"
                  title="Batalkan Seleksi (Esc)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Canvas Scroll Area with Centered Device */}
          <div
            className="flex-1 overflow-auto p-6 sm:p-10 flex items-center justify-center relative cursor-default"
            onClick={() => setSelectedElementId(null)}
          >
            {/* Canva Studio Subtle Dot Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(#5C6069 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Scaled Device Container */}
            <div
              className="relative transition-transform duration-150 ease-out shrink-0"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "center center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone Frame - Standard 375x667 Mobile Dimensions */}
              <div className="w-93.75 h-166.75 rounded-[38px] p-2.5 bg-neutral-900 shadow-2xl border-4 border-neutral-800 ring-1 ring-white/10 flex flex-col justify-between">
                {/* Speaker Notch */}
                <div className="w-24 h-3.5 bg-neutral-800 rounded-b-xl mx-auto mb-1 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-950/80 mr-2" />
                  <div className="w-10 h-1 rounded-full bg-neutral-700/60" />
                </div>

                {/* Interactive Live CoverScreen */}
                <div className="rounded-3xl overflow-hidden shadow-inner bg-white flex-1 relative flex flex-col">
                  <CoverScreen
                    isOpen={false}
                    onOpen={() => alert("Tombol 'Buka Undangan' berfungsi!")}
                    guestName={testGuestName}
                    previewConfig={config}
                    isEmbedPreview={true}
                    isEditable={true}
                    selectedElementId={selectedElementId}
                    onSelectElement={(id) => setSelectedElementId(id || null)}
                    zoomLevel={zoomLevel}
                    onUpdateTransform={updateElementTransform}
                    onToggleLock={toggleElementLock}
                    onUpdateText={(field, value) => {
                      if (field === "guestName") {
                        setTestGuestName(value);
                      } else {
                        const key =
                          field === "title"
                            ? "titleText"
                            : field === "button"
                            ? "buttonText"
                            : field === "monogram"
                            ? "monogramText"
                            : field;
                        setConfig((prev) => {
                          const updated = { ...prev, [key]: value };
                          pushHistory(updated);
                          return updated;
                        });
                      }
                    }}
                    onUpdateHref={(elementId, hrefValue) => {
                      setConfig((prev) => {
                        const updated = {
                          ...prev,
                          elementHrefs: {
                            ...(prev.elementHrefs || {}),
                            [elementId]: hrefValue,
                          },
                        };
                        pushHistory(updated);
                        return updated;
                      });
                    }}
                  />
                </div>

                {/* Home Indicator */}
                <div className="w-32 h-1 bg-neutral-700 rounded-full mx-auto mt-2" />
              </div>

              {/* Guest Name Tester under the phone */}
              <div className="mt-4 bg-[#1B1C22] border border-[#2F313B] p-2.5 rounded-xl shadow-lg flex items-center gap-2 max-w-90">
                <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={testGuestName}
                  onChange={(e) => setTestGuestName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#121316] border border-[#292B33] text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Uji nama tamu di sampul..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* D. RIGHT PROPERTIES PANEL (CANVA CONTEXTUAL INSPECTOR) */}
        {/* ----------------------------------------------------------------------- */}
        <aside className="w-80 bg-[#1D1E24] border-l border-[#2B2D35] flex flex-col shrink-0 overflow-y-auto z-20 shadow-xl">
          {selectedElementId ? (
            /* PROPERTIES FOR SELECTED ELEMENT */
            <div className="p-4 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2C2E38]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Properti Elemen
                  </span>
                  <h3 className="font-semibold text-sm text-white">{selectedLayer?.name}</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleElementLock(selectedElementId)}
                    className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                      selectedTransform?.locked
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-[#272932] text-neutral-400 hover:text-white border border-transparent"
                    }`}
                    title={selectedTransform?.locked ? "Buka kunci elemen" : "Kunci elemen"}
                  >
                    {selectedTransform?.locked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-medium">Terkunci</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Kunci</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedElementId(null)}
                    className="p-1 text-neutral-400 hover:text-white rounded-md cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Position & Transform Controls */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>Posisi &amp; Transformasi (Canva)</span>
                  <span className="text-[10px] text-neutral-400">Gunakan panah keyboard</span>
                </h4>

                {selectedTransform?.locked && (
                  <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-[11px] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Elemen terkunci. Buka kunci untuk menggeser atau mengubah ukuran.</span>
                  </div>
                )}

                {/* X & Y Offsets */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#24262E] p-2 rounded-lg border border-[#333642]">
                    <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Posisi X</span>
                      <span className="font-mono text-white">{selectedTransform?.x || 0} px</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => nudgeElement(selectedElementId, -5, 0)}
                        className="px-2 py-0.5 rounded bg-[#313440] hover:bg-[#3E4252] text-xs text-white"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={selectedTransform?.x || 0}
                        onChange={(e) =>
                          updateElementTransform(selectedElementId, (p) => ({ ...p, x: Number(e.target.value) }), true)
                        }
                        className="w-full text-xs text-center bg-transparent text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => nudgeElement(selectedElementId, 5, 0)}
                        className="px-2 py-0.5 rounded bg-[#313440] hover:bg-[#3E4252] text-xs text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#24262E] p-2 rounded-lg border border-[#333642]">
                    <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Posisi Y</span>
                      <span className="font-mono text-white">{selectedTransform?.y || 0} px</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => nudgeElement(selectedElementId, 0, -5)}
                        className="px-2 py-0.5 rounded bg-[#313440] hover:bg-[#3E4252] text-xs text-white"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={selectedTransform?.y || 0}
                        onChange={(e) =>
                          updateElementTransform(selectedElementId, (p) => ({ ...p, y: Number(e.target.value) }), true)
                        }
                        className="w-full text-xs text-center bg-transparent text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => nudgeElement(selectedElementId, 0, 5)}
                        className="px-2 py-0.5 rounded bg-[#313440] hover:bg-[#3E4252] text-xs text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scale (Ukuran) Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Skala Ukuran</span>
                    <span className="font-mono text-white">
                      {Math.round((selectedTransform?.scale || 1) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="180"
                    value={Math.round((selectedTransform?.scale || 1) * 100)}
                    onChange={(e) =>
                      updateElementTransform(
                        selectedElementId,
                        (p) => ({ ...p, scale: Number(e.target.value) / 100 }),
                        true
                      )
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Rotate Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Rotasi Sudut</span>
                    <span className="font-mono text-white">{selectedTransform?.rotate || 0}&deg;</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={selectedTransform?.rotate || 0}
                    onChange={(e) =>
                      updateElementTransform(
                        selectedElementId,
                        (p) => ({ ...p, rotate: Number(e.target.value) }),
                        true
                      )
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Quick Align Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      updateElementTransform(selectedElementId, (p) => ({ ...p, x: 0 }), true)
                    }
                    className="p-1.5 rounded-lg bg-[#25272F] hover:bg-[#31343F] text-[11px] text-neutral-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlignHorizontalJustifyCenter className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rata Tengah X</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateElementTransform(selectedElementId, (p) => ({ ...p, y: 0 }), true)
                    }
                    className="p-1.5 rounded-lg bg-[#25272F] hover:bg-[#31343F] text-[11px] text-neutral-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rata Tengah Y</span>
                  </button>
                </div>
              </div>

              {/* Context-Specific Styling */}
              <div className="pt-3 border-t border-[#2C2E38] space-y-3">
                <h4 className="text-xs font-semibold text-white">Pengaturan Khusus Elemen</h4>

                {/* UNIVERSAL TAUTAN LINK / <HREF> CONTROLS FOR SELECTED ELEMENT */}
                <div className="p-3 bg-[#24262E] border border-[#333642] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Tautan Link (&lt;href&gt;)</span>
                    </label>
                    {config.elementHrefs?.[selectedElementId] && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        Aktif
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: #mempelai, #acara, https://..."
                    value={config.elementHrefs?.[selectedElementId] || (selectedElementId === "names" ? "#mempelai" : "")}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        elementHrefs: {
                          ...(prev.elementHrefs || {}),
                          [selectedElementId]: e.target.value,
                        },
                      }))
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#18191E] border border-[#383B47] text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {[
                      { label: "#mempelai", val: "#mempelai" },
                      { label: "#acara", val: "#acara" },
                      { label: "#lokasi", val: "#lokasi" },
                      { label: "#rsvp", val: "#rsvp" },
                      { label: "#hadiah", val: "#hadiah" },
                      { label: "#beranda", val: "#beranda" },
                    ].map((preset) => {
                      const activeVal = config.elementHrefs?.[selectedElementId] || (selectedElementId === "names" ? "#mempelai" : "");
                      return (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              elementHrefs: {
                                ...(prev.elementHrefs || {}),
                                [selectedElementId]: preset.val,
                              },
                            }))
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                            activeVal === preset.val
                              ? "bg-cyan-600 border-cyan-400 text-white font-medium shadow-xs"
                              : "bg-[#1C1E24] border-[#333642] text-neutral-300 hover:text-white"
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Elemen ini akan menjadi tautan interaktif (&lt;a href&gt;) saat diklik di undangan digital.
                  </p>
                </div>

                {/* If selected is NAMES */}
                {selectedElementId === "names" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Nama Wanita (Fitri)</label>
                      <input
                        type="text"
                        value={config.brideName}
                        onChange={(e) => setConfig((p) => ({ ...p, brideName: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Nama Pria (Irwan)</label>
                      <input
                        type="text"
                        value={config.groomName}
                        onChange={(e) => setConfig((p) => ({ ...p, groomName: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Pilihan Font Mempelai</label>
                      <select
                        value={config.scriptFont}
                        onChange={(e) => setConfig((p) => ({ ...p, scriptFont: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
                      >
                        {WEDDING_FONTS.map((sf) => (
                          <option key={sf.id} value={sf.id}>
                            {sf.name} ({sf.category === "script" ? "Kaligrafi" : "Serif"})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                        <span>Ukuran Font Nama</span>
                        <span className="font-mono text-white">{config.nameFontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="38"
                        max="70"
                        value={config.nameFontSize}
                        onChange={(e) => setConfig((p) => ({ ...p, nameFontSize: Number(e.target.value) }))}
                        className="w-full accent-purple-400"
                      />
                    </div>
                  </div>
                )}

                {/* If selected is TITLE */}
                {selectedElementId === "title" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Teks Judul</label>
                      <input
                        type="text"
                        value={config.titleText}
                        onChange={(e) => setConfig((p) => ({ ...p, titleText: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Gaya Judul</label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        {(["text", "calligraphy", "bismillah"] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setConfig((p) => ({ ...p, titleStyle: st }))}
                            className={`p-1.5 rounded-lg border text-center text-[10px] capitalize cursor-pointer ${
                              config.titleStyle === st
                                ? "bg-[#2F323E] border-amber-400 text-white"
                                : "bg-[#24262E] border-[#333642] text-neutral-400"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* If selected is SALUTATION */}
                {selectedElementId === "salutation" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Salam Utama</label>
                      <input
                        type="text"
                        value={config.salutation}
                        onChange={(e) => setConfig((p) => ({ ...p, salutation: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Sub Salam</label>
                      <input
                        type="text"
                        value={config.subSalutation}
                        onChange={(e) => setConfig((p) => ({ ...p, subSalutation: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                  </div>
                )}

                {/* If selected is GUEST NAME */}
                {selectedElementId === "guestName" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Uji Nama Tamu di Sampul</label>
                      <input
                        type="text"
                        value={testGuestName}
                        onChange={(e) => setTestGuestName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                        placeholder="Contoh: Bapak/Ibu Tamu Undangan"
                      />
                    </div>
                  </div>
                )}

                {/* If selected is CLOSING NOTE */}
                {selectedElementId === "closingNote" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Catatan Penutup</label>
                      <textarea
                        rows={2}
                        value={config.closingNote || ""}
                        onChange={(e) => setConfig((p) => ({ ...p, closingNote: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                        placeholder="Sebuah hari, sebuah janji, selamanya."
                      />
                    </div>
                  </div>
                )}

                {/* If selected is MONOGRAM */}
                {selectedElementId === "monogram" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Teks Monogram</label>
                      <input
                        type="text"
                        value={config.monogramText || "F & I"}
                        onChange={(e) => setConfig((p) => ({ ...p, monogramText: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Gaya Monogram</label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        {(["wax_seal", "text", "diamond"] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setConfig((p) => ({ ...p, monogramStyle: st }))}
                            className={`p-1.5 rounded-lg border text-center text-[10px] capitalize cursor-pointer ${
                              config.monogramStyle === st
                                ? "bg-[#2F323E] border-amber-400 text-white font-semibold"
                                : "bg-[#24262E] border-[#333642] text-neutral-400"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* If selected is BUTTON */}
                {selectedElementId === "button" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Teks Tombol</label>
                      <input
                        type="text"
                        value={config.buttonText}
                        onChange={(e) => setConfig((p) => ({ ...p, buttonText: e.target.value }))}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#24262E] border border-[#333642] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Warna Tombol</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {BUTTON_COLOR_PRESETS.map((bc) => (
                          <button
                            key={bc.hex}
                            type="button"
                            onClick={() => setConfig((p) => ({ ...p, buttonColor: bc.hex }))}
                            className={`p-1.5 rounded-lg border text-left text-[10px] flex items-center gap-1.5 ${
                              config.buttonColor.toLowerCase() === bc.hex.toLowerCase()
                                ? "bg-[#2F323E] border-white text-white"
                                : "bg-[#24262E] border-[#333642] text-neutral-400"
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: bc.hex }}
                            />
                            <span className="truncate">{bc.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* If selected is PHOTO */}
                {selectedElementId === "photo" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Mode Bingkai Foto</label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        {(
                          [
                            { id: "arch", name: "Kubah" },
                            { id: "full", name: "Penuh" },
                            { id: "split", name: "Pisah" },
                          ] as const
                        ).map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setConfig((p) => ({ ...p, photoLayout: mode.id }))}
                            className={`p-1.5 rounded-lg border text-center text-[10px] capitalize ${
                              config.photoLayout === mode.id
                                ? "bg-[#2F323E] border-cyan-400 text-white"
                                : "bg-[#24262E] border-[#333642] text-neutral-400"
                            }`}
                          >
                            {mode.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => cardFileInputRef.current?.click()}
                      className="w-full py-2 rounded-lg bg-[#2E313D] hover:bg-[#3D4050] text-xs font-semibold text-white cursor-pointer"
                    >
                      Ganti Foto Pasangan
                    </button>
                  </div>
                )}

                {/* If selected is ORNAMENT */}
                {selectedElementId === "ornament" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 mb-1 block">Posisi Aset Ornamen</label>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {(
                          [
                            { id: "corner-top", name: "Sudut Atas" },
                            { id: "corner-bottom", name: "Sudut Bawah" },
                            { id: "corner-all", name: "Semua Sudut" },
                            { id: "top-header", name: "Header Atas" },
                            { id: "center-accent", name: "Aksen Tengah" },
                          ] as const
                        ).map((pos) => (
                          <button
                            key={pos.id}
                            type="button"
                            onClick={() => setConfig((p) => ({ ...p, assetPosition: pos.id }))}
                            className={`p-1.5 rounded-lg border text-center text-[10px] ${
                              config.assetPosition === pos.id
                                ? "bg-[#2F323E] border-pink-400 text-white"
                                : "bg-[#24262E] border-[#333642] text-neutral-400"
                            }`}
                          >
                            {pos.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                        <span>Ukuran Aset</span>
                        <span className="font-mono text-white">{config.assetSize || 75}px</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="160"
                        value={config.assetSize || 75}
                        onChange={(e) => setConfig((p) => ({ ...p, assetSize: Number(e.target.value) }))}
                        className="w-full accent-pink-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* PROPERTIES FOR DOCUMENT / CANVAS WHEN NOTHING SELECTED */
            <div className="p-4 space-y-5">
              <div className="pb-3 border-b border-[#2C2E38]">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Kanvas Utama
                </span>
                <h3 className="font-semibold text-sm text-white">Pengaturan Desain Undangan</h3>
              </div>

              <div className="space-y-4">
                {/* Active Template */}
                <div>
                  <label className="text-xs font-semibold text-white block mb-1.5">
                    Tema Canva Aktif
                  </label>
                  <div className="p-3 rounded-xl bg-[#24262E] border border-[#333642] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {CANVA_TEMPLATES.find((t) => t.id === activeTemplateId)?.name || "Kustom"}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        {CANVA_TEMPLATES.find((t) => t.id === activeTemplateId)?.badge || "Desain"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("templates")}
                      className="text-[11px] text-amber-400 font-semibold hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                </div>

                {/* Background Color Quick Picker */}
                <div>
                  <label className="text-xs font-semibold text-white block mb-1.5">
                    Warna Latar Kartu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BG_COLOR_PRESETS.map((bg) => (
                      <button
                        key={bg.hex}
                        type="button"
                        onClick={() => setConfig((p) => ({ ...p, cardBgColor: bg.hex }))}
                        className={`p-2 rounded-lg border text-left text-xs flex items-center gap-2 cursor-pointer transition-all ${
                          config.cardBgColor?.toLowerCase() === bg.hex.toLowerCase()
                            ? "bg-[#2F323E] border-emerald-400 text-white font-semibold"
                            : "bg-[#24262E] border-[#333642] text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/20"
                          style={{ backgroundColor: bg.hex }}
                        />
                        <span className="text-[11px] truncate">{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Backsound Info */}
                <div>
                  <label className="text-xs font-semibold text-white block mb-1.5">
                    Musik Pengiring
                  </label>
                  <div className="p-3 rounded-xl bg-[#24262E] border border-[#333642]">
                    <p className="text-xs font-semibold text-white truncate">
                      {config.audioTitle || "Spencer Combs - You Are Mine"}
                    </p>
                    <p className="text-[10px] text-teal-400 mt-0.5">Autoplay saat dibuka</p>
                  </div>
                </div>

                {/* Reset All */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2 rounded-xl bg-[#272932] hover:bg-[#343744] text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Seluruh Desain ke Awal</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 3. FULL INTERACTIVE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 select-text animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="w-full max-w-xl flex items-center justify-between mb-3 text-white">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-sm">Pratinjau Undangan Digital Tamu</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(false)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Device Mockup with Full Invitation Flow - Standard 375x667 Mobile Dimensions */}
          <div
            className={`w-93.75 max-w-[92vw] h-166.75 max-h-[88vh] bg-ivory-50 rounded-3xl ${
              isFullPreviewCoverOpen ? "overflow-y-auto" : "overflow-hidden"
            } shadow-2xl relative border-4 border-neutral-700 shrink-0`}
          >
            {/* 1. Opening Cover Envelope */}
            <CoverScreen
              isOpen={isFullPreviewCoverOpen}
              onOpen={() => setIsFullPreviewCoverOpen(true)}
              guestName={testGuestName}
              previewConfig={config}
              isModalPreview={true}
            />

            {/* 2. Floating Audio Player */}
            <AudioPlayer
              autoPlayTriggered={isFullPreviewCoverOpen}
              audioSrc={config.audioTrack || weddingData.audio.src}
            />

            {/* 3. Floating Bottom Navigation Bar */}
            {isFullPreviewCoverOpen && <NavbarFloating />}

            {/* Ambient Floating Golden Stardust */}
            <GoldenStardust />

            {/* 4. Full Wedding Sections */}
            <div className="min-h-screen relative z-10">
              <ScrollReveal direction="up" delay={50}>
                <HeroSection guestName={testGuestName} />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <AyatSection />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <CoupleSection />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <EventSection />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <VenueMapSection />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <RsvpSection initialGuestName={testGuestName} />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <GuestbookSection initialGuestName={testGuestName} />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <GiftSection />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={80}>
                <ClosingSection />
              </ScrollReveal>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 mt-2">
            Klik &apos;Buka Undangan&apos; di dalam sampul untuk menguji alur animasi pembuka dan backsound musik.
          </p>
        </div>
      )}

      {/* Modal Bantuan Aktivasi Cloud Supabase (Multi-Device Sync) */}
      {showSqlHelpModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
        >
          <div className="bg-[#1C1E24] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-neutral-200 shadow-2xl relative">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Database className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-white text-base">
                    Aktifkan Sinkronisasi Cloud ke HP
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Satu langkah mudah di Supabase SQL Editor
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlHelpModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#282A32] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
              Agar editan admin <strong>otomatis tampil sama di HP pengunjung &amp; semua perangkat lain</strong> (bukan hanya tersimpan di cache laptop admin), buat tabel <code className="text-amber-400 font-mono">wedding_config</code> di Supabase Anda:
            </p>

            <div className="relative bg-[#121316] border border-[#2D2F38] rounded-xl p-3 font-mono text-[11px] text-amber-200/90 overflow-x-auto max-h-48 mb-4">
              <pre>{`CREATE TABLE IF NOT EXISTS wedding_config (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE wedding_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public config read access" ON wedding_config FOR SELECT USING (true);
CREATE POLICY "Public config insert access" ON wedding_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Public config update access" ON wedding_config FOR UPDATE USING (true);`}</pre>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`CREATE TABLE IF NOT EXISTS wedding_config (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE wedding_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public config read access" ON wedding_config FOR SELECT USING (true);
CREATE POLICY "Public config insert access" ON wedding_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Public config update access" ON wedding_config FOR UPDATE USING (true);`);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2500);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>SQL Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Kode SQL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowSqlHelpModal(false)}
                className="py-2.5 px-4 rounded-xl bg-[#282A32] hover:bg-[#343742] text-neutral-300 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <p className="text-[10px] text-neutral-500 mt-3 text-center">
              Buka dashboard Supabase -&gt; <strong>SQL Editor</strong> -&gt; Paste &amp; Run. Setelah itu klik tombol Simpan kembali di Canva studio ini.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
