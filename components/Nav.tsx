"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME, LOGO_URL } from "@/config/site";
import { signOut } from "@/lib/supabase/actions";

const links = [
  { href: "/", label: "Αρχική" },
  { href: "/programs", label: "Προγράμματα" },
  { href: "/about", label: "Σχετικά" },
  { href: "/contact", label: "Επικοινωνία" },
];

export function Nav({ userEmail }: { userEmail: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/80 sticky top-0 z-50">
      <nav
        aria-label="Κύρια πλοήγηση"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg">
          <Image src={LOGO_URL} alt={`${APP_NAME} logo`} width={32} height={32} priority />
          {APP_NAME}
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-4 border-l border-white/10 pl-6">
            {userEmail ? (
              <>
                <Link href="/account" className="transition-colors hover:text-white">
                  Ο λογαριασμός μου
                </Link>
                <form action={signOut}>
                  <button type="submit" className="transition-colors hover:text-white">
                    Αποσύνδεση
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="transition-colors hover:text-white">
                  Σύνδεση
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-orange-500 px-4 py-2 text-neutral-950 transition-colors hover:bg-orange-400"
                >
                  Εγγραφή
                </Link>
              </>
            )}
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-200 hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="md:hidden border-t border-white/10 px-6 py-4 space-y-3 text-sm font-medium text-neutral-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block py-1" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-white/10 pt-3">
            {userEmail ? (
              <div className="space-y-3">
                <Link href="/account" className="block py-1" onClick={() => setOpen(false)}>
                  Ο λογαριασμός μου
                </Link>
                <form action={signOut}>
                  <button type="submit" className="block py-1">
                    Αποσύνδεση
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" className="block py-1" onClick={() => setOpen(false)}>
                  Σύνδεση
                </Link>
                <Link href="/signup" className="block py-1" onClick={() => setOpen(false)}>
                  Εγγραφή
                </Link>
              </div>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
