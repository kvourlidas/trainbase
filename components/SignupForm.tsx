"use client";

import { useActionState } from "react";
import { signUp, type AuthActionState } from "@/app/signup/actions";

const initialState: AuthActionState = null;

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  if (state && "success" in state) {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-300"
      >
        {state.success}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
          Κωδικός πρόσβασης
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="mt-1.5 w-full rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:outline-none"
        />
        <p className="mt-1.5 text-xs text-neutral-500">Τουλάχιστον 6 χαρακτήρες.</p>
      </div>

      {state && "error" in state && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-orange-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Δημιουργία λογαριασμού…" : "Εγγραφή"}
      </button>
    </form>
  );
}
