"use client";

import { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Spotlight radius in px */
  size?: number;
  /** Inner glow color (high opacity) */
  glow?: string;
  /** Edge color of the gradient ring */
  edge?: string;
}

/**
 * SpotlightCard — cursor-following cyan glow overlay.
 * Wraps existing content (e.g. our .glass cards) and adds a tracked
 * radial gradient that fades in on hover. Adapted from Magic UI's
 * MagicCard pattern with a single-color cyan palette.
 */
export function SpotlightCard({
  children,
  className,
  size = 280,
  glow = "rgba(34, 224, 255, 0.22)",
  edge = "rgba(92, 242, 255, 0.45)",
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const onLeave = useCallback(() => {
    mouseX.set(-size);
    mouseY.set(-size);
  }, [mouseX, mouseY, size]);

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerEnter={onMove}
      onPointerLeave={onLeave}
      className={cn("group relative", className)}
    >
      {/* Mouse-tracked edge ring (sits above the card border) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px,
              ${edge}, transparent 70%)
          `,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {/* Soft inner glow that follows the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px,
              ${glow}, transparent 65%)
          `,
        }}
      />
      <div className="relative z-30 h-full">{children}</div>
    </motion.div>
  );
}
