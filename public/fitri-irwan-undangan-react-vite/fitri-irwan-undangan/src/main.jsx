import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapPin, CalendarDays, Clock3, Music2, Music, Heart, Send, Copy, Check, Menu, X, Gift, MessageCircle, Sparkles } from "lucide-react";
import "./styles.css";

const WEDDING_DATE = new Date("2026-10-23T08:00:00+07:00");
const ADDRESS = "Kp. Cemplang RT 03/RW 09, Desa Sukamaju, Kecamatan Cibungbulang, Kabupaten Bogor";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);
const INVITATION_URL = typeof window !== "undefined" ? window.location.href : "";
const guestFromUrl = () => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("to") || "";
};

function FloralCorner({ className = "" }) {
  return <svg className={`floral-corner ${className}`} viewBox="0 0 220 190" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M10 180 C45 140 65 95 95 10 M45 145 C20 130 15 110 20 92 M67 108 C98 105 117 83 122 58 M86 70 C65 57 62 39 70 22 M117 86 C145 92 166 78 181 54" />
      <path d="M20 92 C42 94 48 110 45 128 M122 58 C142 55 154 40 155 20 M181 54 C199 62 208 78 207 94" />
    </g>
    <g fill="#b9bca2" opacity=".9">
      <ellipse cx="32" cy="105" rx="7" ry="17" transform="rotate(-42 32 105)"/>
      <ellipse cx="47" cy="126" rx="6" ry="16" transform="rotate(34 47 126)"/>
      <ellipse cx="77" cy="44" rx="7" ry="17" transform="rotate(-48 77 44)"/>
      <ellipse cx="91" cy="88" rx="7" ry="17" transform="rotate(42 91 88)"/>
      <ellipse cx="139" cy="52" rx="7" ry="18" transform="rotate(40 139 52)"/>
      <ellipse cx="176" cy="69" rx="7" ry="16" transform="rotate(-48 176 69)"/>
      <ellipse cx="202" cy="81" rx="6" ry="14" transform="rotate(-25 202 81)"/>
    </g>
    <g fill="#dca9a6">
      <circle cx="69" cy="22" r="5"/><circle cx="155" cy="20" r="5"/><circle cx="181" cy="54" r="4"/>
    </g>
    <g transform="translate(110 128)">
      {[0,60,120,180,240,300].map((a) => <ellipse key={a} cx="0" cy="-12" rx="7" ry="15" transform={`rotate(${a})`} fill="#e6c5bf" stroke="#c99b91" strokeWidth=".6"/>)}
      <circle r="5" fill="#c7a16b"/>
    </g>
  </svg>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState(guestFromUrl());
  const [musicOn, setMusicOn] = useState(false);
  const [countdown, setCountdown] = useState({});
  const [rsvp, setRsvp] = useState("Hadir");
  const [rsvpName, setRsvpName] = useState(guestFromUrl());
  const [rsvpCount, setRsvpCount] = useState("2");
  const [rsvpNote, setRsvpNote] = useState("");
  const [guestbookName, setGuestbookName] = useState("");
  const [guestbookMessage, setGuestbookMessage] = useState("");
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fi-guestbook") || "[]"); } catch { return []; }
  });
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000)
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const guestLabel = guestName.trim() || "Bapak/Ibu/Saudara/i";
  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    if (guestName.trim()) url.searchParams.set("to", guestName.trim());
    else url.searchParams.delete("to");
    return url.toString();
  }, [guestName]);

  const toggleMusic = () => {
    // Browser autoplay restrictions mean audio needs a user gesture.
    setMusicOn((v) => !v);
    setNotice("Musik latar belum ditambahkan. Tambahkan file audio milik sendiri ke public/music.mp3, lalu aktifkan pemutar audio.");
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    const text = `Assalamu'alaikum, konfirmasi undangan Fitri & Irwan.%0A%0ANama: ${encodeURIComponent(rsvpName || guestLabel)}%0AKehadiran: ${encodeURIComponent(rsvp)}%0AJumlah tamu: ${encodeURIComponent(rsvp === "Hadir" ? rsvpCount : "0")}%0ACatatan: ${encodeURIComponent(rsvpNote || "-")}`;
    const waUrl = `https://wa.me/?text=${text}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setNotice("WhatsApp terbuka dengan draf konfirmasi. Pilih kontak panitia/keluarga lalu kirim pesan.");
  };

  const submitGuestbook = (e) => {
    e.preventDefault();
    if (!guestbookName.trim() || !guestbookMessage.trim()) return;
    const next = [{ name: guestbookName.trim(), message: guestbookMessage.trim(), date: new Date().toLocaleDateString("id-ID") }, ...entries].slice(0, 30);
    setEntries(next);
    try { localStorage.setItem("fi-guestbook", JSON.stringify(next)); } catch {}
    setGuestbookName("");
    setGuestbookMessage("");
    setNotice("Ucapan tersimpan di browser perangkat ini. Agar semua tamu bisa melihatnya, hubungkan buku tamu ke database.");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotice("Salin tautan ini secara manual: " + shareLink);
    }
  };

  return <div className="site-shell">
    <header className="topbar">
      <a href="#home" className="brand">F<span>&</span>I</a>
      <nav>
        <a href="#couple">Mempelai</a><a href="#event">Acara</a><a href="#rsvp">RSVP</a><a href="#wishes">Ucapan</a>
      </nav>
      <button className="icon-button" onClick={toggleMusic} aria-label="Musik latar">{musicOn ? <Music size={18}/> : <Music2 size={18}/>}</button>
    </header>

    {!opened && <section className="intro-cover" id="home">
      <FloralCorner className="corner-top"/>
      <FloralCorner className="corner-bottom"/>
      <div className="cover-label">THE WEDDING OF</div>
      <div className="cover-rule"><span>✦</span></div>
      <div className="cover-names"><span>Fitri</span><small>&</small><span>Irwan</span></div>
      <p className="cover-date">23 · 10 · 2026</p>
      <div className="cover-photo-wrap">
        <img src="/fitri-irwan-asli.png" alt="Foto asli Fitri dan Irwan" className="cover-photo"/>
      </div>
      <p className="cover-invite">Kepada Yth.</p>
      <p className="guest-name">{guestLabel}</p>
      <p className="cover-note">Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.</p>
      <button className="primary-button" onClick={() => { setOpened(true); document.body.classList.add("invitation-opened"); }}>
        <Heart size={16} fill="currentColor"/> Buka Undangan
      </button>
      <p className="scroll-hint">Sebuah hari, sebuah janji, selamanya.</p>
    </section>}

    {opened && <main>
      <section className="hero section-pad" id="home">
        <FloralCorner className="hero-floral"/>
        <p className="eyebrow">BISMILLAHIRRAHMANIRRAHIM</p>
        <h1>The Wedding of<br/><span>Fitri <i>&</i> Irwan</span></h1>
        <p className="hero-copy">“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri...”</p>
        <p className="verse">QS. Ar-Rum: 21</p>
        <div className="hero-photo-frame"><img src="/fitri-irwan-asli.png" alt="Fitri dan Irwan"/></div>
        <p className="date-large">JUMAT, 23 OKTOBER 2026</p>
        <a className="text-link" href="#event">Lihat detail acara ↓</a>
      </section>

      <section className="couple section-pad" id="couple">
        <p className="eyebrow">DUA HATI, SATU TUJUAN</p>
        <h2>Dengan memohon rahmat dan ridha Allah SWT</h2>
        <p className="section-intro">Kami bermaksud menyelenggarakan pernikahan putra-putri kami. Dengan segala kerendahan hati, kami memohon doa restu dari keluarga dan sahabat.</p>
        <div className="couple-names"><span>Fitri</span><b>&</b><span>Irwan</span></div>
        <div className="floral-divider">❦</div>
      </section>

      <section className="event section-pad" id="event">
        <p className="eyebrow">CATAT TANGGALNYA</p><h2>Waktu & Tempat</h2>
        <div className="countdown" aria-label="Hitung mundur">
          {["days","hours","minutes","seconds"].map((unit) => <div className="count-unit" key={unit}><strong>{String(countdown[unit] ?? 0).padStart(2,"0")}</strong><span>{{days:"Hari",hours:"Jam",minutes:"Menit",seconds:"Detik"}[unit]}</span></div>)}
        </div>
        <div className="event-grid">
          <article className="event-card"><div className="event-icon"><CalendarDays/></div><h3>Akad Nikah</h3><p>Jumat, 23 Oktober 2026</p><p>08.00 WIB – selesai</p></article>
          <article className="event-card"><div className="event-icon"><Heart/></div><h3>Resepsi</h3><p>Jumat, 23 Oktober 2026</p><p>08.00 – 16.00 WIB</p></article>
        </div>
        <div className="location-card">
          <MapPin size={23}/><h3>Lokasi Acara</h3>
          <p>{ADDRESS}</p>
          <a className="outline-button" href={MAPS_URL} target="_blank" rel="noreferrer">Buka Google Maps <MapPin size={15}/></a>
        </div>
      </section>

      <section className="rsvp section-pad" id="rsvp">
        <p className="eyebrow">KONFIRMASI KEHADIRAN</p><h2>Apakah Anda dapat hadir?</h2>
        <p className="section-intro">Konfirmasi akan disiapkan sebagai pesan WhatsApp yang bisa Anda kirim.</p>
        <form className="form-card" onSubmit={submitRsvp}>
          <label>Nama<input value={rsvpName} onChange={e=>setRsvpName(e.target.value)} placeholder="Nama Anda" required/></label>
          <label>Konfirmasi
            <select value={rsvp} onChange={e=>setRsvp(e.target.value)}><option>Hadir</option><option>Belum bisa hadir</option></select>
          </label>
          {rsvp === "Hadir" && <label>Jumlah tamu<select value={rsvpCount} onChange={e=>setRsvpCount(e.target.value)}><option value="1">1 orang</option><option value="2">2 orang</option><option value="3">3 orang</option><option value="4">4 orang</option><option value="5">5 orang</option></select></label>}
          <label>Pesan (opsional)<textarea value={rsvpNote} onChange={e=>setRsvpNote(e.target.value)} placeholder="Tulis catatan singkat..." rows="3"/></label>
          <button className="primary-button full" type="submit"><Send size={16}/> Siapkan konfirmasi WhatsApp</button>
        </form>
      </section>

      <section className="gift section-pad" id="gift">
        <p className="eyebrow">TANDA KASIH</p><h2>Amplop Digital</h2>
        <div className="gift-card"><Gift size={27}/><p>Doa restu Anda merupakan hadiah terindah bagi kami.</p><p className="muted">Informasi rekening atau metode hadiah digital belum ditambahkan.</p></div>
      </section>

      <section className="wishes section-pad" id="wishes">
        <p className="eyebrow">DOA & UCAPAN</p><h2>Kirimkan Doa Terbaik</h2>
        <form className="form-card" onSubmit={submitGuestbook}>
          <label>Nama<input value={guestbookName} onChange={e=>setGuestbookName(e.target.value)} placeholder="Nama Anda" required/></label>
          <label>Ucapan<textarea value={guestbookMessage} onChange={e=>setGuestbookMessage(e.target.value)} placeholder="Tuliskan doa dan ucapan..." rows="3" required/></label>
          <button className="primary-button full" type="submit"><MessageCircle size={16}/> Simpan ucapan</button>
        </form>
        <p className="local-note">Versi awal menyimpan ucapan di browser yang digunakan, bukan ke database bersama.</p>
        <div className="guestbook-list">{entries.map((entry, i)=><article className="wish-card" key={i}><div className="wish-heading"><strong>{entry.name}</strong><span>{entry.date}</span></div><p>{entry.message}</p></article>)}</div>
      </section>

      <section className="closing section-pad">
        <FloralCorner className="closing-floral"/>
        <div className="floral-divider">❦</div>
        <h2>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</h2>
        <p>Terima kasih atas doa dan restunya.</p>
        <div className="signature">Fitri <span>&</span> Irwan</div>
        <button className="outline-button share-button" onClick={copyLink}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Tautan tersalin" : "Salin tautan undangan"}</button>
      </section>
    </main>}

    <footer><span>FITRI & IRWAN</span><small>Dibuat dengan doa dan cinta · 2026</small></footer>
    {notice && <div className="notice" role="status"><span>{notice}</span><button onClick={()=>setNotice("")} aria-label="Tutup"><X size={16}/></button></div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
