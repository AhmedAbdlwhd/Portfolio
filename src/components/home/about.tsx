import { Section } from "@/components/section";
import { site } from "@/lib/site";

export function About() {
  return (
    <Section id="about" eyebrow="03 / About" title="About me">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5 text-lg text-muted">
          {site.about.map((p) => (
            <p key={p} className="text-pretty">
              {p}
            </p>
          ))}
          <div className="pt-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Tools I use</p>
            <ul className="flex flex-wrap gap-1.5">
              {site.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="relative space-y-8 border-l border-border pl-8">
          {site.timeline.map((item) => (
            <li key={item.date + item.title} className="relative">
              <span aria-hidden="true" className="absolute -left-[37px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-border" />
              <p className="font-mono text-xs text-muted">{item.date}</p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
