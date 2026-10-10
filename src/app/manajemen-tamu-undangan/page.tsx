"use client";

import React, { useState, useMemo, useCallback, useSyncExternalStore, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Copy,
  Check,
  Search,
  Trash2,
  MessageCircle,
  FileText,
  Filter,
  Crown,
  Heart,
  Briefcase,
  Smile,
  ArrowLeft,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Database,
  Cloud,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  fetchWeddingGuests,
  upsertWeddingGuest,
  batchUpsertWeddingGuests,
  deleteWeddingGuest,
  clearAllWeddingGuests,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { GuestCategory, GuestItem } from "@/types/wedding";

export type { GuestCategory, GuestItem };

export const CATEGORY_DETAILS: Record<
  GuestCategory,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
    badgeColor: string;
  }
> = {
  vip: {
    label: "VIP",
    icon: Crown,
    color: "text-amber-300",
    bgColor: "bg-amber-500/15",
    borderColor: "border-amber-500/40",
    badgeColor: "bg-linear-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold",
  },
  keluarga: {
    label: "Keluarga",
    icon: Heart,
    color: "text-rose-300",
    bgColor: "bg-rose-500/15",
    borderColor: "border-rose-500/40",
    badgeColor: "bg-linear-to-r from-rose-500 to-pink-600 text-white font-semibold",
  },
  teman: {
    label: "Teman",
    icon: Smile,
    color: "text-emerald-300",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/40",
    badgeColor: "bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold",
  },
  rekan: {
    label: "Rekan Kerja",
    icon: Briefcase,
    color: "text-sky-300",
    bgColor: "bg-sky-500/15",
    borderColor: "border-sky-500/40",
    badgeColor: "bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold",
  },
  umum: {
    label: "Umum",
    icon: Users,
    color: "text-neutral-300",
    bgColor: "bg-neutral-500/15",
    borderColor: "border-neutral-500/40",
    badgeColor: "bg-neutral-700 text-neutral-200 font-medium",
  },
};

export const DEFAULT_MESSAGE_TEMPLATES: Record<GuestCategory, string> = {
  vip: `Kepada Yth.
Bapak/Ibu/Saudara/i [nama]
Di Tempat

Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan segala kerendahan hati dan rasa hormat yang mendalam, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri momen istimewa dan sakral pernikahan kami:

💍 Fitri & Irwan 💍

Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga apabila Bapak/Ibu berkenan hadir serta memberikan doa restu secara langsung pada hari bahagia kami.

Detail informasi dan undangan digital dapat diakses melalui tautan resmi berikut:
👉 [link]

Atas kehadiran dan doa restu yang tulus dari Bapak/Ibu, kami haturkan terima kasih yang sebesar-besarnya.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.
Kami yang berbahagia,
Fitri & Irwan`,

  keluarga: `Kepada Yth.
Keluarga Tercinta [nama]
Di Tempat

Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan penuh rasa syukur dan sukacita dalam ikatan silaturahmi keluarga besar, kami memohon kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian dalam acara pernikahan kami:

🌸 Fitri & Irwan 🌸

Kehadiran sanak keluarga tercinta adalah anugerah dan doa terindah bagi langkah baru kehidupan kami berdua.

Buka undangan digital untuk melihat rangkaian acara dan lokasi melalui tautan ini:
👉 [link]

Terima kasih atas doa, cinta, dan kasih sayang yang senantiasa mengalir untuk kami.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.
Salam hangat & hormat,
Fitri & Irwan`,

  teman: `Halo [nama]! 👋✨

Assalamu’alaikum Wr. Wb. / Salam hangat,

Kabar bahagia! Insya Allah kami akan melangsungkan hari pernikahan kami:

🎉 The Wedding of Fitri & Irwan 🎉

Momen bahagia kami rasanya tidak akan lengkap tanpa kehadiran teman-teman terdekat. Mohon doa restunya dan yuk datang meramaikan hari bahagia kami!

Buka undangan digital kamu di sini ya:
👉 [link]

Sampai jumpa di hari H ya! Terima kasih banyak! 🙏😊

Salam hangat,
Fitri & Irwan`,

  rekan: `Kepada Yth.
Rekan [nama]
Di Tempat

Assalamu’alaikum Warahmatullahi Wabarakatuh / Salam sejahtera.

Semoga Bapak/Ibu/Rekan senantiasa dalam keadaan sehat dan penuh berkah.

Melalui pesan ini, kami bermaksud mengundang Bapak/Ibu/Rekan sekalian untuk dapat hadir dan berbagi kebahagiaan di acara pernikahan kami:

✨ Fitri & Irwan ✨

Kehadiran dan doa restu Rekan sekalian akan menjadi kehormatan besar bagi kami.

Undangan digital dan petunjuk lokasi dapat dilihat pada tautan berikut:
👉 [link]

Terima kasih atas perhatian, kerja sama, dan doa restunya.

Salam hormat,
Fitri & Irwan`,

  umum: `Kepada Yth.
Bapak/Ibu/Saudara/i [nama]
Di Tempat

Assalamu’alaikum Warahmatullahi Wabarakatuh.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 Fitri & Irwan 💍

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Buka undangan digital melalui tautan berikut:
👉 [link]

Terima kasih atas doa dan kehadirannya.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.
Fitri & Irwan`,
};

