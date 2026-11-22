"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon, whatsappHref } from "@/components/site/ContactActions";
import { SITE } from "@/lib/site";

/** Quiet fixed dock — outline navy, no loud brand colours */
export function ContactFab() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex overflow-hidden border border-navy/20 bg-white/95 shadow-[0_8px_30px_rgba(11,35,65,0.12)] backdrop-blur-sm">
        <a
          href={`tel:${SITE.phone}`}
          aria-label={`Call ${SITE.phone}`}
          className="inline-flex items-center gap-2 border-r border-navy/10 px-3.5 py-3 text-navy transition-colors hover:bg-page sm:px-4"
        >
          <Phone className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden text-xs font-semibold tracking-wide sm:inline">
            Call
          </span>
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="inline-flex items-center gap-2 px-3.5 py-3 text-navy transition-colors hover:bg-page sm:px-4"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden text-xs font-semibold tracking-wide sm:inline">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
