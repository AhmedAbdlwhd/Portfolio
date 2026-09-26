import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";
import { getAllTags, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Machine learning, NLP and data projects — each with the problem, approach and results.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
      <header className="mb-10 max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Work</p>
        <h1 className="text-5xl font-semibold tracking-tight">Projects</h1>
        <p className="text-lg text-muted">
          Everything I&apos;ve built. Each one has a short case study: the problem, how I approached it, and what came
          out of it.
        </p>
      </header>

      <ProjectFilter
        tags={getAllTags()}
        items={projects.map((p) => ({ slug: p.slug, tags: p.tags, card: <ProjectCard project={p} headingLevel="h2" /> }))}
      />
    </div>
  );
}
