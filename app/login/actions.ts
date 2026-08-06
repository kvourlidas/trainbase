"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { createSession } from "@/lib/auth/session";
import { isAuthConfigured } from "@/lib/auth/config";

export type AuthActionState = { error: string } | null;

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isAuthConfigured) {
    return { error: "Η σύνδεση δεν είναι διαθέσιμη αυτή τη στιγμή." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Συμπλήρωσε email και κωδικό πρόσβασης." };
  }

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const emailMatches = safeEqual(email.toLowerCase(), adminEmail.toLowerCase());
  const passwordMatches = safeEqual(password, adminPassword);

  if (!emailMatches || !passwordMatches) {
    return { error: "Λάθος email ή κωδικός πρόσβασης." };
  }

  await createSession(adminEmail);
  revalidatePath("/", "layout");
  redirect("/account");
}
