"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  envs,
  equipmentOptions,
  planDisplayName,
  plans,
  variantFor,
  type Env,
  type Equipment,
  type PlanId,
} from "@/config/pricing";
import { Arrow } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useUI } from "@/components/layout/UIProvider";
import { EnvIcon } from "./EnvIcon";
import { IntakeForm } from "./IntakeForm";
import { SELECT_ENV_EVENT } from "./events";

const isEnv = (v: string | null): v is Env => !!v && (envs as readonly string[]).includes(v);
const isEquipment = (v: string | null): v is Equipment =>
  !!v && (equipmentOptions as readonly string[]).includes(v);

export type StartPlanHandler = (args: {
  plan: PlanId;
  env: Env;
  equipment?: Equipment;
  intakeId?: string;
}) => void;

/**
 * Environment → (equipment | intake) → plan funnel. All client state,
 * deep-linkable through `?env=home&eq=dumbbells`.
 */
export function ProgramsSelector({ onStartPlan }: { onStartPlan?: StartPlanHandler }) {
  const t = useTranslations("programs");
  const format = useFormatter();
  const { openAuth } = useUI();
  const [env, setEnv] = useState<Env>("gym");
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [intake, setIntake] = useState<{ intakeId: string; name: string; email: string } | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Read deep-link params on mount; listen for programmatic selection.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const qEnv = q.get("env");
    const qEq = q.get("eq");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
    if (isEnv(qEnv)) setEnv(qEnv);
    if (isEquipment(qEq)) setEquipment(qEq);
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
    if (env === "home" && equipment) url.searchParams.set("eq", equipment);
    else url.searchParams.delete("eq");
    if (url.search !== before) history.replaceState(history.state, "", url);
  }, [env, equipment]);

  const onTileKey = useCallback((e: React.KeyboardEvent, index: number) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + envs.length) % envs.length;
    setEnv(envs[next]);
    tileRefs.current[next]?.focus();
  }, []);

  const variant = variantFor(env);
  const blockedReason =
    env === "home" && !equipment ? t("equipmentRequired") : env === "adapted" && !intake ? t("intakeFirst") : null;

  const start = (plan: PlanId) => {
    if (blockedReason) return;
    if (onStartPlan) {
      onStartPlan({ plan, env, equipment: equipment ?? undefined, intakeId: intake?.intakeId });
    } else {
      openAuth("signup");
    }
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

      <div className="env-panel" aria-live="polite">
        {env === "home" && (
          <div className="equip" role="radiogroup" aria-labelledby="equip-q">
            <span className="q" id="equip-q">
              {t("equipmentQuestion")}
            </span>
            {equipmentOptions.map((eq) => (
              <Pill key={eq} selected={equipment === eq} onClick={() => setEquipment(eq)}>
                {t(`equipment.${eq}`)}
              </Pill>
            ))}
          </div>
        )}
        {env === "adapted" && <IntakeForm submitted={!!intake} onSubmitted={setIntake} />}
        {(env === "gym" || env === "outdoor") && <div className="mono muted">→ {t(`notes.${env}`)}</div>}
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
                {p.features[variant].map((f) => (
                  <li key={f}>{t(`features.${f}` as "features.videos")}</li>
                ))}
              </ul>
              <button
                type="button"
                className={p.highlighted ? "btn btn-ink" : "btn btn-line"}
                aria-disabled={!!blockedReason}
                aria-describedby={blockedReason ? "plans-blocked" : undefined}
                onClick={() => start(p.id)}
              >
                <span lang="en">{t("start", { plan: p.name })}</span> <Arrow />
              </button>
            </article>
          );
        })}
      </div>
      <div className="plans-foot mono">
        <span>{blockedReason ? <span id="plans-blocked" className="acc">{blockedReason}</span> : t("foot1")}</span>
        <span>{t("foot2")}</span>
      </div>
    </>
  );
}
