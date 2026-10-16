import Link from "next/link";
import { SITE } from "@/lib/site";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#eef3ef_0%,#faf8f4_45%,#f3efe6_100%)]">
      <header className="border-b border-[var(--line)] bg-white/80 backdrop-blur">
        <div className="site-shell flex items-center justify-between py-4">
          <div>
            <Link href="/admin" className="display text-xl text-ink">
              {SITE.shortName} Admin
            </Link>
            <div className="text-xs uppercase tracking-[0.16em] text-ink/50">
              Listing control panel
            </div>
          </div>
          <Link href="/" className="text-sm font-medium text-forest">
            ← Public website
          </Link>
        </div>
      </header>
      <div className="site-shell py-10">{children}</div>
    </div>
  );
}
