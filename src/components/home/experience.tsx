import { Section } from "@/components/section";
import { site } from "@/lib/site";

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 / Experience" title="Experience">
      <div className="space-y-4">
        {site.experience.map((job) => (
          <article key={job.company + job.start} className="card p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
                <p className="mt-1 text-muted">
                  <span className="font-medium text-text">{job.company}</span> · {job.companyDetail}
                </p>
              </div>
              <p className="font-mono text-xs text-muted sm:text-right">
                {job.start} – {job.end}
                <br />
                {job.location} · {job.type}
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-muted">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-pretty">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text/40" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {job.award && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="9" r="6" />
                  <path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7" />
                </svg>
                <span>
                  <span className="text-muted">Award:</span> <span className="font-medium">{job.award}</span>
                </span>
              </p>
            )}
          </article>
        ))}

        {site.earlierExperience.map((e) => (
          <p key={e.company} className="px-2 text-sm text-muted">
            <span className="font-mono text-xs uppercase tracking-widest">Earlier</span> · {e.role}, {e.company} — {e.location} ·{" "}
            {e.dates}
          </p>
        ))}
      </div>
    </Section>
  );
}
