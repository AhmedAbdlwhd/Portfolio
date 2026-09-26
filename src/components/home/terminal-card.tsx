/** A JSON value split into coloured pieces, one array per line. */
export type Token = { text: string; kind: "key" | "string" | "number" | "punct" };
export type Line = Token[];

/** Arrays longer than this (in characters) are printed one item per line. */
const MAX_INLINE = 36;

/** Turns a flat object into pretty-printed, syntax-coloured JSON lines. */
export function toJsonLines(obj: Record<string, string | number | readonly string[]>): Line[] {
  const entries = Object.entries(obj);
  const p = (text: string): Token => ({ text, kind: "punct" });
  const value = (v: string | number): Token =>
    typeof v === "number" ? { text: String(v), kind: "number" } : { text: JSON.stringify(v), kind: "string" };

  const body = entries.flatMap(([k, v], i): Line[] => {
    const comma = i < entries.length - 1 ? [p(",")] : [];
    const head = [p("  "), { text: JSON.stringify(k), kind: "key" } as Token, p(": ")];
    if (!Array.isArray(v)) return [[...head, value(v as string | number), ...comma]];

    if (JSON.stringify(v).length <= MAX_INLINE) {
      const items = v.flatMap((item, j) => [...(j ? [p(", ")] : []), value(item)]);
      return [[...head, p("["), ...items, p("]"), ...comma]];
    }
    return [
      [...head, p("[")],
      ...v.map((item, j) => [p("    "), value(item), ...(j < v.length - 1 ? [p(",")] : [])]),
      [p("  ]"), ...comma],
    ];
  });

  return [[p("{")], ...body, [p("}")]];
}

const colour: Record<Token["kind"], string> = {
  key: "text-cobalt",
  string: "text-text",
  number: "text-cobalt",
  punct: "text-muted",
};

export function TerminalCard({ lines, command }: { lines: Line[]; command: string }) {
  const plain = lines.map((l) => l.map((t) => t.text).join("")).join("\n");
  return (
    <div className="glass glass-glow w-full rounded-[28px]">
      <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-5 py-3.5">
        <span className="size-3 rounded-full bg-text/15" />
        <span className="size-3 rounded-full bg-text/15" />
        <span className="size-3 rounded-full bg-text/15" />
        <span className="ml-3 font-mono text-xs text-muted">~/ahmed — zsh</span>
      </div>
      <div className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6 sm:text-sm">
        <p>
          <span className="text-muted">$ </span>
          {command}
        </p>
        {/* Screen readers get the plain text once; the coloured copy is visual only. */}
        <pre className="sr-only">{plain}</pre>
        <pre aria-hidden="true" className="whitespace-pre">
          {lines.map((line, i) => (
            <div key={i}>
              {line.map((t, j) => (
                <span key={j} className={colour[t.kind]}>
                  {t.text}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
