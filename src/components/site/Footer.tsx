import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-ink text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="display text-3xl">{SITE.name}</div>
          <p className="mt-3 max-w-md text-white/70">{SITE.description}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
            Explore
          </div>
          <div className="mt-4 flex flex-col gap-2 text-white/80">
            <Link href="/properties">Properties</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Agent Dashboard</Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
            Visit
          </div>
          <div className="mt-4 space-y-2 text-white/80">
            <p>{SITE.address}</p>
            <p>{SITE.phone}</p>
            <p>{SITE.email}</p>
            <p>Est. {SITE.established}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-2 py-5 text-sm text-white/50 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>Serving Coimbatore · Plots · Farmland · Industrial</span>
        </div>
      </div>
    </footer>
  );
}
