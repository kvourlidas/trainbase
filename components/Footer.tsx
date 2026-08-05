import Link from "next/link";
import { APP_NAME, TAGLINE, SOCIAL_LINKS } from "@/config/site";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-bold text-white text-lg">{APP_NAME}</p>
            <p className="mt-2 text-sm text-neutral-400">{TAGLINE}</p>
            <div className="mt-4 flex gap-4 text-sm text-neutral-400">
              <a href={SOCIAL_LINKS.instagram} className="hover:text-white" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={SOCIAL_LINKS.youtube} className="hover:text-white" rel="noopener noreferrer">
                YouTube
              </a>
            </div>
          </div>

          <nav aria-label="Υποσέλιδο" className="text-sm text-neutral-400">
            <p className="font-semibold text-neutral-200">Ιστότοπος</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/programs" className="hover:text-white">
                  Προγράμματα
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  Σχετικά
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Επικοινωνία
                </Link>
              </li>
            </ul>
          </nav>

          <NewsletterSignup />
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} {APP_NAME}. Με επιφύλαξη παντός δικαιώματος.
        </p>
      </div>
    </footer>
  );
}
