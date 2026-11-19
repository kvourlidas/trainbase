import { getTranslations, setRequestLocale } from "next-intl/server";
import { Marquee } from "@/components/ui/Marquee";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

// Phase 1 placeholder — the full landing page lands in Phase 2.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("hero");

  return (
    <>
      <header className="hero" id="top">
        <div className="gridlines" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="hero-meta mono">
          <span>{t("meta1")}</span>
          <span className="hide-m">{t("meta2")}</span>
        </div>
        <h1>
          <span className="line">
            <span>{t("h1a")}</span>
          </span>
          <span className="line">
            <span>
              {t("h1b")}
              <span className="dot">.</span>
            </span>
          </span>
        </h1>
      </header>
      <Marquee words={[...siteConfig.marqueeWords]} />
    </>
  );
}
