import Image from "next/image";
import { Section } from "@/components/section";
import { groupByCategory, type Certification } from "@/lib/certifications";
import { site } from "@/lib/site";

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleString("en-US", { month: "short", year: "numeric" });

/** "IBM" stays "IBM"; "DeepLearning.AI" → "DL"; "Google" → "G". */
const monogram = (issuer: string) =>
  issuer.length <= 4 && issuer === issuer.toUpperCase()
    ? issuer
    : (issuer.match(/[A-Z]/g) ?? [issuer[0]]).slice(0, 2).join("");

export function Certifications({ certs }: { certs: Certification[] }) {
  return (
    <Section
      id="certifications"
      eyebrow="03 / Credentials"
      title="Certifications"
      action={
        <a href={site.links.credly} target="_blank" rel="noopener noreferrer" className="btn btn-glass glass">
          Credly profile <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      }
    >
      <div className="space-y-10">
        {groupByCategory(certs).map(({ category, certs }) => (
          <div key={category}>
            <h3 className="mb-4 flex items-baseline gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              {category}
              <span className="text-muted/70">{certs.length}</span>
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover flex h-full items-center gap-4 !rounded-[24px] p-4"
                  >
                    {c.image ? (
                      <Image src={c.image} alt="" width={48} height={48} className="size-12 shrink-0 object-contain" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-bg font-mono text-xs font-medium"
                      >
                        {monogram(c.issuer)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium leading-snug">{c.name}</span>
                      <span className="mt-1 block font-mono text-xs text-muted">
                        {c.issuer} · {formatDate(c.date)}
                      </span>
                    </span>
                    <span aria-hidden="true" className="self-start text-muted">
                      ↗
                    </span>
                    <span className="sr-only">(view credential, opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
