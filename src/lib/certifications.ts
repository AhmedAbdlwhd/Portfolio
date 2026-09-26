import local from "../../content/certifications.json";
import { site } from "@/lib/site";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string; // YYYY-MM-DD
  image: string;
  skills: string[];
};

export const credlyBadgeUrl = (id: string) => `https://www.credly.com/badges/${id}`;

const newestFirst = (list: Certification[]) => [...list].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));

// Credly skill lists sometimes include internal codes like "PWID-B0406200"; hide those.
const isRealSkill = (s: string) => !/^[A-Z]+-[A-Z]?\d{4,}$/.test(s);

type CredlyBadge = {
  id: string;
  state: string;
  issued_at_date: string;
  image_url: string;
  badge_template: { name: string; skills?: { name: string }[] };
  issuer?: { entities?: { entity?: { name?: string } }[] };
};

/**
 * Live badges from the public Credly profile, refreshed at most once a day.
 * Falls back to content/certifications.json if Credly is slow, down, or returns nothing.
 */
export async function getCertifications(): Promise<Certification[]> {
  try {
    const res = await fetch(`https://www.credly.com/users/${site.credlyUsername}/badges.json`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Credly responded ${res.status}`);
    const { data } = (await res.json()) as { data: CredlyBadge[] };

    const badges = data
      .filter((b) => b.state === "accepted")
      .map((b) => ({
        id: b.id,
        name: b.badge_template.name,
        issuer: b.issuer?.entities?.[0]?.entity?.name ?? "Credly",
        issuedAt: b.issued_at_date,
        image: b.image_url,
        skills: (b.badge_template.skills ?? []).map((s) => s.name).filter(isRealSkill),
      }));
    if (badges.length === 0) throw new Error("Credly returned no badges");
    return newestFirst(badges);
  } catch (err) {
    console.warn(`[certifications] Using local fallback: ${(err as Error).message}`);
    return newestFirst(local as Certification[]);
  }
}
