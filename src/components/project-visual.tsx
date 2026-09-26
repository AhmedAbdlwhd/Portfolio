import { LineChart } from "@/components/line-chart";
import type { Visual } from "@/lib/projects";

/** The small picture on a project card. Decorative: the card text carries the meaning. */
export function ProjectVisual({ visual }: { visual: Visual }) {
  switch (visual.type) {
    case "line":
      return <LineChart {...visual} />;
    case "matrix":
      return <Matrix {...visual} />;
    case "chat":
      return <Chat {...visual} />;
    case "words":
      return <Words {...visual} />;
  }
}

function Matrix({ data, labels }: Extract<Visual, { type: "matrix" }>) {
  const max = Math.max(...data.flat());
  return (
    <div aria-hidden="true" className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
      {data.flatMap((row, r) =>
        row.map((v, c) => {
          const strength = v / max;
          return (
            <div
              key={`${r}-${c}`}
              className="grid aspect-[1.6] place-items-center rounded-xl font-mono text-sm"
              style={{
                background: `color-mix(in srgb, var(--accent) ${Math.round(strength * 88) + 4}%, transparent)`,
                color: strength > 0.5 ? "var(--accent-contrast)" : "var(--muted)",
              }}
            >
              {v}
            </div>
          );
        }),
      )}
      {labels.map((l) => (
        <span key={l} className="truncate text-center font-mono text-[11px] text-muted">
          {l}
        </span>
      ))}
    </div>
  );
}

function Chat({ question, answer, note }: Extract<Visual, { type: "chat" }>) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-2 text-sm">
      <p className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-accent-contrast">{question}</p>
      <p className="max-w-[90%] self-start rounded-2xl rounded-bl-md border border-border bg-bg px-4 py-2.5">{answer}</p>
      {note && <p className="self-start pl-1 font-mono text-[11px] text-muted">{note}</p>}
    </div>
  );
}

function Words({ words }: Extract<Visual, { type: "words" }>) {
  return (
    <ul aria-hidden="true" className="flex flex-col gap-1">
      {words.map((w, i) => (
        <li key={w} dir="auto" className={`text-left text-2xl font-semibold tracking-tight ${i === 0 ? "" : "text-muted"}`}>
          {w}
        </li>
      ))}
    </ul>
  );
}
