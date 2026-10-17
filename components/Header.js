"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-ink text-sky">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span aria-hidden="true" className="inline-block h-4 w-4 rounded-full bg-sun" />
          Skyline Weather
        </Link>

        <button
          type="button"
          className="rounded px-3 py-2 text-sm font-medium ring-1 ring-sky/40 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden md:block" aria-label="Main">
          <ul className="flex gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-dusk ${
                    pathname === l.href ? "bg-dusk text-sun" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-dusk md:hidden" aria-label="Mobile">
          <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`block rounded px-3 py-3 text-base font-medium hover:bg-dusk ${
                    pathname === l.href ? "text-sun" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
