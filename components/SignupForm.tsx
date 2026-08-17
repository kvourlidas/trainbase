"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function SignupForm({
  category,
  tier,
  equipment,
}: {
  category: string;
  tier: string;
  equipment?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, category, tier, equipment }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-700"
      >
        Ευχαριστούμε — λάβαμε τα στοιχεία σου. Θα επικοινωνήσουμε μαζί σου σύντομα για να
        ολοκληρώσουμε την εγγραφή σου.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Κάτι πήγε στραβά κατά την αποστολή. Δοκίμασε ξανά.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Αποστολή…" : "Συνέχεια με Email"}
      </button>
    </form>
  );
}
