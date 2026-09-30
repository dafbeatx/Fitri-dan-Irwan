# Undangan Pernikahan Digital: Fitri & Irwan

Aplikasi web undangan pernikahan digital modern, anggun, dan responsif yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan siap terintegrasi penuh dengan **Supabase**, **GitHub**, serta **Vercel**.

---

## Fitur Utama

1. **Sampul Undangan Interaktif (Opening Envelope):**
   - Animasi buka undangan yang anggun.
   - Personalisasi nama tamu otomatis melalui URL query: `?to=Nama+Tamu` (contoh: `https://domain-anda.vercel.app/?to=Bapak+Ahmad+sekeluarga`).
   - Trigger otomatis pemutaran musik latar saat tombol "Buka Undangan" ditekan.

2. **Musik Latar (Background Music):**
   - Kontrol play/pause mengambang yang sopan dan mudah diakses.
   - Dilengkapi synthesizer melodi akustik harmonis otomatis via Web Audio API jika file audio lokal belum terpasang.

3. **Profil Mempelai & Doa Pernikahan:**
   - Kutipan suci QS. Ar-Rum Ayat 21 dalam kaligrafi Arab (*Amiri*) dan terjemahan bahasa Indonesia.
   - Profil Fitriani (Mempelai Wanita) dan Irwan (Mempelai Pria) beserta tautan Instagram.

4. **Rangkaian Acara & Countdown Timer:**
   - Informasi detail Akad Nikah dan Resepsi Pernikahan.
   - Hitung mundur hari bahagia secara real-time.
   - Tombol integrasi langsung **"Simpan Tanggal ke Google Calendar"**.

5. **Peta & Petunjuk Arah:**
   - Preview interaktif Google Maps.
   - Tombol navigasi langsung ke aplikasi Google Maps.

6. **Kisah Cinta (Love Story Timeline):**
   - Rekam jejak perjalanan cinta dari awal jumpa (2021) hingga menuju pelaminan (2026).

7. **Galeri Momen Bahagia:**
   - Grid foto responsif dengan viewer modal lightbox layar penuh (mendukung keyboard ESC untuk menutup).

8. **Buku Tamu & RSVP (Supabase Integration):**
   - Formulir konfirmasi kehadiran tamu (Hadir, Ragu-ragu, Tidak Hadir) beserta jumlah tamu.
   - Feed ucapan & doa restu dengan badge hubungan dan status kehadiran.
   - **Mode Dual-Engine:** Berjalan mulus di mode offline/lokal saat ini dan langsung tersinkronisasi otomatis begitu kredensial Supabase dimasukkan.
   - Efek perayaan konfeti saat tamu berhasil mengirimkan ucapan atau konfirmasi.

9. **Amplop Digital (Tanda Kasih):**
   - Nomor rekening BCA dan Bank Mandiri dengan fitur **1-Click Salin Nomor Rekening**.
   - Modal QRIS Tanda Kasih yang dapat dipindai oleh semua m-Banking dan e-Wallet.
   - Tombol konfirmasi transfer langsung via WhatsApp.

---

## Struktur Proyek

```text
├── src/
│   ├── app/
│   │   ├── globals.css         # Styling tema Botanical Sage & Gold (Tailwind v4)
│   │   ├── layout.tsx          # Font Cormorant, Plus Jakarta Sans, Alex Brush, Amiri
│   │   └── page.tsx            # Entry point dengan boundary Suspense
│   ├── components/             # Komponen antarmuka per bagian
│   ├── config/
│   │   └── wedding-data.ts     # Konfigurasi data mempelai, jadwal, rekening, dsb.
│   ├── lib/
│   │   └── supabase.ts         # Klien Supabase dengan fallback penyimpanan lokal
│   └── types/
│       └── wedding.ts          # Type definition TypeScript
├── supabase/
│   └── schema.sql              # Script SQL tabel & RLS untuk database Supabase
├── DESIGN.md                   # Spesifikasi desain & prinsip antislop
└── AGENTS.md                   # Instruksi agent & pointer antislop
```

---

## Panduan Menjalankan Proyek

### 1. Menjalankan secara Lokal

```bash
# Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:3000` atau uji personalisasi nama tamu di:
`http://localhost:3000/?to=Bapak+Budi+Sekeluarga`

### 2. Menghubungkan ke Supabase

1. Buat proyek baru di [Supabase](https://supabase.com).
2. Masuk ke menu **SQL Editor**, buka file `supabase/schema.sql` dari proyek ini, lalu salin dan jalankan kueri tersebut untuk membuat tabel `wedding_guestbook` dan `wedding_rsvp`.
3. Buat file `.env.local` di folder root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://proyek-anda.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci-anon-anda
   ```
4. Restart server Next.js Anda. Aplikasi akan otomatis berpindah dari mode penyimpanan lokal ke database Supabase Cloud.

### 3. Mengunggah ke GitHub & Deploy ke Vercel

```bash
# Tambahkan perubahan ke Git
git add .
git commit -m "feat: inisialisasi undangan pernikahan digital Fitri dan Irwan"

# Hubungkan ke repository GitHub Anda
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```

Setelah kode berada di GitHub:
1. Buka [Vercel](https://vercel.com) dan impor repository GitHub tersebut.
2. Pada bagian **Environment Variables** di Vercel, masukkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Klik **Deploy**. Website undangan pernikahan Anda siap disebarkan ke keluarga dan sahabat tercinta!
