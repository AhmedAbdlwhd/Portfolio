import credlyFallback from "../../content/credly-fallback.json";
import manualList from "../../content/certifications.json";
import { site } from "@/lib/site";

/**
 * Certifications come from two places:
 * 1. content/certifications.json — added by hand (Coursera, Udacity…). Add new ones there.
 * 2. Credly — fetched live once a day; content/credly-fallback.json is used if Credly is down.
 * Duplicates are removed, keeping the Credly version.
 */

export const CATEGORIES = ["AI & ML", "Data", "Development", "Security", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string; // YYYY-MM-DD
  url: string; // where the credential can be verified
  category: Category;
  image?: string; // Credly badge image
};

type ManualEntry = {
  name: string;
  issuer: string;
  date: string;
  url: string;
  category: Category;
  /** Name of the Credly badge for the same course — the Credly version is shown instead. */
  sameAsCredly?: string;
};

type FallbackBadge = { id: string; name: string; issuer: string; issuedAt: string; image: string; category?: Category };

type CredlyBadge = {
  id: string;
  state: string;
  issued_at_date: string;
  image_url: string;
  badge_template: { name: string };
  issuer?: { entities?: { entity?: { name?: string } }[] };
};

const credlyBadgeUrl = (id: string) => `https://www.credly.com/badges/${id}`;
const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Category for a Credly badge: from the fallback file if known, otherwise a guess from its name. */
function credlyCategory(id: string, name: string): Category {
  const known = (credlyFallback as FallbackBadge[]).find((b) => b.id === id)?.category;
  if (known) return known;
  const n = name.toLowerCase();
  if (/\b(ai|machine learning|deep learning|nlp|ml)\b/.test(n)) return "AI & ML";
  if (/data|sql|analytics/.test(n)) return "Data";
  if (/security|cyber/.test(n)) return "Security";
  if (/software|git|web|javascript|python|cloud|aws|developer/.test(n)) return "Development";
  return "Other";
}

async function getCredly(): Promise<Certification[]> {
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
        date: b.issued_at_date,
        url: credlyBadgeUrl(b.id),
        category: credlyCategory(b.id, b.badge_template.name),
        image: b.image_url,
      }));
    if (badges.length === 0) throw new Error("Credly returned no badges");
    return badges;
  } catch (err) {
    console.warn(`[certifications] Using Credly fallback: ${(err as Error).message}`);
    return (credlyFallback as FallbackBadge[]).map((b) => ({
      id: b.id,
      name: b.name,
      issuer: b.issuer,
      date: b.issuedAt,
      url: credlyBadgeUrl(b.id),
      category: b.category ?? credlyCategory(b.id, b.name),
      image: b.image,
    }));
  }
}

/** All certifications, duplicates removed, newest first. */
export async function getCertifications(): Promise<Certification[]> {
  const credly = await getCredly();
  const credlyNames = new Set(credly.map((c) => normalise(c.name)));

  const manual = (manualList as ManualEntry[])
    .filter((m) => !credlyNames.has(normalise(m.name)) && !(m.sameAsCredly && credlyNames.has(normalise(m.sameAsCredly))))
    .map((m) => ({
      id: normalise(m.name).replace(/ /g, "-"),
      name: m.name,
      issuer: m.issuer,
      date: m.date,
      url: m.url,
      category: CATEGORIES.includes(m.category) ? m.category : "Other",
    }));

  return [...credly, ...manual].sort((a, b) => b.date.localeCompare(a.date));
}

/** Grouped by category (in CATEGORIES order), skipping empty groups. */
export function groupByCategory(certs: Certification[]) {
  return CATEGORIES.map((category) => ({ category, certs: certs.filter((c) => c.category === category) })).filter(
    (g) => g.certs.length > 0,
  );
}
