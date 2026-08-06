import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/content/programs";
import { getCategoryBySlug } from "@/content/categories";

const levelLabel: Record<Program["level"], string> = {
  beginner: "Αρχάριος",
  intermediate: "Μεσαίο επίπεδο",
  advanced: "Προχωρημένος",
};

export function ProgramCard({ program }: { program: Program }) {
  const category = getCategoryBySlug(program.categorySlug);

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:border-orange-400 hover:shadow-lg"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-stone-100">
        <Image
          src={program.coverImage}
          alt={`Εξώφυλλο για ${program.title}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          {category && <span>{category.name}</span>}
          <span aria-hidden="true">·</span>
          <span>{levelLabel[program.level]}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-stone-900">{program.title}</h3>
        <p className="mt-2 flex-1 text-sm text-stone-500">{program.summary}</p>
        <div className="mt-4 text-xs text-stone-400">
          {program.durationWeeks} εβδομάδες · {program.sessionsPerWeek}x / εβδομάδα
        </div>
      </div>
    </Link>
  );
}
