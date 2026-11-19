"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: number;
  weekLabel: string;
  goalLabel: string;
  chip1: { label: string; value: string };
  chip2: { label: string; value: string };
};

// 72 ticks, every 6th one long and dark — computed once at module load.
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const r1 = 200;
  const r2 = i % 6 ? 194 : 186;
  const f = (n: number) => Math.round(n * 1000) / 1000;
  return {
    x1: f(210 + r1 * Math.sin(a)),
    y1: f(210 - r1 * Math.cos(a)),
    x2: f(210 + r2 * Math.sin(a)),
    y2: f(210 - r2 * Math.cos(a)),
    major: i % 6 === 0,
  };
});

/** Progress ring: rotating ticks, accent arc 0→value%, orbiting dot, count-up number. */
export function HeroRing({ value, weekLabel, goalLabel, chip1, chip2 }: Props) {
  const numRef = useRef<SVGTSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(value);
      return;
    }
    let raf = 0;
    const dur = 2000;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className="ring-box" aria-hidden="true">
      <svg viewBox="0 0 420 420">
        <g className="ticks">
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? "#0D0D0F" : "rgba(13,13,15,.35)"}
              strokeWidth={t.major ? 2 : 1}
            />
          ))}
        </g>
        <circle cx="210" cy="210" r="180" fill="none" stroke="rgba(13,13,15,.12)" strokeWidth="14" />
        <circle
          className="arc"
          cx="210"
          cy="210"
          r="180"
          fill="none"
          stroke="#FF4F1F"
          strokeWidth="14"
          transform="rotate(-90 210 210)"
        />
        <g className="orbit">
          <circle cx="210" cy="64" r="6" fill="#0D0D0F" />
        </g>
        <circle cx="210" cy="210" r="146" fill="none" stroke="rgba(13,13,15,.25)" strokeDasharray="2 6" />
        <text className="t-mono" x="210" y="168" textAnchor="middle" fontSize="13" fill="#5E5D58" letterSpacing="1">
          {weekLabel}
        </text>
        <text
          className="t-sans"
          x="210"
          y="248"
          textAnchor="middle"
          fontWeight="900"
          fontSize="92"
          fill="#0D0D0F"
          letterSpacing="-4"
        >
          <tspan ref={numRef}>0</tspan>%
        </text>
        <text className="t-mono" x="210" y="282" textAnchor="middle" fontSize="12" fill="#5E5D58" letterSpacing="1">
          {goalLabel}
        </text>
      </svg>
      <div className="chip c1">
        {chip1.label} <b>{chip1.value}</b>
      </div>
      <div className="chip c2">
        {chip2.label} <b>{chip2.value}</b>
      </div>
    </div>
  );
}
