import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { AuthTrigger } from "./AuthTrigger";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="dark footer">
      <div className="foot">
        <div>
          <h2 className="mono">{t("newsletter")}</h2>
          <p>{t("newsletterText")}</p>
          <NewsletterForm />
        </div>
        <div>
          <h2 className="mono">{t("navigate")}</h2>
          <Link href={{ pathname: "/", hash: "coach" }}>{tn("coach")}</Link>
          <Link href={{ pathname: "/", hash: "programs" }}>{tn("programs")}</Link>
          <Link href={{ pathname: "/", hash: "how" }}>{tn("method")}</Link>
          <Link href={{ pathname: "/", hash: "adapted" }}>{tn("adapted")}</Link>
          <Link href={{ pathname: "/", hash: "tips" }}>{tn("tips")}</Link>
        </div>
        <div>
          <h2 className="mono">{t("account")}</h2>
          <AuthTrigger tab="login" className="linkish">
            {t("login")}
          </AuthTrigger>
          <AuthTrigger tab="signup" className="linkish">
            {t("signup")}
          </AuthTrigger>
          <Link href={{ pathname: "/", hash: "faq" }}>{t("faq")}</Link>
        </div>
        <div>
          <h2 className="mono">{t("social")}</h2>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        {siteConfig.name}
        <i>.</i>
      </div>
      <div className="legal mono">
        <span>
          © {year} {siteConfig.name}
        </span>
        <span>
          <Link href="/legal/terms">{t("terms")}</Link> · <Link href="/legal/privacy">{t("privacy")}</Link> ·{" "}
          <Link href="/legal/cookies">{t("cookies")}</Link>
        </span>
      </div>
    </footer>
  );
}
