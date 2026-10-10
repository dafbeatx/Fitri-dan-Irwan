"use client";

import { useSyncExternalStore, useEffect } from "react";
import {
  FloralCornerStyle,
  FloralCornerPosition,
  FloralFrameStyle,
  FloralDividerStyle,
  MonogramStyle,
  TitleStyle,
  CoupleIllustrationStyle,
} from "@/components/FloralElements";

export type PhotoLayoutMode = "arch" | "full" | "split";

export interface CanvasElementTransform {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  locked?: boolean;
}

export interface CoverConfig {
  layoutMode: "split" | "single";
  photoLayout: PhotoLayoutMode; // "arch" (Bingkai Kubah Tengah) | "full" (Foto Latar Penuh) | "split" (Foto Pisah)
  groomImage: string;
  brideImage: string;
  cardBgImage: string;
  titleText: string;
  titleStyle: TitleStyle; // "text" | "calligraphy" | "bismillah"
  groomName: string;
  brideName: string;
  salutation: string;
  subSalutation: string;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  scriptFont: string;
  isGrayscale: boolean;
  contrast: number; // 70 to 140 (%)
  brightness: number; // 70 to 130 (%)
  showFrameOnDesktop: boolean;

  // Botanical & Decorative Elements
  floralCornerStyle: FloralCornerStyle;
  floralCornerPosition: FloralCornerPosition; // "diagonal" | "all" | "top" | "bottom"
  floralCornerSize: number; // 40 to 140
  floralFrameStyle: FloralFrameStyle;
  floralDividerStyle: FloralDividerStyle;
  floralColor: string;
  floralOpacity: number; // 0 to 100
  showMonogram: boolean;
  monogramStyle: MonogramStyle; // "text" | "wax_seal" | "diamond"
  monogramText: string;
  coupleIllustration: CoupleIllustrationStyle;
  cardBgColor: string;
  nameFontSize: number; // 40 to 72

  // Asset 1-19 Canva Ornaments
  selectedAssetId?: number | null;
  assetPosition?: "corner-top" | "corner-bottom" | "corner-all" | "center-accent" | "top-header";
  assetSize?: number; // 40 to 180
  assetOpacity?: number; // 10 to 100

  // Audio Backsound Selection
  audioTrack?: string;
  audioTitle?: string;
  audioAutoplay?: boolean;

  // Canva Visual Editor Transforms & Offsets
  elementTransforms?: Record<string, CanvasElementTransform>;
  elementHrefs?: Record<string, string>;
  closingNote?: string;
  activeTemplateId?: string;
  showAuroviaLogo?: boolean;
}

export const DEFAULT_COVER_CONFIG: CoverConfig = {
  activeTemplateId: "asli_fitri_irwan",
  layoutMode: "single",
  photoLayout: "arch", // Center Arch frame matching fitri-irwan-undangan-react-vite
  groomImage: "/images/pas-foto-irwan-transparent.png",
  brideImage: "/images/pas-foto-fitri-transparent.png",
  cardBgImage: "/images/fitri-irwan-asli.png",
  titleText: "The Wedding Of",
  titleStyle: "text",
  groomName: "Irwan",
  brideName: "Fitri",
  salutation: "Kepada Yth:",
  subSalutation: "Bapak/Ibu/Saudara/i",
  closingNote: "Sebuah hari, sebuah janji, selamanya.",
  buttonText: "Buka Undangan",
  buttonColor: "#713C3C", // Elegant rose-dark from user reference
  buttonTextColor: "#FFFFFF",
  scriptFont: "greatvibes",
  isGrayscale: true,
  contrast: 105,
  brightness: 100,
  showFrameOnDesktop: true,

  // Default Botanical Setup: Classic fitri-irwan-undangan
  floralCornerStyle: "asli",
  floralCornerPosition: "diagonal",
  floralCornerSize: 85,
  floralFrameStyle: "double_border",
  floralDividerStyle: "star",
  floralColor: "#C3A16A",
  floralOpacity: 85,
  showMonogram: false,
  monogramStyle: "wax_seal",
  monogramText: "F & I",
  coupleIllustration: "none",
  cardBgColor: "#FAF8F5",
  nameFontSize: 56,

  // Default Asset 1-19 Ornaments
  selectedAssetId: null,
  assetPosition: "corner-top",
  assetSize: 75,
  assetOpacity: 85,

  // Default Audio Selection
  audioTrack: "/audio/spencer-combs-you-are-mine.mp3",
  audioTitle: "Spencer Combs (Feat Holley Maher) - You Are Mine",
  audioAutoplay: true,

  // Default Canvas Transforms & Hrefs
  elementTransforms: {},
  elementHrefs: {
    names: "#mempelai",
  },
  showAuroviaLogo: true,
};

