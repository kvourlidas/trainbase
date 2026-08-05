import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { APP_NAME, TAGLINE, SITE_DESCRIPTION } from "@/config/site";
import { categories } from "@/content/categories";
import { CategoryCard } from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: `${APP_NAME} — ${TAGLINE}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const reasons = [
  {
    title: "Σχεδιασμένο από πραγματικό προπονητή",
    description:
      "Κάθε πρόγραμμα σχεδιάζεται από πιστοποιημένο προπονητή, όχι από μηχανή — η ίδια δομή που χρησιμοποιείται και με πελάτες δια ζώσης.",
  },
  {
    title: "Προπονήσου όπου κι αν είσαι",
    description:
      "Σπίτι, γυμναστήριο, ή οτιδήποτε ενδιάμεσο. Διάλεξε την κατηγορία που ταιριάζει στον εξοπλισμό και τους στόχους σου.",
  },
  {
    title: "Προόδοι που βγάζουν νόημα",
    description:
      "Τα προγράμματα είναι δομημένα εβδομάδα προς εβδομάδα, ώστε να ξέρεις πάντα τι ακολουθεί και γιατί.",
  },
  {
    title: "Φτιαγμένο για να προσαρμόζεται",
    description:
      "Ο προσαρμοσμένος σχεδιασμός σημαίνει ότι η προπόνηση δεν σταματά λόγω τραυματισμού ή περιορισμού.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {TAGLINE}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
            {SITE_DESCRIPTION}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
            >
              Δες τα προγράμματα
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Γνώρισε τον προπονητή σου
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="mx-auto max-w-6xl px-6 py-16">
        <h2 id="categories-heading" className="text-2xl font-bold text-white">
          Βρες το στυλ προπόνησής σου
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section aria-labelledby="why-heading" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 id="why-heading" className="text-2xl font-bold text-white">
            Γιατί να προπονηθείς με το {APP_NAME}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h3 className="text-base font-semibold text-white">{reason.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Έτοιμος να ξεκινήσεις;
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Διάλεξε ένα πρόγραμμα που ταιριάζει στο πού προπονείσαι και ξεκίνα αυτή την εβδομάδα.
        </p>
        <Link
          href="/programs"
          className="mt-8 inline-block rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
        >
          Δες όλα τα προγράμματα
        </Link>
      </section>
    </>
  );
}
