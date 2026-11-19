import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

/** Absolute URL for a locale + path ("/" → "/el"). */
export function localeUrl(locale: Locale, path = "/") {
  const p = path === "/" ? "" : path;
  return `${siteConfig.url}/${locale}${p}`;
}

/** Canonical + hreflang alternates (el, en, x-default → default locale). */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, localeUrl(l, path)])),
      "x-default": localeUrl(routing.defaultLocale, path),
    },
  };
}
