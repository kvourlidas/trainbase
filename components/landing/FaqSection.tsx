import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";

const ITEMS = ["q1", "q2", "q3", "q4"] as const;

export async function FaqSection() {
  const t = await getTranslations("faq");
  const items = ITEMS.map((k) => ({ q: t(`items.${k}.q`), a: t(`items.${k}.a`) }));

  return (
    <section className="sec" id="faq" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div className="faq">
        <Reveal className="sec-idx" style={{ gridColumn: "1/4" }}>
          <div className="num">07 / FAQ</div>
          <h2 id="faq-title">{t("title")}</h2>
        </Reveal>
        <Reveal delay={1} className="faq-list">
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  );
}
