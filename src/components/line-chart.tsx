"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ease } from "@/components/motion";
import type { Visual } from "@/lib/projects";

const DRAW = 1.6; // seconds for the line to draw itself

export function LineChart({ data, labels, unit = "" }: Extract<Visual, { type: "line" }>) {
  // Reduced motion: everything appears at once (a zero-length transition keeps server and client HTML identical).
  const reduce = useReducedMotion();
  const t = (transition: object) => (reduce ? { duration: 0 } : transition);
  const w = 400;
  const h = 140;
  const pad = { top: 26, right: 12, bottom: 8, left: 12 };
  const max = Math.max(...data);
  const min = Math.min(...data, 0);
  const x = (i: number) => pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right);
  const y = (v: number) => pad.top + (1 - (v - min) / (max - min)) * (h - pad.top - pad.bottom);
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${h - pad.bottom} L${x(0)},${h - pad.bottom} Z`;
  const peak = data.indexOf(max);
  // The peak dot appears when the line reaches it.
  const peakDelay = DRAW * (peak / (data.length - 1));

  // The SVG stretches to fit its box, so the dot and label are HTML on top (they'd distort inside it).
  const peakLeft = `${(x(peak) / w) * 100}%`;
  const peakTop = `${(y(max) / h) * 100}%`;
  const inView = { once: true, margin: "-40px" } as const;

  return (
    <figure aria-hidden="true" className="w-full">
      <div className="relative h-36 sm:h-44">
        <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 size-full overflow-visible" preserveAspectRatio="none">
          <m.path
            d={area}
            className="fill-text/[0.04]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inView}
            transition={t({ duration: 0.8, delay: DRAW * 0.6 })}
          />
          <m.path
            d={line}
            className="fill-none stroke-text"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inView}
            transition={t({ duration: DRAW, ease: "easeInOut" })}
          />
        </svg>
        <m.span
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text"
          style={{ left: peakLeft, top: peakTop }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={t({ duration: 0.35, ease, delay: peakDelay })}
        />
        <m.span
          className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] font-mono text-xs"
          style={{ left: peakLeft, top: peakTop }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={t({ duration: 0.4, delay: peakDelay + 0.1 })}
        >
          {max}
          {unit}
        </m.span>
      </div>
      <figcaption className="mt-2 flex justify-between font-mono text-[11px] text-muted">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </figcaption>
    </figure>
  );
}
