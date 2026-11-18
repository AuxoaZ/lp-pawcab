import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services/pet-transport", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/dog-walking", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/pet-sitting", priority: 0.8, changeFrequency: "monthly" },
    { path: "/stories", priority: 0.6, changeFrequency: "weekly" },
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
