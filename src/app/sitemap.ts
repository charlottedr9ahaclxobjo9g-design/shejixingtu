import type { MetadataRoute } from "next";
import { getJobs } from "@/lib/data/jobs";
import { getCompanies } from "@/lib/data/companies";

export const dynamic = "force-static";

const BASE = "https://www.shejixingtu.cn";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", changefreq: "weekly", priority: 1.0 },
    { path: "/jobs", changefreq: "weekly", priority: 0.9 },
    { path: "/skills", changefreq: "monthly", priority: 0.8 },
    { path: "/skills/industrial-design", changefreq: "monthly", priority: 0.7 },
    { path: "/skills/ui-ux", changefreq: "monthly", priority: 0.7 },
    { path: "/skills/visual-brand", changefreq: "monthly", priority: 0.7 },
    { path: "/skills/aigc-design", changefreq: "monthly", priority: 0.7 },
    { path: "/companies", changefreq: "weekly", priority: 0.8 },
    { path: "/portfolio", changefreq: "monthly", priority: 0.8 },
    { path: "/portfolio/checklist", changefreq: "monthly", priority: 0.7 },
    { path: "/resources", changefreq: "monthly", priority: 0.8 },
    { path: "/resources/download", changefreq: "monthly", priority: 0.7 },
    { path: "/about", changefreq: "yearly", priority: 0.5 },
  ].map((r) => ({
    url: `${BASE}${r.path}/`,
    lastModified: new Date("2026-08-13"),
    changeFrequency: r.changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));

  const jobRoutes: MetadataRoute.Sitemap = getJobs().map((job) => ({
    url: `${BASE}/jobs/${job.slug}/`,
    lastModified: new Date(job.verifiedAt || job.publishedDate || "2026-08-13"),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const companyRoutes: MetadataRoute.Sitemap = getCompanies().map((c) => ({
    url: `${BASE}/companies/${c.slug}/`,
    lastModified: new Date("2026-08-13"),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...jobRoutes, ...companyRoutes];
}