export interface ThemeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailColor: string;
  badge: string;
  config: Partial<CoverConfig>;
}

export const CANVA_TEMPLATES: ThemeTemplate[] = [
  {
    id: "asli_fitri_irwan",
    name: "Desain Asli Fitri & Irwan",
    description: "Bingkai foto kubah di tengah, sudut bunga asli diagonal, garis ganda klasik, dan bintang ✦.",
    thumbnailColor: "#713C3C",
    badge: "Tema Utama",
    config: {
      photoLayout: "arch",
      cardBgColor: "#FAF8F5",
      cardBgImage: "/images/fitri-irwan-asli.png",
      floralCornerStyle: "asli",
      floralCornerPosition: "diagonal",
      floralFrameStyle: "double_border",
      floralDividerStyle: "star",
      floralColor: "#C3A16A",
      buttonColor: "#713C3C",
      buttonTextColor: "#FFFFFF",
      scriptFont: "greatvibes",
      isGrayscale: true,
      titleStyle: "text",
      showMonogram: false,
      coupleIllustration: "none",
    },
  },
  {
    id: "monochrome_full",
    name: "Foto Penuh Latar Belakang",
    description: "Foto Fitri & Irwan memenuhi kartu dengan bayangan lembut, aksen tombol coral merah.",
    thumbnailColor: "#F43F5E",
    badge: "Full Foto",
    config: {
      photoLayout: "full",
      cardBgColor: "#FFFFFF",
      cardBgImage: "/images/fitri-irwan-asli.png",
      floralCornerStyle: "none",
      floralFrameStyle: "none",
      floralDividerStyle: "leaf_flourish",
      floralColor: "#C3A16A",
      buttonColor: "#F43F5E",
      buttonTextColor: "#FFFFFF",
      scriptFont: "greatvibes",
      isGrayscale: true,
      showMonogram: false,
      titleStyle: "text",
      coupleIllustration: "none",
    },
  },
  {
    id: "eucalyptus_sage",
    name: "Eucalyptus Minimalis & Cincin",
    description: "Ranting eucalyptus hijau sage, bingkai lengkung arch, dan simbol sepasang cincin emas.",
    thumbnailColor: "#858B73",
    badge: "Botanikal",
    config: {
      photoLayout: "arch",
      cardBgColor: "#F8F7F4",
      floralCornerStyle: "eucalyptus",
      floralCornerPosition: "all",
      floralCornerSize: 75,
      floralFrameStyle: "arch",
      floralDividerStyle: "rings",
      floralColor: "#858B73",
      buttonColor: "#858B73",
      buttonTextColor: "#FFFFFF",
      scriptFont: "greatvibes",
      isGrayscale: true,
      titleStyle: "text",
      showMonogram: true,
      monogramStyle: "wax_seal",
      monogramText: "F & I",
      coupleIllustration: "none",
    },
  },
  {
    id: "royal_gold",
    name: "Royal Gold & Wax Seal",
    description: "Filigri emas mewah, bingkai aksen sudut, segel wax monogram, dan kaligrafi estetik.",
    thumbnailColor: "#C3A16A",
    badge: "Mewah Emas",
    config: {
      photoLayout: "arch",
      cardBgColor: "#FCFBF8",
      floralCornerStyle: "luxury_gold",
      floralCornerPosition: "all",
      floralCornerSize: 80,
      floralFrameStyle: "corner_accents",
      floralDividerStyle: "minimal_line",
      floralColor: "#C3A16A",
      buttonColor: "#C3A16A",
      buttonTextColor: "#1F2D22",
      scriptFont: "pinyon",
      isGrayscale: true,
      titleStyle: "calligraphy",
      showMonogram: true,
      monogramStyle: "wax_seal",
      monogramText: "F & I",
      coupleIllustration: "none",
    },
  },
  {
    id: "vintage_rose",
    name: "Taman Mawar Romantis",
    description: "Mawar rose mekar di sudut, kanopi daun atas, dan warna rose blush romantis.",
    thumbnailColor: "#B66F70",
    badge: "Romantis",
    config: {
      photoLayout: "arch",
      cardBgColor: "#FDF9F9",
      floralCornerStyle: "vintage_rose",
      floralCornerPosition: "diagonal",
      floralCornerSize: 85,
      floralFrameStyle: "botanical_canopy",
      floralDividerStyle: "leaf_flourish",
      floralColor: "#B66F70",
      buttonColor: "#B66F70",
      buttonTextColor: "#FFFFFF",
      scriptFont: "allura",
      isGrayscale: true,
      titleStyle: "text",
      showMonogram: false,
      coupleIllustration: "none",
    },
  },
  {
    id: "islamic_jasmine",
    name: "Melati Suci & Arabesque",
    description: "Bunga melati islami, ornamen arabesque, dan salam bismillah berkah pernikahan.",
    thumbnailColor: "#9A7B56",
    badge: "Islami",
    config: {
      photoLayout: "arch",
      cardBgColor: "#FAF8F5",
      floralCornerStyle: "jasmine",
      floralCornerPosition: "top",
      floralCornerSize: 80,
      floralFrameStyle: "double_border",
      floralDividerStyle: "arabesque",
      floralColor: "#9A7B56",
      buttonColor: "#9A7B56",
      buttonTextColor: "#FFFFFF",
      scriptFont: "pinyon",
      isGrayscale: true,
      titleStyle: "bismillah",
      showMonogram: true,
      monogramStyle: "text",
      monogramText: "F & I",
      coupleIllustration: "none",
    },
  },
];

