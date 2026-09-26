"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ease } from "@/components/motion";
import { toggleTheme } from "@/components/theme";
import { site } from "@/lib/site";

export type MenuProject = { slug: string; title: string; tags: string[] };

type Item = {
  id: string;
  group: "Pages" | "Projects" | "Actions";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

const OPEN_EVENT = "command-menu:open";

/** Open the menu from anywhere (e.g. the nav button). */
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** "⌘" on Apple devices, "Ctrl" elsewhere. Server render assumes "⌘". */
export function useModKey() {
  return useSyncExternalStore(
    () => () => {},
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

export function CommandMenu({ projects }: { projects: MenuProject[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const visit = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      { id: "home", group: "Pages", label: "Home", run: go("/") },
      { id: "projects", group: "Pages", label: "All projects", keywords: "work portfolio", run: go("/projects") },
      { id: "certs", group: "Pages", label: "Certifications", keywords: "badges credly", run: go("/#certifications") },
      { id: "about", group: "Pages", label: "About", keywords: "timeline experience", run: go("/#about") },
      { id: "contact", group: "Pages", label: "Contact", keywords: "hire email", run: go("/#contact") },
      ...projects.map(
        (p): Item => ({
          id: `p-${p.slug}`,
          group: "Projects",
          label: p.title,
          hint: p.tags.join(" · "),
          keywords: p.tags.join(" "),
          run: go(`/projects/${p.slug}`),
        }),
      ),
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Email copied ✓" : "Copy email address",
        hint: site.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        },
      },
      { id: "theme", group: "Actions", label: "Toggle dark mode", keywords: "theme light dark", run: () => toggleTheme() },
      { id: "email", group: "Actions", label: "Send an email", keywords: "contact mail", run: visit(`mailto:${site.email}`) },
      { id: "github", group: "Actions", label: "Open GitHub", keywords: "code repos", run: visit(site.links.github) },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", run: visit(site.links.linkedin) },
      { id: "credly", group: "Actions", label: "Open Credly profile", keywords: "badges", run: visit(site.links.credly) },
    ];
  }, [projects, router, close, copied]);

  // Every word typed must appear somewhere in the item's text.
  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((i) => {
      const text = `${i.label} ${i.group} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [items, query]);

  const current = Math.min(active, Math.max(results.length - 1, 0));

  // Global shortcut ⌘K / Ctrl+K, plus the nav button's open event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Native <dialog>: showModal() traps focus, makes the page behind inert, and restores focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = results.length - 1;
    if (e.key === "ArrowDown") setActive(current >= last ? 0 : current + 1);
    else if (e.key === "ArrowUp") setActive(current <= 0 ? last : current - 1);
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter") results[current]?.run();
    else return;
    e.preventDefault();
  }

  // Keep the highlighted option visible while arrowing through a long list.
  useEffect(() => {
    document.getElementById(`${listId}-${current}`)?.scrollIntoView({ block: "nearest" });
  }, [current, listId]);

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      // Esc: animate out instead of closing instantly.
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-text backdrop:bg-transparent"
    >
      <AnimatePresence
        onExitComplete={() => {
          dialogRef.current?.close();
          setQuery("");
          setActive(0);
        }}
      >
        {open && (
          <>
            <m.div
              key="overlay"
              className="fixed inset-0 bg-black/20 dark:bg-black/50"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <m.div
              key="panel"
              className="glass fixed inset-x-4 top-[12vh] mx-auto max-w-xl overflow-hidden rounded-[28px] bg-card/80"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -4 }}
              transition={{ duration: 0.22, ease }}
            >
              <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-5">
                <SearchIcon />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search projects, pages, actions…"
                  aria-label="Search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-activedescendant={results.length ? `${listId}-${current}` : undefined}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
                />
                <kbd className="tag shrink-0">esc</kbd>
              </div>

              <ul id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
                {results.length === 0 && <li className="px-4 py-10 text-center text-sm text-muted">No results for “{query}”</li>}
                {results.map((item, i) => {
                  const heading = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {heading && (
                        <p role="presentation" className="px-3 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                          {heading}
                        </p>
                      )}
                      <div
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={i === current}
                        onMouseMove={() => i !== current && setActive(i)}
                        onClick={item.run}
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-3 py-2.5 text-sm aria-selected:bg-text/[0.07]"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.hint && <span className="shrink-0 font-mono text-xs text-muted">{item.hint}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex gap-4 border-t border-[var(--glass-border)] px-5 py-2.5 font-mono text-[11px] text-muted">
                <span>↑↓ move</span>
                <span>↵ open</span>
                <span>esc close</span>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-muted">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
