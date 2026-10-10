"use client";

import React from "react";

export type FloralCornerStyle =
  | "none"
  | "asli"          // Bunga Asli Fitri & Irwan (from fitri-irwan-undangan-react-vite)
  | "eucalyptus"    // Ranting Daun Eucalyptus
  | "vintage_rose"   // Mawar Vintage Romantis
  | "luxury_gold"    // Filigri Royal Gold
  | "jasmine"       // Melati Islami
  | "minimalist"    // Garis Daun Minimalis
  // Backward compatibility aliases
  | "asset_1"
  | "asset_3"
  | "asset_4"
  | "asset_7"
  | "asset_10";

export type FloralCornerPosition = "diagonal" | "all" | "top" | "bottom";

export type FloralFrameStyle =
  | "none"
  | "double_border"     // Garis Ganda Klasik (asli fitri-irwan-undangan)
  | "arch"              // Lengkung Kubah Elegan
  | "corner_accents"    // Aksen Sudut Geometris
  | "botanical_canopy"  // Kanopi Ranting Bunga Atas
  | "botanical_bottom"  // Ranting Hiasan Bawah
  | "crest"             // Mahkota Klasik Crest
  // Backward compatibility aliases
  | "wreath"
  | "rectangle"
  | "asset_6"
  | "asset_14"
  | "asset_2"
  | "asset_8";

export type FloralDividerStyle =
  | "none"
  | "star"          // Bintang Klasik ✦ (asli fitri-irwan-undangan)
  | "leaf_flourish" // Ranting Daun Kembar
  | "rings"         // Sepasang Cincin Emas
  | "minimal_line"  // Garis Tipis & Diamond
  | "arabesque"     // Motif Arabesque Islami
  // Backward compatibility aliases
  | "asset_11"
  | "asset_13"
  | "asset_15";

export type MonogramStyle = "text" | "wax_seal" | "diamond" | "asset_19";

export type TitleStyle = "text" | "calligraphy" | "bismillah" | "asset_17";

export type CoupleIllustrationStyle = "none" | "asset_16" | "asset_18";

// 1. Authentic Botanical Floral Corner from fitri-irwan-undangan-react-vite
export function FloralCornerAsli({
  position = "top-right",
  color = "#C3A16A",
  size = 85,
  opacity = 0.9,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "rotate(180deg)";
      case "bottom-left":
        return "rotate(0deg)";
      case "top-left":
        return "scale(-1, 1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size * (190 / 220)}
      viewBox="0 0 220 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <g stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 180 C45 140 65 95 95 10 M45 145 C20 130 15 110 20 92 M67 108 C98 105 117 83 122 58 M86 70 C65 57 62 39 70 22 M117 86 C145 92 166 78 181 54" />
        <path d="M20 92 C42 94 48 110 45 128 M122 58 C142 55 154 40 155 20 M181 54 C199 62 208 78 207 94" />
      </g>
      <g fill={color} opacity="0.65">
        <ellipse cx="32" cy="105" rx="7" ry="17" transform="rotate(-42 32 105)" />
        <ellipse cx="47" cy="126" rx="6" ry="16" transform="rotate(34 47 126)" />
        <ellipse cx="77" cy="44" rx="7" ry="17" transform="rotate(-48 77 44)" />
        <ellipse cx="91" cy="88" rx="7" ry="17" transform="rotate(42 91 88)" />
        <ellipse cx="139" cy="52" rx="7" ry="18" transform="rotate(40 139 52)" />
        <ellipse cx="176" cy="69" rx="7" ry="16" transform="rotate(-48 176 69)" />
        <ellipse cx="202" cy="81" rx="6" ry="14" transform="rotate(-25 202 81)" />
      </g>
      <g fill="#DCA9A6">
        <circle cx="69" cy="22" r="5" />
        <circle cx="155" cy="20" r="5" />
        <circle cx="181" cy="54" r="4" />
      </g>
      <g transform="translate(110 128)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-12"
            rx="7"
            ry="15"
            transform={`rotate(${a})`}
            fill="#E6C5BF"
            stroke="#C99B91"
            strokeWidth="0.6"
          />
        ))}
        <circle r="5" fill={color} />
      </g>
    </svg>
  );
}

