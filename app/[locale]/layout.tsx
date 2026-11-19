import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { interTight, jetbrainsMono } from "@/lib/fonts";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { UIProvider } from "@/components/layout/UIProvider";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: `${siteConfig.name} — ${t("title")}`, template: `%s | ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
    openGraph: { siteName: siteConfig.name, locale: locale === "el" ? "el_GR" : "en_US", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#EFEDE7",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${interTight.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll reveals start hidden; without JS, show everything. */}
        <noscript>
          <style>{".rv{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip sr-only-focusable">
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <UIProvider>
            {children}
            <RevealObserver />
          </UIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
