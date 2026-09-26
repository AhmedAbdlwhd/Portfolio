import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import list from "../../content/awards.json";

/**
 * Awards live in content/awards.json. Fields:
 * - title, issuer, date ("2026-06"), description — required
 * - company — optional; matches an Experience entry's company, so the award also shows under that job
 * - place — optional; 1, 2 or 3 shows a 🥇 🥈 🥉 badge
 * - image, imageAlt — optional photo in /public (e.g. "/awards/dubbing-challenge.jpg")
 */
export type Award = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  company?: string;
  place?: number;
  image?: { src: string; alt: string; width: number; height: number };
};

type Entry = Omit<Award, "image"> & { image?: string; imageAlt?: string };

function fail(i: number, msg: string): never {
  throw new Error(`content/awards.json, award ${i + 1}: ${msg}`);
}

function read(entry: Entry, i: number): Award {
  for (const key of ["title", "issuer", "date", "description"] as const) {
    if (typeof entry[key] !== "string" || !entry[key]) fail(i, `"${key}" is required`);
  }
  if (!/^\d{4}-\d{2}$/.test(entry.date)) fail(i, `"date" must look like 2026-06`);

  let image: Award["image"];
  if (entry.image) {
    if (!entry.imageAlt) fail(i, `"imageAlt" is required when there's an image — describe the photo for screen readers`);
    const onDisk = path.join(process.cwd(), "public", entry.image);
    if (!fs.existsSync(onDisk)) fail(i, `public${entry.image} does not exist`);
    const { width, height } = imageSize(fs.readFileSync(onDisk));
    image = { src: entry.image, alt: entry.imageAlt, width, height };
  }

  return {
    title: entry.title,
    issuer: entry.issuer,
    date: entry.date,
    description: entry.description,
    company: entry.company,
    place: entry.place,
    image,
  };
}

/** All awards, newest first. */
export function getAwards(): Award[] {
  return (list as Entry[]).map(read).sort((a, b) => b.date.localeCompare(a.date));
}

export const medal = (place?: number) => (place ? ["🥇", "🥈", "🥉"][place - 1] : undefined);

