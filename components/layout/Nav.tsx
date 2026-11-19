"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LangToggle } from "@/components/ui/LangToggle";
import { Arrow, Button } from "@/components/ui/Button";
import { useUI } from "./UIProvider";

// Same order as the sections appear on the landing page.
const links = [
  { hash: "coach", key: "coach" },
  { hash: "programs", key: "programs" },
  { hash: "how", key: "method" },
  { hash: "adapted", key: "adapted" },
  { hash: "tips", key: "tips" },
] as const;

/** Fixed nav + accent scroll-progress bar. Turns frosted after 40px of scroll. */
export function Nav() {
  const t = useTranslations("nav");
  const { openAuth } = useUI();
  const [solid, setSolid] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty("--p", String(max > 0 ? Math.min(y / max, 1) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="scrollbar" aria-hidden="true" />
      <nav className={solid ? "nav solid" : "nav"} aria-label="Main">
        <Link href="/" className="logo">
          <i aria-hidden="true" />
          {siteConfig.name}
        </Link>
        <div className="navlinks">
          {links.map((l) => (
            <Link key={l.hash} href={{ pathname: "/", hash: l.hash }}>
              {t(l.key)}
            </Link>
          ))}
        </div>
        <div className="navright">
          <LangToggle />
          <Button variant="line" size="sm" className="hide-m" onClick={() => openAuth("login")}>
            {t("login")}
          </Button>
          <Link href={{ pathname: "/", hash: "programs" }} className="btn btn-ink btn-sm">
            {t("start")} <Arrow />
          </Link>
        </div>
      </nav>
    </>
  );
}
