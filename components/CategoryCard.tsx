import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/content/categories";

const icons: Record<Category["icon"], React.ReactNode> = {
  home: (
    <path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  ),
  dumbbell: (
    <path d="M4 9v6M2 10.5v3M22 10.5v3M20 9v6M7 12h10M6 9v6M18 9v6" />
  ),
  bodyweight: (
    <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 4v6m0 0-4 6m4-6 4 6m-4-9-4 3m4-3 4 3" />
  ),
  adaptive: (
    <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 20l2-8 4 2 4-2 2 8M8 12l-3 2m11-2 3 2" />
  ),
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/programs/${category.slug}`}
      className="group relative isolate flex min-h-[85vh] flex-col overflow-hidden rounded-xl border border-stone-200 p-6 shadow-sm transition-all hover:border-orange-400 hover:shadow-lg sm:min-h-[80vh]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/20" />

      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-400"
        aria-hidden="true"
      >
        {icons[category.icon]}
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-white">{category.name}</h3>
      <p className="mt-2 text-sm text-neutral-200">{category.description}</p>
      <span className="mt-auto pt-4 text-sm font-medium text-orange-400 group-hover:text-orange-300">
        Δες τα προγράμματα →
      </span>
    </Link>
  );
}
