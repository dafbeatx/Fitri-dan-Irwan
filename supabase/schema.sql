-- Schema Supabase untuk Undangan Pernikahan Fitri & Irwan
-- Jalankan query ini di SQL Editor dashboard Supabase Anda

-- 1. Tabel Buku Tamu (Ucapan & Doa)
CREATE TABLE IF NOT EXISTS wedding_guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship TEXT DEFAULT 'Tamu Undangan',
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

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


-- Data Awal Contoh Ucapan Hangat (Optional)
INSERT INTO wedding_guestbook (name, relationship, attendance, message)
VALUES 
  ('Keluarga Besar Bpk. Rahmat', 'Keluarga', 'hadir', 'Barakallahu lakuma wa baraka alaika wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru untuk Fitri dan Irwan. Semoga senantiasa sakinah mawaddah warahmah.'),
  ('Dimas & Rina', 'Sahabat', 'hadir', 'Selamat berbahagia sahabatku Irwan dan Fitri! Lancar sampai hari H, semoga menjadi keluarga yang bahagia selamanya.'),
  ('Siti Nurhaliza', 'Teman Kerja', 'hadir', 'Selamat Fitri! Semoga selalu dipenuhi keberkahan dan kebahagiaan dalam membina rumah tangga baru.')
ON CONFLICT DO NOTHING;
