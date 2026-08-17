import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/content/categories";
import { standardPlanTiers, homeEquipmentOptions, type EquipmentOption } from "@/content/plans";
import { CategoryPlanPage } from "@/components/CategoryPlanPage";

const category = getCategoryBySlug("home-workouts");

export const metadata: Metadata = {
  title: category?.name,
  description: category?.description,
  alternates: { canonical: "/programs/home-workouts" },
};

type SearchParams = { equipment?: string };

export default async function HomeWorkoutsPlanPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!category) notFound();

  const { equipment: equipmentParam } = await searchParams;
  const equipment: EquipmentOption["value"] | null =
    homeEquipmentOptions.find((option) => option.value === equipmentParam)?.value ?? null;

  return (
    <CategoryPlanPage
      category={category}
      tiers={standardPlanTiers}
      showEquipmentStep={true}
      equipment={equipment}
    />
  );
}
