import type { Metadata } from "next";
import { APP_NAME, CONTACT_EMAIL } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: `Επικοινώνησε με το ${APP_NAME} για ερωτήσεις σχετικά με προγράμματα ή προπόνηση.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Επικοινωνία</h1>
      <p className="mt-3 text-neutral-400">
        Έχεις ερωτήσεις για κάποιο πρόγραμμα ή κάτι άλλο στο μυαλό σου; Στείλε ένα μήνυμα και θα
        επικοινωνήσουμε μαζί σου, ή στείλε μας email απευθείας στο{" "}
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
