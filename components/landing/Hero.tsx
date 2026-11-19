import { getTranslations } from "next-intl/server";
import { Arrow } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { HeroRing } from "./HeroRing";

export async function Hero() {
  const t = await getTranslations("hero");
  const year = new Date().getFullYear();

  return (
    <header className="hero" id="top">
      <div className="gridlines" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="hero-meta mono">
        <span>{t("meta1")}</span>
        <span className="hide-m">{t("meta2")}</span>
        <span>{year} ●</span>
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
      <div className="kicker" lang="en">
        <b aria-hidden="true" />
        {t("kicker")}
      </div>
      <div className="hero-row">
        <div className="hero-copy">
          <p>{t("p")}</p>
          <div className="hero-ctas">
            <Link href={{ pathname: "/", hash: "programs" }} className="btn btn-ink">
              {t("cta1")} <Arrow />
            </Link>
            <Link href={{ pathname: "/", hash: "how" }} className="btn btn-line">
              {t("cta2")}
            </Link>
          </div>
        </div>
        <HeroRing
          value={87}
          weekLabel={t("ringWeek")}
          goalLabel={t("ringLabel")}
          chip1={{ label: t("chip1"), value: "+12 kg" }}
          chip2={{ label: t("chip2"), value: "14 ●" }}
        />
      </div>
      <div className="hero-stats">
        <div>
          <strong>04</strong>
          <span className="mono muted">{t("stats.environments")}</span>
        </div>
        <div>
          <strong>03</strong>
          <span className="mono muted">{t("stats.plans")}</span>
        </div>
        <div>
          <strong>1:1</strong>
          <span className="mono muted">{t("stats.personal")}</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span className="mono muted">{t("stats.access")}</span>
        </div>
      </div>
    </header>
  );
}
