import type { Metadata } from "next";
import Image from "next/image";
import { APP_NAME } from "@/config/site";
import { trainer } from "@/content/trainer";
import { JsonLd } from "@/components/JsonLd";
import { personJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the certified trainer behind ${APP_NAME} — background, certifications, and coaching experience.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={personJsonLd(trainer)} />

      <div className="flex flex-col items-start gap-8 sm:flex-row">
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
          <Image
            src={trainer.photo}
            alt={`Portrait of ${trainer.name}`}
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{trainer.name}</h1>
          <p className="mt-1 text-orange-400">{trainer.title}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {trainer.specialties.map((specialty) => (
              <li
                key={specialty}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-neutral-300"
              >
                {specialty}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-neutral-300">
        {trainer.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">Experience</h2>
        <ol className="mt-6 space-y-6 border-l border-white/10 pl-6">
          {trainer.experience.map((item) => (
            <li key={`${item.role}-${item.organization}`}>
              <p className="text-sm font-medium text-orange-400">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {item.role} · {item.organization}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {trainer.certifications.map((cert) => (
            <li
              key={cert.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="font-semibold text-white">{cert.title}</p>
              <p className="mt-1 text-sm text-neutral-400">
                {cert.issuer} · {cert.year}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
