import { Section } from "@/components/section";
import { getAwards, medal } from "@/lib/awards";
import { formatMonth } from "@/lib/format";
import { site } from "@/lib/site";

export function Experience() {
  const awards = getAwards();
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

            {awards
              .filter((a) => a.company === job.company)
              .map((a) => (
                <p
                  key={a.title}
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-bg px-4 py-3 text-sm sm:items-center"
                >
                  {medal(a.place) && (
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card text-base">
                      {medal(a.place)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="font-medium">{a.title}</span>
                    <span className="text-muted"> · {formatMonth(a.date)}</span>
                  </span>
                </p>
              ))}
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
