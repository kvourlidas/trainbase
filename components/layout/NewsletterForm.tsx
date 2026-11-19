"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";

type State = "idle" | "sending" | "ok" | "error";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const id = useId();
  const [state, setState] = useState<State>("idle");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        setState("sending");
        try {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, locale }),
          });
          setState(res.ok ? "ok" : "error");
        } catch {
          setState("error");
        }
      }}
    >
      <div className="foot-news">
        <label htmlFor={`${id}-nl`} className="sr-only">
          Email
        </label>
        <input
          id={`${id}-nl`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("newsletterPlaceholder")}
        />
        <button className="acc" type="submit" aria-label={t("newsletterSubmit")} disabled={state === "sending"}>
          →
        </button>
      </div>
      <p className="mono muted" role="status" style={{ marginTop: 10, minHeight: 16 }}>
        {state === "ok" ? t("newsletterOk") : state === "error" ? t("newsletterError") : ""}
      </p>
    </form>
  );
}
