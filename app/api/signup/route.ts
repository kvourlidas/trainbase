import { NextResponse } from "next/server";

type SignupPayload = {
  email?: unknown;
  category?: unknown;
  tier?: unknown;
  equipment?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SignupPayload | null;

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const tier = typeof body?.tier === "string" ? body.tier.trim() : "";
  const equipment = typeof body?.equipment === "string" ? body.equipment.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // TODO: wire this up to real account provisioning + a payment provider
  // once they're chosen (see build plan Section 5 / Open Decisions) — same
  // "accepted but not yet delivered" stub as /api/contact. category/tier/
  // equipment are kept here for later account provisioning and marketing
  // segmentation, per the spec this route was built against.
  console.log("Signup submission (not yet delivered):", { email, category, tier, equipment });

  return NextResponse.json({ ok: true });
}
