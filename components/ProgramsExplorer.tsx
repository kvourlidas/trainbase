"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/content/categories";
import type { Program } from "@/content/programs";
import { ProgramCard } from "@/components/ProgramCard";

export function ProgramsExplorer({
  programs,
  categories,
}: {
  programs: Program[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Pick up an initial ?category= from a direct link (e.g. the homepage
  // category cards) without forcing this page to render dynamically.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("category");
    if (slug && categories.some((category) => category.slug === slug)) {
      setActiveCategory(slug);
    }
  }, [categories]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return programs;
    return programs.filter((program) => program.categorySlug === activeCategory);
  }, [programs, activeCategory]);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/programs?${query}` : "/programs");
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter programs by category"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => selectCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-orange-500 text-neutral-950"
              : "bg-white/5 text-neutral-300 hover:bg-white/10"
          }`}
        >
          All programs
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => selectCategory(category.slug)}
            aria-pressed={activeCategory === category.slug}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.slug
                ? "bg-orange-500 text-neutral-950"
                : "bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-neutral-400">
          No programs in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
