# Final checklist — Popular Realtors CBE

## Mobile test (same Wi‑Fi as this laptop)

Open on your phone:

**http://192.168.1.18:3000**

- [ ] Home: logo sharp, hero, trust strip, listings, story scroll
- [ ] Properties: search text not clipped, filters work
- [ ] Open a listing: land/farm photos match the type, Call/WhatsApp dock
- [ ] About + Contact look clean
- [ ] Admin: `http://192.168.1.18:3000/admin/login` → login + edit on phone
- [ ] Call + WhatsApp only in the dock (and on property detail)

Admin password (local): value in `.env.local` → `ADMIN_PASSWORD`

## Desktop

- [ ] Header / footer / favicon = Popular Realtors logo
- [ ] Listing cards show land / farm / paddy (no random houses/rooms)
- [ ] Admin dashboard CRUD works
- [ ] Dashboard shows **backend: supabase** when env is set

## Logo

- [x] Saved + transparent PNG: `public/brand/logo-popular-realtors.png`
- [x] Icon / favicon: `public/brand/logo-icon.png`
- [x] Wired in header, footer, admin

## Supabase

- [ ] `schema.sql` + `add-plot-fields.sql` already run
- [ ] Storage bucket `property-images` exists
- [ ] Live rows use relevant `/listings/...` images (reseed script if demos look wrong)

## Netlify public link (for client)

1. Complete **Netlify Authorize** in the browser (Google / GitHub login).
2. Then from project folder:

```bash
npx netlify-cli link   # or: create new site
npx netlify-cli env:set ADMIN_PASSWORD "your-password"
npx netlify-cli env:set NEXT_PUBLIC_SUPABASE_URL "https://….supabase.co"
npx netlify-cli env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "…"
npx netlify-cli env:set SUPABASE_SERVICE_ROLE_KEY "…"
npx netlify-cli deploy --build --prod
```

- [x] Env vars set (Production)
- [x] Deployed → **https://popular-realtors-cbe.netlify.app**
- [ ] Live admin login + one test listing on phone/desktop

## Tomorrow (client account)

- [ ] His Supabase + schema
- [ ] His Netlify + env
- [ ] Strong `ADMIN_PASSWORD`
- [ ] Real phone / WhatsApp in `src/lib/site.ts`
