import type { Metadata } from "next";
import { verifySession } from "@/lib/auth/dal";
import { signOut } from "@/lib/auth/actions";
import { getPurchasedPrograms } from "@/content/programs";
import { ProgramCard } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Ο λογαριασμός μου",
  alternates: { canonical: "/account" },
};

export default async function AccountPage() {
  const { email } = await verifySession();
  const purchasedPrograms = getPurchasedPrograms();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Ο λογαριασμός μου</h1>
      <p className="mt-3 text-stone-500">
        Συνδεδεμένος ως <span className="text-stone-900">{email}</span>
      </p>

      <form action={signOut} className="mt-6">
        <button
          type="submit"
          className="rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
        >
          Αποσύνδεση
        </button>
      </form>

      <h2 className="mt-16 text-2xl font-bold text-stone-900">Τα προγράμματά μου</h2>

      {purchasedPrograms.length === 0 ? (
        <p className="mt-3 text-stone-500">Δεν έχεις αγοράσει ακόμα κάποιο πρόγραμμα.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
