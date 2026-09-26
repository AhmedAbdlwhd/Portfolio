"use client";

import { openCommandMenu, useModKey } from "@/components/command-menu";

export function SearchButton() {
  const mod = useModKey();
  return (
    <button type="button" onClick={openCommandMenu} className="btn btn-glass glass">
      Search
      <kbd className="font-mono text-xs text-muted">{mod === "⌘" ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
