import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";

/**
 * Projects live in /content/projects, one Markdown file each.
 * The filename (without .md) becomes the URL slug: /projects/<slug>.
 * See content/projects/_template.md for every available field.
 */

/** Small visuals shown on project cards. Any project can use any of them. */
export type Visual =
  | { type: "line"; data: number[]; labels: string[]; unit?: string }
  | { type: "matrix"; data: number[][]; labels: string[] }
  | { type: "chat"; question: string; answer: string; note?: string }
  | { type: "words"; words: string[] };

/** Screenshot or chart stored in /public. Width and height are read from the file automatically. */
export type ProjectImage = { src: string; alt: string; caption?: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  date: string; // YYYY-MM
  featured: boolean;
  order?: number; // lower shows first; unset = after ordered ones, newest first
  repo?: string;
  demoUrl?: string; // "Try it live" button + embedded preview
  demoVideo?: string; // YouTube link or .mp4
  metric?: { value: string; label: string };
  visual?: Visual;
  images: ProjectImage[]; // first one is the cover
  body: string; // Markdown case study
};

const DIR = path.join(process.cwd(), "content", "projects");

function fail(file: string, msg: string): never {
  throw new Error(`content/projects/${file}: ${msg}`);
}

function readImages(file: string, list: unknown): ProjectImage[] {
  if (list === undefined) return [];
  if (!Array.isArray(list)) fail(file, `"images" must be a list`);
  return list.map((img, i) => {
    if (typeof img?.src !== "string" || !img.src.startsWith("/")) fail(file, `images[${i}].src must start with "/" (a file in /public)`);
    if (typeof img.alt !== "string" || !img.alt) fail(file, `images[${i}].alt is required — describe the image for screen readers`);
    const onDisk = path.join(process.cwd(), "public", img.src);
    if (!fs.existsSync(onDisk)) fail(file, `images[${i}]: public${img.src} does not exist`);
    const { width, height } = imageSize(fs.readFileSync(onDisk));
    return { src: img.src, alt: img.alt, caption: img.caption, width, height };
  });
}

function read(file: string): Project {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  for (const key of ["title", "summary", "date"]) {
    if (typeof data[key] !== "string" || !data[key]) fail(file, `"${key}" is required`);
  }
  if (!/^\d{4}-\d{2}$/.test(data.date)) fail(file, `"date" must look like 2026-03`);
  if (!Array.isArray(data.tags) || data.tags.length === 0) fail(file, `"tags" needs at least one tag`);

  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    summary: data.summary,
    tags: data.tags,
    stack: data.stack ?? [],
    date: data.date,
    featured: data.featured ?? false,
    order: typeof data.order === "number" ? data.order : undefined,
    repo: data.repo,
    demoUrl: data.demoUrl || undefined,
    demoVideo: data.demoVideo || undefined,
    metric: data.metric,
    visual: data.visual,
    images: readImages(file, data.images),
    body: content.trim(),
  };
}

/** All projects: by `order` if set, then newest first. Files starting with "_" (like the template) are skipped. */
export function getProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(read)
    .sort(
      (a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity) ||
        b.date.localeCompare(a.date) ||
        a.title.localeCompare(b.title),
    );
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  return [...new Set(getProjects().flatMap((p) => p.tags))].sort();
}
