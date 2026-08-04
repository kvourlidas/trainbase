import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { programs } from "@/content/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/programs", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const programRoutes = programs.map((program) => ({
    url: `${SITE_URL}/programs/${program.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...programRoutes];
}
