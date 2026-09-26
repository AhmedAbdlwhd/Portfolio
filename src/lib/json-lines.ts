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
