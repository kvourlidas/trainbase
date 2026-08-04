import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  // TODO: wire this up to a real backend once a service is chosen
  // (see build plan Section 5 / Open Decisions):
  //   - Formspree: swap this whole route for a direct form POST to your
  //     Formspree endpoint and delete this file, OR
  //   - Resend: call the Resend API here with RESEND_API_KEY to email the
  //     submission to CONTACT_EMAIL (config/site.ts).
  // Right now submissions are accepted and logged, but not delivered anywhere.
  console.log("Contact form submission (not yet delivered):", { name, email, message });

  return NextResponse.json({ ok: true });
}
