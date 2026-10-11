"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { CoverConfig, useCoverConfig, CanvasElementTransform } from "@/lib/coverConfig";
import {
  FloralCornerSet,
  FloralFrameOverlay,
  FloralDividerAccent,
  MonogramSealBadge,
} from "./FloralElements";
import { CanvaElementWrapper } from "./CanvaElementWrapper";
import { GoldenStardust } from "./GoldenStardust";

interface CoverScreenProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName: string;
  previewConfig?: CoverConfig;
  isEmbedPreview?: boolean;
  isModalPreview?: boolean;
  selectedElementId?: string | null;
  onSelectElement?: (id: string | null) => void;
  isEditable?: boolean;
  zoomLevel?: number;
  onUpdateTransform?: (
    id: string,
    updater: (prev: CanvasElementTransform) => CanvasElementTransform,
    saveHistory?: boolean
  ) => void;
  onUpdateText?: (field: string, value: string) => void;
  onUpdateHref?: (elementId: string, href: string) => void;
  onToggleLock?: (id: string) => void;
}

export function CoverScreen({
  isOpen,
  onOpen,
  guestName,
  previewConfig,
  isEmbedPreview = false,
  isModalPreview = false,
  selectedElementId = null,
  onSelectElement,
  isEditable = false,
  zoomLevel = 100,
  onUpdateTransform,
  onUpdateText,
  onUpdateHref,
  onToggleLock,
}: CoverScreenProps) {
  const syncedConfig = useCoverConfig();
  const config = previewConfig || syncedConfig;

  // State untuk animasi membuka amplop (Envelope Unfolding Transition)
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Interactivity helper for href links on cover elements
  const handleLinkClick = (e: React.MouseEvent, targetHref?: string) => {
    if (isEmbedPreview) {
      e.preventDefault();
      return;
    }
    if (!targetHref) return;
    if (targetHref.startsWith("#")) {
      e.preventDefault();
      onOpen();
      setTimeout(() => {
        const el = document.querySelector(targetHref);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    if (config.elementHrefs?.["button"]) {
      handleLinkClick(e, config.elementHrefs["button"]);
      return;
    }
    if (isUnfolding) return;
    setIsUnfolding(true);

    // Mainkan musik dan mulai transisi halaman undangan utama
    setTimeout(() => {
      onOpen();
    }, 600);

    // Selesaikan animasi membuka amplop sebelum cover di-unmount
    setTimeout(() => {
      setIsDismissed(true);
    }, 1250);
  };

  if ((isDismissed || (isOpen && !isUnfolding)) && !isEmbedPreview) return null;

  // Complete Wedding Fonts Map from public/fonts
  const FONT_MAP: Record<string, string> = {
    // Script & Cursive
    greatvibes: "'Great Vibes', cursive",
    pinyon: "'Pinyon Script', cursive",
    alexbrush: "'Alex Brush', var(--font-alex-brush), cursive",
    allura: "'Allura', cursive",
    parisienne: "'Parisienne', cursive",
    dancingscript: "'Dancing Script', cursive",
    sacramento: "'Sacramento', cursive",
    courgette: "'Courgette', cursive",
    tangerine: "'Tangerine', cursive",
    montecarlo: "'Monte Carlo', cursive",
    monsieurladoulaise: "'Monsieur La Doulaise', cursive",
    herrvonmuellerhoff: "'Herr Von Muellerhoff', cursive",
    italianno: "'Italianno', cursive",
    rougescript: "'Rouge Script', cursive",
    waterbrush: "'Water Brush', cursive",
    windsong: "'WindSong', cursive",
    cherish: "'Cherish', cursive",
    petitformal: "'Petit Formal Script', cursive",
    charm: "'Charm', cursive",
    // Serif & Display
    cinzel: "'Cinzel', serif",
    cinzeldecorative: "'Cinzel Decorative', serif",
    playfair: "'Playfair Display', serif",
    italiana: "'Italiana', serif",
    bellefair: "'Bellefair', serif",
    marcellus: "'Marcellus', serif",
    bodonimoda: "'Bodoni Moda', serif",
    yeseva: "'Yeseva One', serif",
    prata: "'Prata', serif",
  };

  const scriptFontFamily = FONT_MAP[config.scriptFont] || "'Great Vibes', cursive";

  // Filter styling for couple images
  const imageFilterStyle: React.CSSProperties = {
    filter: `${config.isGrayscale ? "grayscale(100%)" : "grayscale(0%)"} contrast(${config.contrast}%) brightness(${config.brightness}%)`,
  };

  // Resolve photo layout: "arch" | "full" | "split"
  const photoLayout =
    config.photoLayout ||
    (config.layoutMode === "split" ? "split" : "arch");

  // Fixed typography calculations — perfectly proportioned for mobile envelope width
  const baseFontSize = config.nameFontSize || 56;
  const namePx = Math.min(Math.max(Math.round(baseFontSize * 0.58), 28), 38);
  const nameClamp = `clamp(26px, ${namePx}px, 38px)`;

  // Content of the card
  const cardContent = (
    <div
      style={{ backgroundColor: config.cardBgColor || "#FAF8F5" }}
      onPointerDown={(e) => {
        if (isEditable && e.target === e.currentTarget) {
          onSelectElement?.(null);
        }
      }}
      onClick={(e) => {
        if (isEditable && e.target === e.currentTarget) {
          onSelectElement?.(null);
        }
      }}
      className="relative w-full h-full min-h-dvh sm:min-h-0 sm:max-w-90 mx-auto rounded-none overflow-hidden flex flex-col justify-between select-none py-3 sm:py-4 px-3 sm:px-4"
    >
      {/* Subtle Floating Golden Stardust (Option 5) */}
      <GoldenStardust />

      {/* 1. Frames & Borders (Z-5, non-obstructive) */}
      <FloralFrameOverlay
        style={config.floralFrameStyle || "none"}
        color={config.floralColor || "#C3A16A"}
        opacity={(config.floralOpacity || 80) / 100}
      />

      {/* 2. Botanical Corner Ornaments (Z-15) */}
      <FloralCornerSet
        style={config.floralCornerStyle || "none"}
        color={config.floralColor || "#C3A16A"}
        size={config.floralCornerSize || 80}
        opacity={(config.floralOpacity || 80) / 100}
        position={config.floralCornerPosition || "diagonal"}
      />

      {/* 2b. Selected Canva Asset 1-19 Ornament (Z-15) */}
      {config.selectedAssetId && (
        <CanvaElementWrapper
          elementId="ornament"
          label="Ornamen Canva"
          transform={config.elementTransforms?.["ornament"]}
          isSelected={selectedElementId === "ornament"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={false}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onToggleLock={onToggleLock}
          className="z-15"
        >
          {(config.assetPosition === "corner-top" || config.assetPosition === "corner-all" || !config.assetPosition) && (
            <>
              <div
                className="absolute top-2 left-2 pointer-events-none z-15"
                style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
              >
                <Image
                  src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                  alt={`Ornamen Asset ${config.selectedAssetId}`}
                  width={config.assetSize || 75}
                  height={config.assetSize || 75}
                  className="object-contain"
                />
              </div>
              <div
                className="absolute top-2 right-2 scale-x-[-1] pointer-events-none z-15"
                style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
              >
                <Image
                  src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                  alt={`Ornamen Asset ${config.selectedAssetId}`}
                  width={config.assetSize || 75}
                  height={config.assetSize || 75}
                  className="object-contain"
                />
              </div>
            </>
          )}

          {(config.assetPosition === "corner-bottom" || config.assetPosition === "corner-all") && (
            <>
              <div
                className="absolute bottom-2 left-2 scale-y-[-1] pointer-events-none z-15"
                style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
              >
                <Image
                  src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                  alt={`Ornamen Asset ${config.selectedAssetId}`}
                  width={config.assetSize || 75}
                  height={config.assetSize || 75}
                  className="object-contain"
                />
              </div>
              <div
                className="absolute bottom-2 right-2 scale-[-1] pointer-events-none z-15"
                style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
              >
                <Image
                  src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                  alt={`Ornamen Asset ${config.selectedAssetId}`}
                  width={config.assetSize || 75}
                  height={config.assetSize || 75}
                  className="object-contain"
                />
              </div>
            </>
          )}

          {config.assetPosition === "top-header" && (
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none z-15"
              style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
            >
              <Image
                src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                alt={`Ornamen Asset ${config.selectedAssetId}`}
                width={config.assetSize ? config.assetSize * 1.5 : 120}
                height={config.assetSize || 75}
                className="object-contain"
              />
            </div>
          )}

          {config.assetPosition === "center-accent" && (
            <div
              className="relative z-16 my-1 flex justify-center pointer-events-none"
              style={{ opacity: (config.assetOpacity ?? 85) / 100 }}
            >
              <Image
                src={`/Asset/thumbs/${config.selectedAssetId}.webp`}
                alt={`Ornamen Asset ${config.selectedAssetId}`}
                width={config.assetSize || 75}
                height={config.assetSize || 75}
                className="object-contain"
              />
            </div>
          )}
        </CanvaElementWrapper>
      )}

      {/* 3. Full / Split Photo Background Layer (if active) */}
      {photoLayout === "full" && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={config.cardBgImage || "/images/fitri-irwan-asli.png"}
            alt="Sampul Fitri & Irwan"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            priority
            className="object-cover object-center"
            style={imageFilterStyle}
          />
          {/* Soft white center gradient mask for text readability */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-72 bg-linear-to-r from-transparent via-white/85 to-transparent" />
        </div>
      )}

      {photoLayout === "split" && (
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between overflow-hidden">
          <div className="relative w-[50%] h-full">
            <Image
              src={config.groomImage || "/images/groom-sample.png"}
              alt={`Pengantin Pria - ${config.groomName}`}
              fill
              sizes="210px"
              priority
              className="object-cover object-left"
              style={imageFilterStyle}
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-white" />
          </div>
          <div className="relative w-[50%] h-full">
            <Image
              src={config.brideImage || "/images/bride-sample.png"}
              alt={`Pengantin Wanita - ${config.brideName}`}
              fill
              sizes="210px"
              priority
              className="object-cover object-right"
              style={imageFilterStyle}
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent via-white/30 to-white" />
          </div>
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-56 bg-linear-to-r from-white/40 via-white/95 to-white/40" />
        </div>
      )}

      {/* 4. Top Section: Monogram, Title & Divider */}
      <div className="relative z-20 pt-1 sm:pt-2 px-3 text-center shrink-0 flex flex-col items-center">
        {/* Monogram Seal Badge */}
        {config.showMonogram && (
          <CanvaElementWrapper
            elementId="monogram"
            label="Monogram"
            transform={config.elementTransforms?.["monogram"]}
            isSelected={selectedElementId === "monogram"}
            isEditable={isEditable}
            zoomLevel={zoomLevel}
            isText={true}
            textValues={{ single: config.monogramText || "F & I" }}
            textColor={config.floralColor || "#C3A16A"}
            fontFamilyName="Monogram"
            href={config.elementHrefs?.["monogram"] || ""}
            onUpdateHref={(val) => onUpdateHref?.("monogram", val)}
            onSelect={onSelectElement || (() => {})}
            onUpdateTransform={onUpdateTransform}
            onUpdateText={(field, val) => onUpdateText?.("monogramText", val)}
            onToggleLock={onToggleLock}
            className="mb-1 inline-block"
          >
            {config.elementHrefs?.["monogram"] ? (
              <a
                href={config.elementHrefs["monogram"]}
                onClick={(e) => handleLinkClick(e, config.elementHrefs?.["monogram"])}
                className="inline-block hover:scale-105 transition-transform"
              >
                <MonogramSealBadge
                  text={config.monogramText || "F & I"}
                  color={config.floralColor || "#C3A16A"}
                  style={config.monogramStyle || "wax_seal"}
                />
              </a>
            ) : (
              <MonogramSealBadge
                text={config.monogramText || "F & I"}
                color={config.floralColor || "#C3A16A"}
                style={config.monogramStyle || "wax_seal"}
              />
            )}
          </CanvaElementWrapper>
        )}

        {/* Title / Subtitle */}
        <CanvaElementWrapper
          elementId="title"
          label="Judul"
          transform={config.elementTransforms?.["title"]}
          isSelected={selectedElementId === "title"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textValues={{ single: config.titleText || "THE WEDDING OF" }}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="12px"
          letterSpacing="0.3em"
          fontWeight="600"
          textColor="#262626"
          fontFamilyName="Cormorant Garamond"
          href={config.elementHrefs?.["title"] || ""}
          onUpdateHref={(val) => onUpdateHref?.("title", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={(field, val) => onUpdateText?.("titleText", val)}
          onToggleLock={onToggleLock}
          className="block mx-auto text-center"
        >
          {config.elementHrefs?.["title"] ? (
            <a
              href={config.elementHrefs["title"]}
              onClick={(e) => handleLinkClick(e, config.elementHrefs?.["title"])}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              {config.titleStyle === "calligraphy" ? (
                <p className="font-serif-cormorant text-xs font-bold tracking-[0.25em] text-neutral-800 uppercase mb-0.5">
                  ~ {config.titleText || "The Wedding Of"} ~
                </p>
              ) : config.titleStyle === "bismillah" ? (
                <p className="font-serif-cormorant text-[10px] font-medium tracking-[0.25em] text-neutral-700 uppercase mb-0.5">
                  BISMILLAHIRRAHMANIRRAHIM
                </p>
              ) : (
                <p className="font-serif-cormorant text-[11px] font-semibold text-neutral-800 tracking-[0.3em] uppercase mb-0.5">
                  {config.titleText || "THE WEDDING OF"}
                </p>
              )}
            </a>
          ) : config.titleStyle === "calligraphy" ? (
            <p className="font-serif-cormorant text-xs font-bold tracking-[0.25em] text-neutral-800 uppercase mb-0.5">
              ~ {config.titleText || "The Wedding Of"} ~
            </p>
          ) : config.titleStyle === "bismillah" ? (
            <p className="font-serif-cormorant text-[10px] font-medium tracking-[0.25em] text-neutral-700 uppercase mb-0.5">
              BISMILLAHIRRAHMANIRRAHIM
            </p>
          ) : (
            <p className="font-serif-cormorant text-[11px] font-semibold text-neutral-800 tracking-[0.3em] uppercase mb-0.5">
              {config.titleText || "THE WEDDING OF"}
            </p>
          )}
        </CanvaElementWrapper>

        {/* Decorative Divider */}
        {config.floralDividerStyle !== "none" && (
          <CanvaElementWrapper
            elementId="divider"
            label="Pembatas Bunga"
            transform={config.elementTransforms?.["divider"]}
            isSelected={selectedElementId === "divider"}
            isEditable={isEditable}
            zoomLevel={zoomLevel}
            isText={false}
            onSelect={onSelectElement || (() => {})}
            onUpdateTransform={onUpdateTransform}
            onToggleLock={onToggleLock}
            className="block mx-auto mt-1 mb-0 text-center"
          >
            <FloralDividerAccent
              style={config.floralDividerStyle || "star"}
              color={config.floralColor || "#C3A16A"}
              className="mx-auto"
            />
          </CanvaElementWrapper>
        )}
      </div>

      {/* 5. Center Section: Couple Names (Vertical Fitri / & / Irwan) & Optional Arch Frame */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto min-h-0 py-2 px-3 text-center">
        {/* Couple Names - Komposisi Vertikal Elegan: Fitri / & / Irwan */}
        <CanvaElementWrapper
          elementId="names"
          label="Nama Mempelai"
          transform={config.elementTransforms?.["names"]}
          isSelected={selectedElementId === "names"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textType="couple_names"
          textValues={{
            brideName: config.brideName || "Fitri",
            groomName: config.groomName || "Irwan",
          }}
          fontFamily={scriptFontFamily}
          fontSize={nameClamp}
          textColor="#171717"
          fontFamilyName={config.scriptFont || "Great Vibes"}
          href={config.elementHrefs?.["names"] || "#mempelai"}
          onUpdateHref={(val) => onUpdateHref?.("names", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={onUpdateText}
          onToggleLock={onToggleLock}
          className="flex flex-col items-center justify-center my-auto py-1 max-w-full"
        >
          {/* Baris 1: Fitri */}
          <a
            href={config.elementHrefs?.["names"] || "#mempelai"}
            onClick={(e) => handleLinkClick(e, config.elementHrefs?.["names"] || "#mempelai")}
            style={{
              fontSize: nameClamp,
              fontFamily: scriptFontFamily,
              lineHeight: 1.15,
            }}
            className="text-neutral-900 drop-shadow-xs font-normal tracking-wide hover:text-gold-700 transition-colors cursor-pointer select-none block text-center"
            aria-label={`Profil Mempelai: ${config.brideName || "Fitri"}`}
          >
            {config.brideName || "Fitri"}
          </a>

          {/* Baris 2: Simbol & (emas / biru keabu-abuan serasi, lebih kecil) */}
          <span
            style={{
              color: config.floralColor || "#C3A16A",
            }}
            className="font-serif-cormorant text-sm sm:text-base font-light italic my-0.5 sm:my-1 leading-none select-none tracking-widest"
            aria-hidden="true"
          >
            &amp;
          </span>

          {/* Baris 3: Irwan */}
          <a
            href={config.elementHrefs?.["names"] || "#mempelai"}
            onClick={(e) => handleLinkClick(e, config.elementHrefs?.["names"] || "#mempelai")}
            style={{
              fontSize: nameClamp,
              fontFamily: scriptFontFamily,
              lineHeight: 1.15,
            }}
            className="text-neutral-900 drop-shadow-xs font-normal tracking-wide hover:text-gold-700 transition-colors cursor-pointer select-none block text-center"
            aria-label={`Profil Mempelai: ${config.groomName || "Irwan"}`}
          >
            {config.groomName || "Irwan"}
          </a>
        </CanvaElementWrapper>

        {/* Center Arch Photo Frame (hanya jika mode arch aktif) */}
        {photoLayout === "arch" && (
          <CanvaElementWrapper
            elementId="photo"
            label="Foto Mempelai"
            transform={config.elementTransforms?.["photo"]}
            isSelected={selectedElementId === "photo"}
            isEditable={isEditable}
            zoomLevel={zoomLevel}
            isText={false}
            onSelect={onSelectElement || (() => {})}
            onUpdateTransform={onUpdateTransform}
            onToggleLock={onToggleLock}
            className="relative z-15 mt-2 mb-1 flex justify-center shrink-0"
          >
            <div className="w-56 sm:w-60 h-32 sm:h-36 overflow-hidden rounded-t-[48%] rounded-b-xs border-4 border-white shadow-md relative bg-neutral-100">
              <Image
                src={config.cardBgImage || "/images/fitri-irwan-asli.png"}
                alt="Foto Mempelai Fitri & Irwan"
                fill
                sizes="240px"
                priority
                className="object-cover object-top"
                style={imageFilterStyle}
              />
            </div>
          </CanvaElementWrapper>
        )}
      </div>

      {/* 6. Bottom Section: Guest Salutation, Action Button & Closing Note */}
      <div className="relative z-20 pb-2 sm:pb-3 px-3 text-center shrink-0 flex flex-col items-center justify-center">
        {/* Kepada Yth: */}
        <CanvaElementWrapper
          elementId="salutation"
          label="Salam Tamu"
          transform={config.elementTransforms?.["salutation"]}
          isSelected={selectedElementId === "salutation"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textType="salutation"
          textValues={{
            salutation: config.salutation || "Kepada Yth:",
            subSalutation: config.subSalutation || "Bapak/Ibu/Saudara/i",
          }}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="12px"
          textColor="#404040"
          fontFamilyName="Cormorant Garamond"
          href={config.elementHrefs?.["salutation"] || ""}
          onUpdateHref={(val) => onUpdateHref?.("salutation", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={onUpdateText}
          onToggleLock={onToggleLock}
          className="block w-full text-center mx-auto mb-1"
        >
          {config.elementHrefs?.["salutation"] ? (
            <a
              href={config.elementHrefs["salutation"]}
              onClick={(e) => handleLinkClick(e, config.elementHrefs?.["salutation"])}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <p className="font-serif-cormorant text-[11px] sm:text-xs font-normal text-neutral-700 tracking-wider mb-0 leading-tight">
                {config.salutation || "Kepada Yth:"}
              </p>
              <p className="font-serif-cormorant text-[10px] sm:text-[11px] font-normal text-neutral-600 mb-0.5 leading-tight">
                {config.subSalutation || "Bapak/Ibu/Saudara/i"}
              </p>
            </a>
          ) : (
            <>
              <p className="font-serif-cormorant text-[11px] sm:text-xs font-normal text-neutral-700 tracking-wider mb-0 leading-tight">
                {config.salutation || "Kepada Yth:"}
              </p>
              <p className="font-serif-cormorant text-[10px] sm:text-[11px] font-normal text-neutral-600 mb-0.5 leading-tight">
                {config.subSalutation || "Bapak/Ibu/Saudara/i"}
              </p>
            </>
          )}
        </CanvaElementWrapper>

        {/* Guest Name */}
        <CanvaElementWrapper
          elementId="guestName"
          label="Nama Tamu"
          transform={config.elementTransforms?.["guestName"]}
          isSelected={selectedElementId === "guestName"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textValues={{ single: guestName || "Tamu Undangan" }}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="15px"
          fontWeight="600"
          textColor="#171717"
          fontFamilyName="Cormorant Garamond"
          href={config.elementHrefs?.["guestName"] || ""}
          onUpdateHref={(val) => onUpdateHref?.("guestName", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={(field, val) => onUpdateText?.("guestName", val)}
          onToggleLock={onToggleLock}
          className="block w-full text-center mx-auto mb-3 sm:mb-3.5 px-2"
        >
          {config.elementHrefs?.["guestName"] ? (
            <a
              href={config.elementHrefs["guestName"]}
              onClick={(e) => handleLinkClick(e, config.elementHrefs?.["guestName"])}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <p className="font-serif-cormorant text-sm sm:text-base font-semibold text-neutral-900 capitalize tracking-wide leading-tight">
                {guestName || "Tamu Undangan"}
              </p>
            </a>
          ) : (
            <p className="font-serif-cormorant text-sm sm:text-base font-semibold text-neutral-900 capitalize tracking-wide leading-tight">
              {guestName || "Tamu Undangan"}
            </p>
          )}
        </CanvaElementWrapper>

        {/* Buka Undangan Button */}
        <CanvaElementWrapper
          elementId="button"
          label="Tombol Buka"
          transform={config.elementTransforms?.["button"]}
          isSelected={selectedElementId === "button"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textValues={{ single: config.buttonText || "Buka Undangan" }}
          fontSize="12px"
          fontWeight="600"
          textColor={config.buttonTextColor || "#FFFFFF"}
          fontFamilyName="Tombol Buka"
          href={config.elementHrefs?.["button"] || ""}
          onUpdateHref={(val) => onUpdateHref?.("button", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={(field, val) => onUpdateText?.("buttonText", val)}
          onToggleLock={onToggleLock}
          className="block mb-2 sm:mb-2.5"
        >
          <button
            onClick={handleOpenClick}
            type="button"
            style={{
              backgroundColor: config.buttonColor || "#713C3C",
              color: config.buttonTextColor || "#FFFFFF",
            }}
            className="btn-press inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wide shadow-lg hover:brightness-110 active:scale-90 transition-all duration-200 cursor-pointer min-h-11 min-w-40 animate-pulse-subtle"
          >
            <Heart className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>{config.buttonText || "Buka Undangan"}</span>
          </button>
        </CanvaElementWrapper>

        {/* Delicate closing note */}
        <CanvaElementWrapper
          elementId="closingNote"
          label="Catatan Penutup"
          transform={config.elementTransforms?.["closingNote"]}
          isSelected={selectedElementId === "closingNote"}
          isEditable={isEditable}
          zoomLevel={zoomLevel}
          isText={true}
          textValues={{ single: config.closingNote || "Sebuah hari, sebuah janji, selamanya." }}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="11px"
          textColor="#737373"
          fontFamilyName="Cormorant Italic"
          href={config.elementHrefs?.["closingNote"] || ""}
          onUpdateHref={(val) => onUpdateHref?.("closingNote", val)}
          onSelect={onSelectElement || (() => {})}
          onUpdateTransform={onUpdateTransform}
          onUpdateText={(field, val) => onUpdateText?.("closingNote", val)}
          onToggleLock={onToggleLock}
          className="block mt-0.5"
        >
          {config.elementHrefs?.["closingNote"] ? (
            <a
              href={config.elementHrefs["closingNote"]}
              onClick={(e) => handleLinkClick(e, config.elementHrefs?.["closingNote"])}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <p className="font-serif-cormorant italic text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">
                {config.closingNote || "Sebuah hari, sebuah janji, selamanya."}
              </p>
            </a>
          ) : (
            <p className="font-serif-cormorant italic text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">
              {config.closingNote || "Sebuah hari, sebuah janji, selamanya."}
            </p>
          )}
        </CanvaElementWrapper>

        {/* Aurovia Creative Branding Logo */}
        {config.showAuroviaLogo !== false && (
          <CanvaElementWrapper
            elementId="auroviaLogo"
            label="Logo Aurovia"
            transform={config.elementTransforms?.["auroviaLogo"]}
            isSelected={selectedElementId === "auroviaLogo"}
            isEditable={isEditable}
            zoomLevel={zoomLevel}
            isText={false}
            href={config.elementHrefs?.["auroviaLogo"] || ""}
            onUpdateHref={(val) => onUpdateHref?.("auroviaLogo", val)}
            onSelect={onSelectElement || (() => {})}
            onUpdateTransform={onUpdateTransform}
            onToggleLock={onToggleLock}
            className="block mt-2 sm:mt-2.5 z-20"
          >
            {config.elementHrefs?.["auroviaLogo"] ? (
              <a
                href={config.elementHrefs["auroviaLogo"]}
                onClick={(e) => handleLinkClick(e, config.elementHrefs?.["auroviaLogo"])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/images/Logo-Aurovia-Creative.svg"
                  alt="Aurovia Creative"
                  width={96}
                  height={36}
                  className="h-4.5 sm:h-5 w-auto object-contain filter drop-shadow-xs"
                />
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/Logo-Aurovia-Creative.svg"
                  alt="Aurovia Creative"
                  width={96}
                  height={36}
                  className="h-4.5 sm:h-5 w-auto object-contain filter drop-shadow-xs"
                />
              </div>
            )}
          </CanvaElementWrapper>
        )}
      </div>
    </div>
  );

  // Envelope Flap Overlay (Animasi Tutup Amplop Membuka ke Atas secara 3D)
  const envelopeFlapLayer = (
    <div
      className={`absolute top-0 left-0 right-0 h-44 z-35 pointer-events-none transition-all ${
        isUnfolding ? "animate-envelope-flap" : ""
      }`}
      style={{
        perspective: "1200px",
        transformOrigin: "top center",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 160"
        className="w-full h-full drop-shadow-md"
        preserveAspectRatio="none"
      >
        <polygon
          points="0,0 360,0 180,155"
          fill="#FAF6ED"
          stroke="#C3A16A"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />
        <polygon
          points="15,6 345,6 180,146"
          fill="none"
          stroke="#D8BD8C"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Wax Seal Monogram di Ujung Tutup Amplop */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[125px] z-40 transition-all ${
          isUnfolding ? "animate-seal-burst" : ""
        }`}
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-700 via-gold-600 to-amber-800 border-2 border-gold-300 shadow-lg flex items-center justify-center text-ivory-50 font-serif font-bold text-xs tracking-wider">
          F &amp; I
        </div>
      </div>
    </div>
  );

  // If used as an embedded preview inside the admin panel
  if (isEmbedPreview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0F1015] overflow-hidden">
        {cardContent}
      </div>
    );
  }

  // If used in preview modal mockup
  if (isModalPreview) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sampul Undangan Pernikahan Fitri dan Irwan"
        className={`absolute inset-0 z-40 flex items-center justify-center bg-[#0F1015] p-0 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isUnfolding
            ? "opacity-0 pointer-events-none scale-105 filter blur-[2px]"
            : isOpen
            ? "opacity-0 pointer-events-none -translate-y-full"
            : "opacity-100 pointer-events-auto translate-y-0"
        }`}
      >
        <div
          className={`w-full h-full min-h-dvh sm:min-h-0 sm:h-[min(820px,100dvh)] sm:max-w-90 sm:shadow-2xl sm:shadow-black/80 relative flex flex-col justify-between overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isUnfolding ? "animate-letter-slide" : isOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {envelopeFlapLayer}
          {cardContent}
        </div>
      </div>
    );
  }

  // Full Screen Cover Screen Overlay for public site (Infinix Note 8 reference: 360 x 820)
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sampul Undangan Pernikahan Fitri dan Irwan"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0F1015] p-0 sm:py-4 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isUnfolding
          ? "opacity-0 pointer-events-none scale-105 filter blur-[2px]"
          : isOpen
          ? "opacity-0 pointer-events-none -translate-y-full"
          : "opacity-100 pointer-events-auto translate-y-0"
      }`}
    >
      <div
        className={`w-full h-full min-h-dvh sm:min-h-0 sm:h-[min(820px,100dvh)] sm:max-w-90 sm:shadow-2xl sm:shadow-black/80 relative flex flex-col justify-between overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isUnfolding ? "animate-letter-slide" : isOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {envelopeFlapLayer}
        {cardContent}
      </div>
    </div>
  );
}
