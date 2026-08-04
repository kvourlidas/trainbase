import type { Metadata } from "next";
import { APP_NAME, CONTACT_EMAIL } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${APP_NAME} with questions about programs or training.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact</h1>
      <p className="mt-3 text-neutral-400">
        Questions about a program, or something else on your mind? Send a message and we&apos;ll
        get back to you, or email us directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:text-orange-300">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
