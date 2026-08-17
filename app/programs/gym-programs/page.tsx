import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/content/categories";
import { standardPlanTiers } from "@/content/plans";
import { CategoryPlanPage } from "@/components/CategoryPlanPage";

const category = getCategoryBySlug("gym-programs");

export const metadata: Metadata = {
  title: category?.name,
  description: category?.description,
  alternates: { canonical: "/programs/gym-programs" },
};

export default function GymProgramsPlanPage() {
  if (!category) notFound();

  return <CategoryPlanPage category={category} tiers={standardPlanTiers} showEquipmentStep={false} />;
}
