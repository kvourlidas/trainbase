import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "always",
  // `/` → `/el`, or `/en` when Accept-Language prefers English.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

/** BCP-47 tags used for Intl formatting (dates, numbers, currency). */
export const intlLocale: Record<Locale, string> = { el: "el-GR", en: "en-US" };
