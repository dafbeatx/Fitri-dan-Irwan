# Undangan Digital Fitri & Irwan

Starter website undangan pernikahan berbasis React + Vite, siap dibangun dan dideploy ke Vercel.

## Isi
- Cover floral romantis dan foto pasangan yang disediakan.
- Nama tamu melalui URL, contoh `?to=Keluarga%20Bapak%20Ahmad`.
- Hitung mundur ke 23 Oktober 2026 pukul 08.00 WIB.
- Detail akad, resepsi, dan tautan pencarian lokasi Google Maps.
- RSVP menyiapkan draf pesan WhatsApp, tanpa mengarang nomor penerima.
- Buku tamu disimpan di localStorage browser untuk prototipe.
- Bagian amplop digital tidak menampilkan rekening yang belum diberikan.

## Jalankan lokal
Pastikan Node.js LTS sudah terpasang.

```bash
npm install
npm run dev
```

## Build produksi
```bash
npm run build
npm run preview
```

## Deploy ke Vercel
1. Unggah folder project ke repository GitHub.
2. Di Vercel, pilih **Add New → Project**, lalu impor repository.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## Hal penting sebelum dipublikasikan
1. Pastikan detail acara, ejaan nama, alamat, dan tanggal sudah benar.
2. Tanggal 23 Oktober 2026 jatuh pada hari Jumat.
3. Link Google Maps saat ini mencari alamat berdasarkan teks. Periksa hasil pin di peta dan ganti dengan link pin yang tepat bila sudah tersedia.
4. Musik latar belum aktif karena belum ada file audio berlisensi. Bila punya file yang berhak digunakan, simpan sebagai `public/music.mp3` lalu tambahkan pemutar audio.
5. RSVP saat ini membuka draf WhatsApp dan tamu memilih sendiri kontak penerima. Agar diarahkan ke nomor tertentu, perlu nomor WhatsApp tujuan.
6. Buku tamu hanya tersimpan pada browser/perangkat masing-masing. Untuk data bersama yang bisa dibaca semua pengunjung, sambungkan Supabase atau layanan formulir. Jangan menganggap localStorage sebagai database bersama.
7. Amplop digital masih berupa informasi placeholder. Tambahkan metode dan detail pembayaran hanya setelah datanya diberikan dan diverifikasi.
8. Jangan mengunggah data rekening, nomor pribadi, atau informasi sensitif ke repositori publik tanpa pertimbangan.

## Canva: panduan agar editable
Gambar referensi AI bukan dokumen Canva ber-layer. Untuk hasil editable:
1. Buat desain baru ukuran **1080 × 1920 px** (cover mobile vertikal).
2. Unggah `public/fitri-irwan-asli.png` dan gunakan foto asli, bukan hasil generasi ulang.
3. Buat background warna `#F8F2ED`.
4. Tambahkan elemen bunga watercolor blush/ivory dan daun sage pada sudut atas kanan serta bawah kiri. Cari elemen dengan kata kunci `blush watercolor floral`, `sage botanical branch`, dan `minimal gold line`.
5. Tempatkan foto asli di bagian bawah atau sisi cover. Jangan gunakan fitur AI yang mengubah wajah. Jika menghapus latar, periksa hasilnya manual dan pertahankan wajah.
6. Gunakan `Great Vibes` untuk nama, `Cormorant Garamond` untuk judul/tanggal, dan `DM Sans` untuk teks kecil.
7. Palet: krem `#F8F2ED`, rose tua `#713C3C`, blush `#DCA9A6`, sage `#858B73`, teks `#55453D`.
8. Tambahkan teks terpisah: `THE WEDDING OF`, `Fitri & Irwan`, `23 Oktober 2026`, dan `Kepada Yth. [Nama Tamu]`.
9. Pastikan semua ornamen dan teks merupakan elemen terpisah; jangan ekspor lalu mengunggah ulang sebagai satu gambar jika ingin tetap editable.
10. Ekspor PNG untuk cover website dan simpan desain Canva sebagai master yang bisa diedit.

## Fitur produksi berikutnya
Untuk RSVP dan buku tamu lintas perangkat, gunakan Supabase dengan tabel khusus, validasi input, dan Row Level Security. Simpan kunci rahasia hanya di environment server, bukan di frontend. Tambahkan audio hanya dengan file yang memiliki izin penggunaan.
