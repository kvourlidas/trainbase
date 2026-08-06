import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, getProgramBySlug } from "@/content/programs";
import { getCategoryBySlug } from "@/content/categories";
import { JsonLd } from "@/components/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.summary,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: program.title,
      description: program.summary,
      type: "article",
      images: [{ url: program.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: program.title,
      description: program.summary,
      images: [program.coverImage],
    },
  };
}

const levelLabel = {
  beginner: "Αρχάριος",
  intermediate: "Μεσαίο επίπεδο",
  advanced: "Προχωρημένος",
};

export default async function ProgramPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const category = getCategoryBySlug(program.categorySlug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={courseJsonLd(program)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Αρχική", url: "/" },
          { name: "Προγράμματα", url: "/programs" },
          { name: program.title, url: `/programs/${program.slug}` },
        ])}
      />

      <nav aria-label="Διαδρομή πλοήγησης" className="text-sm text-stone-400">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-stone-600">
              Αρχική
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/programs" className="hover:text-stone-600">
              Προγράμματα
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-stone-600">{program.title}</li>
        </ol>
      </nav>

      <div className="relative mt-6 aspect-[2/1] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
        <Image
          src={program.coverImage}
          alt={`Εξώφυλλο για ${program.title}`}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
        {category && (
          <Link
            href={`/programs?category=${category.slug}`}
            className="rounded-full bg-stone-100 px-3 py-1 hover:bg-stone-200"
          >
            {category.name}
          </Link>
        )}
        <span className="rounded-full bg-stone-100 px-3 py-1">{levelLabel[program.level]}</span>
        <span className="rounded-full bg-stone-100 px-3 py-1">
          {program.durationWeeks} εβδομάδες
        </span>
        <span className="rounded-full bg-stone-100 px-3 py-1">
          {program.sessionsPerWeek}x / εβδομάδα
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-stone-900 sm:text-4xl">{program.title}</h1>
      <p className="mt-4 text-stone-600">{program.description}</p>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Απαιτούμενος εξοπλισμός
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {program.equipment.map((item) => (
            <li
              key={item}
              className="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 space-y-10">
        <h2 className="text-2xl font-bold text-stone-900">Τι περιλαμβάνεται</h2>
        {program.workouts.map((workout) => (
          <div key={workout.title}>
            <h3 className="text-lg font-semibold text-stone-900">{workout.title}</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Άσκηση
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Σετ
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Επαναλήψεις
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {workout.exercises.map((exercise) => (
                    <tr key={exercise.name}>
                      <td className="flex items-center gap-3 px-4 py-3 text-stone-700">
                        <span className="relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-md bg-stone-100 sm:block">
                          <Image
                            src={exercise.demoImage}
                            alt={`Επίδειξη για ${exercise.name}`}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        {exercise.name}
                      </td>
                      <td className="px-4 py-3 text-stone-500">{exercise.sets}</td>
                      <td className="px-4 py-3 text-stone-500">{exercise.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-stone-200 bg-stone-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-stone-900">Έχεις ερωτήσεις για αυτό το πρόγραμμα;</h2>
        <p className="mt-2 text-sm text-stone-500">
          Επικοινώνησε μαζί μας και θα σε βοηθήσουμε να καταλάβεις αν σου ταιριάζει.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Επικοινώνησε μαζί μας
        </Link>
      </div>
    </div>
  );
}
