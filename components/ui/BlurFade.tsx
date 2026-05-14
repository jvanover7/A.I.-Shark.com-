"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type MotionProps,
  type UseInViewOptions,
} from "motion/react";

type Direction = "up" | "down" | "left" | "right";

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: Direction;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
}

/**
 * BlurFade — staggered fade-in with blur + slight Y offset, intersection-aware.
 * Adapted from Magic UI (magicuidesign/magicui).
 */
export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 8,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "8px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const start = direction === "right" || direction === "down" ? -offset : offset;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={{
          hidden: { [axis]: start, opacity: 0, filter: `blur(${blur})` },
          visible: { [axis]: 0, opacity: 1, filter: "blur(0px)" },
        }}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
