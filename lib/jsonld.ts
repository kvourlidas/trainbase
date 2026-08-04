import { APP_NAME, SITE_URL } from "@/config/site";
import type { Program } from "@/content/programs";
import type { Trainer } from "@/content/trainer";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
  };
}

export function personJsonLd(trainer: Trainer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: trainer.name,
    jobTitle: trainer.title,
    image: `${SITE_URL}${trainer.photo}`,
    worksFor: {
      "@type": "Organization",
      name: APP_NAME,
    },
  };
}

export function courseJsonLd(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description,
    provider: {
      "@type": "Organization",
      name: APP_NAME,
      sameAs: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
