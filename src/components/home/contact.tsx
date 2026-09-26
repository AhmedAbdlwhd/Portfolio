import { CopyButton } from "@/components/copy-button";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
      <div className="card relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">04 / Contact</p>
        <h2 id="contact-title" className="mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s build something people will use.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-lg text-muted">
          Hiring, collaborating, or curious about a project? My inbox is open.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            {site.email}
          </a>
          <CopyButton text={site.email} label="Copy email" />
        </div>
        <ul className="mt-8 flex justify-center gap-6 text-sm">
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text">
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text">
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
