import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="text-sm font-semibold text-orange-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">Η σελίδα δεν βρέθηκε</h1>
      <p className="mt-4 text-stone-500">
        Η σελίδα που ψάχνεις δεν υπάρχει ή μπορεί να έχει μετακινηθεί.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
      >
        Επιστροφή στην αρχική
      </Link>
    </div>
  );
}
