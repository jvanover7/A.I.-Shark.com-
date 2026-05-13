type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * AI Shark mark — the universal shark symbol: a sharp dorsal fin
 * breaking through two stylized water lines. Clean geometry, scales
 * cleanly from favicon to hero size.
 */
export function SharkMark({ size = 64, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="finFill" x1="50" y1="14" x2="50" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5cf2ff" />
          <stop offset="55%" stopColor="#0e4d72" />
          <stop offset="100%" stopColor="#020a14" />
        </linearGradient>
        <linearGradient id="finEdge" x1="20" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5cf2ff" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="water1" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22e0ff" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#5cf2ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#22e0ff" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stopColor="#22e0ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#22e0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft halo behind fin */}
      <circle cx="50" cy="52" r="44" fill="url(#halo)" />

      {/* Dorsal fin — slightly forward-curving leading edge,
          straighter trailing edge sweeping back to base */}
      <path
        d="M 53 18
           C 60 34, 66 52, 70 70
           L 26 70
           C 34 52, 44 34, 53 18 Z"
        fill="url(#finFill)"
        stroke="url(#finEdge)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Specular highlight on the leading edge */}
      <path
        d="M 54 22
           C 58 34, 62 48, 65 62"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />

      {/* Water — two ripple lines breaking at the base of the fin */}
      <path
        d="M 6 76 Q 18 73 26 76 T 70 76 Q 80 75 94 76"
        stroke="url(#water1)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 12 86 Q 28 84 44 86 T 76 86 Q 84 85 90 86"
        stroke="#5cf2ff"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2.5">
        <SharkMark size={32} />
        <span className="text-base font-semibold tracking-[-0.01em] text-white">
          AI Shark
        </span>
      </div>
    </div>
  );
}
