import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { formatMonth, type Project } from "@/lib/projects";

/** Solid white card. Used by the home bento grid and the /projects list. */
export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const { slug, title, summary, tags, date, metric, visual } = project;
  const rest = title.slice(0, title.lastIndexOf(" ") + 1).trimEnd();
  const lastWord = title.slice(title.lastIndexOf(" ") + 1);
  return (
    <Link
      href={`/projects/${slug}`}
      className={`card card-hover group flex h-full flex-col gap-6 p-6 sm:p-8 ${wide ? "md:flex-row md:items-stretch" : ""}`}
    >
      <div className={`flex flex-1 flex-col gap-4 ${wide ? "md:justify-between" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          <span className="ml-auto font-mono text-xs text-muted">{formatMonth(date)}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">
            {rest && `${rest} `}
            {/* Last word + arrow never wrap apart. */}
            <span className="whitespace-nowrap">
              {lastWord}
              <span aria-hidden="true" className="ml-1.5 inline-block text-muted transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </h3>
          <p className="text-muted">{summary}</p>
        </div>

        {metric && (
          <p className="mt-auto flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">{metric.value}</span>
            <span className="text-sm text-muted">{metric.label}</span>
          </p>
        )}
      </div>

      {visual && (
        <div className={`flex items-center rounded-3xl bg-bg p-5 ${wide ? "md:w-[46%]" : ""}`}>
          <div className="w-full">
            <ProjectVisual visual={visual} />
          </div>
        </div>
      )}
    </Link>
  );
}
