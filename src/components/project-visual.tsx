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

function LineChart({ data, labels, unit = "" }: Extract<Visual, { type: "line" }>) {
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

  // The SVG stretches to fit its box, so the dot and label are HTML on top (they'd distort inside it).
  const peakLeft = `${(x(peak) / w) * 100}%`;
  const peakTop = `${(y(max) / h) * 100}%`;

  return (
    <figure aria-hidden="true" className="w-full">
      <div className="relative h-36 sm:h-44">
        <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 size-full overflow-visible" preserveAspectRatio="none">
          <path d={area} className="fill-text/[0.04]" />
          <path
            d={line}
            pathLength={1}
            className="chart-line fill-none stroke-text"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text" style={{ left: peakLeft, top: peakTop }} />
        <span
          className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] font-mono text-xs"
          style={{ left: peakLeft, top: peakTop }}
        >
          {max}
          {unit}
        </span>
      </div>
      <figcaption className="mt-2 flex justify-between font-mono text-[11px] text-muted">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </figcaption>
    </figure>
  );
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
