# Domain: popularrealtorscbe.com

## Netlify

1. Site settings → **Domain management** → Add `popularrealtorscbe.com` and `www.popularrealtorscbe.com`
2. Prefer HTTPS + redirect `www` → apex (or the reverse — pick one primary)

## GoDaddy DNS (typical Netlify values)

In GoDaddy → DNS for `popularrealtorscbe.com`:

| Type  | Name | Value |
|-------|------|--------|
| A     | `@`  | `75.2.60.5` (Netlify load balancer — confirm in Netlify UI) |
| CNAME | `www`| `your-site-name.netlify.app` (exact host Netlify shows) |

Wait for DNS (often minutes, sometimes up to 24–48h). Then `https://popularrealtorscbe.com` should open the site.

## Google Search (so typing the name finds the site)

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://popularrealtorscbe.com`
3. Verify (DNS TXT or HTML file — Netlify/Google both support this)
4. Submit sitemap: `https://popularrealtorscbe.com/sitemap.xml`
5. Request indexing for the homepage

Also keep JustDial + Google Business Profile name/phone matching the site.

**Note:** Typing only “Popular Realtors Coimbatore” in the address bar still runs a **search**. The site appears in results after Google indexes it — not instantly.
