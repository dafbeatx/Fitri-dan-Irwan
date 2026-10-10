import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CoverConfig } from "@/lib/coverConfig";
import defaultSavedConfig from "@/config/saved-cover-config.json";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const LOCAL_FALLBACK_FILE = path.join(process.cwd(), "src", "config", "saved-cover-config.json");

export async function GET() {
  // 1. Try Supabase cloud database first (synchronized across all devices)
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("wedding_config")
        .select("data")
        .eq("id", "cover_config")
        .maybeSingle();

      if (!error && data?.data) {
        return NextResponse.json({
          source: "supabase",
          config: data.data,
        });
      }
    } catch (err) {
      console.warn("Gagal membaca cover config dari Supabase:", err);
    }
  }

  // 2. Try saved local JSON file (server-side build fallback)
  try {
    if (fs.existsSync(LOCAL_FALLBACK_FILE)) {
      const fileData = fs.readFileSync(LOCAL_FALLBACK_FILE, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({
        source: "file",
        config: { ...defaultSavedConfig, ...parsed },
      });
    }
  } catch (err) {
    console.warn("Gagal membaca saved-cover-config.json:", err);
  }

  // 3. Fallback to default
  return NextResponse.json({
    source: "default",
    config: defaultSavedConfig as unknown as CoverConfig,
  });
}

export async function POST(req: Request) {
  try {
    const body: CoverConfig = await req.json();

    let savedToSupabase = false;
    let supabaseError: string | null = null;

    // 1. Save to Supabase cloud database so all phones and other devices receive it
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("wedding_config").upsert(
          {
            id: "cover_config",
            data: body,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

        if (error) {
          supabaseError = error.message;
          console.warn("Gagal menyimpan ke Supabase wedding_config:", error.message);
        } else {
          savedToSupabase = true;
        }
      } catch (err: unknown) {
        supabaseError = err instanceof Error ? err.message : String(err);
      }
    }

    // 2. Also save to local JSON file if writable (e.g. dev environment)
    try {
      fs.writeFileSync(LOCAL_FALLBACK_FILE, JSON.stringify(body, null, 2), "utf-8");
    } catch {
      // Ignored in read-only serverless environments like Vercel
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      supabaseError,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Terjadi kesalahan internal",
      },
      { status: 500 }
    );
  }
}
