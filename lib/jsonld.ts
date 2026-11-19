import { siteConfig } from "@/config/site";
import { plans, planDisplayName, envs } from "@/config/pricing";
import type { Locale } from "@/i18n/routing";
import { localeUrl } from "./seo";

export function organizationLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: localeUrl(locale),
    email: siteConfig.contactEmail,
    sameAs: Object.values(siteConfig.social),
  };
}

export function coachLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.coachName,
    jobTitle: "Certified Personal Trainer",
    description,
    worksFor: { "@type": "Organization", name: siteConfig.name },
    url: `${localeUrl(locale)}#coach`,
  };
}

/** One Service with an Offer per plan/variant. Prices are only listed once set. */
export function servicesLd(locale: Locale) {
  const offers = envs
    .filter((e) => e === "gym" || e === "adapted")
    .flatMap((env) =>
      plans.map((p) => {
        const amount = p.amount[env === "adapted" ? "adapted" : "standard"];
        return {
          "@type": "Offer",
          name: planDisplayName(p, env),
          url: `${localeUrl(locale)}#programs`,
          ...(amount !== null && {
            price: amount,
            priceCurrency: "EUR",
            priceSpecification: { "@type": "UnitPriceSpecification", price: amount, priceCurrency: "EUR", unitCode: "MON" },
          }),
        };
      }),
    );
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Personal training",
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: "GR",
    offers,
  };
}
