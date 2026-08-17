import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/content/categories";
import { standardPlanTiers } from "@/content/plans";
import { CategoryPlanPage } from "@/components/CategoryPlanPage";

const category = getCategoryBySlug("calisthenics");

export const metadata: Metadata = {
  title: category?.name,
  description: category?.description,
  alternates: { canonical: "/programs/calisthenics" },
};

export default function CalisthenicsPlanPage() {
  if (!category) notFound();

  return <CategoryPlanPage category={category} tiers={standardPlanTiers} showEquipmentStep={false} />;
}
