"use client";

import { useEffect } from "react";

type UAData = { brands?: { brand: string }[] };

/**
 * Defines the SVG filter used for liquid-glass refraction and turns it on
 * (via `html.refraction`) only in Chromium, which supports SVG filters in
 * `backdrop-filter`. Other browsers keep the frosted blur fallback.
 */
export function GlassFilter() {
  useEffect(() => {
    const uaData = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
    const isChromium = uaData?.brands?.some((b) => b.brand === "Chromium") ?? false;
    const reduceTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
    if (isChromium && !reduceTransparency) {
      document.documentElement.classList.add("refraction");
    }
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <filter id="glass-refraction" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="24" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
