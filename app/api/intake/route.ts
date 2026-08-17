import { NextResponse } from "next/server";

type IntakePayload = {
  condition?: unknown;
  notes?: unknown;
  category?: unknown;
  tier?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as IntakePayload | null;

  const condition = typeof body?.condition === "string" ? body.condition.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const tier = typeof body?.tier === "string" ? body.tier.trim() : "";

  if (!condition && !notes) {
    return NextResponse.json(
      { error: "Condition or notes are required." },
      { status: 400 }
    );
  }

  // TODO: wire this up to a real backend once a service is chosen
  // (see build plan Section 5 / Open Decisions), same as /api/contact —
  // this needs to reach the trainer ahead of the assessment call.
  // Right now submissions are accepted and logged, but not delivered anywhere.
  console.log("Adaptive Fitness intake submission (not yet delivered):", {
    condition,
    notes,
    category,
    tier,
  });

  return NextResponse.json({ ok: true });
}
