import { SITE } from "@/lib/site";

/** Local business schema so Google can match “Popular Realtors Coimbatore / CBE”. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    alternateName: [
      "Popular Realtors CBE",
      "POPULAR REALTORS CBE",
      "Popular Realtors Coimbatore",
    ],
    url: SITE.siteUrl,
    description: SITE.description,
    telephone: SITE.phone,
    image: `${SITE.siteUrl}/brand/logo-popular-realtors.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 4/118, School Road, Thethipalayam, Perur",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641010",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Approximate Perur / Thethipalayam
      latitude: 10.980018,
      longitude: 76.920901,
    },
    areaServed: {
      "@type": "City",
      name: "Coimbatore",
    },
    foundingDate: String(SITE.established),
    priceRange: "$$",
    sameAs: [SITE.justdialUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
      name: SITE.contactPerson,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
