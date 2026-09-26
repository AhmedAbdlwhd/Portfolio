import Link from "next/link";
import { CvButton } from "@/components/cv-button";
import { TerminalCard } from "@/components/home/terminal-card";
import { Reveal } from "@/components/motion";
import { toJsonLines } from "@/lib/json-lines";
import { site } from "@/lib/site";

export function Hero({ projectCount, certCount }: { projectCount: number; certCount: number }) {
  const lines = toJsonLines({
    name: site.name,
    role: site.role,
    focus: site.focus,
    stack: site.stack,
    projects: projectCount,
    certifications: certCount,
    email: site.email,
  });

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24">
      <div className="min-w-0 space-y-8">
        <Reveal onLoad>
          <p className="font-mono text-sm text-muted">
            {site.name} · {site.role}
          </p>
        </Reveal>
        <Reveal onLoad delay={0.08}>
          <h1 id="hero-title" className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.5rem] xl:text-6xl">
            {site.tagline}
          </h1>
        </Reveal>
        <Reveal onLoad delay={0.16}>
          <p className="max-w-xl text-pretty text-lg text-muted">{site.intro}</p>
        </Reveal>
        <Reveal onLoad delay={0.24} className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            View projects
          </Link>
          <Link href="/#contact" className="btn btn-glass glass">
            Get in touch
          </Link>
          <CvButton />
        </Reveal>
      </div>

      <Reveal onLoad delay={0.3} className="min-w-0">
        <TerminalCard command="cat profile.json" lines={lines} />
      </Reveal>
    </section>
  );
}
