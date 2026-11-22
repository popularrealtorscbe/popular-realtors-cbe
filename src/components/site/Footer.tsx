import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="site-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo variant="footer" href="/" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Perur office since {SITE.established}. Own listings only. If you are
            unsure, call. We listen.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Visit
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link
              href="/properties"
              className="opacity-85 transition-opacity hover:opacity-100"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="opacity-85 transition-opacity hover:opacity-100"
            >
              Our values
            </Link>
            <Link
              href="/contact"
              className="opacity-85 transition-opacity hover:opacity-100"
            >
              Contact
            </Link>
            <a
              href={SITE.justdialUrl}
              target="_blank"
              rel="noreferrer"
              className="opacity-85 transition-opacity hover:opacity-100"
            >
              JustDial listing
            </a>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Office
          </div>
          <div className="mt-3 space-y-1 text-sm text-white/80">
            <p>{SITE.address}</p>
            <p>{SITE.phone}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-0.5 py-3 text-[9px] leading-none text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Website by Sridhanwanth</span>
        </div>
      </div>
    </footer>
  );
}
