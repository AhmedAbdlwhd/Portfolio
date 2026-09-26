import local from "../../content/certifications.json";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string; // YYYY-MM-DD
  image: string;
  skills: string[];
};

export const credlyBadgeUrl = (id: string) => `https://www.credly.com/badges/${id}`;

/** Newest first. Phase 5 adds a live fetch from Credly, with this file as the fallback. */
export async function getCertifications(): Promise<Certification[]> {
  return [...(local as Certification[])].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}
