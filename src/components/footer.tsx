import { site } from "@/lib/site";

const links = [
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.credly, label: "Credly" },
  { href: `mailto:${site.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium">{site.name}</p>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} · Built with Next.js
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-text"
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {l.label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