// 2. Eucalyptus Botanical Corner
export function FloralCornerEucalyptus({
  position = "top-left",
  color = "#C3A16A",
  size = 80,
  opacity = 0.8,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <path d="M5 5 C 25 15, 45 40, 50 85" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 5 C 15 25, 40 45, 85 50" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="20" cy="18" rx="8" ry="5" transform="rotate(-30 20 18)" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1" />
      <ellipse cx="18" cy="20" rx="5" ry="8" transform="rotate(30 18 20)" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1" />
      <ellipse cx="33" cy="30" rx="9" ry="6" transform="rotate(-40 33 30)" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
      <ellipse cx="30" cy="33" rx="6" ry="9" transform="rotate(40 30 33)" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
      <ellipse cx="44" cy="50" rx="10" ry="7" transform="rotate(-25 44 50)" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1" />
      <ellipse cx="50" cy="44" rx="7" ry="10" transform="rotate(25 50 44)" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1" />
      <ellipse cx="49" cy="72" rx="9" ry="6" transform="rotate(-15 49 72)" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <ellipse cx="72" cy="49" rx="6" ry="9" transform="rotate(15 72 49)" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <circle cx="28" cy="12" r="2.2" fill={color} />
      <circle cx="12" cy="28" r="2.2" fill={color} />
    </svg>
  );
}

