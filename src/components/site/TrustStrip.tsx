import { SITE } from "@/lib/site";

const items = [
  { label: `${SITE.yearsInBusiness}+ years`, detail: "Perur brokers since long" },
  { label: "Best prices", detail: "Buy & sell land deals" },
  { label: "Agri & sites", detail: "Land focus, not houses" },
  { label: "Site visits", detail: "Come see the ground" },
];

export function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="site-shell grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="text-sm font-semibold text-navy sm:text-[15px]">
              {item.label}
            </div>
            <div className="mt-0.5 text-xs text-muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
