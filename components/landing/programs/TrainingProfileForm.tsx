"use client";

import { useTranslations } from "next-intl";
import { forwardRef, useId, useRef, type Ref } from "react";
import {
  equipmentOptions,
  fitnessLevels,
  goalOptions,
  isExclusiveEquipment,
  MAX_GOALS,
  MAX_NOTES,
  type FitnessLevel,
  type ProfileEnv,
} from "@/config/pricing";
import { Pill } from "@/components/ui/Pill";
import { isProfileComplete, toggleEquipment, toggleGoal, type ProfileDraft } from "@/lib/profile";

type Props = {
  env: ProfileEnv;
  draft: ProfileDraft;
  onChange: (next: ProfileDraft) => void;
  /** The summary bar; locked plan CTAs scroll to it and shake it. */
  summaryRef?: Ref<HTMLDivElement>;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Training profile for Gym / Home Gym / Outdoor (design/reference-v1.1.html → `.pf`):
 * equipment (Home) or env note, then level | goals + notes, then the summary bar.
 */
export function TrainingProfileForm({ env, draft, onChange, summaryRef }: Props) {
  const t = useTranslations("programs");
  const id = useId();
  const set = (patch: Partial<ProfileDraft>) => onChange({ ...draft, ...patch });
  const home = env === "home";
  let step = 0;

  return (
    <div className="pf">
      {home ? (
        <section className="pf-block" aria-labelledby={`${id}-eq`}>
          <StepHead n={++step} id={`${id}-eq`} title={t("equipmentQuestion")} hint={t("profile.equipmentHint")} />
          <div className="equip" role="group" aria-labelledby={`${id}-eq`} aria-describedby={`${id}-eq-help`}>
            {equipmentOptions.map((eq) => (
              <Pill
                key={eq}
                mode="toggle"
                selected={draft.equipment.includes(eq)}
                className={isExclusiveEquipment(eq) ? "excl" : undefined}
                onClick={() => set({ equipment: toggleEquipment(draft.equipment, eq) })}
              >
                {t(`equipment.${eq}`)}
              </Pill>
            ))}
          </div>
          <small className="pf-hint" id={`${id}-eq-help`}>
            {t("profile.equipmentHelp")}
          </small>
        </section>
      ) : (
        <div className="mono muted pf-note">→ {t(`notes.${env}`)}</div>
      )}

      <div className="pf-grid">
        <section className="pf-block" aria-labelledby={`${id}-lvl`}>
          <StepHead n={++step} id={`${id}-lvl`} title={t("profile.levelQuestion")} />
          <LevelGroup labelledBy={`${id}-lvl`} value={draft.level} onChange={(level) => set({ level })} />
        </section>

        <section className="pf-block" aria-labelledby={`${id}-goals`}>
          <StepHead n={++step} id={`${id}-goals`} title={t("profile.goalsQuestion")} hint={t("profile.goalsHint")} />
          <div className="equip" role="group" aria-labelledby={`${id}-goals`}>
            {goalOptions.map((g) => {
              const on = draft.goals.includes(g);
              return (
                <Pill
                  key={g}
                  mode="toggle"
                  selected={on}
                  disabled={!on && draft.goals.length >= MAX_GOALS}
                  onClick={() => set({ goals: toggleGoal(draft.goals, g) })}
                >
                  {t(`profile.goals.${g}`)}
                </Pill>
              );
            })}
          </div>
          <div className="field pf-notes">
            <label className="mono" htmlFor={`${id}-notes`}>
              {t("profile.notesLabel")}
            </label>
            <textarea
              id={`${id}-notes`}
              rows={3}
              maxLength={MAX_NOTES}
              value={draft.notes}
              placeholder={t("profile.notesPlaceholder")}
              onChange={(e) => set({ notes: e.target.value })}
            />
          </div>
        </section>
      </div>

      <ProfileSummary ref={summaryRef} env={env} draft={draft} />
    </div>
  );
}

function StepHead({ n, id, title, hint }: { n: number; id: string; title: string; hint?: string }) {
  return (
    <div className="pf-h">
      <span className="mono acc" aria-hidden="true">
        {pad(n)}
      </span>
      <h4 id={id}>{title}</h4>
      {hint && <span className="mono muted">{hint}</span>}
    </div>
  );
}

function LevelGroup({
  labelledBy,
  value,
  onChange,
}: {
  labelledBy: string;
  value: FitnessLevel | null;
  onChange: (level: FitnessLevel) => void;
}) {
  const t = useTranslations("programs.profile.levels");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = value ? fitnessLevels.indexOf(value) : 0;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + fitnessLevels.length) % fitnessLevels.length;
    onChange(fitnessLevels[next]);
    refs.current[next]?.focus();
  };

  return (
    <div className="levels" role="radiogroup" aria-labelledby={labelledBy}>
      {fitnessLevels.map((lvl, i) => {
        const checked = value === lvl;
        return (
          <button
            key={lvl}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={i === focusIndex ? 0 : -1}
            className={checked ? "lvl on" : "lvl"}
            onClick={() => onChange(lvl)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="lvl-bars" aria-hidden="true">
              {[1, 2, 3].map((b) => (
                <i key={b} className={b <= i + 1 ? "f" : undefined} />
              ))}
            </span>
            <span className="lt">
              <b>{t(`${lvl}.name`)}</b>
              <span>{t(`${lvl}.desc`)}</span>
            </span>
            <span className="sel" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

const ProfileSummary = forwardRef<HTMLDivElement, { env: ProfileEnv; draft: ProfileDraft }>(function ProfileSummary(
  { env, draft },
  ref,
) {
  const t = useTranslations("programs");
  const complete = isProfileComplete(env, draft);
  const chips = [
    t(`envs.${env}.name`),
    env === "home" && draft.equipment.length > 0 ? draft.equipment.map((e) => t(`equipment.${e}`)).join(" + ") : null,
    draft.level ? t(`profile.levels.${draft.level}.name`) : null,
    draft.goals.length > 0 ? draft.goals.map((g) => t(`profile.goals.${g}`)).join(", ") : null,
  ].filter((c): c is string => !!c);

  return (
    <div ref={ref} id="profile-summary" tabIndex={-1} className={complete ? "pf-sum ok" : "pf-sum"}>
      <span className="mono">
        {complete && "✓ "}
        {t("profile.summaryLabel")}
      </span>
      <ul className="chips">
        {chips.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <span className="mono muted" id="profile-status" role="status">
        {complete ? t("profile.complete") : env === "home" ? t("profile.incompleteHome") : t("profile.incomplete")}
      </span>
    </div>
  );
});
