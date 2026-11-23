import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: SITE.metaTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Popular Realtors CBE",
    "Popular Realtors Coimbatore",
    "land brokers Coimbatore",
    "plots for sale Perur",
    "agricultural land Coimbatore",
    "buy sell plots best price",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.metaTitle,
    description: SITE.description,
    siteName: SITE.name,
    url: SITE.siteUrl,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/logo-icon.png",
        width: 256,
        height: 256,
        alt: "Popular Realtors CBE",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE.metaTitle,
    description: SITE.description,
    images: ["/brand/logo-icon.png"],
  },
  icons: {
    // B&W diamond for Google SERP / browser tab (site lockups use separate brand PNGs)
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/logo-meta-bw-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/logo-meta-bw-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b2341",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
