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
        <linearGradient id="sharkFill" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a3a5c" />
          <stop offset="40%" stopColor="#22e0ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="sharkEdge" x1="0" y1="32" x2="64" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5cf2ff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22e0ff" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="sharkHighlight" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="sharkOuterGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#sharkOuterGlow)">
        {/* Single continuous shark silhouette — fusiform body, dorsal fin,
            crescent tail, swept pectoral fin. */}
        <path
          d="M 58 32
             Q 56.5 25 38 23.5
             L 30 8
             L 24 23.5
             Q 16 25.5 9 28
             L 4 13
             Q 11 24 11 32
             Q 11 40 4 51
             L 9 36
             Q 16 39.5 25 39.5
             L 20.5 51.5
             L 32 40.5
             Q 50 39.5 58 32 Z"
          fill="url(#sharkFill)"
          stroke="url(#sharkEdge)"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />

        {/* Top-edge specular highlight along the back */}
        <path
          d="M 56 31 Q 50 26 30 24 L 30 12"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Volumetric highlight wash */}
        <path
          d="M 58 32
             Q 56.5 25 38 23.5
             L 30 8
             L 24 23.5
             Q 16 25.5 9 28
             L 4 13
             Q 11 24 11 32
             Q 11 40 4 51
             L 9 36
             Q 16 39.5 25 39.5
             L 20.5 51.5
             L 32 40.5
             Q 50 39.5 58 32 Z"
          fill="url(#sharkHighlight)"
        />

        {/* Eye — single bright pixel */}
        <circle cx="49" cy="30.5" r="1.1" fill="#02060f" />
        <circle cx="48.7" cy="30.2" r="0.45" fill="#5cf2ff" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <SharkMark size={36} />
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-light tracking-[0.35em] text-steel/70">THE</span>
          <span className="text-sm font-medium tracking-[0.32em] text-white">AI SHARK</span>
        </div>
      </div>
    </div>
  );
}