const STORAGE_KEY = "fitri_irwan_cover_config_v4";
let cachedConfig: CoverConfig = DEFAULT_COVER_CONFIG;
let isStoreInitialized = false;
const listeners = new Set<() => void>();

export function loadCoverConfig(): CoverConfig {
  if (typeof window === "undefined") {
    return DEFAULT_COVER_CONFIG;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("fitri_irwan_cover_config_v3");
    if (!raw) return DEFAULT_COVER_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_COVER_CONFIG,
      ...parsed,
      // Backward compatibility migrations & element transforms
      photoLayout: parsed.photoLayout || (parsed.layoutMode === "split" ? "split" : "arch"),
      floralCornerPosition: parsed.floralCornerPosition || "diagonal",
      elementTransforms: parsed.elementTransforms || {},
      elementHrefs: parsed.elementHrefs || { names: "#mempelai" },
    };
  } catch {
    return DEFAULT_COVER_CONFIG;
  }
}

let isCloudSyncing = false;
let hasSyncedOnce = false;

export async function syncCoverConfigFromCloud(): Promise<CoverConfig> {
  if (typeof window === "undefined" || isCloudSyncing) return cachedConfig;
  isCloudSyncing = true;
  try {
    const res = await fetch("/api/cover-config", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.config) {
        const merged: CoverConfig = {
          ...DEFAULT_COVER_CONFIG,
          ...data.config,
        };
        cachedConfig = merged;
        isStoreInitialized = true;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {}
        listeners.forEach((l) => l());
        return merged;
      }
    }
  } catch (err) {
    console.warn("Gagal menyinkronkan cover config dari cloud:", err);
  } finally {
    isCloudSyncing = false;
    hasSyncedOnce = true;
  }
  return cachedConfig;
}

export function saveCoverConfig(cfg: CoverConfig): void {
  if (typeof window === "undefined") return;
  try {
    cachedConfig = cfg;
    isStoreInitialized = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    listeners.forEach((l) => l());
  } catch (err) {
    console.error("Gagal menyimpan cover config:", err);
  }
}

export async function saveCoverConfigCloud(cfg: CoverConfig): Promise<{
  success: boolean;
  savedToSupabase: boolean;
  error?: string | null;
}> {
  // 1. Simpan di cache lokal terlebih dahulu untuk responsivitas seketika
  saveCoverConfig(cfg);

  // 2. Simpan ke database cloud Supabase agar otomatis aktif di HP & semua perangkat
  try {
    const res = await fetch("/api/cover-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cfg),
    });

    if (res.ok) {
      const result = await res.json();
      return {
        success: Boolean(result.success),
        savedToSupabase: Boolean(result.savedToSupabase),
        error: result.supabaseError || null,
      };
    } else {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        savedToSupabase: false,
        error: errJson.error || `Server HTTP ${res.status}`,
      };
    }
  } catch (err) {
    return {
      success: false,
      savedToSupabase: false,
      error: err instanceof Error ? err.message : "Koneksi cloud gagal",
    };
  }
}

export function resetCoverConfig(): void {
  if (typeof window === "undefined") return;
  try {
    cachedConfig = { ...DEFAULT_COVER_CONFIG };
    isStoreInitialized = true;
    localStorage.removeItem(STORAGE_KEY);
    listeners.forEach((l) => l());
  } catch (err) {
    console.error("Gagal mereset cover config:", err);
  }
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): CoverConfig {
  if (typeof window === "undefined") return DEFAULT_COVER_CONFIG;
  if (!isStoreInitialized) {
    cachedConfig = loadCoverConfig();
    isStoreInitialized = true;
  }
  return cachedConfig;
}

export function useCoverConfig(): CoverConfig {
  const config = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_COVER_CONFIG);

  useEffect(() => {
    // Sinkronisasi otomatis dari cloud saat halaman pertama kali dibuka di HP / browser
    if (!hasSyncedOnce) {
      syncCoverConfigFromCloud();
    }
  }, []);

  return config;
}