const INITIAL_GUESTS: GuestItem[] = [];

const STORAGE_KEY = "fitri_irwan_guest_list_v3";
const TEMPLATE_STORAGE_KEY = "fitri_irwan_message_templates_v2";

// External Store: Guests
let cachedGuests: GuestItem[] | null = null;
const guestListeners = new Set<() => void>();

function getGuestsSnapshot(): GuestItem[] {
  if (typeof window === "undefined") return INITIAL_GUESTS;
  if (!cachedGuests) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        cachedGuests = Array.isArray(parsed)
          ? parsed.filter(
              (g: GuestItem) =>
                g.id !== "guest-1" &&
                g.id !== "guest-2" &&
                g.id !== "guest-3" &&
                g.id !== "guest-4"
            )
          : [];
      } else {
        const v2 = localStorage.getItem("fitri_irwan_guest_list_v2");
        if (v2) {
          try {
            const parsed = JSON.parse(v2);
            const cleaned = Array.isArray(parsed)
              ? parsed.filter(
                  (g: GuestItem) =>
                    g.id !== "guest-1" &&
                    g.id !== "guest-2" &&
                    g.id !== "guest-3" &&
                    g.id !== "guest-4"
                )
              : [];
            cachedGuests = cleaned;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          } catch {
            cachedGuests = [];
          }
        } else {
          cachedGuests = [];
        }
      }
    } catch {
      cachedGuests = [];
    }
  }
  return cachedGuests || INITIAL_GUESTS;
}

function getGuestsServerSnapshot(): GuestItem[] {
  return INITIAL_GUESTS;
}

function subscribeGuests(callback: () => void): () => void {
  guestListeners.add(callback);
  return () => guestListeners.delete(callback);
}

function mutateGuests(updater: (prev: GuestItem[]) => GuestItem[]) {
  const current = getGuestsSnapshot();
  const next = updater(current);
  cachedGuests = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }
  guestListeners.forEach((cb) => cb());
}

// External Store: Message Templates
let cachedTemplates: Record<GuestCategory, string> | null = null;
const templateListeners = new Set<() => void>();

function getTemplatesSnapshot(): Record<GuestCategory, string> {
  if (typeof window === "undefined") return DEFAULT_MESSAGE_TEMPLATES;
  if (!cachedTemplates) {
    try {
      const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      cachedTemplates = saved ? JSON.parse(saved) : DEFAULT_MESSAGE_TEMPLATES;
    } catch {
      cachedTemplates = DEFAULT_MESSAGE_TEMPLATES;
    }
  }
  return cachedTemplates || DEFAULT_MESSAGE_TEMPLATES;
}

function getTemplatesServerSnapshot(): Record<GuestCategory, string> {
  return DEFAULT_MESSAGE_TEMPLATES;
}

function subscribeTemplates(callback: () => void): () => void {
  templateListeners.add(callback);
  return () => templateListeners.delete(callback);
}

function mutateTemplates(
  updater: (prev: Record<GuestCategory, string>) => Record<GuestCategory, string>
) {
  const current = getTemplatesSnapshot();
  const next = updater(current);
  cachedTemplates = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }
  templateListeners.forEach((cb) => cb());
}

// External Store: Base URL
function getOriginSnapshot(): string {
  return window.location.origin;
}
function getOriginServerSnapshot(): string {
  return "https://fitri-dan-irwan.vercel.app";
}
function subscribeNone(): () => void {
  return () => {};
}

