"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  callFeatureKey,
  envs,
  isProfileEnv,
  planDisplayName,
  plans,
  variantFor,
  type Env,
  type PlanId,
} from "@/config/pricing";
import { Arrow } from "@/components/ui/Button";
import { useUI } from "@/components/layout/UIProvider";
import { draftFromQuery, draftToProfile, emptyDraft, writeDraftToQuery, type ProfileDraft } from "@/lib/profile";
import type { TrainingProfile } from "@/lib/schemas";
import { EnvIcon } from "./EnvIcon";
import { IntakeForm } from "./IntakeForm";
import { TrainingProfileForm } from "./TrainingProfileForm";
import { SELECT_ENV_EVENT } from "./events";

const isEnv = (v: string | null): v is Env => !!v && (envs as readonly string[]).includes(v);

export type StartPlanHandler = (
  args: { plan: PlanId } & ({ env: "adapted"; intakeId: string } | { profile: TrainingProfile }),
) => void;

/** Same curve as the reference's `@keyframes shake` (0.5s, ±8px). */
const SHAKE: Keyframe[] = [0, -8, 8, -8, 8, 0].map((x, i) => ({
  offset: i / 5,
  transform: `translateX(${x}px)`,
  easing: "ease",
}));

/**
 * Environment → (training profile | adapted intake) → plan funnel. All client state,
 * deep-linkable through `?env=home&eq=bands,dumbbells&lvl=intermediate&goals=strength,fatloss`.
 * The profile is shared across Gym / Home Gym / Outdoor; equipment only applies to Home.
 */
export function ProgramsSelector({ onStartPlan }: { onStartPlan?: StartPlanHandler }) {
  const t = useTranslations("programs");
  const format = useFormatter();
  const { openAuth } = useUI();
  const [env, setEnv] = useState<Env>("gym");
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft);
  const [intake, setIntake] = useState<{ intakeId: string; name: string; email: string } | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Read deep-link params on mount; listen for programmatic selection.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const qEnv = q.get("env");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
    if (isEnv(qEnv)) setEnv(qEnv);
    setDraft((d) => ({ ...d, ...draftFromQuery(q) }));
    const onSelect = (e: Event) => {
      const next = (e as CustomEvent<Env>).detail;
      if (isEnv(next)) setEnv(next);
    };
    window.addEventListener(SELECT_ENV_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_ENV_EVENT, onSelect);
  }, []);

  // Mirror state into the URL (replaceState: no history spam, no re-render).
  useEffect(() => {
    const url = new URL(window.location.href);
    const before = url.search;
    if (env === "gym") url.searchParams.delete("env");
    else url.searchParams.set("env", env);
    writeDraftToQuery(url, isProfileEnv(env) ? env : null, draft);
    if (url.search !== before) history.replaceState(history.state, "", url);
  }, [env, draft]);

  const onTileKey = useCallback((e: React.KeyboardEvent, index: number) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + envs.length) % envs.length;
    setEnv(envs[next]);
    tileRefs.current[next]?.focus();
  }, []);

  const variant = variantFor(env);
  const profileEnv = isProfileEnv(env) ? env : null;
  const profile = profileEnv ? draftToProfile(profileEnv, draft) : null;
  const locked = profileEnv ? !profile : !intake;

  /** Locked CTA: bring the summary bar into view and shake it. */
  const nudge = () => {
    const el = summaryRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
    if (!reduce) el.animate(SHAKE, { duration: 500 });
  };

  const start = (plan: PlanId) => {
    if (profileEnv && !profile) return nudge();
    if (!profileEnv && !intake) return;
    if (!onStartPlan) return openAuth("signup");
    if (profile) onStartPlan({ plan, profile });
    else if (intake) onStartPlan({ plan, env: "adapted", intakeId: intake.intakeId });
  };

  return (
    <>
      <div className="env-grid rv" role="radiogroup" aria-label={t("envGroupLabel")}>
        {envs.map((e, i) => (
          <button
            key={e}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={env === e}
            tabIndex={env === e ? 0 : -1}
            className={env === e ? "env on" : "env"}
            onClick={() => setEnv(e)}
            onKeyDown={(ev) => onTileKey(ev, i)}
          >
            <div className="top">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="sel" aria-hidden="true" />
            </div>
            <EnvIcon env={e} />
            <div>
              <h3 lang="en">{t(`envs.${e}.name`)}</h3>
              <p>{t(`envs.${e}.desc`)}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="env-panel">
        {env === "adapted" && <IntakeForm submitted={!!intake} onSubmitted={setIntake} />}
        {profileEnv && (
          <TrainingProfileForm env={profileEnv} draft={draft} onChange={setDraft} summaryRef={summaryRef} />
        )}
      </div>

      <div className="plans-head">
        <h3 lang="en">
          {t("plansTitle")} <span className="acc">/ {t(`envs.${env}.name`)}</span>
        </h3>
        <span className="mono muted">{t("plansSub")}</span>
      </div>
      <div className="plans">
        {plans.map((p) => {
          const amount = p.amount[variant];
          const calls = p.calls[variant];
          const name = planDisplayName(p, env);
          return (
            <article key={p.id} className={p.highlighted ? "plan hot" : "plan"} aria-label={name}>
              {p.highlighted && <span className="badge mono">{t("popular")}</span>}
              <div className="pname" lang="en">
                <i aria-hidden="true" />
                {name}
              </div>
              <div className="price">
                {amount === null ? (
                  <>
                    <span className="q">XX</span>€
                  </>
                ) : (
                  format.number(amount, { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
                )}
                <small>{t("perMonth")}</small>
              </div>
              <div className="inc">{t(`includes.${p.includes[variant]}` as "includes.program")}</div>
              <ul>
                {calls && <li>{t(`features.${callFeatureKey(variant)}`, calls)}</li>}
                {p.features[variant].map((f) => (
                  <li key={f}>{t(`features.${f}` as "features.videos")}</li>
                ))}
              </ul>
              <button
                type="button"
                className={[p.highlighted ? "btn btn-ink" : "btn btn-line", locked && profileEnv && "locked"]
                  .filter(Boolean)
                  .join(" ")}
                aria-disabled={locked}
                aria-describedby={locked ? (profileEnv ? "profile-status" : "plans-blocked") : undefined}
                onClick={() => start(p.id)}
              >
                <span lang="en">{t("start", { plan: p.name })}</span> <Arrow />
              </button>
            </article>
          );
        })}
      </div>
      <div className="plans-foot mono">
        <span>
          {locked && !profileEnv ? (
            <span id="plans-blocked" className="acc">
              {t("intakeFirst")}
            </span>
          ) : (
            t("foot1")
          )}
        </span>
        <span>{t("foot2")}</span>
      </div>
    </>
  );
}
