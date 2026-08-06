"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/content/categories";
import type { Program } from "@/content/programs";
import { ProgramCard } from "@/components/ProgramCard";

type EquipmentFilter = "with-equipment" | "no-equipment" | null;

export function ProgramsExplorer({
  programs,
  categories,
}: {
  programs: Program[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentFilter>(null);

  // Pick up an initial ?category= / ?equipment= from a direct link (e.g. the
  // homepage category cards) without forcing this page to render dynamically.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("category");
    const equipment = params.get("equipment");

    if (slug && categories.some((category) => category.slug === slug)) {
      setActiveCategory(slug);
    }
    if (equipment === "with-equipment" || equipment === "no-equipment") {
      setEquipmentFilter(equipment);
    }
  }, [categories]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return programs;
    return programs.filter((program) => program.categorySlug === activeCategory);
  }, [programs, activeCategory]);

  // Only offer the equipment/no-equipment split when every program in the
  // current category is tagged with requiresEquipment and both sides exist.
  const hasEquipmentSplit =
    activeCategory !== "all" &&
    filtered.length > 0 &&
    filtered.every((program) => program.requiresEquipment !== undefined) &&
    filtered.some((program) => program.requiresEquipment) &&
    filtered.some((program) => !program.requiresEquipment);

  const visiblePrograms = useMemo(() => {
    if (!hasEquipmentSplit || !equipmentFilter) return filtered;
    return filtered.filter((program) =>
      equipmentFilter === "with-equipment" ? program.requiresEquipment : !program.requiresEquipment
    );
  }, [filtered, hasEquipmentSplit, equipmentFilter]);

  function updateUrl(params: URLSearchParams) {
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/programs?${query}` : "/programs");
  }

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    setEquipmentFilter(null);
    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.delete("equipment");
    updateUrl(params);
  }

  function selectEquipment(value: "with-equipment" | "no-equipment") {
    setEquipmentFilter(value);
    const params = new URLSearchParams(window.location.search);
    params.set("equipment", value);
    updateUrl(params);
  }

  function clearEquipment() {
    setEquipmentFilter(null);
    const params = new URLSearchParams(window.location.search);
    params.delete("equipment");
    updateUrl(params);
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Φιλτράρισμα προγραμμάτων ανά κατηγορία"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => selectCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-orange-500 text-white shadow-sm"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Όλα τα προγράμματα
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => selectCategory(category.slug)}
            aria-pressed={activeCategory === category.slug}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.slug
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-stone-500">
          Δεν υπάρχουν ακόμα προγράμματα σε αυτή την κατηγορία — έλα ξανά σύντομα.
        </p>
      ) : hasEquipmentSplit && !equipmentFilter ? (
        <div className="mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => selectEquipment("no-equipment")}
            className="group flex flex-col items-start rounded-xl border border-stone-200 bg-white p-6 text-left shadow-sm transition-all hover:border-orange-400 hover:shadow-lg"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
              aria-hidden="true"
            >
              <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 4v6m0 0-4 6m4-6 4 6m-4-9-4 3m4-3 4 3" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-stone-900">Χωρίς εξοπλισμό</h3>
            <p className="mt-2 text-sm text-stone-500">
              Προγράμματα που χρησιμοποιούν μόνο το σωματικό σου βάρος.
            </p>
            <span className="mt-4 text-sm font-medium text-orange-600 group-hover:text-orange-500">
              Δες τα προγράμματα →
            </span>
          </button>

          <button
            type="button"
            onClick={() => selectEquipment("with-equipment")}
            className="group flex flex-col items-start rounded-xl border border-stone-200 bg-white p-6 text-left shadow-sm transition-all hover:border-orange-400 hover:shadow-lg"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
              aria-hidden="true"
            >
              <path d="M4 9v6M2 10.5v3M22 10.5v3M20 9v6M7 12h10M6 9v6M18 9v6" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-stone-900">Με εξοπλισμό</h3>
            <p className="mt-2 text-sm text-stone-500">
              Προγράμματα με αλτήρες, λάστιχα αντίστασης ή kettlebell.
            </p>
            <span className="mt-4 text-sm font-medium text-orange-600 group-hover:text-orange-500">
              Δες τα προγράμματα →
            </span>
          </button>
        </div>
      ) : (
        <div className="mt-8">
          {hasEquipmentSplit && equipmentFilter && (
            <button
              type="button"
              onClick={clearEquipment}
              className="mb-6 text-sm font-medium text-orange-600 hover:text-orange-500"
            >
              ← Πίσω
            </button>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
