import { createClient } from "@supabase/supabase-js";
import { GuestbookEntry, RsvpSubmission, GuestItem, GuestCategory } from "@/types/wedding";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

const LOCAL_STORAGE_GUESTBOOK_KEY = "fitri_irwan_guestbook_entries";
const LOCAL_STORAGE_RSVP_KEY = "fitri_irwan_rsvp_entries";

export const SEED_SAMPLE_NAMES = [
  "Keluarga Besar Bpk. Rahmat",
  "Dimas & Rina",
  "Siti Nurhaliza",
];

export async function getGuestbookEntries(): Promise<{
  data: GuestbookEntry[];
  error: Error | null;
  source: "supabase" | "local";
}> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("wedding_guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase guestbook fetch failed, using fallback:", error.message);
        return { data: getLocalGuestbookEntries(), error: null, source: "local" };
      }

      // Filter out seed/dummy data so the live Vercel app starts completely clean
      const rawList = (data as GuestbookEntry[]) || [];
      const cleanData = rawList.filter(
        (item) => !SEED_SAMPLE_NAMES.includes(item.name?.trim())
      );

      return { data: cleanData, error: null, source: "supabase" };
    } catch (err) {
      console.warn("Error connecting to Supabase:", err);
      return { data: getLocalGuestbookEntries(), error: null, source: "local" };
    }
  }

  return { data: getLocalGuestbookEntries(), error: null, source: "local" };
}

