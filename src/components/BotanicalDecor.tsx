
/**
 * Bespoke Botanical & Floral Elements for Fitri & Irwan Wedding Invitation
 * Harmonious palette: Sage Green (#7D9D85 / #556858), Warm Gold (#C3A16A / #D4AF37), Blush Rose (#E6C5BF / #C99B91)
 */

interface FloralCornerProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
  color?: string;
}

// 1. Authentic Multi-Tone Botanical Floral Corner
export function BotanicalCornerAuthentic({
  className = "",
  position = "top-left",
  size = 110,
  opacity = 0.9,
  color = "#C3A16A",
}: FloralCornerProps) {
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
      height={size * (190 / 220)}
      viewBox="0 0 220 190"
      className={`pointer-events-none select-none ${className}`}
      style={{
        transform: getTransform(),
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Delicate Branches */}
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 180 C45 140 65 95 95 10 M45 145 C20 130 15 110 20 92 M67 108 C98 105 117 83 122 58 M86 70 C65 57 62 39 70 22 M117 86 C145 92 166 78 181 54" />
        <path d="M20 92 C42 94 48 110 45 128 M122 58 C142 55 154 40 155 20 M181 54 C199 62 208 78 207 94" />
      </g>

      {/* Eucalyptus Leaves in Soft Sage */}
      <g fill="#8FA695" opacity="0.88">
        <ellipse cx="32" cy="105" rx="7" ry="17" transform="rotate(-42 32 105)" />
        <ellipse cx="47" cy="126" rx="6" ry="16" transform="rotate(34 47 126)" />
        <ellipse cx="77" cy="44" rx="7" ry="17" transform="rotate(-48 77 44)" />
        <ellipse cx="91" cy="88" rx="7" ry="17" transform="rotate(42 91 88)" />
        <ellipse cx="139" cy="52" rx="7" ry="18" transform="rotate(40 139 52)" />
        <ellipse cx="176" cy="69" rx="7" ry="16" transform="rotate(-48 176 69)" />
        <ellipse cx="202" cy="81" rx="6" ry="14" transform="rotate(-25 202 81)" />
      </g>

      {/* Delicate Rose Buds */}
      <g fill="#DCA9A6">
        <circle cx="69" cy="22" r="5" />
        <circle cx="155" cy="20" r="5" />
        <circle cx="181" cy="54" r="4" />
      </g>

      {/* Blooming Blossom Cluster with Golden Stamen */}
      <g transform="translate(110 128)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-12"
            rx="7"
            ry="15"
            transform={`rotate(${a})`}
            fill="#EAD2CD"
            stroke="#C99B91"
            strokeWidth="0.6"
          />
        ))}
        <circle r="5" fill="#C3A16A" />
      </g>
    </svg>
  );
}

// 2. High-Fidelity Botanical Leaf Corner (Backwards-compatible replacement)
export function BotanicalLeafCorner({
  className = "",
  position = "top-left",
  size = 75,
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
}) {
  return (
    <BotanicalCornerAuthentic
      position={position}
      size={size}
      opacity={0.85}
      className={className}
    />
  );
}

// 3. Backward compatible alias for FloralCornerVite
export const FloralCornerVite = BotanicalCornerAuthentic;

