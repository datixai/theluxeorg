import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const now = new Date();
  const pages = ["", "/vision-2035", "/sectors", "/about", "/roadmap", "/offices", "/news", "/contact"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const sectors = c.sectors.map((s) => ({
    url: `${SITE_URL}/sectors/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const news = c.news
    .filter((n) => n.published)
    .map((n) => ({
      url: `${SITE_URL}/news/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
  return [...pages, ...sectors, ...news];
}