export async function deleteGuestbookEntry(
  id: string
): Promise<{ success: boolean; error: Error | null }> {
  if (typeof window !== "undefined") {
    try {
      const current = getLocalGuestbookEntries();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_GUESTBOOK_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Local guestbook delete error:", err);
    }
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("wedding_guestbook").delete().eq("id", id);
      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

export async function clearAllGuestbookEntries(): Promise<{
  success: boolean;
  error: Error | null;
}> {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(LOCAL_STORAGE_GUESTBOOK_KEY);
    } catch (err) {
      console.error("Local guestbook clear error:", err);
    }
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("wedding_guestbook")
        .delete()
        .neq("name", "__NONE_RECORD__");
      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

export async function addGuestbookEntry(
  entry: Omit<GuestbookEntry, "id" | "created_at">
): Promise<{ success: boolean; error: Error | null; entry: GuestbookEntry }> {
  const newEntry: GuestbookEntry = {
    ...entry,
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `guest-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const insertPayload: Record<string, unknown> = {
        name: entry.name,
        relationship: entry.relationship || "Tamu Undangan",
        attendance: entry.attendance,
        message: entry.message,
      };
      if (entry.photo_url) {
        insertPayload.photo_url = entry.photo_url;
      }

      let res = await supabase
        .from("wedding_guestbook")
        .insert([insertPayload])
        .select()
        .single();

      // Graceful fallback if database column 'photo_url' hasn't been added yet in user's Supabase
      if (res.error && entry.photo_url && res.error.message.includes("photo_url")) {
        console.warn("Supabase photo_url column not found, inserting without photo_url:", res.error.message);
        res = await supabase
          .from("wedding_guestbook")
          .insert([
            {
              name: entry.name,
              relationship: entry.relationship || "Tamu Undangan",
              attendance: entry.attendance,
              message: entry.message,
            },
          ])
          .select()
          .single();
      }

      if (res.error) {
        throw res.error;
      }

      // Also keep local sync (preserving photo_url if provided)
      const finalEntry: GuestbookEntry = {
        ...(res.data as GuestbookEntry),
        photo_url: (res.data as GuestbookEntry)?.photo_url || entry.photo_url || "",
      };
      saveLocalGuestbookEntry(finalEntry);
      return { success: true, error: null, entry: finalEntry };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      // Fallback save locally
      saveLocalGuestbookEntry(newEntry);
      return { success: true, error: errorObj, entry: newEntry };
    }
  }

  saveLocalGuestbookEntry(newEntry);
  return { success: true, error: null, entry: newEntry };
}

export async function submitRsvp(
  submission: RsvpSubmission
): Promise<{ success: boolean; error: Error | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("wedding_rsvp").insert([
        {
          name: submission.name,
          phone: submission.phone || null,
          attendance: submission.attendance,
          guests_count: submission.guests_count,
          message: submission.message || null,
        },
      ]);

      if (error) throw error;
      saveLocalRsvp(submission);
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      saveLocalRsvp(submission);
      return { success: true, error: errorObj };
    }
  }

  saveLocalRsvp(submission);
  return { success: true, error: null };
}

function getLocalGuestbookEntries(): GuestbookEntry[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_GUESTBOOK_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out previous mock init entries and seed sample names
    const realEntries = parsed.filter(
      (item: GuestbookEntry) =>
        !item.id?.startsWith("init-") && !SEED_SAMPLE_NAMES.includes(item.name?.trim())
    );
    if (realEntries.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_GUESTBOOK_KEY, JSON.stringify(realEntries));
    }
    return realEntries;
  } catch {
    return [];
  }
}

function saveLocalGuestbookEntry(entry: GuestbookEntry): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalGuestbookEntries();
    const updated = [entry, ...current.filter((item) => item.id !== entry.id)];
    localStorage.setItem(LOCAL_STORAGE_GUESTBOOK_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save guestbook locally:", err);
  }
}

function saveLocalRsvp(submission: RsvpSubmission): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RSVP_KEY);
    const current = raw ? JSON.parse(raw) : [];
    current.push({ ...submission, submitted_at: new Date().toISOString() });
    localStorage.setItem(LOCAL_STORAGE_RSVP_KEY, JSON.stringify(current));
  } catch (err) {
    console.error("Failed to save RSVP locally:", err);
  }
}

// ---------------------------------------------------------------------------
// Wedding Guests CRUD (Database Supabase & Multi-Device Sync)
// ---------------------------------------------------------------------------

export async function fetchWeddingGuests(): Promise<{
  data: GuestItem[];
  error: Error | null;
  source: "supabase" | "local";
}> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("wedding_guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase wedding_guests fetch failed:", error.message);
        return { data: [], error: new Error(error.message), source: "local" };
      }

      const mapped: GuestItem[] = (data || []).map((row: Record<string, unknown>) => ({
        id: String(row.id),
        name: String(row.name),
        category: (row.category as GuestCategory) || "umum",
        phone: typeof row.phone === "string" ? row.phone : "",
        notes: typeof row.notes === "string" ? row.notes : "",
        isSent: Boolean(row.is_sent),
        sentAt: typeof row.sent_at === "string" ? row.sent_at : undefined,
        createdAt: typeof row.created_at === "string" ? row.created_at : new Date().toISOString(),
      }));

      return { data: mapped, error: null, source: "supabase" };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { data: [], error: errorObj, source: "local" };
    }
  }

  return { data: [], error: null, source: "local" };
}

export async function upsertWeddingGuest(
  guest: GuestItem
): Promise<{ success: boolean; error: Error | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("wedding_guests").upsert(
        {
          id: guest.id,
          name: guest.name,
          category: guest.category,
          phone: guest.phone || "",
          notes: guest.notes || "",
          is_sent: guest.isSent,
          sent_at: guest.sentAt || null,
          created_at: guest.createdAt,
        },
        { onConflict: "id" }
      );

      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

export async function batchUpsertWeddingGuests(
  guests: GuestItem[]
): Promise<{ success: boolean; error: Error | null }> {
  if (guests.length === 0) return { success: true, error: null };
  if (isSupabaseConfigured && supabase) {
    try {
      const rows = guests.map((guest) => ({
        id: guest.id,
        name: guest.name,
        category: guest.category,
        phone: guest.phone || "",
        notes: guest.notes || "",
        is_sent: guest.isSent,
        sent_at: guest.sentAt || null,
        created_at: guest.createdAt,
      }));

      const { error } = await supabase
        .from("wedding_guests")
        .upsert(rows, { onConflict: "id" });

      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

export async function deleteWeddingGuest(
  id: string
): Promise<{ success: boolean; error: Error | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("wedding_guests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

export async function clearAllWeddingGuests(): Promise<{
  success: boolean;
  error: Error | null;
}> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("wedding_guests")
        .delete()
        .neq("id", "__none__");

      if (error) throw error;
      return { success: true, error: null };
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      return { success: false, error: errorObj };
    }
  }
  return { success: true, error: null };
}

