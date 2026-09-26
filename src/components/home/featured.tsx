import Link from "next/link";
import { Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import type { Project } from "@/lib/projects";

/** Bento rhythm: wide, narrow / narrow, wide — repeats for any number of projects. */
const isWide = (i: number) => i % 4 === 0 || i % 4 === 3;

export function Featured({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="work"
      eyebrow="01 / Selected work"
      title="Featured projects"
      action={
        <Link href="/projects" className="btn btn-glass glass">
          All projects <span aria-hidden="true">→</span>
        </Link>
      }
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.slug} className={isWide(i) ? "md:col-span-2" : ""}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={p} wide={isWide(i)} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
