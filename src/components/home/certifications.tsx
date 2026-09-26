import Image from "next/image";
import { Section } from "@/components/section";
import { credlyBadgeUrl, type Certification } from "@/lib/certifications";
import { site } from "@/lib/site";

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleString("en-US", { month: "short", year: "numeric" });

export function Certifications({ certs }: { certs: Certification[] }) {
  return (
    <Section
      id="certifications"
      eyebrow="02 / Credentials"
      title="Certifications"
      action={
        <a href={site.links.credly} target="_blank" rel="noopener noreferrer" className="btn btn-glass glass">
          Credly profile <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <li key={c.id}>
            <a
              href={credlyBadgeUrl(c.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex h-full flex-col gap-5 p-6"
            >
              <div className="flex items-start gap-4">
                <Image src={c.image} alt="" width={72} height={72} className="size-[72px] shrink-0 object-contain" />
                <div className="space-y-1">
                  <h3 className="font-semibold leading-snug">{c.name}</h3>
                  <p className="font-mono text-xs text-muted">
                    {c.issuer} · {formatDate(c.issuedAt)}
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                {c.skills.slice(0, 3).map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-auto text-sm text-muted">
                Verify on Credly <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
