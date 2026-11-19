import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgramsSelector } from "./programs/ProgramsSelector";

export async function ProgramsSection() {
  const t = await getTranslations("programs");
  return (
    <section className="sec dark" id="programs" aria-labelledby="programs-title">
      <SectionHeader
        index="02"
        label={t("idx")}
        title={t("title")}
        sub={<span lang="en">{t("sub")}</span>}
        id="programs-title"
      />
      <ProgramsSelector />
    </section>
  );
}
