import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/content/programs";
import { getCategoryBySlug } from "@/content/categories";

const levelLabel: Record<Program["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ProgramCard({ program }: { program: Program }) {
  const category = getCategoryBySlug(program.categorySlug);

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-orange-500/50"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-900">
        <Image
          src={program.coverImage}
          alt={`${program.title} cover`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          {category && <span>{category.name}</span>}
          <span aria-hidden="true">·</span>
          <span>{levelLabel[program.level]}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-white">{program.title}</h3>
        <p className="mt-2 flex-1 text-sm text-neutral-400">{program.summary}</p>
        <div className="mt-4 text-xs text-neutral-500">
          {program.durationWeeks} weeks · {program.sessionsPerWeek}x / week
        </div>
      </div>
    </Link>
  );
}
