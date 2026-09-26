"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Line, Token } from "@/lib/json-lines";

const colour: Record<Token["kind"], string> = {
  key: "text-cobalt",
  string: "text-text",
  number: "text-cobalt",
  punct: "text-muted",
};

const START_DELAY = 600;
const PER_CHAR = 55; // typing the command
const PAUSE = 280; // "pressing enter"
const PER_LINE = 45; // printing the output

/** Glass terminal that types the command, then prints the JSON line by line. */
export function TerminalCard({ lines, command }: { lines: Line[]; command: string }) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    // Server and first client render both start empty (no hydration mismatch); reduced motion fills in at once.
    if (reduce) {
      at(0, () => {
        setTyped(command.length);
        setShown(lines.length);
      });
      return () => timers.forEach(clearTimeout);
    }
    for (let i = 1; i <= command.length; i++) at(START_DELAY + i * PER_CHAR, () => setTyped(i));
    const outputStart = START_DELAY + command.length * PER_CHAR + PAUSE;
    for (let i = 1; i <= lines.length; i++) at(outputStart + i * PER_LINE, () => setShown(i));
    return () => timers.forEach(clearTimeout);
  }, [reduce, command.length, lines.length]);

  const done = shown === lines.length;
  const plain = lines.map((l) => l.map((t) => t.text).join("")).join("\n");
  const caret = <span className="caret ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-text/70" />;

  return (
    <div className="glass glass-glow w-full rounded-[28px]">
      <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-5 py-3.5">
        <span className="size-3 rounded-full bg-text/15" />
        <span className="size-3 rounded-full bg-text/15" />
        <span className="size-3 rounded-full bg-text/15" />
        <span className="ml-3 font-mono text-xs text-muted">~/ahmed — zsh</span>
      </div>
      <div className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6 sm:text-sm">
        {/* Screen readers get the full text once; the animated copy is visual only. */}
        <p className="sr-only">
          $ {command}
          {"\n"}
          {plain}
        </p>
        <div aria-hidden="true">
          <p>
            <span className="text-muted">$ </span>
            {command.slice(0, typed)}
            {shown === 0 && caret}
          </p>
          <pre className="whitespace-pre">
            {lines.map((line, i) => (
              // Hidden lines keep their space, so the card never changes size.
              <div key={i} className={i < shown ? "" : "invisible"}>
                {line.map((t, j) => (
                  <span key={j} className={colour[t.kind]}>
                    {t.text}
                  </span>
                ))}
              </div>
            ))}
          </pre>
          <p className={done ? "" : "invisible"}>
            <span className="text-muted">$ </span>
            {caret}
          </p>
        </div>
      </div>
    </div>
  );
}
