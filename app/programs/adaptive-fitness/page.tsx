import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/content/categories";
import { AdaptivePlanFlow } from "@/components/AdaptivePlanFlow";

const category = getCategoryBySlug("adaptive-fitness");

export const metadata: Metadata = {
  title: category?.name,
  description: category?.description,
  alternates: { canonical: "/programs/adaptive-fitness" },
};

export default function AdaptiveFitnessPlanPage() {
  if (!category) notFound();

  return <AdaptivePlanFlow category={category} />;
}
