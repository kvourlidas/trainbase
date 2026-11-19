import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = ["s1", "s2", "s3", "s4"] as const;

export async function HowSection() {
  const t = await getTranslations("how");
  return (
    <section className="sec" id="how" aria-labelledby="how-title">
      <SectionHeader
        index="03"
        label={t("idx")}
        title={t("title")}
        sub={<span lang="en">{t("sub")}</span>}
        id="how-title"
      />
      <ol className="steps">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s} delay={i as 0 | 1 | 2 | 3} className="step">
            <div className="n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3>{t(`steps.${s}.h`)}</h3>
            <p>{t(`steps.${s}.p`)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
