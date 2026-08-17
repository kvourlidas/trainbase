"use client";

import { useEffect, useRef } from "react";
import type { Category } from "@/content/categories";
import type { PlanTier } from "@/content/plans";
import type { EquipmentOption } from "@/content/plans";
import { EquipmentStep } from "@/components/EquipmentStep";
import { PlanSelector } from "@/components/PlanSelector";

export function CategoryPlanPage({
  category,
  tiers,
  showEquipmentStep,
  equipment = null,
}: {
  category: Category;
  tiers: PlanTier[];
  showEquipmentStep: boolean;
  equipment?: EquipmentOption["value"] | null;
}) {
  const plansRef = useRef<HTMLDivElement>(null);
  const plansVisible = !showEquipmentStep || equipment !== null;

  // Equipment cards are real links to ?equipment=..., so landing here with
  // one already selected (fresh load or browser back/forward) should still
  // land the user on the plans, not just above them.
  useEffect(() => {
    if (equipment) {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [equipment]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-stone-500">{category.description}</p>

      {showEquipmentStep && (
        <div className="mt-12">
          <EquipmentStep category={category.slug} selected={equipment} />
        </div>
      )}

      <div
        ref={plansRef}
        className={`mt-12 scroll-mt-20 ${plansVisible ? "" : "hidden"}`}
        aria-hidden={!plansVisible}
      >
        <h2 className="text-2xl font-bold text-stone-900">Διάλεξε το πλάνο σου</h2>
        <div className="mt-6">
          <PlanSelector tiers={tiers} category={category.slug} equipment={equipment} />
        </div>
      </div>
    </div>
  );
}
