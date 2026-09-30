# DESIGN.md - Fitri & Irwan Wedding Invitation

## Identity & Concept
- **Product:** Digital Wedding Invitation (Undangan Pernikahan Digital)
- **Couple:** Fitri & Irwan
- **Theme:** Elegant Warm Botanical / Sage & Gold
- **Tone & Mood:** Warm, serene, respectful, elegant, culturally grounded (Indonesian Islamic wedding celebration)

## Dials (Antislop Framework)
- **ENERGY:** 2 (Warm, joyful celebration, reverent and heartfelt)
- **RHYTHM:** 2 (Fluid narrative progression: Opening Envelope -> Bismillah & Quranic Verse -> Couple Profiles -> Event Details & Countdown -> Venue & Directions -> Love Story Timeline -> Photo Gallery -> RSVP & Live Guestbook -> Digital Envelope & QRIS -> Closing Du'a)
- **MOTION:** 2 (Deliberate entrance upon opening invitation, background audio with explicit play/pause control, subtle botanical accents, smooth toast and form feedback)

## Color Palette (R-29: Max 2-3 Core + 1 Accent)
- **Base Background:** Warm Ivory (`#FAF8F5`) and Soft Cream (`#F3EFE6`)
- **Core Primary (Sage Green):** `#3F5244` (Deep Eucalyptus) / `#4E6554` (Soft Sage)
- **Accent (Champagne Gold):** `#C3A16A` (Soft Champagne Gold) / `#99753F` (Deep Warm Gold for text on light surfaces)
- **Text Primary:** Deep Forest Charcoal (`#1F2D22`) (WCAG AAA compliant: >10:1 contrast ratio against `#FAF8F5`)
- **Text Muted:** Deep Sage Grey (`#556858`) (WCAG AA compliant: >4.8:1 contrast ratio against `#FAF8F5`)
- **Card Surfaces:** Pure White (`#FFFFFF`) with border `#E6DFD3`

## Typography (R-06)
- **Heading / Display:** Cormorant Garamond & Cinzel (Timeless, graceful serif)
- **Script Accent:** Great Vibes / Alex Brush (Calligraphic couple names)
- **Body Text:** Plus Jakarta Sans (Clean, highly legible modern geometric sans)
- **Arabic Calligraphy / Verse:** Amiri (Quranic scripture display)

## Copywriting Directives (R-02, R-16)
- Language: Bahasa Indonesia (sopan, hangat, dan bernuansa islami).
- Strictly NO em dashes (`—`) in UI copy or documentation. Use commas, colons, or parentheses.
- Specific Call-to-Actions (e.g. "Buka Undangan", "Kirim Ucapan & Doa", "Konfirmasi Kehadiran", "Salin Nomor Rekening", "Petunjuk Arah Google Maps").

## Functionality & Completeness (R-26, R-27, R-35)
- All interactive controls (audio toggle, RSVP form submission, copy account number, calendar add, modal gallery, map links) are fully functional.
- Guestbook and RSVP implement loading, empty, and error/success states.
- Local/mock fallback ensures zero broken screens even before Supabase environment keys are configured.
