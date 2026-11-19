import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { coach } from "@/content/coach";
import type { Locale } from "@/i18n/routing";
import { alternates, localeUrl } from "@/lib/seo";
import { coachLd, organizationLd, servicesLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/landing/Hero";
import { CoachSection } from "@/components/landing/CoachSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { HowSection } from "@/components/landing/HowSection";
import { ProgressSection } from "@/components/landing/ProgressSection";
import { AdaptedSection } from "@/components/landing/AdaptedSection";
import { TipsSection } from "@/components/landing/TipsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = `${siteConfig.name} — ${t("title")}`;
  return {
    title: { absolute: title },
    description: t("description"),
    alternates: alternates(locale),
    openGraph: { title, description: t("description"), url: localeUrl(locale) },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={[organizationLd(locale), coachLd(locale, coach.bio[locale]), servicesLd(locale)]} />
      <Hero />
      <Marquee words={[...siteConfig.marqueeWords]} />
      <CoachSection />
      <ProgramsSection />
      <HowSection />
      <ProgressSection />
      <AdaptedSection />
      <TipsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
