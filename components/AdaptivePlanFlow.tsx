"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/content/categories";
import { adaptedPlanTiers } from "@/content/plans";
import { PlanSelector } from "@/components/PlanSelector";

export function AdaptivePlanFlow({ category }: { category: Category }) {
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  function submitIntake(tierId: string) {
    if (!condition && !notes) return;

    // Fire-and-forget, same pattern as ContactForm's POST to /api/contact —
    // keepalive lets the request finish even as the browser navigates to
    // /start right after this fires.
    fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condition, notes, category: category.slug, tier: tierId }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-stone-500">{category.description}</p>

      <section aria-labelledby="intake-heading" className="mt-12 max-w-2xl">
        <h2 id="intake-heading" className="text-2xl font-bold text-stone-900">
          Ας εξατομικεύσουμε την προπόνησή σου
        </h2>
        <p className="mt-2 text-stone-500">Πες μας λίγα λόγια για εσένα</p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-stone-700">
              Ποια είναι η αναπηρία ή η πάθησή σου;
            </label>
            <input
              id="condition"
              name="condition"
              type="text"
              placeholder="Γράψε εδώ..."
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="movement-notes" className="block text-sm font-medium text-stone-700">
              Πες μας οτιδήποτε σημαντικό για την κίνηση και τις καθημερινές σου δραστηριότητες.
            </label>
            <p id="movement-notes-help" className="mt-1 text-xs text-stone-400">
              Για παράδειγμα: περιορισμοί κινητικότητας, κινήσεις που μπορείς/δεν μπορείς να
              κάνεις, εξοπλισμός που χρησιμοποιείς, προηγούμενη εμπειρία προπόνησης, ή οτιδήποτε
              άλλο θεωρείς σημαντικό.
            </p>
            <textarea
              id="movement-notes"
              name="movement-notes"
              rows={5}
              aria-describedby="movement-notes-help"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="first-step-heading"
        className="mt-16 rounded-xl border border-stone-200 bg-stone-50 p-8 text-center"
      >
        <h2 id="first-step-heading" className="text-xl font-bold text-stone-900 sm:text-2xl">
          Κάθε μέλος του Adapted Training ξεκινά με μια online αξιολόγηση.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-500">
          Θα συναντηθούμε online, θα συζητήσουμε τις ανάγκες και τους στόχους σου, και θα
          φροντίσουμε το πρόγραμμά σου να είναι σωστά προσαρμοσμένο σε εσένα.
        </p>
        {/* TODO: point this at a real booking/calendar tool (e.g. Calendly,
            Cal.com) once one is chosen. For now it routes into the existing
            contact flow, the only "reach the trainer" path this site has. */}
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
        >
          ΚΛΕΙΣΕ ΤΗΝ ΠΡΩΤΗ ΣΟΥ ΚΛΗΣΗ
        </Link>
      </section>

      <section aria-labelledby="adapted-plans-heading" className="mt-16">
        <h2 id="adapted-plans-heading" className="text-2xl font-bold text-stone-900">
          Διάλεξε το πλάνο σου
        </h2>
        <p className="mt-2 max-w-2xl text-stone-500">
          Η προσαρμοσμένη προπόνηση δεν ταιριάζει σε όλους με τον ίδιο τρόπο. Πρώτα σε γνωρίζουμε.
        </p>
        <div className="mt-6">
          <PlanSelector tiers={adaptedPlanTiers} category={category.slug} onCtaClick={submitIntake} />
        </div>
      </section>
    </div>
  );
}
