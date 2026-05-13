type LogoProps = {
  size?: number;
  className?: string;
};

export function SharkMark({ size = 64, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sharkBody" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22e0ff" />
          <stop offset="60%" stopColor="#5cf2ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="sharkBelly" x1="0" y1="32" x2="64" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a1a3a" />
          <stop offset="100%" stopColor="#02060f" />
        </linearGradient>
        <filter id="sharkGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Body — sleek shark silhouette pointing right */}
      <g filter="url(#sharkGlow)">
        <path
          d="M4 34 L18 28 L30 18 L34 22 L48 24 L58 16 L54 30 L60 34 L54 38 L58 50 L46 42 L34 44 L30 50 L26 44 L14 42 Z"
          fill="url(#sharkBody)"
          fillOpacity="0.08"
          stroke="url(#sharkBody)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Dorsal fin highlight stroke */}
        <path
          d="M30 18 L34 22"
          stroke="#5cf2ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Gills — three short marks */}
        <path d="M20 32 L18 36" stroke="#5cf2ff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M23 32 L21 36" stroke="#5cf2ff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M26 32 L24 36" stroke="#5cf2ff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

        {/* Eye — single bright pixel */}
        <circle cx="14" cy="33" r="1.4" fill="#22e0ff" />
        <circle cx="14" cy="33" r="0.6" fill="#ffffff" />

        {/* Circuit accent through the body */}
        <path
          d="M16 38 L24 38 L26 36 L36 36 L38 38 L46 38"
          stroke="#22e0ff"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="26" cy="36" r="1.1" fill="#22e0ff" />
        <circle cx="38" cy="38" r="1.1" fill="#22e0ff" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <SharkMark size={36} />
        <div className="flex items-baseline gap-2 tracking-[0.25em]">
          <span className="text-xs text-steel/80">THE</span>
          <span className="text-sm font-semibold text-white">AI SHARK</span>
        </div>
      </div>
    </div>
  );
}
