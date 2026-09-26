import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoVideo, Figure, LiveEmbed } from "@/components/project-media";
import { ProjectVisual } from "@/components/project-visual";
import { formatMonth } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { getProject, getProjects } from "@/lib/projects";

// Only projects that exist in /content/projects get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const cover = project.images[0];
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      ...(cover && { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] }),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const prev = all[index - 1];
  const next = all[index + 1];
  const [cover, ...gallery] = project.images;
  const { title, summary, tags, stack, date, repo, demoUrl, demoVideo, metric, visual } = project;

  return (
    <article className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <Link href="/projects" className="font-mono text-sm text-muted hover:text-text">
        <span aria-hidden="true">←</span> All projects
      </Link>

      {/* Header */}
      <header className="mt-8 max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          <span className="font-mono text-xs text-muted">· {formatMonth(date)}</span>
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="text-pretty text-xl text-muted">{summary}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Try it live <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {demoVideo && (
            <a href="#demo" className="btn btn-glass glass">
              Watch demo
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className={`btn ${demoUrl ? "btn-glass glass" : "btn-primary"}`}>
              View code <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </header>

      {/* Key facts */}
      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {metric && (
          <div className="card p-6">
            <dt className="text-sm text-muted">{metric.label}</dt>
            <dd className="mt-1 text-4xl font-semibold tracking-tight">{metric.value}</dd>
          </div>
        )}
        {stack.length > 0 && (
          <div className={`card p-6 ${metric ? "sm:col-span-2" : "sm:col-span-3"}`}>
            <dt className="text-sm text-muted">Built with</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      {/* Cover: a screenshot if there is one, otherwise the card's visual */}
      <div className="mt-4">
        {cover ? (
          <Figure image={cover} eager />
        ) : (
          visual && (
            <div className="card p-8 sm:p-12">
              <div className="mx-auto max-w-xl">
                <ProjectVisual visual={visual} />
              </div>
            </div>
          )
        )}
      </div>

      {demoVideo && (
        <section id="demo" aria-labelledby="demo-title" className="mt-16 scroll-mt-28 space-y-5">
          <h2 id="demo-title" className="text-2xl font-semibold tracking-tight">
            Demo
          </h2>
          <DemoVideo url={demoVideo} title={title} />
        </section>
      )}

      {demoUrl && (
        <section aria-labelledby="live-title" className="mt-16 space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="live-title" className="text-2xl font-semibold tracking-tight">
              Try it live
            </h2>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-text">
              Open in a new tab <span aria-hidden="true">↗</span>
            </a>
          </div>
          <LiveEmbed url={demoUrl} title={title} />
        </section>
      )}

      {/* Case study */}
      <div className="prose mx-auto mt-16 max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body) }} />

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="mt-16 space-y-6">
          <h2 id="gallery-title" className="mx-auto max-w-3xl text-2xl font-semibold tracking-tight">
            More visuals
          </h2>
          <div className="grid gap-8">
            {gallery.map((img) => (
              <Figure key={img.src} image={img} />
            ))}
          </div>
        </section>
      )}

      {/* Previous / next */}
      <nav aria-label="More projects" className="mt-24 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="card card-hover p-6">
            <span className="font-mono text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-semibold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="card card-hover p-6 sm:text-right">
            <span className="font-mono text-xs text-muted">Next →</span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
