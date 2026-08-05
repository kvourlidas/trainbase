import type { Metadata } from "next";
import { APP_NAME } from "@/config/site";
import { categories } from "@/content/categories";
import { programs } from "@/content/programs";
import { ProgramsExplorer } from "@/components/ProgramsExplorer";

export const metadata: Metadata = {
  title: "Προγράμματα",
  description: `Δες όλα τα προγράμματα προπόνησης του ${APP_NAME}: προπονήσεις στο σπίτι, προγράμματα γυμναστηρίου, καλισθενικά και προσαρμοσμένο fitness.`,
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Προγράμματα</h1>
      <p className="mt-3 max-w-2xl text-neutral-400">
        Όλα τα προγράμματα του {APP_NAME}, με δυνατότητα φιλτραρίσματος ανά στυλ προπόνησης. Διάλεξε αυτό που ταιριάζει στο πώς και πού προπονείσαι.
      </p>

      <div className="mt-8">
        <ProgramsExplorer programs={programs} categories={categories} />
      </div>
    </div>
  );
}
