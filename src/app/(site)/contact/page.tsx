import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="site-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
            Get in touch
          </p>
          <h1 className="display mt-3 text-4xl text-ink md:text-5xl">
            Talk to Popular Realtors
          </h1>
          <p className="mt-4 text-ink/70">
            Share what you are looking to buy or sell. We respond on call and
            WhatsApp.
          </p>
          <div className="mt-8 space-y-4 text-ink/80">
            <p>
              <strong>Address:</strong> {SITE.address}
            </p>
            <p>
              <strong>Phone:</strong> {SITE.phone}
            </p>
            <p>
              <strong>Email:</strong> {SITE.email}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${SITE.phone}`} className="btn-primary">
              Call now
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--line)] bg-white px-5 py-3 font-semibold text-forest"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <form className="space-y-4 bg-white p-6 shadow-sm">
          <div>
            <label className="label" htmlFor="name">
              Name
            </label>
            <input id="name" className="input" placeholder="Your name" />
          </div>
          <div>
            <label className="label" htmlFor="phone">
              Phone
            </label>
            <input id="phone" className="input" placeholder="WhatsApp number" />
          </div>
          <div>
            <label className="label" htmlFor="interest">
              Interest
            </label>
            <select id="interest" className="input" defaultValue="buy">
              <option value="buy">Buying</option>
              <option value="sell">Selling</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="input min-h-32"
              placeholder="Plot size, budget, preferred locality…"
            />
          </div>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
              "Hi Popular Realtors CBE, I would like to enquire about a property.",
            )}`}
            className="btn-primary w-full"
          >
            Continue on WhatsApp
          </a>
          <p className="text-xs text-ink/50">
            Demo form — opens WhatsApp with your enquiry. We can wire email
            delivery once the client details are finalized.
          </p>
        </form>
      </div>
    </div>
  );
}
