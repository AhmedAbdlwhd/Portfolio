"use client";

import { useState } from "react";

type Item = { slug: string; tags: string[]; card: React.ReactNode };

/** Tag chips + grid. Cards are rendered on the server and passed in; this only shows/hides them. */
export function ProjectFilter({ items, tags }: { items: Item[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((i) => i.tags.includes(active)) : items;
  const count = (tag: string | null) => (tag ? items.filter((i) => i.tags.includes(tag)).length : items.length);

  return (
    <>
      <div role="group" aria-label="Filter by tag" className="mb-8 flex flex-wrap gap-2">
        {[null, ...tags].map((tag) => {
          const on = active === tag;
          return (
            <button
              key={tag ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(tag)}
              className={`btn h-10 px-4 text-sm ${on ? "btn-primary" : "btn-glass glass"}`}
            >
              {tag ?? "All"}
              <span className={`font-mono text-xs ${on ? "opacity-60" : "text-muted"}`}>{count(tag)}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active ? ` tagged ${active}` : ""}
      </p>

      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((i) => (
          <li key={i.slug}>{i.card}</li>
        ))}
      </ul>
    </>
  );
}
