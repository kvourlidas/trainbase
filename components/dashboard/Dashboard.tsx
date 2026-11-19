"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { BarChart, LineChart } from "./charts";
import type { DashboardData } from "./types";

type Props = {
  data: DashboardData;
  /** Called after a set square is toggled (real dashboard persists it). */
  onToggleSet?: (exerciseId: string, setIndex: number, done: boolean) => void;
  /** Extra classes, e.g. "rv d1" for the landing reveal. */
  className?: string;
};

/** Member dashboard card — the landing preview (demo data) and /app (real data). */
export function Dashboard({ data, onToggleSet, className }: Props) {
  const t = useTranslations("dashboard");
  const format = useFormatter();
  const [done, setDone] = useState(() =>
    Object.fromEntries((data.today?.exercises ?? []).map((e) => [e.id, e.done])),
  );

  const toggle = (exerciseId: string, i: number) => {
    const sets = [...(done[exerciseId] ?? [])];
    sets[i] = !sets[i];
    setDone({ ...done, [exerciseId]: sets });
    onToggleSet?.(exerciseId, i, sets[i]);
  };

  const weekPct = Math.round((data.week.current / Math.max(data.week.total, 1)) * 100);
  const pad = (n: number) => String(n).padStart(2, "0");
  const signed = (n: number) => (n >= 0 ? `+${n}` : String(n));

  return (
    <div className={["dash", className].filter(Boolean).join(" ")}>
      <div className="dash-top">
        <div className="who">
          <div className="avatar" aria-hidden="true">
            {data.name.trim().charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="mono muted">{t("welcome")}</span>
            <br />
            <b>{data.name}</b>
          </div>
        </div>
        <div className="wk">
          <span className="mono muted">{t("week", { current: pad(data.week.current), total: pad(data.week.total) })}</span>
          <div
            className="wkbar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={data.week.total}
            aria-valuenow={data.week.current}
            aria-label={t("week", { current: pad(data.week.current), total: pad(data.week.total) })}
          >
            <i style={{ "--w": `${weekPct}%` } as React.CSSProperties} />
          </div>
        </div>
      </div>

      <div className="tiles">
        <div className="tile">
          <span className="mono muted">{t("workouts")}</span>
          <strong>{data.workouts.count}</strong>
          <span className="delta">
            {signed(data.workouts.deltaPerMonth)} / {t("perMonth")}
          </span>
        </div>
        <div className="tile">
          <span className="mono muted">{t("streak")}</span>
          <strong>
            {data.streak.days}
            <small>{t("days")}</small>
          </strong>
          <span className="delta">{t("best", { n: data.streak.best })}</span>
        </div>
        <div className="tile">
          <span className="mono muted">{t("weeklyVolume")}</span>
          <strong>
            {format.number(data.volume.tonnes, { maximumFractionDigits: 1 })}
            <small>t</small>
          </strong>
          <span className="delta">{signed(data.volume.deltaPct)}%</span>
        </div>
      </div>

      <div className="dash-mid">
        <div className="chart">
          <div className="chart-h">
            <span className="mono">{t("oneRm", { lift: data.oneRm.lift })}</span>
            <span className="mono acc">{signed(data.oneRm.deltaKg)} kg</span>
          </div>
          <LineChart points={data.oneRm.points} />
        </div>
        <div className="chart">
          <div className="chart-h">
            <span className="mono">{t("volumePerWeek")}</span>
          </div>
          <BarChart {...data.weeklyVolume} />
        </div>
      </div>

      {data.today && (
        <div className="today">
          <div className="today-h">
            <span className="mono">{t("today", { workout: data.today.title })}</span>
            <span className="mono muted">{t("tap")}</span>
          </div>
          {data.today.exercises.map((ex) => (
            <div className="ex" key={ex.id}>
              <b>{ex.name}</b>
              <span className="mono muted">{ex.prescription}</span>
              <div className="sets">
                {Array.from({ length: ex.sets }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={!!done[ex.id]?.[i]}
                    aria-label={t("setLabel", { n: i + 1, exercise: ex.name })}
                    onClick={() => toggle(ex.id, i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
