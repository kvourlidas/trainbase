import type { Locale } from "@/i18n/routing";

type L10n = Record<Locale, string>;

export type Credential = { label: L10n; tag: string };

export type Coach = {
  /** Path under /public, e.g. "/images/coach.jpg". Null shows the hatched placeholder. */
  photo: string | null;
  bio: L10n;
  credentials: Credential[];
};

// TODO(coach): replace the bio and years of experience with the client's own text.
export const coach: Coach = {
  photo: null,
  bio: {
    el: "Σύντομο βιογραφικό του γυμναστή: εμπειρία, φιλοσοφία προπόνησης και με ποιους ανθρώπους δουλεύει. Εδώ μπαίνει το κείμενο που θα μας δώσει ο πελάτης — 2–3 προτάσεις, όχι περισσότερο.",
    en: "Short trainer bio: experience, training philosophy and who they work with. The client’s own text goes here — 2–3 sentences, no more.",
  },
  credentials: [
    { label: { el: "Πιστοποιημένος Personal Trainer", en: "Certified Personal Trainer" }, tag: "CERT" },
    { label: { el: "Adapted & Inclusive Training", en: "Adapted & Inclusive Training" }, tag: "SPEC" },
    {
      label: { el: "Online Coaching & Διατροφική καθοδήγηση", en: "Online Coaching & Nutrition guidance" },
      tag: "REMOTE",
    },
    { label: { el: "Χρόνια εμπειρίας — [Χ]", en: "Years of experience — [X]" }, tag: "EXP" },
  ],
};
