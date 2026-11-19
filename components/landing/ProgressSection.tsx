import { getTranslations } from "next-intl/server";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { demoDashboard } from "@/components/dashboard/demo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURES = ["f1", "f2", "f3", "f4"] as const;

export async function ProgressSection() {
  const t = await getTranslations("progress");
  const td = await getTranslations("dashboard");

  return (
    <section className="sec dark" id="progress" aria-labelledby="progress-title">
      <SectionHeader
        index="04"
        label={t("idx")}
        title={<span lang="en">{t("title")}</span>}
        sub={t("sub")}
        id="progress-title"
      />
      <div className="dash-wrap">
        <Reveal className="dash-copy">
          <p className="muted">{t("p")}</p>
          <ul>
            {FEATURES.map((f) => (
              <li key={f}>
                <span>{t(`features.${f}`)}</span>
                <span className="acc" aria-hidden="true">
                  ●
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Dashboard data={demoDashboard(td("demoName"))} className="rv d1" />
      </div>
    </section>
  );
}
