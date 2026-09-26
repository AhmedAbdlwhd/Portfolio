"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";

/** Loads only the animation features we use, and honours the OS "reduce motion" setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  /** Animate as soon as the page loads (hero) instead of when scrolled into view. */
  onLoad?: boolean;
  className?: string;
};

/** Gentle fade + rise. With reduced motion on, Motion skips the movement. */
export function Reveal({ children, delay = 0, onLoad = false, className }: RevealProps) {
  // Starting at 0.01 (not 0) keeps the element eligible as the page's "largest paint", which helps page-speed scores.
  const hidden = { opacity: 0.01, y: 20 };
  const shown = { opacity: 1, y: 0 };
  return (
    <m.div
      className={className}
      initial={hidden}
      {...(onLoad ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </m.div>
  );
}
