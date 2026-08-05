import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME } from "@/config/site";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Σύνδεση",
  description: `Συνδέσου στον λογαριασμό σου στο ${APP_NAME}.`,
  alternates: { canonical: "/login" },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Σύνδεση</h1>
      <p className="mt-3 text-neutral-400">
        Καλώς ήρθες πίσω στο {APP_NAME}.
      </p>

      {error && (
        <p role="alert" className="mt-6 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-10">
        <LoginForm />
      </div>

      <p className="mt-6 text-sm text-neutral-400">
        Δεν έχεις λογαριασμό;{" "}
        <Link href="/signup" className="text-orange-400 hover:text-orange-300">
          Εγγραφή
        </Link>
      </p>
    </div>
  );
}
