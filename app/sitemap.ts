import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localeUrl } from "@/lib/seo";

// Phase 8 adds /tips, /tips/[slug] and /legal/* once those pages exist.
const PATHS = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, localeUrl(l, path)])) },
    })),
  );
}
