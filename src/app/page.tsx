// Temporary design-token preview. Replaced by the real home page in Phase 3.

const swatches = [
  ["bg", "#F6F6F4", "bg-bg"],
  ["card", "#FFFFFF", "bg-card"],
  ["border", "#E6E6E2", "bg-border"],
  ["text", "#111214", "bg-text"],
  ["muted", "#5C6068", "bg-muted"],
  ["accent", "#1D1D1F", "bg-accent"],
  ["cobalt", "#2F5BFF", "bg-cobalt"],
] as const;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20 space-y-16">
      <header className="space-y-3">
        <p className="font-mono text-sm text-muted">phase-1 / design-tokens</p>
        <h1 className="text-5xl font-semibold tracking-tight">
          I build machine-learning tools people can actually use.
        </h1>
        <p className="text-lg text-muted">Geist for text. Geist Mono for tags, labels and code.</p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {swatches.map(([name, hex, cls]) => (
          <div key={name} className="space-y-2">
            <div className={`${cls} h-16 rounded-2xl border border-border`} />
            <p className="font-mono text-xs">{name}</p>
            <p className="font-mono text-xs text-muted">{hex}</p>
          </div>
        ))}
      </section>

      <section className="relative isolate overflow-hidden rounded-[32px] p-10 sm:p-16">
        {/* Busy background so the glass effect is visible */}
        <div className="absolute inset-0 -z-20 grid grid-cols-6 gap-3 p-4 opacity-70">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="card h-16 !rounded-2xl" />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="glass glass-glow rounded-full px-5 py-3 text-sm">Glass pill nav</div>
          <button className="btn btn-primary">Primary button</button>
          <button className="btn btn-glass glass">Glass button</button>
          <span className="tag">ML</span>
          <span className="tag">NLP</span>
        </div>
        <div className="glass glass-glow mt-8 max-w-md rounded-3xl p-5 font-mono text-sm">
          <p className="text-muted">$ cat profile.json</p>
          <p>
            {"{ "}
            <span className="text-cobalt">&quot;role&quot;</span>: &quot;ML Engineer&quot;{" }"}
          </p>
        </div>
      </section>

      <section className="card p-8">
        <p className="font-mono text-xs text-muted">solid card · 32px corners</p>
        <p className="mt-2 text-2xl font-semibold">Project cards stay solid white.</p>
      </section>
    </div>
  );
}
