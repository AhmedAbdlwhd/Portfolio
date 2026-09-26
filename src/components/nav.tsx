"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { openCommandMenu, useModKey } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme";
import { site } from "@/lib/site";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const mod = useModKey();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on Escape and return focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => href === "/projects" && pathname.startsWith("/projects");
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Main" className="relative w-full max-w-2xl">
        {/* The menu panel is a sibling of the pill, not a child: nested backdrop-filters don't blur the page. */}
        <div className="glass glass-glow rounded-full">
          <div className="flex h-14 items-center justify-between gap-2 pl-5 pr-2.5">
            <Link
              href="/"
              className="font-mono text-sm font-medium tracking-tight"
              onClick={() => setOpen(false)}
            >
              {initials.toLowerCase()}
              <span className="text-muted">.dev</span>
              {/* Spoken name starts with the visible text, so voice control ("click aa dot dev") works. */}
              <span className="sr-only"> — {site.name}, home</span>
            </Link>

            <ul className="hidden items-center gap-1 sm:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-text aria-[current=page]:text-text aria-[current=page]:bg-text/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={openCommandMenu}
                aria-label={`Search and jump (${mod === "⌘" ? "Command" : "Control"} K)`}
                aria-keyshortcuts={mod === "⌘" ? "Meta+K" : "Control+K"}
                className="flex h-9 items-center gap-2 rounded-full px-2.5 text-muted transition-colors hover:bg-text/5 hover:text-text"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <kbd className="hidden font-mono text-xs md:inline">{mod === "⌘" ? "⌘K" : "Ctrl K"}</kbd>
              </button>
              <ThemeToggle />
              <button
                ref={menuButton}
                type="button"
                className="grid size-9 place-items-center rounded-full hover:bg-text/5 sm:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <ul id="mobile-menu" className="glass absolute inset-x-0 top-16 space-y-1 rounded-3xl bg-card/80 p-2 sm:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="block rounded-2xl px-4 py-3 text-base hover:bg-text/5 aria-[current=page]:bg-text/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
