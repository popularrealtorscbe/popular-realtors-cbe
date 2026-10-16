import { SITE } from "@/lib/site";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="site-shell max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
          About the agency
        </p>
        <h1 className="display mt-3 text-4xl text-ink md:text-5xl">
          {SITE.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          {SITE.description}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-[0.16em] text-copper">
              Established
            </div>
            <div className="display mt-2 text-3xl">{SITE.established}</div>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-[0.16em] text-copper">
              Base
            </div>
            <div className="display mt-2 text-3xl">{SITE.location}</div>
          </div>
        </div>
        <div className="mt-10 space-y-4 text-ink/75">
          <p>
            We help buyers and sellers find fair, low-friction deals across
            residential plots, agricultural land, industrial parcels, and
            ready-to-move homes in and around Coimbatore.
          </p>
          <p>
            This website is your live inventory board — every available listing
            can be updated by our team from a private dashboard, so what you see
            here stays current.
          </p>
        </div>
      </div>
    </div>
  );
}
