-- Schema Supabase untuk Undangan Pernikahan Fitri & Irwan
-- Jalankan query ini di SQL Editor dashboard Supabase Anda

-- 1. Tabel Buku Tamu (Ucapan & Doa)
CREATE TABLE IF NOT EXISTS wedding_guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship TEXT DEFAULT 'Tamu Undangan',
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  message TEXT NOT NULL,
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migrasi tambahan jika tabel wedding_guestbook sudah ada sebelumnya
ALTER TABLE wedding_guestbook ADD COLUMN IF NOT EXISTS photo_url TEXT DEFAULT '';

-- Index untuk mempercepat query ucapan terbaru
CREATE INDEX IF NOT EXISTS idx_wedding_guestbook_created_at ON wedding_guestbook(created_at DESC);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE wedding_guestbook ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja dapat melihat ucapan doa
CREATE POLICY "Public guestbook read access"
  ON wedding_guestbook FOR SELECT
  USING (true);

-- Policy: Siapa saja dapat mengirim ucapan doa
CREATE POLICY "Public guestbook insert access"
  ON wedding_guestbook FOR INSERT
  WITH CHECK (true);

-- Policy: Admin / Pengantin dapat menghapus / mereset ucapan
CREATE POLICY "Public guestbook delete access"
  ON wedding_guestbook FOR DELETE
  USING (true);


-- 2. Tabel Konfirmasi Kehadiran (RSVP)
CREATE TABLE IF NOT EXISTS wedding_rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  guests_count INTEGER DEFAULT 1 CHECK (guests_count >= 1 AND guests_count <= 5),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wedding_rsvp_created_at ON wedding_rsvp(created_at DESC);

ALTER TABLE wedding_rsvp ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja dapat mengirim RSVP
CREATE POLICY "Public rsvp insert access"
  ON wedding_rsvp FOR INSERT
  WITH CHECK (true);

-- Policy: Publik dapat membaca data statistik RSVP
CREATE POLICY "Public rsvp read access"
  ON wedding_rsvp FOR SELECT
  USING (true);


-- 3. Tabel Konfigurasi Desain Undangan (Cover, Tipografi, Ornamen Canva Multi-Device)
CREATE TABLE IF NOT EXISTS wedding_config (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE wedding_config ENABLE ROW LEVEL SECURITY;

-- Policy: Publik / HP Tamu dapat membaca konfigurasi desain cover
CREATE POLICY "Public config read access"
  ON wedding_config FOR SELECT
  USING (true);

-- Policy: Admin dapat menyimpan dan memperbarui konfigurasi desain cover
CREATE POLICY "Public config insert access"
  ON wedding_config FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public config update access"
  ON wedding_config FOR UPDATE
  USING (true);


-- 4. Tabel Manajemen Daftar Tamu Undangan
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

-- Policy: Akses baca, tambah, ubah status, dan hapus tamu
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
  USING (true);


-- Catatan: Tabel buku tamu dimulai dalam keadaan bersih tanpa data dummy.

