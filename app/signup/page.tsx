import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME } from "@/config/site";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Εγγραφή",
  description: `Δημιούργησε λογαριασμό στο ${APP_NAME}.`,
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">Εγγραφή</h1>
      <p className="mt-3 text-stone-500">
        Δημιούργησε δωρεάν λογαριασμό στο {APP_NAME} για να ξεκινήσεις.
      </p>

      <div className="mt-10">
        <SignupForm />
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Έχεις ήδη λογαριασμό;{" "}
        <Link href="/login" className="text-orange-600 hover:text-orange-500">
          Σύνδεση
        </Link>
      </p>
    </div>
  );
}
