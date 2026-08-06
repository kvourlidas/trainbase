"use client";

/**
 * Placeholder newsletter signup.
 * TODO: replace with a real embed once an email marketing provider is chosen
 * (Mailchimp / ConvertKit / Beehiiv, etc. — see build plan Section 5 / Open Decisions).
 * This UI is wired for layout only; the button intentionally does nothing yet.
 */
export function NewsletterSignup() {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
      <h3 className="text-base font-semibold text-stone-900">Λάβε νέα προγράμματα στο inbox σου</h3>
      <p className="mt-1 text-sm text-stone-500">
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
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="whitespace-nowrap rounded-md bg-stone-200 px-4 py-2 text-sm font-semibold text-stone-500 cursor-not-allowed"
        >
          Σύντομα κοντά σας
        </button>
      </form>
    </div>
  );
}
