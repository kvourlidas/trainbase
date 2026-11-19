import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main id="main" className="sec" style={{ minHeight: "70vh", paddingTop: 160 }}>
      <h1 style={{ fontWeight: 900, fontSize: "clamp(80px,14vw,240px)", letterSpacing: "-.06em", lineHeight: 0.82 }}>
        {t("title")}
        <span className="acc">.</span>
      </h1>
      <p style={{ fontSize: 20, margin: "28px 0" }}>{t("text")}</p>
      <Button href="/" arrow>
        {t("back")}
      </Button>
    </main>
  );
}
