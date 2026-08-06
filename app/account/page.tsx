import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "@/lib/supabase/actions";

export const metadata: Metadata = {
  title: "Ο λογαριασμός μου",
  alternates: { canonical: "/account" },
};

export default async function AccountPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Ο λογαριασμός μου</h1>
      <p className="mt-3 text-stone-500">
        Συνδεδεμένος ως <span className="text-stone-900">{claims.email}</span>
      </p>

      <form action={signOut} className="mt-10">
        <button
          type="submit"
          className="rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
        >
          Αποσύνδεση
        </button>
      </form>
    </div>
  );
}
