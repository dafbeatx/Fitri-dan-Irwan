# Prompt untuk AI Agent

Kamu adalah senior frontend engineer. Lanjutkan proyek undangan digital **Fitri & Irwan** di repository ini.

## Aturan wajib
- Baca `README.md` dan `src/main.jsx` serta `src/styles.css` sebelum mengubah kode.
- Pertahankan nama proyek, React + Vite, desain romantis floral, dan foto asli `public/fitri-irwan-asli.png`.
- Jangan mengubah, meregenerasi, atau mempercantik wajah pasangan.
- Jangan mengarang nomor WhatsApp, rekening, nama orang tua, detail lokasi, atau informasi acara yang belum diberikan.
- Jangan menaruh secret/service-role key di kode frontend.
- Jaga ukuran bundle dan request jaringan tetap ringan.
- Jangan menambahkan dependency tanpa alasan yang jelas.
- Setelah perubahan, jalankan `npm run build` dan perbaiki semua error.

## Data acara yang sudah diberikan
- Nama: Fitri & Irwan
- Tanggal: Jumat, 23 Oktober 2026
- Akad: 08.00 WIB sampai selesai
- Resepsi: 08.00–16.00 WIB
- Alamat: Kp. Cemplang RT 03/RW 09, Desa Sukamaju, Kecamatan Cibungbulang, Kabupaten Bogor
- Fitur yang diinginkan: Google Maps, RSVP, countdown, musik latar, buku tamu digital, amplop digital
- Target: siap deploy ke Vercel

## Kondisi prototipe saat ini
- Nama tamu di URL menggunakan parameter `?to=Nama%20Tamu`.
- Countdown berjalan di sisi klien.
- Maps mencari alamat melalui query teks; minta tautan pin yang tepat jika diperlukan.
- RSVP menyiapkan draf pesan WhatsApp dan membiarkan tamu memilih penerima karena nomor tujuan belum diberikan.
- Buku tamu tersimpan pada localStorage dan belum dibagikan antarperangkat.
- Musik dan detail amplop digital belum aktif karena aset/data belum diberikan.

## Prioritas implementasi berikutnya
1. Pastikan navigasi dan layout responsif serta aksesibel.
2. Ubah kontrol musik menjadi pemutar yang benar-benar berfungsi setelah pemilik menyediakan file audio berizin.
3. Jika pemilik menginginkan RSVP dan buku tamu bersama, usulkan Supabase. Buat skema minimum, aktifkan RLS, validasi input, batasi spam, dan jelaskan konfigurasi environment tanpa mengekspos secret.
4. Jangan aktifkan detail amplop digital sampai pemilik memberikan dan memverifikasi informasi yang benar.
5. Perbarui README untuk setiap perubahan konfigurasi/deployment.
