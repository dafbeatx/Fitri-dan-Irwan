"use client";

import React, { useState, useRef, useCallback } from "react";
import { Lock, Unlock, Check, X, RotateCw, Link2, Type } from "lucide-react";
import { CanvasElementTransform } from "@/lib/coverConfig";

export interface CanvaElementWrapperProps {
  elementId: string;
  label: string;
  transform?: CanvasElementTransform;
  isSelected: boolean;
  isEditable: boolean;
  zoomLevel?: number;
  isText?: boolean;
  textType?: "single" | "couple_names" | "salutation";
  textValues?: {
    single?: string;
    brideName?: string;
    groomName?: string;
    salutation?: string;
    subSalutation?: string;
  };
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  letterSpacing?: string;
  textColor?: string;
  fontFamilyName?: string;
  href?: string;
  onUpdateHref?: (newHref: string) => void;
  onSelect: (id: string | null) => void;
  onUpdateTransform?: (
    id: string,
    updater: (prev: CanvasElementTransform) => CanvasElementTransform,
    saveHistory?: boolean
  ) => void;
  onUpdateText?: (field: string, value: string) => void;
  onToggleLock?: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

type InteractionMode = "idle" | "drag" | "resize" | "rotate" | "text-edit";

export function CanvaElementWrapper({
  elementId,
  label,
  transform,
  isSelected,
  isEditable,
  zoomLevel = 100,
  isText = false,
  textType = "single",
  textValues,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  textColor,
  fontFamilyName,
  href = "",
  onUpdateHref,
  onSelect,
  onUpdateTransform,
  onUpdateText,
  onToggleLock,
  children,
  className = "",
}: CanvaElementWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("idle");

  // Inline Text Editing Local State
  const [singleText, setSingleText] = useState(textValues?.single ?? "");
  const [brideText, setBrideText] = useState(textValues?.brideName ?? "");
  const [groomText, setGroomText] = useState(textValues?.groomName ?? "");
  const [salutationText, setSalutationText] = useState(textValues?.salutation ?? "");
  const [subSalutationText, setSubSalutationText] = useState(textValues?.subSalutation ?? "");
  const [currentHref, setCurrentHref] = useState(href ?? "");
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  // Commit text & href editing changes
  const handleCommitText = useCallback(() => {
    if (textType === "couple_names") {
      onUpdateText?.("brideName", brideText);
      onUpdateText?.("groomName", groomText);
    } else if (textType === "salutation") {
      onUpdateText?.("salutation", salutationText);
      onUpdateText?.("subSalutation", subSalutationText);
    } else {
      onUpdateText?.(elementId, singleText);
    }
    if (onUpdateHref) {
      onUpdateHref(currentHref);
    }
    setIsLinkOpen(false);
    setInteractionMode("idle");
  }, [
    textType,
    brideText,
    groomText,
    salutationText,
    subSalutationText,
    singleText,
    elementId,
    onUpdateText,
    currentHref,
    onUpdateHref,
  ]);

  const handleCancelText = useCallback(() => {
    setSingleText(textValues?.single ?? "");
    setBrideText(textValues?.brideName ?? "");
    setGroomText(textValues?.groomName ?? "");
    setSalutationText(textValues?.salutation ?? "");
    setSubSalutationText(textValues?.subSalutation ?? "");
    setCurrentHref(href ?? "");
    setIsLinkOpen(false);
    setInteractionMode("idle");
  }, [textValues, href]);

  // Auto-commit when clicking or tabbing outside of inline text editing container
  const handleContainerBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node)) {
        return;
      }
      handleCommitText();
    },
    [handleCommitText]
  );

  // Compute transform values
  const currentTransform = transform || { x: 0, y: 0, scale: 1, rotate: 0, locked: false };
  const x = currentTransform.x || 0;
  const y = currentTransform.y || 0;
  const scale = currentTransform.scale ?? 1;
  const rotate = currentTransform.rotate || 0;
  const isLocked = Boolean(currentTransform.locked);

  const transformStyle: React.CSSProperties = {
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
    transformOrigin: "center center",
    transition: interactionMode !== "idle" ? "none" : "transform 0.15s ease-out",
  };

  // If outside of editor, render clean transformed element
  if (!isEditable) {
    return (
      <div style={transformStyle} className={className}>
        {children}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // POINTER DRAG INTERACTION (Threshold-based: Click vs Drag)
  // -------------------------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (interactionMode === "text-edit") return;

    // Check if clicking handle or button directly
    const target = e.target as HTMLElement;
    if (target.closest("[data-canva-handle]")) {
      return;
    }

    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const origX = x;
    const origY = y;
    let hasMovedPastThreshold = false;
    const currentZoom = Math.max(0.2, zoomLevel / 100);

    const onPointerMove = (moveEvt: PointerEvent) => {
      const dist = Math.hypot(moveEvt.clientX - startX, moveEvt.clientY - startY);

      if (!hasMovedPastThreshold && dist >= 3) {
        hasMovedPastThreshold = true;
        if (!isLocked) {
          setInteractionMode("drag");
        }
      }

      if (hasMovedPastThreshold && !isLocked && onUpdateTransform) {
        const deltaX = (moveEvt.clientX - startX) / currentZoom;
        const deltaY = (moveEvt.clientY - startY) / currentZoom;
        onUpdateTransform(
          elementId,
          (prev) => ({
            ...prev,
            x: Math.round(origX + deltaX),
            y: Math.round(origY + deltaY),
          }),
          false
        );
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (hasMovedPastThreshold && !isLocked && onUpdateTransform) {
        // Save history commit on pointer release
        onUpdateTransform(elementId, (prev) => prev, true);
        setInteractionMode("idle");
      } else {
        // Clean single click! Select element
        onSelect(elementId);
        setInteractionMode("idle");
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // -------------------------------------------------------------------------
  // DOUBLE CLICK: TEXT EDIT MODE
  // -------------------------------------------------------------------------
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isText && !isLocked) {
      setSingleText(textValues?.single || "");
      setBrideText(textValues?.brideName || "");
      setGroomText(textValues?.groomName || "");
      setSalutationText(textValues?.salutation || "");
      setSubSalutationText(textValues?.subSalutation || "");
      setCurrentHref(href || "");
      setIsLinkOpen(false);
      setInteractionMode("text-edit");
    }
  };

  // -------------------------------------------------------------------------
  // RESIZE CORNER HANDLES
  // -------------------------------------------------------------------------
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLocked || !onUpdateTransform || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startDist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const origScale = scale;

    setInteractionMode("resize");

    const onPointerMove = (moveEvt: PointerEvent) => {
      const currDist = Math.hypot(moveEvt.clientX - centerX, moveEvt.clientY - centerY);
      const ratio = startDist > 0 ? currDist / startDist : 1;
      const nextScale = Math.max(0.3, Math.min(3.0, Number((origScale * ratio).toFixed(2))));

      onUpdateTransform(
        elementId,
        (prev) => ({
          ...prev,
          scale: nextScale,
        }),
        false
      );
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      onUpdateTransform(elementId, (prev) => prev, true);
      setInteractionMode("idle");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // -------------------------------------------------------------------------
  // ROTATION TOP HANDLE
  // -------------------------------------------------------------------------
  const handleRotatePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLocked || !onUpdateTransform || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const origRotate = rotate;

    setInteractionMode("rotate");

    const onPointerMove = (moveEvt: PointerEvent) => {
      const currAngle = Math.atan2(moveEvt.clientY - centerY, moveEvt.clientX - centerX) * (180 / Math.PI);
      const diff = currAngle - startAngle;
      let nextAngle = origRotate + diff;

      // Shift key snaps to 15 degree increments
      if (moveEvt.shiftKey) {
        nextAngle = Math.round(nextAngle / 15) * 15;
      }

      // Normalize to -180 .. 180 range
      let normalized = Math.round(((nextAngle % 360) + 360) % 360);
      if (normalized > 180) normalized -= 360;

      onUpdateTransform(
        elementId,
        (prev) => ({
          ...prev,
          rotate: normalized,
        }),
        false
      );
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      onUpdateTransform(elementId, (prev) => prev, true);
      setInteractionMode("idle");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={containerRef}
      style={transformStyle}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      data-canvas-element={elementId}
      className={`relative group touch-none select-none ${
        isLocked
          ? "cursor-not-allowed"
          : interactionMode === "drag"
          ? "cursor-grabbing"
          : "cursor-pointer"
      } ${className}`}
    >
      {/* Element Child Content (Normal or Inline Edit Mode) */}
      {interactionMode === "text-edit" ? (
        <div
          data-canva-handle="inline-editing-container"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onBlur={handleContainerBlur}
          className="relative z-40 select-text cursor-text w-full flex flex-col items-center justify-center p-1 rounded-lg border-2 border-dashed border-[#00C4CC] bg-cyan-950/10 shadow-lg"
        >
          {textType === "couple_names" ? (
            <div className="flex flex-col items-center justify-center gap-0.5 w-full max-w-44 mx-auto">
              <input
                autoFocus
                type="text"
                value={brideText}
                onChange={(e) => setBrideText(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleCommitText();
                  if (e.key === "Escape") handleCancelText();
                }}
                style={{
                  fontFamily: fontFamily || "'Great Vibes', cursive",
                  fontSize: fontSize || "32px",
                  color: textColor || "#171717",
                  lineHeight: 1.15,
                }}
                className="bg-transparent border-b-2 border-cyan-400 outline-none text-center w-full drop-shadow-xs px-1 py-0.5 rounded-t"
                placeholder="Fitri"
              />
              <span
                style={{ color: "#C3A16A" }}
                className="font-serif-cormorant text-sm sm:text-base font-light italic my-0.5 leading-none select-none tracking-widest"
              >
                &amp;
              </span>
              <input
                type="text"
                value={groomText}
                onChange={(e) => setGroomText(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleCommitText();
                  if (e.key === "Escape") handleCancelText();
                }}
                style={{
                  fontFamily: fontFamily || "'Great Vibes', cursive",
                  fontSize: fontSize || "32px",
                  color: textColor || "#171717",
                  lineHeight: 1.15,
                }}
                className="bg-transparent border-b-2 border-cyan-400 outline-none text-center w-full drop-shadow-xs px-1 py-0.5 rounded-t"
                placeholder="Irwan"
              />
            </div>
          ) : textType === "salutation" ? (
            <div className="inline-block text-center w-full max-w-64">
              <input
                autoFocus
                type="text"
                value={salutationText}
                onChange={(e) => setSalutationText(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleCommitText();
                  if (e.key === "Escape") handleCancelText();
                }}
                style={{
                  fontFamily: fontFamily || "var(--font-cormorant), Georgia, serif",
                  fontSize: fontSize || "12px",
                  color: textColor || "#525252",
                }}
                className="bg-transparent border-b border-cyan-400 outline-none text-center w-full px-1 py-0.5 rounded-t uppercase tracking-wider"
                placeholder="Salam Utama"
              />
              <input
                type="text"
                value={subSalutationText}
                onChange={(e) => setSubSalutationText(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleCommitText();
                  if (e.key === "Escape") handleCancelText();
                }}
                style={{
                  fontFamily: fontFamily || "var(--font-cormorant), Georgia, serif",
                  fontSize: "11px",
                  color: textColor || "#737373",
                }}
                className="bg-transparent border-b border-cyan-400 outline-none text-center w-full px-1 py-0.5 rounded-t mt-1"
                placeholder="Sub Salam"
              />
            </div>
          ) : (
            <div className="inline-block text-center w-full">
              <input
                autoFocus
                type="text"
                value={singleText}
                onChange={(e) => setSingleText(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") handleCommitText();
                  if (e.key === "Escape") handleCancelText();
                }}
                style={{
                  fontFamily: fontFamily || "inherit",
                  fontSize: fontSize || "inherit",
                  fontWeight: fontWeight || "inherit",
                  letterSpacing: letterSpacing || "inherit",
                  color: textColor || "inherit",
                }}
                className="bg-transparent border-b-2 border-cyan-400 outline-none text-center w-full min-w-28 max-w-full px-2 py-0.5 rounded-t"
                placeholder="Tulis teks..."
              />
            </div>
          )}
        </div>
      ) : (
        <>{children}</>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* FLOATING CANVA ACTION BAR & HREF CONTROLS (WHEN EDITING TEXT)       */}
      {/* ------------------------------------------------------------------- */}
      {interactionMode === "text-edit" && (
        <div
          data-canva-handle="floating-text-toolbar"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-[#1B1D24]/95 text-white px-2.5 py-1.5 rounded-xl border border-cyan-400/80 shadow-2xl backdrop-blur-md whitespace-nowrap"
        >
          {/* Font Name Indicator */}
          <div className="flex items-center gap-1 text-[10px] text-cyan-300 font-medium px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
            <Type className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate max-w-24 sm:max-w-32">{fontFamilyName || "Font Asli"}</span>
          </div>

          <div className="w-px h-4 bg-white/20" />

          {/* <href> Link Button & Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLinkOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                currentHref
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                  : "bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20"
              }`}
              title="Atur Hyperlink (<href>)"
            >
              <Link2 className="w-3 h-3 shrink-0" />
              <span className="truncate max-w-28">
                {currentHref ? `<href="${currentHref}">` : "+ <href>"}
              </span>
            </button>

            {/* Link Popover */}
            {isLinkOpen && (
              <div className="absolute top-full mt-2 left-0 z-50 bg-[#22242D] border border-cyan-400/80 rounded-xl p-3 shadow-2xl text-left w-64">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                  <span className="text-[10px] font-semibold text-cyan-300 flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    Tautan Link (&lt;href&gt;)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLinkOpen(false)}
                    className="text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <label className="text-[9px] text-neutral-400 block mb-1">Target URL / ID Section:</label>
                <input
                  type="text"
                  placeholder="Contoh: #mempelai, #acara, https://..."
                  value={currentHref}
                  onChange={(e) => setCurrentHref(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") setIsLinkOpen(false);
                  }}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-[#131418] border border-neutral-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 mb-2"
                />

                {/* Quick Anchor Presets */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {[
                    { label: "#mempelai", val: "#mempelai" },
                    { label: "#acara", val: "#acara" },
                    { label: "#lokasi", val: "#lokasi" },
                    { label: "#rsvp", val: "#rsvp" },
                    { label: "#hadiah", val: "#hadiah" },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setCurrentHref(preset.val)}
                      className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                        currentHref === preset.val
                          ? "bg-cyan-600 border-cyan-400 text-white font-medium"
                          : "bg-[#18191E] border-neutral-700 text-neutral-300 hover:text-white"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsLinkOpen(false)}
                  className="w-full text-[10px] py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-center cursor-pointer shadow-xs"
                >
                  Terapkan Tautan Link
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-white/20" />

          {/* Commit & Cancel Buttons */}
          <button
            type="button"
            onClick={handleCommitText}
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium cursor-pointer shadow-sm"
            title="Simpan Perubahan (Enter)"
          >
            <Check className="w-3 h-3" />
            <span>Selesai</span>
          </button>
          <button
            type="button"
            onClick={handleCancelText}
            className="p-1 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white cursor-pointer"
            title="Batal (Escape)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* CANVA SELECTION BORDER & HANDLES (HIDDEN IN LIVE TEXT-EDIT)          */}
      {/* ------------------------------------------------------------------- */}
      {isSelected && interactionMode !== "text-edit" && (
        <div
          className={`absolute -inset-1.5 pointer-events-none z-30 transition-all ${
            isLocked
              ? "border-2 border-dashed border-amber-500 rounded-lg shadow-sm"
              : "border-2 border-[#00C4CC] rounded-lg shadow-md"
          }`}
        >
          {/* Label Badge & Lock Status */}
          <div className="absolute -top-6 left-0 flex items-center gap-1 pointer-events-auto">
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm text-white uppercase tracking-wider flex items-center gap-1 ${
                isLocked ? "bg-amber-600" : "bg-[#00C4CC]"
              }`}
            >
              {isLocked && <Lock className="w-2.5 h-2.5" />}
              {label}
            </span>
          </div>

          {/* Quick Lock / Unlock Action Badge */}
          <button
            type="button"
            data-canva-handle="lock-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock?.(elementId);
            }}
            className={`absolute -top-3.5 -right-3.5 p-1 rounded-full text-white shadow-md cursor-pointer pointer-events-auto transition-transform hover:scale-110 active:scale-95 ${
              isLocked ? "bg-amber-500 hover:bg-amber-600" : "bg-[#2A2C35] hover:bg-[#383A46] border border-white/20"
            }`}
            title={isLocked ? "Buka kunci elemen" : "Kunci elemen"}
          >
            {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-neutral-300" />}
          </button>

          {/* Handles (Shown only when NOT locked) */}
          {!isLocked && (
            <>
              {/* Rotation Handle: Top Stem & Circle */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
                <button
                  type="button"
                  data-canva-handle="rotate"
                  onPointerDown={handleRotatePointerDown}
                  className="w-4 h-4 rounded-full bg-white border-2 border-[#00C4CC] shadow-md flex items-center justify-center cursor-grab hover:scale-125 transition-transform"
                  title="Putar elemen (Tahan Shift untuk sudut 15°)"
                >
                  <RotateCw className="w-2.5 h-2.5 text-[#00C4CC]" />
                </button>
                <div className="w-0.5 h-3 bg-[#00C4CC]" />
              </div>

              {/* 4 Corner Resize Handles */}
              {/* Top-Left (NW) */}
              <div
                data-canva-handle="resize-nw"
                onPointerDown={handleResizePointerDown}
                className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#00C4CC] rounded-full shadow-xs cursor-nwse-resize hover:scale-125 transition-transform pointer-events-auto"
                title="Tarik untuk ubah ukuran"
              />

              {/* Top-Right (NE) */}
              <div
                data-canva-handle="resize-ne"
                onPointerDown={handleResizePointerDown}
                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#00C4CC] rounded-full shadow-xs cursor-nesw-resize hover:scale-125 transition-transform pointer-events-auto"
                title="Tarik untuk ubah ukuran"
              />

              {/* Bottom-Right (SE) */}
              <div
                data-canva-handle="resize-se"
                onPointerDown={handleResizePointerDown}
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#00C4CC] rounded-full shadow-xs cursor-nwse-resize hover:scale-125 transition-transform pointer-events-auto"
                title="Tarik untuk ubah ukuran"
              />

              {/* Bottom-Left (SW) */}
              <div
                data-canva-handle="resize-sw"
                onPointerDown={handleResizePointerDown}
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#00C4CC] rounded-full shadow-xs cursor-nesw-resize hover:scale-125 transition-transform pointer-events-auto"
                title="Tarik untuk ubah ukuran"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
