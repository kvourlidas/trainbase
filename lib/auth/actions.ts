"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteSession } from "@/lib/auth/session";

export async function signOut() {
  await deleteSession();
  revalidatePath("/", "layout");
  redirect("/");
}
