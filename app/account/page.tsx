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
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Ο λογαριασμός μου</h1>
      <p className="mt-3 text-neutral-400">
        Συνδεδεμένος ως <span className="text-white">{claims.email}</span>
      </p>

      <form action={signOut} className="mt-10">
        <button
          type="submit"
          className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Αποσύνδεση
        </button>
      </form>
    </div>
  );
}