export default function ManajemenTamuPage() {
  const guests = useSyncExternalStore(subscribeGuests, getGuestsSnapshot, getGuestsServerSnapshot);
  const templates = useSyncExternalStore(
    subscribeTemplates,
    getTemplatesSnapshot,
    getTemplatesServerSnapshot
  );
  const baseUrl = useSyncExternalStore(
    subscribeNone,
    getOriginSnapshot,
    getOriginServerSnapshot
  );

  // Filter & Search
  const [activeCategory, setActiveCategory] = useState<"all" | GuestCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "sent" | "unsent">("all");

  // Input States
  const [inputMode, setInputMode] = useState<"single" | "bulk">("single");
  const [singleName, setSingleName] = useState("");
  const [singleCategory, setSingleCategory] = useState<GuestCategory>("teman");
  const [singlePhone, setSinglePhone] = useState("");

  const [bulkText, setBulkText] = useState("");
  const [bulkCategory, setBulkCategory] = useState<GuestCategory>("teman");

  // UI Modals & Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [previewGuest, setPreviewGuest] = useState<GuestItem | null>(null);
  const [editingTemplateCategory, setEditingTemplateCategory] = useState<GuestCategory>("vip");

  // Database Supabase Sync State & SQL Modal
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [isCopiedSql, setIsCopiedSql] = useState(false);

  // Save guests helper
  const saveGuests = useCallback((newGuests: GuestItem[]) => {
    mutateGuests(() => newGuests);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Manual Sync trigger from Header Button
  const handleManualSync = useCallback(async () => {
    if (!isSupabaseConfigured || isSyncing) return;
    setIsSyncing(true);
    try {
      const { data, error, source } = await fetchWeddingGuests();
      if (!error && source === "supabase") {
        if (data.length > 0) {
          mutateGuests(() => data);
          showToast(`✓ ${data.length} data tamu tersinkronisasi`);
        } else {
          showToast("Cloud Supabase kosong (0 tamu)");
        }
      } else {
        showToast("Gagal menyinkronkan dengan database");
      }
    } catch {
      showToast("Koneksi Supabase gagal");
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  // Initial cloud sync on mount (async non-blocking without synchronous setState)
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isCancelled = false;

    fetchWeddingGuests()
      .then(({ data, error, source }) => {
        if (isCancelled) return;
        if (!error && source === "supabase") {
          if (data.length > 0) {
            mutateGuests(() => data);
          } else {
            const currentLocal = getGuestsSnapshot();
            if (currentLocal.length > 0) {
              batchUpsertWeddingGuests(currentLocal).catch(() => {});
            }
          }
        }
      })
      .catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, []);

  // Generate Guest URL & Message
  const getGuestUrl = useCallback(
    (name: string) => {
      const encoded = encodeURIComponent(name);
      return `${baseUrl}/?to=${encoded}`;
    },
    [baseUrl]
  );

  const getFormattedMessage = useCallback(
    (guest: GuestItem) => {
      const template = templates[guest.category] || templates.umum;
      const url = getGuestUrl(guest.name);
      return template.replace(/\[nama\]/g, guest.name).replace(/\[link\]/g, url);
    },
    [templates, getGuestUrl]
  );

  // Handlers
  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = singleName.trim();
    if (!trimmed) {
      showToast("Harap masukkan nama tamu!");
      return;
    }

    const newGuest: GuestItem = {
      id: "guest-" + Date.now(),
      name: trimmed,
      category: singleCategory,
      phone: singlePhone.trim(),
      isSent: false,
      createdAt: new Date().toISOString(),
    };

    saveGuests([newGuest, ...guests]);
    setSingleName("");
    setSinglePhone("");
    showToast(`✓ Tamu "${trimmed}" berhasil ditambahkan`);

    if (isSupabaseConfigured) {
      upsertWeddingGuest(newGuest).catch(() => {});
    }
  };

  const handleAddBulk = () => {
    const lines = bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast("Harap masukkan setidaknya satu nama tamu!");
      return;
    }

    const newGuests: GuestItem[] = lines.map((name, idx) => ({
      id: `bulk-${Date.now()}-${idx}`,
      name,
      category: bulkCategory,
      isSent: false,
      createdAt: new Date().toISOString(),
    }));

    saveGuests([...newGuests, ...guests]);
    setBulkText("");
    showToast(`✓ Berhasil menambahkan ${newGuests.length} tamu sekaligus`);

    if (isSupabaseConfigured) {
      batchUpsertWeddingGuests(newGuests).catch(() => {});
    }
  };

  const handleDeleteGuest = (id: string, name: string) => {
    if (confirm(`Hapus tamu "${name}" dari daftar?`)) {
      saveGuests(guests.filter((g) => g.id !== id));
      showToast("Tamu dihapus");
      if (isSupabaseConfigured) {
        deleteWeddingGuest(id).catch(() => {});
      }
    }
  };

  const handleToggleSent = (id: string) => {
    let updatedGuest: GuestItem | null = null;
    saveGuests(
      guests.map((g) => {
        if (g.id === id) {
          const nextSent = !g.isSent;
          updatedGuest = {
            ...g,
            isSent: nextSent,
            sentAt: nextSent ? new Date().toLocaleDateString("id-ID") : undefined,
          };
          return updatedGuest;
        }
        return g;
      })
    );
    if (isSupabaseConfigured && updatedGuest) {
      upsertWeddingGuest(updatedGuest).catch(() => {});
    }
  };

  const handleCopyLink = (guest: GuestItem) => {
    const url = getGuestUrl(guest.name);
    navigator.clipboard.writeText(url);
    showToast(`✓ Link undangan ${guest.name} disalin!`);
  };

  const handleCopyMessage = (guest: GuestItem) => {
    const msg = getFormattedMessage(guest);
    navigator.clipboard.writeText(msg);
    showToast(`✓ Pesan WhatsApp untuk ${guest.name} disalin!`);
  };

  const handleShareWhatsApp = (guest: GuestItem) => {
    const msg = getFormattedMessage(guest);
    const encoded = encodeURIComponent(msg);

    // Auto mark as sent
    if (!guest.isSent) {
      handleToggleSent(guest.id);
    }

    let waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    if (guest.phone) {
      let cleanPhone = guest.phone.replace(/[^0-9]/g, "");
      if (cleanPhone.startsWith("0")) {
        cleanPhone = "62" + cleanPhone.slice(1);
      }
      waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
    }

    window.open(waUrl, "_blank");
  };

  const handleClearAllGuests = () => {
    if (guests.length === 0) {
      showToast("Daftar tamu sudah kosong.");
      return;
    }
    if (
      confirm(
        "Yakin ingin mengosongkan semua data tamu? Semua data di perangkat ini dan di database Cloud Supabase akan terhapus."
      )
    ) {
      saveGuests([]);
      showToast("✓ Semua data tamu berhasil dikosongkan");
      if (isSupabaseConfigured) {
        clearAllWeddingGuests().catch(() => {});
      }
    }
  };

  const handleExportTxt = () => {
    const textContent = guests
      .map((g, idx) => `${idx + 1}. [${g.category.toUpperCase()}] ${g.name} - ${getGuestUrl(g.name)}`)
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daftar-tamu-fitri-irwan-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    showToast("✓ File daftar tamu berhasil diunduh");
  };

  // Filtered list
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchCategory = activeCategory === "all" || g.category === activeCategory;
      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "sent"
          ? g.isSent
          : !g.isSent;
      const matchSearch =
        searchQuery === "" ||
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.phone && g.phone.includes(searchQuery));
      return matchCategory && matchStatus && matchSearch;
    });
  }, [guests, activeCategory, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = guests.length;
    const sent = guests.filter((g) => g.isSent).length;
    const unsent = total - sent;
    const progress = total > 0 ? Math.round((sent / total) * 100) : 0;

    const byCat = {
      vip: guests.filter((g) => g.category === "vip").length,
      keluarga: guests.filter((g) => g.category === "keluarga").length,
      teman: guests.filter((g) => g.category === "teman").length,
      rekan: guests.filter((g) => g.category === "rekan").length,
      umum: guests.filter((g) => g.category === "umum").length,
    };

    return { total, sent, unsent, progress, byCat };
  }, [guests]);

  return (
    <div className="min-h-screen bg-[#0E1015] text-neutral-200 antialiased selection:bg-amber-500/30 pb-24 sm:pb-16">
      {/* ------------------------------------------------------------------- */}
      {/* TOP HEADER (Mobile First Navigation) */}
      {/* ------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#14161D]/90 backdrop-blur-md border-b border-[#252834] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="p-2 -ml-1 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1E212B] transition-colors"
              title="Kembali ke Undangan"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <h1 className="font-bold text-sm sm:text-base text-white leading-tight">
                  Manajemen Tamu
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-400">
                Fitri &amp; Irwan • WhatsApp Link Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSqlModalOpen(true)}
              className="p-2 rounded-xl bg-[#1E212B] hover:bg-[#282C3A] text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/20 active:scale-95 transition-all cursor-pointer"
              title="Skema Database Supabase & Kode SQL"
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline text-xs">SQL Supabase</span>
            </button>

            {isSupabaseConfigured && (
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="p-2 rounded-xl bg-[#1E212B] hover:bg-[#282C3A] text-emerald-300 text-xs font-semibold flex items-center gap-1 border border-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                title="Sinkronisasi Ulang Database Cloud Supabase"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="p-2 rounded-xl bg-[#1E212B] hover:bg-[#282C3A] text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="Kustomisasi Template Pesan WhatsApp"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Kata-Kata WA</span>
            </button>

            <button
              type="button"
              onClick={handleExportTxt}
              className="p-2 rounded-xl bg-[#1E212B] hover:bg-[#282C3A] text-neutral-300 text-xs font-semibold flex items-center gap-1 border border-neutral-700/40 active:scale-95 transition-all cursor-pointer"
              title="Unduh Daftar Tamu (TXT)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* MAIN CONTAINER (Mobile First Width Max-W-XL) */}
      {/* ------------------------------------------------------------------- */}
      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* STATS PROGRESS CARD */}
        <div className="bg-linear-to-br from-[#181A22] to-[#12141A] border border-[#2B2F3D] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Progress Pengiriman
                </span>
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] text-emerald-400 font-semibold">
                    <Cloud className="w-2.5 h-2.5" />
                    <span>Cloud Supabase</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] text-amber-300 font-semibold">
                    <Database className="w-2.5 h-2.5" />
                    <span>Lokal Offline</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white flex items-baseline gap-2">
                <span>{stats.sent}</span>
                <span className="text-xs font-normal text-neutral-400">
                  dari {stats.total} Tamu ({stats.progress}%)
                </span>
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-400">
              {stats.progress}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#242733] h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-linear-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          {/* Quick Counter Pills */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#1F222C] p-2 rounded-xl border border-[#2D3140]">
              <p className="text-[10px] text-neutral-400">Total Tamu</p>
              <p className="font-bold text-white text-sm">{stats.total}</p>
            </div>
            <div className="bg-[#1F222C] p-2 rounded-xl border border-emerald-500/30">
              <p className="text-[10px] text-emerald-400">Sudah Terkirim</p>
              <p className="font-bold text-emerald-400 text-sm">{stats.sent}</p>
            </div>
            <div className="bg-[#1F222C] p-2 rounded-xl border border-amber-500/30">
              <p className="text-[10px] text-amber-400">Belum Terkirim</p>
              <p className="font-bold text-amber-400 text-sm">{stats.unsent}</p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* INPUT TAMU: SATU OR MASAL (Tabs) */}
        {/* ----------------------------------------------------------------- */}
        <div className="bg-[#181A22] border border-[#2B2F3D] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262936]">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-white">Tambah Tamu Undangan</h3>
            </div>
            <div className="flex rounded-lg bg-[#111218] p-0.5 border border-[#282B37]">
              <button
                type="button"
                onClick={() => setInputMode("single")}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                  inputMode === "single"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Satu Tamu
              </button>
              <button
                type="button"
                onClick={() => setInputMode("bulk")}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                  inputMode === "bulk"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Masal (Banyak)
              </button>
            </div>
          </div>

          {/* TAB 1: INPUT SATU NAMA */}
          {inputMode === "single" ? (
            <form onSubmit={handleAddSingle} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Nama Tamu Undangan <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="Contoh: Bpk. Bambang & Istri, Ananda Dimas"
                  className="input-dark-tamu px-3 py-2.5 text-sm"
                />
              </div>

              {/* Kategori Picker Pills */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Kategori Tamu
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(["vip", "keluarga", "teman", "rekan", "umum"] as GuestCategory[]).map(
                    (cat) => {
                      const meta = CATEGORY_DETAILS[cat];
                      const Icon = meta.icon;
                      const isSelected = singleCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSingleCategory(cat)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                            isSelected
                              ? `${meta.bgColor} ${meta.borderColor} ${meta.color} shadow-xs`
                              : "bg-[#101217] border-[#2A2D3A] text-neutral-400 hover:text-neutral-200"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{meta.label}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* No WhatsApp Optional */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Nomor WhatsApp Tamu <span className="text-[10px] text-neutral-500">(Opsional)</span>
                </label>
                <input
                  type="tel"
                  value={singlePhone}
                  onChange={(e) => setSinglePhone(e.target.value)}
                  placeholder="08123456789 atau 628..."
                  className="input-dark-tamu px-3 py-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambahkan ke Daftar Tamu</span>
              </button>
            </form>
          ) : (
            /* TAB 2: INPUT MASAL */
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Daftar Nama Tamu <span className="text-neutral-400">(Satu nama per baris)</span>
                </label>
                <textarea
                  rows={4}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={`Bpk. Rahmat & Keluarga\nHj. Siti Maryam\nDimas Prasetyo\nFadhil & Partner\n...`}
                  className="input-dark-tamu p-3 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Kategori untuk Tamu Masal Ini
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(["vip", "keluarga", "teman", "rekan", "umum"] as GuestCategory[]).map(
                    (cat) => {
                      const meta = CATEGORY_DETAILS[cat];
                      const Icon = meta.icon;
                      const isSelected = bulkCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setBulkCategory(cat)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                            isSelected
                              ? `${meta.bgColor} ${meta.borderColor} ${meta.color} shadow-xs`
                              : "bg-[#101217] border-[#2A2D3A] text-neutral-400 hover:text-neutral-200"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{meta.label}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBulk}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Impor Semua Nama di Atas</span>
              </button>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* FILTER & SEARCH BAR */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu undangan..."
              className="input-dark-amber pl-9 pr-3 py-2 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white text-neutral-950 border-white font-bold"
                  : "bg-[#181A22] border-[#2A2E3B] text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Semua ({stats.total})
            </button>

            {(["vip", "keluarga", "teman", "rekan", "umum"] as GuestCategory[]).map((cat) => {
              const meta = CATEGORY_DETAILS[cat];
              const Icon = meta.icon;
              const isSelected = activeCategory === cat;
              const count = stats.byCat[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? `${meta.bgColor} ${meta.borderColor} ${meta.color} font-bold`
                      : "bg-[#181A22] border-[#2A2E3B] text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{meta.label}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Status Filter */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
            <span>
              Menampilkan {filteredGuests.length} dari {guests.length} tamu
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "all" ? "unsent" : statusFilter === "unsent" ? "sent" : "all"
                  )
                }
                className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Filter className="w-3 h-3" />
                <span>
                  Status: {statusFilter === "all" ? "Semua" : statusFilter === "unsent" ? "Belum Dikirim" : "Sudah Dikirim"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* GUEST LIST CARDS (Mobile First Action Card) */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-2.5">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12 px-4 bg-[#14161D] border border-dashed border-[#2B2F3D] rounded-2xl text-neutral-400">
              <Users className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
              <p className="text-sm font-semibold text-neutral-300">Tidak ada tamu yang cocok</p>
              <p className="text-xs text-neutral-500 mt-1">
                Ubah kata kunci pencarian atau tambahkan tamu baru di atas.
              </p>
            </div>
          ) : (
            filteredGuests.map((guest) => {
              const meta = CATEGORY_DETAILS[guest.category];
              const Icon = meta.icon;
              const guestUrl = getGuestUrl(guest.name);

              return (
                <div
                  key={guest.id}
                  className={`bg-[#181A22] border rounded-2xl p-3.5 shadow-md transition-all ${
                    guest.isSent ? "border-emerald-500/30 opacity-90" : "border-[#2D313F]"
                  }`}
                >
                  {/* Header Card: Name & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${meta.badgeColor}`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{meta.label}</span>
                        </span>

                        {guest.isSent ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terkirim</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/25">
                            <Clock className="w-3 h-3" />
                            <span>Belum Dikirim</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                        {guest.name}
                      </h4>

                      {guest.phone && (
                        <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          WA: {guest.phone}
                        </p>
                      )}
                    </div>

                    {/* Checkbox toggle status */}
                    <button
                      type="button"
                      onClick={() => handleToggleSent(guest.id)}
                      className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                        guest.isSent
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                          : "bg-[#111218] border-[#2C2F3E] text-neutral-500 hover:text-white"
                      }`}
                      title={guest.isSent ? "Tandai belum dikirim" : "Tandai sudah dikirim"}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ACTION BUTTONS (The core requirement: Tinggal Klik Bagikan) */}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#252835]">
                    {/* Primary Button: Bagikan via WhatsApp */}
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(guest)}
                      className="col-span-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                      title="Kirim undangan langsung via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                      <span>Kirim WhatsApp</span>
                    </button>

                    {/* Copy Full Message */}
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(guest)}
                      className="py-2 px-2 rounded-xl bg-[#222530] hover:bg-[#2C3040] text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1 border border-[#34384A] active:scale-95 transition-all cursor-pointer"
                      title="Salin kata-kata WhatsApp lengkap beserta link"
                    >
                      <Copy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Salin Pesan</span>
                    </button>

                    {/* Quick Preview Link */}
                    <a
                      href={guestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 rounded-xl bg-[#222530] hover:bg-[#2C3040] text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1 border border-[#34384A] active:scale-95 transition-all"
                      title="Buka tampilan undangan persis seperti yang akan dilihat tamu"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Lihat</span>
                    </a>
                  </div>

                  {/* Secondary subtle actions: Copy link & Delete */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2 pt-1.5 border-t border-[#20232E]">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(guest)}
                      className="hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Salin URL Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewGuest(guest)}
                      className="hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Pratinjau Teks</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(guest.id, guest.name)}
                      className="hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* BOTTOM HELPER */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
          <button
            type="button"
            onClick={handleClearAllGuests}
            className="hover:text-rose-400 text-neutral-400 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500/80" />
            <span>Kosongkan Semua Data</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSqlModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Lihat SQL Supabase</span>
            </button>
            <span className="text-neutral-700">•</span>
            <Link href="/admin" className="text-amber-400 hover:underline">
              Buka Canva Studio &rarr;
            </Link>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------------- */}
      {/* MODAL 1: PREVIEW TEKS UNDANGAN SPESIFIK TAMU */}
      {/* ------------------------------------------------------------------- */}
      {previewGuest && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
        >
          <div className="bg-[#181A22] border border-[#2D313F] rounded-2xl max-w-lg w-full p-5 text-neutral-200 shadow-2xl relative">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Pratinjau Pesan WhatsApp
                </span>
                <h3 className="font-bold text-base text-white">{previewGuest.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewGuest(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-[#222530]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#101217] border border-[#272A38] rounded-xl p-3.5 max-h-64 overflow-y-auto font-sans text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed mb-4">
              {getFormattedMessage(previewGuest)}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleShareWhatsApp(previewGuest);
                  setPreviewGuest(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Kirim ke WhatsApp Sekarang</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCopyMessage(previewGuest);
                  setPreviewGuest(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-[#222530] hover:bg-[#2C3040] text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Salin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL 2: KUSTOMISASI KATA-KATA PESAN PER KATEGORI */}
      {/* ------------------------------------------------------------------- */}
      {isTemplateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
        >
          <div className="bg-[#181A22] border border-[#2D313F] rounded-2xl max-w-lg w-full p-5 text-neutral-200 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-3 shrink-0">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Kustomisasi Kata-Kata WhatsApp</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Gunakan <code className="text-amber-400 font-mono">[nama]</code> dan{" "}
                  <code className="text-cyan-400 font-mono">[link]</code> untuk personalisasi otomatis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-[#222530]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 shrink-0 no-scrollbar">
              {(["vip", "keluarga", "teman", "rekan", "umum"] as GuestCategory[]).map((cat) => {
                const meta = CATEGORY_DETAILS[cat];
                const Icon = meta.icon;
                const isSelected = editingTemplateCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEditingTemplateCategory(cat)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? `${meta.bgColor} ${meta.borderColor} ${meta.color}`
                        : "bg-[#111218] border-[#2A2D3A] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Template Editor Textarea */}
            <div className="flex-1 overflow-y-auto my-2">
              <textarea
                rows={11}
                value={templates[editingTemplateCategory]}
                onChange={(e) => {
                  mutateTemplates((prev) => ({
                    ...prev,
                    [editingTemplateCategory]: e.target.value,
                  }));
                }}
                className="input-dark-amber p-3 text-xs leading-relaxed font-sans"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#262936] shrink-0">
              <button
                type="button"
                onClick={() => {
                  mutateTemplates((prev) => ({
                    ...prev,
                    [editingTemplateCategory]: DEFAULT_MESSAGE_TEMPLATES[editingTemplateCategory],
                  }));
                  showToast("Template dikembalikan ke bawaan");
                }}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Kembalikan Bawaan
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsTemplateModalOpen(false);
                  showToast("✓ Template berhasil disimpan!");
                }}
                className="py-2 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Selesai &amp; Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL 3: SQL SCHEMA SUPABASE & TUTORIAL RUN QUERY */}
      {/* ------------------------------------------------------------------- */}
      {isSqlModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
        >
          <div className="bg-[#181A22] border border-[#2D313F] rounded-2xl max-w-lg w-full p-5 text-neutral-200 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">SQL Schema Supabase</h3>
                  <p className="text-xs text-neutral-400">
                    Tabel <code className="text-amber-300 font-mono">wedding_guests</code> agar data tersimpan permanen
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSqlModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-[#222530]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed shrink-0">
              <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Langkah Eksekusi di Supabase:
              </p>
              <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-neutral-300">
                <li>Buka dashboard Supabase project Anda</li>
                <li>Klik menu <strong>SQL Editor</strong> di panel sebelah kiri</li>
                <li>Klik <strong>New query</strong>, lalu klik tombol Salin SQL di bawah dan paste</li>
                <li>Klik tombol hijau <strong>Run</strong></li>
              </ol>
            </div>

            {/* Code Block */}
            <div className="relative flex-1 overflow-hidden rounded-xl border border-[#2B2F3D] bg-[#0E1015] my-2">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#151720] border-b border-[#252834] text-[11px] text-neutral-400">
                <span className="font-mono text-cyan-400">schema.sql &rarr; wedding_guests</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`-- 4. Tabel Manajemen Daftar Tamu Undangan
CREATE TABLE IF NOT EXISTS wedding_guests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vip', 'keluarga', 'teman', 'rekan', 'umum')),
  phone TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  is_sent BOOLEAN DEFAULT false,
  sent_at TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pencarian & sorting tamu undangan
CREATE INDEX IF NOT EXISTS idx_wedding_guests_created_at ON wedding_guests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_category ON wedding_guests(category);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_is_sent ON wedding_guests(is_sent);

ALTER TABLE wedding_guests ENABLE ROW LEVEL SECURITY;

-- Policy: Akses publik untuk membaca dan mengelola tamu
CREATE POLICY "Public guests read access"
  ON wedding_guests FOR SELECT
  USING (true);

CREATE POLICY "Public guests insert access"
  ON wedding_guests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public guests update access"
  ON wedding_guests FOR UPDATE
  USING (true);

CREATE POLICY "Public guests delete access"
  ON wedding_guests FOR DELETE
  USING (true);`);
                    setIsCopiedSql(true);
                    showToast("✓ Kode SQL berhasil disalin ke clipboard!");
                    setTimeout(() => setIsCopiedSql(false), 2500);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  {isCopiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin SQL</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 text-[11px] font-mono text-neutral-300 overflow-auto max-h-52 leading-relaxed select-all">
{`-- 4. Tabel Manajemen Daftar Tamu Undangan
CREATE TABLE IF NOT EXISTS wedding_guests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vip', 'keluarga', 'teman', 'rekan', 'umum')),
  phone TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  is_sent BOOLEAN DEFAULT false,
  sent_at TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pencarian & sorting tamu undangan
CREATE INDEX IF NOT EXISTS idx_wedding_guests_created_at ON wedding_guests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_category ON wedding_guests(category);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_is_sent ON wedding_guests(is_sent);

ALTER TABLE wedding_guests ENABLE ROW LEVEL SECURITY;

-- Policy: Akses publik untuk membaca dan mengelola tamu
CREATE POLICY "Public guests read access"
  ON wedding_guests FOR SELECT
  USING (true);

CREATE POLICY "Public guests insert access"
  ON wedding_guests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public guests update access"
  ON wedding_guests FOR UPDATE
  USING (true);

CREATE POLICY "Public guests delete access"
  ON wedding_guests FOR DELETE
  USING (true);`}
              </pre>
            </div>

            <div className="pt-2 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsSqlModalOpen(false)}
                className="py-2 px-5 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* FLOATING TOAST NOTIFICATION */}
      {/* ------------------------------------------------------------------- */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1D202B] text-emerald-300 border border-emerald-500/40 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
