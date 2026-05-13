type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * AI Shark mark — aggressive side-profile silhouette inspired by the brand
 * reference: pointed dorsal, swept pectoral and crescent tail, white edge
 * highlights along the back, three gill stripes, circuit traces on the
 * cheek, and a sharp cyan predator's eye.
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
        <linearGradient id="sharkBody" x1="50" y1="6" x2="50" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a1830" />
          <stop offset="100%" stopColor="#02060f" />
        </linearGradient>
        <linearGradient id="sharkEdge" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22e0ff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#5cf2ff" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="circuit" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22e0ff" />
          <stop offset="100%" stopColor="#5cf2ff" />
        </linearGradient>
        <radialGradient id="bodyLight" cx="55%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#5cf2ff" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#22e0ff" stopOpacity="0" />
        </radialGradient>
        <filter id="sharkGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#sharkGlow)">
        {/* Body silhouette — sharp angular profile, nose to the right */}
        <path
          d="M 94 50
             L 88 43
             L 64 36
             L 48 12
             L 40 38
             L 22 44
             L 6 22
             L 18 48
             L 18 52
             L 6 82
             L 20 56
             L 44 60
             L 36 84
             L 52 60
             L 90 56 Z"
          fill="url(#sharkBody)"
        />

        {/* Volumetric inner highlight */}
        <path
          d="M 94 50
             L 88 43
             L 64 36
             L 48 12
             L 40 38
             L 22 44
             L 6 22
             L 18 48
             L 18 52
             L 6 82
             L 20 56
             L 44 60
             L 36 84
             L 52 60
             L 90 56 Z"
          fill="url(#bodyLight)"
        />

        {/* Top-edge specular highlight along back / dorsal */}
        <path
          d="M 91 49 L 66 39 L 48 14 L 41 36"
          stroke="url(#sharkEdge)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lower jaw / belly highlight */}
        <path
          d="M 88 55 L 56 58 L 50 62"
          stroke="#ffffff"
          strokeOpacity="0.32"
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Three gill stripes — diagonal slashes */}
        <path d="M 70 46 L 67 53" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 74 46 L 71 53" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 78 46 L 75 53" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.9" strokeLinecap="round" />

        {/* Circuit traces flowing forward from cheek toward the eye */}
        <g stroke="url(#circuit)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 50 40 L 58 40 L 60 42 L 70 42" />
          <path d="M 54 44 L 64 44 L 66 46 L 72 46" />
          <path d="M 50 48 L 60 48" />
        </g>
        <g fill="#5cf2ff">
          <circle cx="60" cy="42" r="1.1" />
          <circle cx="70" cy="42" r="1.1" />
          <circle cx="66" cy="46" r="1.1" />
          <circle cx="60" cy="48" r="1.1" />
        </g>

        {/* Predator eye — bright cyan with white catchlight */}
        <ellipse cx="83" cy="47" rx="2.4" ry="1.4" transform="rotate(-12 83 47)" fill="#22e0ff" />
        <circle cx="82.2" cy="46.5" r="0.6" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <SharkMark size={40} />
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-lg font-medium tracking-tight text-white">
            AI Shark
          </span>
          <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-2px] rotate-45 bg-cyan-glow" />
        </div>
      </div>
    </div>
  );
}
