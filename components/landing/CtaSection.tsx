import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AuthTrigger } from "@/components/layout/AuthTrigger";

export async function CtaSection() {
  const t = await getTranslations("cta");
  return (
    <section className="dark cta" aria-labelledby="cta-title">
      <Reveal as="h2" id="cta-title" lang="en">
        {t("title1")}
        <br />
        <span className="o">{t("title2")}</span>
        <span className="acc">.</span>
      </Reveal>
      <Reveal delay={1} className="cta-row">
        <p className="muted">{t("p")}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={{ pathname: "/", hash: "programs" }} className="btn btn-acc">
            {t("primary")} <Arrow />
          </Link>
          <AuthTrigger tab="signup" variant="line">
            {t("secondary")}
          </AuthTrigger>
        </div>
      </Reveal>
    </section>
  );
}
