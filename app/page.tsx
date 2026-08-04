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
    title: "Built by a real coach",
    description:
      "Every program is designed by a certified trainer, not generated — the same structure used with in-person clients.",
  },
  {
    title: "Train wherever you are",
    description:
      "Home, gym, or anywhere in between. Pick a category that matches your setup and goals.",
  },
  {
    title: "Progressions that make sense",
    description:
      "Programs are structured week by week so you always know what to do next and why.",
  },
  {
    title: "Built to be adapted",
    description:
      "Adaptive fitness programming means training doesn't stop because of an injury or limitation.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center sm:pt-28">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {TAGLINE}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/programs"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Browse programs
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Meet your trainer
          </Link>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="mx-auto max-w-6xl px-6 py-16">
        <h2 id="categories-heading" className="text-2xl font-bold text-white">
          Find your training style
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
            Why train with {APP_NAME}
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
          Ready to start training?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          Pick a program that fits where you train and start this week.
        </p>
        <Link
          href="/programs"
          className="mt-8 inline-block rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
        >
          View all programs
        </Link>
      </section>
    </>
  );
}