// 3. Vintage Romantic Rose Corner
export function FloralCornerVintageRose({
  position = "top-left",
  color = "#C3A16A",
  size = 80,
  opacity = 0.8,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <circle cx="24" cy="24" r="14" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="9" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.2" />
      <path d="M20 22 C 22 18, 26 18, 28 22 C 28 26, 24 28, 24 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 24 Q 60 25 80 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 26 Q 58 18 64 24 Q 58 30 50 26" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <path d="M68 33 Q 76 25 82 32 Q 76 38 68 33" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <path d="M24 38 Q 25 60 40 80" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 50 Q 18 58 24 64 Q 30 58 26 50" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <path d="M33 68 Q 25 76 32 82 Q 38 76 33 68" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      <circle cx="82" cy="42" r="4.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
      <circle cx="42" cy="82" r="4.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// 4. Luxury Royal Gold Filigree Corner
export function FloralCornerLuxuryGold({
  position = "top-left",
  color = "#C3A16A",
  size = 80,
  opacity = 0.8,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <path d="M6 6 L 6 85" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 6 L 85 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 12 L 12 70" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M12 12 L 70 12" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
      <rect x="4" y="4" width="5" height="5" transform="rotate(45 6.5 6.5)" fill={color} />
      <rect x="10" y="10" width="4" height="4" transform="rotate(45 12 12)" fill={color} />
      <path d="M6 35 C 20 35, 30 25, 35 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 55 C 35 55, 50 35, 55 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="35" cy="35" r="3.5" fill={color} />
      <circle cx="20" cy="50" r="2.5" fill={color} fillOpacity="0.7" />
      <circle cx="50" cy="20" r="2.5" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

// 5. Minimalist Line Art Botanical Corner
export function FloralCornerMinimalist({
  position = "top-left",
  color = "#C3A16A",
  size = 80,
  opacity = 0.8,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <path d="M10 10 Q 50 15 80 45" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 10 Q 15 50 45 80" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 15 Q 35 8 45 14 Q 35 22 25 15" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />
      <path d="M45 22 Q 55 15 65 22 Q 55 30 45 22" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />
      <path d="M15 25 Q 8 35 14 45 Q 22 35 15 25" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />
      <path d="M22 45 Q 15 55 22 65 Q 30 55 22 45" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="10" cy="10" r="2.5" fill={color} />
    </svg>
  );
}

// 6. Jasmine (Melati) Islamic Corner
export function FloralCornerJasmine({
  position = "top-left",
  color = "#C3A16A",
  size = 80,
  opacity = 0.8,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: getTransform(),
        opacity,
      }}
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <g transform="translate(24, 24)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-10"
            rx="5.5"
            ry="9"
            transform={`rotate(${angle})`}
            fill={color}
            fillOpacity="0.4"
            stroke={color}
            strokeWidth="1"
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill={color} />
      </g>
      <path d="M38 24 Q 60 20 82 32" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 38 Q 20 60 32 82" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="58" cy="22" r="3.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.8" />
      <circle cx="75" cy="27" r="3" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.8" />
      <circle cx="22" cy="58" r="3.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.8" />
      <circle cx="27" cy="75" r="3" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

// 7. Complete Floral Corner Set Renderer
export function FloralCornerSet({
  style = "asli",
  color = "#C3A16A",
  size = 80,
  opacity = 0.85,
  position = "diagonal",
}: {
  style: FloralCornerStyle;
  color?: string;
  size?: number;
  opacity?: number;
  position?: FloralCornerPosition;
}) {
  if (style === "none") return null;

  // Resolve component based on style
  const Component =
    style === "asli" || style === "asset_1" || style === "asset_3" || style === "asset_4" || style === "asset_7" || style === "asset_10"
      ? FloralCornerAsli
      : style === "vintage_rose"
      ? FloralCornerVintageRose
      : style === "luxury_gold"
      ? FloralCornerLuxuryGold
      : style === "minimalist"
      ? FloralCornerMinimalist
      : style === "jasmine"
      ? FloralCornerJasmine
      : FloralCornerEucalyptus;

  // "diagonal": Top-Right & Bottom-Left (authentic fitri-irwan-undangan layout)
  if (position === "diagonal") {
    return (
      <>
        <div className="absolute top-0 right-0 z-15 pointer-events-none select-none">
          <Component position="top-right" color={color} size={size} opacity={opacity} />
        </div>
        <div className="absolute bottom-0 left-0 z-15 pointer-events-none select-none">
          <Component position="bottom-left" color={color} size={size} opacity={opacity} />
        </div>
      </>
    );
  }

  // "top": Only 2 top corners
  if (position === "top") {
    return (
      <>
        <div className="absolute top-0 left-0 z-15 pointer-events-none select-none">
          <Component position="top-left" color={color} size={size} opacity={opacity} />
        </div>
        <div className="absolute top-0 right-0 z-15 pointer-events-none select-none">
          <Component position="top-right" color={color} size={size} opacity={opacity} />
        </div>
      </>
    );
  }

  // "bottom": Only 2 bottom corners
  if (position === "bottom") {
    return (
      <>
        <div className="absolute bottom-0 left-0 z-15 pointer-events-none select-none">
          <Component position="bottom-left" color={color} size={size} opacity={opacity} />
        </div>
        <div className="absolute bottom-0 right-0 z-15 pointer-events-none select-none">
          <Component position="bottom-right" color={color} size={size} opacity={opacity} />
        </div>
      </>
    );
  }

  // "all": 4 corners
  return (
    <>
      <div className="absolute top-0 left-0 z-15 pointer-events-none select-none">
        <Component position="top-left" color={color} size={size} opacity={opacity} />
      </div>
      <div className="absolute top-0 right-0 z-15 pointer-events-none select-none">
        <Component position="top-right" color={color} size={size} opacity={opacity} />
      </div>
      <div className="absolute bottom-0 left-0 z-15 pointer-events-none select-none">
        <Component position="bottom-left" color={color} size={size} opacity={opacity} />
      </div>
      <div className="absolute bottom-0 right-0 z-15 pointer-events-none select-none">
        <Component position="bottom-right" color={color} size={size} opacity={opacity} />
      </div>
    </>
  );
}

// 8. Card Frame & Border Overlays (Non-obstructive vector designs)
export function FloralFrameOverlay({
  style = "none",
  color = "#C3A16A",
  opacity = 0.75,
}: {
  style: FloralFrameStyle;
  color?: string;
  opacity?: number;
}) {
  if (style === "none") return null;

  // Double Border (Classic Wedding Frame from fitri-irwan-undangan)
  if (style === "double_border" || style === "rectangle") {
    return (
      <div
        className="absolute inset-3 sm:inset-4.5 pointer-events-none select-none z-5 transition-all duration-300 rounded-sm"
        style={{ borderColor: color, opacity }}
      >
        <div
          className="absolute inset-0 border"
          style={{ borderColor: color, opacity: 0.8 }}
        />
        <div
          className="absolute inset-1.5 sm:inset-2 border"
          style={{ borderColor: color, opacity: 0.5 }}
        />
        {/* Subtle corner diamonds */}
        <div className="absolute -top-1 -left-1 w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
        <div className="absolute -top-1 -right-1 w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
      </div>
    );
  }

  // Rounded Arch Frame
  if (style === "arch" || style === "asset_6") {
    return (
      <div
        className="absolute inset-3 sm:inset-4 pointer-events-none select-none z-5 transition-all duration-300"
        style={{ opacity }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 520" fill="none" preserveAspectRatio="none">
          <path
            d="M 12 520 L 12 140 A 138 138 0 0 1 288 140 L 288 520"
            stroke={color}
            strokeWidth="1.4"
          />
          <path
            d="M 20 520 L 20 142 A 130 130 0 0 1 280 142 L 280 520"
            stroke={color}
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
          <circle cx="150" cy="4" r="3.5" fill={color} />
          <path d="M 150 4 Q 162 15 150 24 Q 138 15 150 4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // Geometric Corner Accents
  if (style === "corner_accents") {
    return (
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none select-none z-5 transition-all duration-300"
        style={{ opacity }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 520" fill="none">
          {/* Top-Left */}
          <path d="M 4 28 L 4 4 L 28 4" stroke={color} strokeWidth="1.5" />
          <line x1="8" y1="8" x2="24" y2="8" stroke={color} strokeWidth="0.8" />
          <line x1="8" y1="8" x2="8" y2="24" stroke={color} strokeWidth="0.8" />
          {/* Top-Right */}
          <path d="M 296 28 L 296 4 L 272 4" stroke={color} strokeWidth="1.5" />
          <line x1="292" y1="8" x2="276" y2="8" stroke={color} strokeWidth="0.8" />
          <line x1="292" y1="8" x2="292" y2="24" stroke={color} strokeWidth="0.8" />
          {/* Bottom-Left */}
          <path d="M 4 492 L 4 516 L 28 516" stroke={color} strokeWidth="1.5" />
          <line x1="8" y1="512" x2="24" y2="512" stroke={color} strokeWidth="0.8" />
          <line x1="8" y1="512" x2="8" y2="496" stroke={color} strokeWidth="0.8" />
          {/* Bottom-Right */}
          <path d="M 296 492 L 296 516 L 272 516" stroke={color} strokeWidth="1.5" />
          <line x1="292" y1="512" x2="276" y2="512" stroke={color} strokeWidth="0.8" />
          <line x1="292" y1="512" x2="292" y2="496" stroke={color} strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  // Botanical Canopy Garland (Subtle top foliage - never blocks text)
  if (style === "botanical_canopy" || style === "asset_14") {
    return (
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none select-none z-10 transition-all duration-300 overflow-hidden flex justify-center"
        style={{ opacity }}
      >
        <svg className="w-full max-w-sm h-full" viewBox="0 0 320 60" fill="none">
          <path d="M 10 0 Q 160 30 310 0" stroke={color} strokeWidth="1.2" />
          {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy={14 + (i % 2) * 6} rx="5" ry="10" transform={`rotate(${(i % 2 ? 20 : -20)} ${x} ${14 + (i % 2) * 6})`} fill={color} fillOpacity="0.45" stroke={color} strokeWidth="0.8" />
              <circle cx={x + 3} cy={22 + (i % 2) * 4} r="2" fill={color} />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Botanical Bottom Foliage (Delicate bottom border - sits neatly under action button)
  if (style === "botanical_bottom" || style === "asset_2" || style === "asset_8") {
    return (
      <div
        className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none select-none z-5 transition-all duration-300 overflow-hidden flex justify-center"
        style={{ opacity }}
      >
        <svg className="w-full max-w-sm h-full" viewBox="0 0 320 50" fill="none">
          <path d="M 10 45 Q 160 25 310 45" stroke={color} strokeWidth="1" />
          {[50, 90, 130, 160, 190, 230, 270].map((x, i) => (
            <ellipse key={i} cx={x} cy={34 - (i % 2) * 5} rx="4" ry="8" transform={`rotate(${(i % 2 ? -25 : 25)} ${x} ${34 - (i % 2) * 5})`} fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.6" />
          ))}
        </svg>
      </div>
    );
  }

  // Royal Crest Frame
  if (style === "crest" || style === "wreath") {
    return (
      <div
        className="absolute inset-4 pointer-events-none select-none z-5 transition-all duration-300"
        style={{ opacity }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 520" fill="none">
          <rect x="8" y="8" width="284" height="504" stroke={color} strokeWidth="1.2" rx="4" />
          {/* Top Crest */}
          <path d="M 115 8 Q 150 -4 185 8" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="150" cy="4" r="3" fill={color} />
          {/* Bottom Crest */}
          <path d="M 115 512 Q 150 524 185 512" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="150" cy="516" r="3" fill={color} />
        </svg>
      </div>
    );
  }

  return null;
}

// 9. Elegant Dividers & Center Accents
export function FloralDividerAccent({
  style = "star",
  color = "#C3A16A",
  className = "",
}: {
  style: FloralDividerStyle;
  color?: string;
  className?: string;
}) {
  if (style === "none") return null;

  // Star Ornament (Asli fitri-irwan-undangan: ✦)
  if (style === "star") {
    return (
      <div className={`flex items-center justify-center my-1.5 pointer-events-none select-none ${className}`}>
        <span className="text-sm sm:text-base leading-none select-none" style={{ color }}>
          ✦
        </span>
      </div>
    );
  }

  // Wedding Rings (Sepasang Cincin Emas)
  if (style === "rings" || style === "asset_13") {
    return (
      <div className={`flex items-center justify-center gap-3 my-1.5 pointer-events-none select-none ${className}`}>
        <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-current opacity-50" style={{ color }} />
        <div className="flex items-center -space-x-1.5">
          <div className="w-4 h-4 rounded-full border-1.5" style={{ borderColor: color }} />
          <div className="w-4 h-4 rounded-full border-1.5" style={{ borderColor: color }} />
        </div>
        <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-current opacity-50" style={{ color }} />
      </div>
    );
  }

  // Minimalist Line with Diamond
  if (style === "minimal_line") {
    return (
      <div className={`flex items-center justify-center gap-2.5 my-1.5 pointer-events-none select-none ${className}`}>
        <div className="h-px w-10 sm:w-14 bg-linear-to-r from-transparent to-current opacity-60" style={{ color }} />
        <div className="w-1.5 h-1.5 rotate-45 rounded-xs" style={{ backgroundColor: color }} />
        <div className="h-px w-10 sm:w-14 bg-linear-to-l from-transparent to-current opacity-60" style={{ color }} />
      </div>
    );
  }

  // Islamic Arabesque
  if (style === "arabesque") {
    return (
      <div className={`flex items-center justify-center gap-2 my-1.5 pointer-events-none select-none ${className}`}>
        <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
          <line x1="5" y1="9" x2="45" y2="9" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="60" cy="9" r="5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.2" />
          <rect x="58.5" y="7.5" width="3" height="3" transform="rotate(45 60 9)" fill={color} />
          <line x1="75" y1="9" x2="115" y2="9" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  }

  // Leaf Flourish (Default Twin Leaves)
  return (
    <div className={`flex items-center justify-center gap-2 my-1.5 pointer-events-none select-none ${className}`}>
      <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
        <path d="M 50 9 Q 30 11 10 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 38 9 Q 32 3 28 7 Q 33 11 38 9" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
        <circle cx="60" cy="9" r="3" fill={color} />
        <path d="M 70 9 Q 90 11 110 9" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 82 9 Q 88 3 92 7 Q 87 11 82 9" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// 10. Monogram Seal Badge
export function MonogramSealBadge({
  text = "F & I",
  color = "#C3A16A",
  style = "text",
  className = "",
}: {
  text?: string;
  color?: string;
  style?: MonogramStyle;
  className?: string;
}) {
  // Wax Seal Badge
  if (style === "wax_seal" || style === "asset_19") {
    return (
      <div className={`inline-flex items-center justify-center pointer-events-none select-none ${className}`}>
        <div
          className="w-11 h-11 rounded-full border-2 flex items-center justify-center shadow-md relative"
          style={{
            borderColor: color,
            backgroundColor: `${color}18`,
          }}
        >
          {/* Subtle laurel wreath ring */}
          <div
            className="absolute inset-1 rounded-full border border-dashed"
            style={{ borderColor: color, opacity: 0.6 }}
          />
          <span
            className="font-serif-cormorant text-xs font-bold tracking-widest uppercase"
            style={{ color }}
          >
            {text}
          </span>
        </div>
      </div>
    );
  }

  // Diamond Badge
  if (style === "diamond") {
    return (
      <div className={`inline-flex items-center justify-center pointer-events-none select-none ${className}`}>
        <div
          className="w-10 h-10 border-1.5 rotate-45 flex items-center justify-center shadow-xs"
          style={{
            borderColor: color,
            backgroundColor: `${color}15`,
          }}
        >
          <span
            className="-rotate-45 font-serif-cormorant text-xs font-bold tracking-wider"
            style={{ color }}
          >
            {text}
          </span>
        </div>
      </div>
    );
  }

  // Classic Circular Seal
  return (
    <div className={`inline-flex items-center justify-center pointer-events-none select-none ${className}`}>
      <div
        className="w-11 h-11 rounded-full border-1.5 flex items-center justify-center shadow-xs backdrop-blur-xs"
        style={{
          borderColor: color,
          backgroundColor: `${color}15`,
        }}
      >
        <span
          className="font-serif-cormorant text-xs font-bold tracking-wider"
          style={{ color }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
