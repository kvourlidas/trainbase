import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { coach } from "@/content/coach";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function CoachSection() {
  const t = await getTranslations("coach");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="sec" id="coach" aria-labelledby="coach-title">
      <SectionHeader
        index="01"
        label={t("idx")}
        title={t("title")}
        sub={<span lang="en">{t("sub")}</span>}
        id="coach-title"
      />
      <div className="coach">
        <Reveal className="photo">
          {coach.photo ? (
            <Image src={coach.photo} alt={t("photoAlt")} fill sizes="(max-width: 980px) 100vw, 40vw" />
          ) : (
            <div className="lab mono">{t("photoLabel")}</div>
          )}
          <div className="scan" aria-hidden="true" />
          <div className="tag" lang="en">
            {t("tag")}
          </div>
        </Reveal>
        <div className="coach-txt">
          <Reveal delay={1}>
            <blockquote className="quote">{t.rich("quote", { em: (chunks) => <em>{chunks}</em> })}</blockquote>
            <p className="muted">{coach.bio[locale]}</p>
          </Reveal>
          <Reveal as="ul" delay={2} className="creds">
            {coach.credentials.map((c, i) => (
              <li key={c.tag}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{c.label[locale]}</span>
                <span className="mono">{c.tag}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
