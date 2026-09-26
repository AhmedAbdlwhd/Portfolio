import type { Metadata } from "next";
import Link from "next/link";
import { SearchButton } from "@/components/search-button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <p className="font-mono text-sm text-muted">
        <span className="text-text">404</span> · route not found
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lg text-muted">The link may be old, or the address has a typo.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/projects" className="btn btn-glass glass">
          See projects
        </Link>
        <SearchButton />
      </div>
    </div>
  );
}
