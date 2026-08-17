"use client";

import Link from "next/link";
import type { PlanTier } from "@/content/plans";

export function PlanSelector({
  tiers,
  category,
  equipment,
  onCtaClick,
}: {
  tiers: PlanTier[];
  category: string;
  equipment?: string | null;
  // Fired (fire-and-forget) when a CTA is clicked, before navigation —
  // used by the Adaptive Fitness flow to persist intake data alongside
  // the chosen tier. Standard categories don't need this.
  onCtaClick?: (tierId: PlanTier["id"]) => void;
}) {
  function hrefFor(tierId: PlanTier["id"]) {
    const params = new URLSearchParams({ category, tier: tierId });
    if (equipment) params.set("equipment", equipment);
    return `/start?${params.toString()}`;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={`relative flex flex-col rounded-xl border p-6 shadow-sm ${
            tier.highlight
              ? "border-orange-400 bg-white shadow-lg sm:scale-105"
              : "border-stone-200 bg-white"
          }`}
        >
          {tier.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Πιο δημοφιλές
            </span>
          )}

          <h3 className="text-lg font-semibold text-stone-900">{tier.name}</h3>
          <p className="mt-2 text-2xl font-bold text-stone-900">{tier.price}</p>
          <p className="mt-3 text-sm text-stone-500">{tier.tagline}</p>

          <ul className="mt-5 flex-1 space-y-2.5 text-sm text-stone-600">
            {tier.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-orange-500"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className={feature.bold ? "font-semibold text-stone-900" : undefined}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={hrefFor(tier.id)}
            onClick={() => onCtaClick?.(tier.id)}
            className={`mt-6 block rounded-md px-5 py-2.5 text-center text-sm font-semibold shadow-sm transition-colors ${
              tier.highlight
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "border border-stone-300 text-stone-900 hover:bg-stone-100"
            }`}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
