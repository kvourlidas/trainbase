import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getTips } from "@/lib/tips";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TipCard } from "@/components/tips/TipCard";

export async function TipsSection() {
  const t = await getTranslations("tips");
  const tips = (await getTips((await getLocale()) as Locale)).slice(0, 3);

  return (
    <section className="sec" id="tips" style={{ paddingTop: 0 }} aria-labelledby="tips-title">
      <SectionHeader
        index="06"
        label={<span lang="en">{t("idx")}</span>}
        title={<span lang="en">{t("title")}</span>}
        sub={t("sub")}
        id="tips-title"
      />
      <div className="tips">
        {tips.map((tip, i) => (
          <TipCard key={tip.slug} tip={tip} delay={i as 0 | 1 | 2} />
        ))}
      </div>
    </section>
  );
}
