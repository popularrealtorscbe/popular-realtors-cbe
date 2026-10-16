"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        onDark ? "text-white" : "text-ink"
      }`}
    >
      <div className="site-shell flex items-center justify-between py-5">
        <Link href="/" className="group min-w-0">
          <div className="display text-xl leading-none tracking-tight sm:text-2xl">
            {SITE.name}
          </div>
          <div
            className={`mt-1 text-[11px] font-medium uppercase tracking-[0.18em] ${
              onDark ? "text-white/70" : "text-forest/70"
            }`}
          >
            {SITE.tagline}
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  active
                    ? onDark
                      ? "text-white"
                      : "text-forest"
                    : onDark
                      ? "text-white/75 hover:text-white"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className={`text-sm font-semibold ${
              onDark
                ? "border border-white/40 px-3 py-1.5 hover:bg-white/10"
                : "border border-forest/20 px-3 py-1.5 text-forest hover:bg-mist"
            }`}
          >
            Agent Login
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div
          className={`md:hidden ${
            onDark ? "bg-ink/95 text-white" : "bg-paper text-ink shadow-lg"
          }`}
        >
          <div className="site-shell flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setOpen(false)}>
              Agent Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
