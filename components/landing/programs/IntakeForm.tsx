"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { intakeSchema } from "@/lib/schemas";

type Errors = Partial<Record<"condition" | "name" | "email", string>>;

type Props = {
  /** Called with the stored intake id and the contact details after a successful submit. */
  onSubmitted: (result: { intakeId: string; name: string; email: string }) => void;
  submitted: boolean;
};

/** Inline adapted-training intake, shown when the Adapted environment is selected. */
export function IntakeForm({ onSubmitted, submitted }: Props) {
  const t = useTranslations("programs.intake");
  const locale = useLocale();
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = intakeSchema.safeParse({
      condition: fd.get("condition"),
      details: fd.get("details"),
      name: fd.get("name"),
      email: fd.get("email"),
      locale,
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key === "email") next.email = t("invalidEmail");
        else if (key === "condition" || key === "name") next[key] = t("required");
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/adapted-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      const { intakeId } = (await res.json()) as { intakeId: string };
      setStatus("idle");
      onSubmitted({ intakeId, name: parsed.data.name, email: parsed.data.email });
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <small id={`${id}-${k}-err`} className="err">
        {errors[k]}
      </small>
    ) : null;

  return (
    <form className="adapted-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label className="mono" htmlFor={`${id}-condition`}>
          {t("condition")}
        </label>
        <textarea
          id={`${id}-condition`}
          name="condition"
          rows={3}
          required
          placeholder={t("placeholder")}
          aria-invalid={!!errors.condition}
          aria-describedby={errors.condition ? `${id}-condition-err` : undefined}
        />
        {err("condition")}
      </div>
      <div className="field">
        <label className="mono" htmlFor={`${id}-details`}>
          {t("details")}
        </label>
        <textarea
          id={`${id}-details`}
          name="details"
          rows={3}
          placeholder={t("placeholder")}
          aria-describedby={`${id}-details-help`}
        />
        <small id={`${id}-details-help`}>{t("detailsHelp")}</small>
      </div>
      <div className="field">
        <label className="mono" htmlFor={`${id}-name`}>
          {t("name")}
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
        />
        {err("name")}
      </div>
      <div className="field">
        <label className="mono" htmlFor={`${id}-email`}>
          {t("email")}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
        />
        {err("email")}
      </div>
      <div className="first-step">
        <div>
          <span className="mono acc" lang="en">
            {t("firstStepLabel")}
          </span>
          <b>{t("firstStepTitle")}</b>
          <span className="muted">{t("firstStepText")}</span>
          <p className="mono" role="status" aria-live="polite" style={{ marginTop: 10 }}>
            {submitted ? <span className="acc">{t("sent")}</span> : status === "error" ? t("error") : ""}
          </p>
        </div>
        <button type="submit" className="btn btn-acc" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")} <Arrow />
        </button>
      </div>
    </form>
  );
}
