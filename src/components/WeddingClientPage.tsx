"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CoverScreen } from "./CoverScreen";
import { AudioPlayer } from "./AudioPlayer";
import { NavbarFloating } from "./NavbarFloating";
import { HeroSection } from "./HeroSection";
import { AyatSection } from "./AyatSection";
import { CoupleSection } from "./CoupleSection";
import { EventSection } from "./EventSection";
import { VenueMapSection } from "./VenueMapSection";
import { RsvpSection } from "./RsvpSection";
import { GuestbookSection } from "./GuestbookSection";
import { GiftSection } from "./GiftSection";
import { ClosingSection } from "./ClosingSection";
import { ScrollReveal } from "./ScrollReveal";
import { GoldenStardust } from "./GoldenStardust";
import { weddingData } from "@/config/wedding-data";
import { useCoverConfig } from "@/lib/coverConfig";

export function WeddingClientPage() {
  const searchParams = useSearchParams();
  const rawTo = searchParams.get("to");
  const guestName = rawTo ? decodeURIComponent(rawTo).replace(/\+/g, " ") : "Tamu Undangan";

  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const coverConfig = useCoverConfig();
  const activeAudioTrack = coverConfig.audioTrack || weddingData.audio.src;

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    setAutoPlayMusic(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Prevent background scroll when cover screen is closed
  useEffect(() => {
    if (!isCoverOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCoverOpen]);

  return (
    <div className="min-h-dvh w-full bg-[#121316] flex justify-center text-neutral-800 antialiased selection:bg-gold-500/30 overflow-x-hidden">
      {/* 1. Opening Cover Envelope */}
      <CoverScreen
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        guestName={guestName}
      />

      {/* 2. Mobile-First Vertical Column: 100% on mobile, max 360px on desktop (Infinix Note 8 reference) */}
      <div className="w-full sm:max-w-90 min-h-dvh bg-ivory-50 sm:border-x sm:border-gold-400/30 sm:shadow-2xl sm:shadow-black/70 relative flex flex-col mx-auto overflow-x-hidden">
        {/* Ambient Floating Golden Stardust - Option 5 */}
        <GoldenStardust />

        {/* Floating Audio Player */}
        <AudioPlayer autoPlayTriggered={autoPlayMusic} audioSrc={activeAudioTrack} />

        {/* Floating Bottom Navigation Bar */}
        {isCoverOpen && <NavbarFloating />}

        {/* Main Invitation Content with smooth entrance transition */}
        <main
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 flex flex-col w-full ${
            isCoverOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ScrollReveal direction="up" delay={50}>
            <HeroSection guestName={guestName} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <AyatSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <CoupleSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <EventSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <VenueMapSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <RsvpSection initialGuestName={guestName !== "Tamu Undangan" ? guestName : ""} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <GuestbookSection initialGuestName={guestName !== "Tamu Undangan" ? guestName : ""} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <GiftSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <ClosingSection />
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
