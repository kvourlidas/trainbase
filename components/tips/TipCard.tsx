import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { TipMeta } from "@/lib/tips";
import { TipCover } from "./TipCover";

export async function TipCard({ tip, delay = 0 }: { tip: TipMeta; delay?: 0 | 1 | 2 | 3 }) {
  const t = await getTranslations("tips");
  return (
    <Link href={`/tips/${tip.slug}`} className={["tip", "rv", delay ? `d${delay}` : ""].join(" ").trim()}>
      <div className="meta mono">
        <span className="acc" lang="en">
          {tip.category}
        </span>
        <span lang="en">{t("min", { n: tip.readTime })}</span>
      </div>
      <div className="img">
        <TipCover cover={tip.cover} alt="" />
      </div>
      <h3>{tip.title}</h3>
      <span className="more">
        {t("read")}{" "}
        <span className="ar" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
