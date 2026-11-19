import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AdaptedCta } from "./AdaptedCta";

const STEPS = ["s1", "s2", "s3"] as const;

export async function AdaptedSection() {
  const t = await getTranslations("adapted");
  return (
    <section className="sec" id="adapted" aria-labelledby="adapted-title">
      <SectionHeader
        index="05"
        label={t("idx")}
        title={<span lang="en">{t("title")}</span>}
        sub={t("sub")}
        id="adapted-title"
      />
      <div className="adapted">
        <Reveal className="big" lang="en">
          {t("big1")} <span>{t("big2")}</span>
        </Reveal>
        <Reveal delay={1} className="side">
          <p className="muted">{t("p")}</p>
          <AdaptedCta label={t("cta")} />
        </Reveal>
        <div className="atrack">
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={i as 0 | 1 | 2}>
              <span className="mono acc" lang="en">
                STEP {String(i + 1).padStart(2, "0")}
              </span>
              <b>{t(`steps.${s}.h`)}</b>
              <p>{t(`steps.${s}.p`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
