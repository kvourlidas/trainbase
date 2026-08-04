import type { Metadata } from "next";
import { APP_NAME } from "@/config/site";
import { categories } from "@/content/categories";
import { programs } from "@/content/programs";
import { ProgramsExplorer } from "@/components/ProgramsExplorer";

export const metadata: Metadata = {
  title: "Programs",
  description: `Browse every ${APP_NAME} training program across home workouts, gym programs, calisthenics, and adaptive fitness.`,
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Programs</h1>
      <p className="mt-3 max-w-2xl text-neutral-400">
        Every {APP_NAME} program, filterable by training style. Pick one that fits how and where you train.
      </p>

      <div className="mt-8">
        <ProgramsExplorer programs={programs} categories={categories} />
      </div>
    </div>
  );
}
