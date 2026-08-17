import Link from "next/link";
import { homeEquipmentOptions, type EquipmentOption } from "@/content/plans";

export function EquipmentStep({
  category,
  selected,
}: {
  category: string;
  selected: EquipmentOption["value"] | null;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900">Τι εξοπλισμό έχεις;</h2>
      <p className="mt-2 text-stone-500">
        Διάλεξε ό,τι έχεις διαθέσιμο, ώστε το πρόγραμμά σου να προσαρμοστεί ανάλογα.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {homeEquipmentOptions.map((option) => {
          const isSelected = selected === option.value;
          return (
            <Link
              key={option.value}
              href={`/programs/${category}?equipment=${option.value}`}
              aria-current={isSelected ? "true" : undefined}
              className={`group flex flex-col items-start rounded-xl border p-6 text-left shadow-sm transition-all hover:border-orange-400 hover:shadow-lg ${
                isSelected ? "border-orange-400 bg-orange-50" : "border-stone-200 bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-stone-900">{option.label}</h3>
              <p className="mt-2 text-sm text-stone-500">{option.description}</p>
              <span className="mt-4 text-sm font-medium text-orange-600 group-hover:text-orange-500">
                Δες το πλάνο →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
