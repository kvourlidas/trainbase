"use client";

/**
 * Placeholder newsletter signup.
 * TODO: replace with a real embed once an email marketing provider is chosen
 * (Mailchimp / ConvertKit / Beehiiv, etc. — see build plan Section 5 / Open Decisions).
 * This UI is wired for layout only; the button intentionally does nothing yet.
 */
export function NewsletterSignup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-base font-semibold text-white">Λάβε νέα προγράμματα στο inbox σου</h3>
      <p className="mt-1 text-sm text-neutral-400">
        Περιστασιακά emails όταν βγαίνουν νέα προγράμματα. Καθόλου spam.
      </p>
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Διεύθυνση email
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          disabled
          aria-disabled="true"
          className="w-full rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 placeholder:text-neutral-500 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="whitespace-nowrap rounded-md bg-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-300 cursor-not-allowed"
        >
          Σύντομα κοντά σας
        </button>
      </form>
    </div>
  );
}
