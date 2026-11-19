/**
 * Site-wide constants. Never hard-code the app name or URLs in components —
 * import them from here.
 */
export const siteConfig = {
  name: "TRAINBASE",
  /** Public origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL per environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  // TODO: replace with the coach's real name once confirmed.
  coachName: "TrainBase Coach",
  // TODO: replace with the real contact address once the domain is confirmed.
  contactEmail: "hello@trainbase.example.com",
  calcomLink: process.env.NEXT_PUBLIC_CALCOM_LINK ?? "",
  /** Bilingual by design — identical in both locales. */
  marqueeWords: ["STRENGTH", "ΔΥΝΑΜΗ", "CONSISTENCY", "ΣΥΝΕΠΕΙΑ", "PROGRESS", "ΠΡΟΟΔΟΣ", "DISCIPLINE", "ΠΕΙΘΑΡΧΙΑ"],
  social: {
    instagram: "https://instagram.com/trainbase",
    tiktok: "https://tiktok.com/@trainbase",
    youtube: "https://youtube.com/@trainbase",
  },
} as const;

export type SiteConfig = typeof siteConfig;
