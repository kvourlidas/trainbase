"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/** EL/EN pill. Switches locale, keeping path, query, hash and scroll position. */
export function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("a11y");
  const [, startTransition] = useTransition();

  const switchTo = (next: Locale) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (next === locale) return;
    const { search, hash } = window.location;
    const y = window.scrollY;
    startTransition(() => {
      router.replace(`${pathname}${search}`, { locale: next, scroll: false });
    });
    // Restore hash + exact scroll after the new locale renders.
    const restore = () => {
      if (hash) history.replaceState(history.state, "", `${window.location.pathname}${window.location.search}${hash}`);
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    };
    requestAnimationFrame(() => setTimeout(restore, 60));
  };

  return (
    <div className="lang" role="group" aria-label={t("language")}>
      {routing.locales.map((l) => (
        <a
          key={l}
          href={`/${l}${pathname === "/" ? "" : pathname}`}
          hrefLang={l}
          lang={l}
          className={l === locale ? "on" : undefined}
          aria-current={l === locale ? "true" : undefined}
          onClick={switchTo(l)}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
