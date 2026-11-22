"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/site/BrandLogo";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line bg-white/92 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div className="site-shell flex items-center justify-between gap-3 py-2.5 sm:py-3">
        <BrandLogo variant="header" className="min-w-0 shrink" />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? "text-navy" : "text-muted hover:text-navy"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-navy transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${SITE.phone}`}
            className="text-sm font-medium text-navy transition-opacity hover:opacity-70"
          >
            {SITE.phone}
          </a>
          <Link href="/admin" className="btn-ghost !px-3 !py-1.5 text-xs">
            Agent
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/admin"
            className="border border-line px-2.5 py-1 text-[11px] font-semibold text-navy"
          >
            Agent
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="p-1 text-navy"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="site-shell flex flex-col gap-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-navy"
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${SITE.phone}`} className="text-sm text-muted">
              {SITE.phone}
            </a>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted"
            >
              Agent login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
