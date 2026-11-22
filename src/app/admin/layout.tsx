import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-page">
      <header className="border-b border-line bg-navy text-white">
        <div className="site-shell flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <BrandLogo variant="admin" href="/admin" />
            <div className="hidden text-[11px] uppercase tracking-[0.14em] text-white/60 sm:block">
              Agent panel
            </div>
          </div>
          <Link href="/" className="text-sm font-medium text-white/85">
            ← Website
          </Link>
        </div>
      </header>
      <div className="site-shell py-4 sm:py-8">{children}</div>
    </div>
  );
}
