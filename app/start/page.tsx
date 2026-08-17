import type { Metadata } from "next";
import { getCategoryBySlug } from "@/content/categories";
import { standardPlanTiers, adaptedPlanTiers, homeEquipmentOptions } from "@/content/plans";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Ολοκλήρωση εγγραφής",
  alternates: { canonical: "/start" },
};

type SearchParams = { category?: string; tier?: string; equipment?: string };

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category: categorySlug, tier: tierId, equipment: equipmentValue } = await searchParams;

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const tiers = categorySlug === "adaptive-fitness" ? adaptedPlanTiers : standardPlanTiers;
  const tier = tiers.find((candidate) => candidate.id === tierId);
  const equipment = homeEquipmentOptions.find((option) => option.value === equipmentValue);

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Ολοκλήρωσε την εγγραφή σου</h1>
      <p className="mt-3 text-stone-500">
        Ένα ακόμα βήμα και ξεκινάς. Θα σου στείλουμε τα επόμενα βήματα στο email σου.
      </p>

      {(category || tier || equipment) && (
        <dl className="mt-8 space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm">
          {category && (
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Κατηγορία</dt>
              <dd className="font-medium text-stone-900">{category.name}</dd>
            </div>
          )}
          {tier && (
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Πλάνο</dt>
              <dd className="font-medium text-stone-900">{tier.name}</dd>
            </div>
          )}
          {equipment && (
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Εξοπλισμός</dt>
              <dd className="font-medium text-stone-900">{equipment.label}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-10 space-y-4">
        {/* TODO: wire up real Google sign-in once an auth provider is
            chosen — this flow currently only supports the single admin
            account (see lib/auth). Disabled the same way NewsletterSignup
            disables its not-yet-wired submit button. */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="flex w-full cursor-not-allowed items-center justify-center rounded-md border border-stone-300 bg-stone-100 px-6 py-2.5 text-sm font-semibold text-stone-400"
        >
          Συνέχεια με Google (σύντομα διαθέσιμο)
        </button>

        <div className="flex items-center gap-3 text-xs text-stone-400">
          <div className="h-px flex-1 bg-stone-200" aria-hidden="true" />
          ή
          <div className="h-px flex-1 bg-stone-200" aria-hidden="true" />
        </div>

        <SignupForm
          category={categorySlug ?? ""}
          tier={tierId ?? ""}
          equipment={equipmentValue}
        />
      </div>
    </div>
  );
}
