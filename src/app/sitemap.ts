import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site-url";

// Tells search engines about every page. New projects are included automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const monthEnd = (date: string) => {
    const [y, m] = date.split("-").map(Number);
    return new Date(y, m, 0);
  };
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...getProjects().map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: monthEnd(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
