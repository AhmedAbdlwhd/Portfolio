import Image from "next/image";
import { Section } from "@/components/section";
import { getAwards, medal } from "@/lib/awards";
import { formatMonth } from "@/lib/format";
import { site } from "@/lib/site";

const label = "mb-4 font-mono text-xs uppercase tracking-widest text-muted";

export function About() {
  const awards = getAwards();
  return (
    <Section id="about" eyebrow="04 / About" title="About me">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-10">
          <div className="space-y-5 text-lg text-muted">
            {site.about.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>

          <div>
            <h3 className={label}>Education</h3>
            <ul className="space-y-3">
              {site.education.map((e) => (
                <li key={e.degree} className="card !rounded-[24px] p-5">
                  <p className="font-semibold leading-snug">{e.degree}</p>
                  <p className="mt-1 text-sm text-muted">
                    {e.school} · <span className="font-mono text-xs">{e.dates}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {awards.length > 0 && (
            <div>
              <h3 className={label}>Awards</h3>
              <ul className="space-y-3">
                {awards.map((a) => (
                  <li key={a.title} className="card overflow-hidden !rounded-[24px]">
                    {a.image && (
                      <Image
                        src={a.image.src}
                        alt={a.image.alt}
                        width={a.image.width}
                        height={a.image.height}
                        sizes="(min-width: 1024px) 480px, 100vw"
                        className="h-auto w-full"
                      />
                    )}
                    <div className="flex gap-4 p-5">
                      {medal(a.place) && (
                        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-bg text-xl">
                          {medal(a.place)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug">{a.title}</p>
                        <p className="mt-1 text-sm text-muted">
                          {a.issuer} · <span className="font-mono text-xs">{formatMonth(a.date)}</span>
                        </p>
                        <p className="mt-3 text-pretty text-sm text-muted">{a.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h3 className={label}>Timeline</h3>
          <ol className="relative space-y-8 border-l border-border pl-8">
            {site.timeline.map((item) => (
              <li key={item.date + item.title} className="relative">
                <span aria-hidden="true" className="absolute -left-[37px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-border" />
                <p className="font-mono text-xs text-muted">{item.date}</p>
                <p className="mt-1 font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-16">
        <h3 className={label}>Skills</h3>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((s) => (
            <div key={s.group} className="card !rounded-[24px] p-5">
              <dt className="text-sm font-semibold">{s.group}</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
