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
import { StorySection } from "./StorySection";
import { GallerySection } from "./GallerySection";
import { RsvpSection } from "./RsvpSection";
import { GuestbookSection } from "./GuestbookSection";
import { GiftSection } from "./GiftSection";
import { ClosingSection } from "./ClosingSection";

export function WeddingClientPage() {
  const searchParams = useSearchParams();
  const rawTo = searchParams.get("to");
  const guestName = rawTo ? decodeURIComponent(rawTo).replace(/\+/g, " ") : "Tamu Undangan";

  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

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
    <div className="relative min-h-screen bg-[#FAF8F5]">
      {/* 1. Opening Cover Envelope */}
      <CoverScreen
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        guestName={guestName}
      />

      {/* 2. Floating Audio Player */}
      <AudioPlayer autoPlayTriggered={autoPlayMusic} />

      {/* 3. Floating Bottom Navigation Bar */}
      {isCoverOpen && <NavbarFloating />}

      {/* 4. Main Invitation Content */}
      <main className="transition-opacity duration-1000">
        <HeroSection guestName={guestName} />
        <AyatSection />
        <CoupleSection />
        <EventSection />
        <VenueMapSection />
        <StorySection />
        <GallerySection />
        <RsvpSection initialGuestName={guestName !== "Tamu Undangan" ? guestName : ""} />
        <GuestbookSection initialGuestName={guestName !== "Tamu Undangan" ? guestName : ""} />
        <GiftSection />
        <ClosingSection />
      </main>
    </div>
  );
}