// 4. Bespoke Circular Floral Garland Wreath for Avatars & Monograms
export function FloralGarlandWreath({
  className = "",
  size = 148,
  color = "#C3A16A",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer Delicate Gold Ring */}
      <circle cx="80" cy="80" r="68" stroke={color} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="80" cy="80" r="74" stroke={color} strokeWidth="0.8" opacity="0.3" />

      {/* Symmetrical Left Vine */}
      <path
        d="M 80 12 C 40 16, 14 46, 14 80 C 14 114, 40 144, 80 148"
        stroke="#7D9D85"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Symmetrical Right Vine */}
      <path
        d="M 80 12 C 120 16, 146 46, 146 80 C 146 114, 120 144, 80 148"
        stroke="#7D9D85"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Botanical Leaves Around The Perimeter */}
      {[20, 50, 80, 110, 140, 200, 230, 260, 290, 320].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 80 80)`}>
          <ellipse
            cx="80"
            cy="11"
            rx="4"
            ry="9"
            transform="rotate(25 80 11)"
            fill="#8FA695"
            opacity="0.85"
          />
          <circle cx="84" cy="18" r="2" fill={color} opacity="0.8" />
        </g>
      ))}

      {/* Top Rose Accent */}
      <g transform="translate(80 12)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-4"
            rx="3"
            ry="5"
            transform={`rotate(${a})`}
            fill="#EAD2CD"
            stroke="#C99B91"
            strokeWidth="0.5"
          />
        ))}
        <circle r="2.2" fill={color} />
      </g>

      {/* Bottom Rose Accent */}
      <g transform="translate(80 148)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-4"
            rx="3"
            ry="5"
            transform={`rotate(${a})`}
            fill="#EAD2CD"
            stroke="#C99B91"
            strokeWidth="0.5"
          />
        ))}
        <circle r="2.2" fill={color} />
      </g>
    </svg>
  );
}

// 5. Exquisite Luxury Botanical Divider
export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 py-6 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Hairline Gradient */}
      <div className="h-px w-14 sm:w-20 bg-linear-to-r from-transparent to-gold-400/80" />

      {/* Left Olive Leaf Pair */}
      <svg className="w-5 h-4 text-sage-600/70" viewBox="0 0 24 16" fill="currentColor">
        <path d="M 2 8 C 8 2, 16 4, 22 8 C 16 12, 8 14, 2 8 Z" fill="#8FA695" />
        <path d="M 6 4 C 11 1, 17 2, 22 8" stroke="#68846E" strokeWidth="0.8" fill="none" />
      </svg>

      {/* Center Radiant 8-Point Gold Floral Star */}
      <div className="flex items-center gap-1.5 px-1 text-gold-500">
        <span className="text-[10px] opacity-70">✦</span>
        <svg className="w-4 h-4 text-gold-500 animate-pulse" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L9.5 5.5L15 4.5L11 8.5L14 14L8.5 11L5 15L6 9.5L1 7.5L6.5 6.5L8 0Z" />
        </svg>
        <span className="text-[10px] opacity-70">✦</span>
      </div>

      {/* Right Olive Leaf Pair */}
      <svg className="w-5 h-4 text-sage-600/70 scale-x-[-1]" viewBox="0 0 24 16" fill="currentColor">
        <path d="M 2 8 C 8 2, 16 4, 22 8 C 16 12, 8 14, 2 8 Z" fill="#8FA695" />
        <path d="M 6 4 C 11 1, 17 2, 22 8" stroke="#68846E" strokeWidth="0.8" fill="none" />
      </svg>

      {/* Right Hairline Gradient */}
      <div className="h-px w-14 sm:w-20 bg-linear-to-l from-transparent to-gold-400/80" />
    </div>
  );
}

// 6. Symmetrical Botanical Flourish Crest for Section Headers
export function BotanicalFlourishCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center my-3 select-none ${className}`} aria-hidden="true">
      <svg className="w-32 h-6 text-gold-500/85" viewBox="0 0 120 24" fill="none">
        {/* Central Stem Curves */}
        <path
          d="M 60 12 C 45 4, 25 18, 5 12 M 60 12 C 75 4, 95 18, 115 12"
          stroke="#C3A16A"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Left Side Foliage */}
        <ellipse cx="25" cy="11" rx="3.5" ry="6" transform="rotate(-30 25 11)" fill="#8FA695" />
        <ellipse cx="42" cy="9" rx="3" ry="5.5" transform="rotate(35 42 9)" fill="#8FA695" />
        <circle cx="16" cy="14" r="1.8" fill="#C3A16A" />

        {/* Right Side Foliage */}
        <ellipse cx="95" cy="11" rx="3.5" ry="6" transform="rotate(30 95 11)" fill="#8FA695" />
        <ellipse cx="78" cy="9" rx="3" ry="5.5" transform="rotate(-35 78 9)" fill="#8FA695" />
        <circle cx="104" cy="14" r="1.8" fill="#C3A16A" />

        {/* Center Floret */}
        <circle cx="60" cy="12" r="3" fill="#C3A16A" />
        <circle cx="60" cy="12" r="1.5" fill="#FAF8F5" />
      </svg>
    </div>
  );
}

// 7. Delicate Botanical Canopy Arch for Section Framing
export function BotanicalCanopyArch({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-sm mx-auto overflow-hidden pointer-events-none select-none flex justify-center ${flip ? "scale-y-[-1]" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg className="w-full h-12 text-sage-600/40" viewBox="0 0 320 48" fill="none">
        <path d="M 10 6 Q 160 36 310 6" stroke="#C3A16A" strokeWidth="1.2" opacity="0.75" />
        <path d="M 18 10 Q 160 38 302 10" stroke="#7D9D85" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        {[45, 85, 125, 160, 195, 235, 275].map((x, i) => (
          <g key={i}>
            <ellipse
              cx={x}
              cy={14 + (i % 2) * 5}
              rx="4"
              ry="8"
              transform={`rotate(${i % 2 ? 22 : -22} ${x} ${14 + (i % 2) * 5})`}
              fill="#8FA695"
              opacity="0.8"
            />
            <circle cx={x + (i % 2 ? 4 : -4)} cy={22 + (i % 2) * 3} r="2" fill="#C3A16A" opacity="0.85" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// 8. Subtle Card Corner Botanical Accent
export function FloralCardCorner({
  position = "top-right",
  className = "",
  size = 46,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-left":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(-1, -1)";
      case "bottom-right":
        return "scale(1, -1)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: getTransform() }}
      fill="none"
      aria-hidden="true"
    >
      <path d="M 60 4 C 40 4, 18 14, 4 36 M 60 12 C 45 12, 28 20, 14 44" stroke="#C3A16A" strokeWidth="0.9" opacity="0.45" />
      <ellipse cx="44" cy="10" rx="3" ry="6" transform="rotate(35 44 10)" fill="#8FA695" opacity="0.6" />
      <ellipse cx="30" cy="18" rx="3" ry="5.5" transform="rotate(25 30 18)" fill="#8FA695" opacity="0.6" />
      <ellipse cx="18" cy="30" rx="3" ry="5.5" transform="rotate(15 18 30)" fill="#8FA695" opacity="0.6" />
      <circle cx="50" cy="5" r="2" fill="#DCA9A6" opacity="0.7" />
      <circle cx="36" cy="12" r="1.8" fill="#C3A16A" opacity="0.7" />
    </svg>
  );
}

// 9. Bismillah Calligraphy in Arabic
export function BismillahCalligraphy({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center py-2 ${className}`}>
      <span
        className="font-arabic-verse text-2xl sm:text-3xl text-sage-800 tracking-wide block select-none"
        dir="rtl"
        lang="ar"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </span>
    </div>
  );
}
