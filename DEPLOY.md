# Ship checklist — test on YOUR Gmail first, client tomorrow

**Today:** your GitHub + your Supabase + your Vercel  
**Tomorrow:** same code, his Supabase / Vercel / domain  
**Later:** logo (separate)

---

## Before anything — push latest code

All agent dashboard / Maps / mobile work must be on GitHub before Vercel can use it.

```bash
cd /data/master/side_hustle/Popular_Realtors_cbe
git add .
git status   # confirm .env.local is NOT listed
git commit -m "Agent-only admin, Maps+address, live preview, mobile CRUD"
git push origin main
```

---

## STEP 1 — Supabase (your Gmail / Google account)

1. Open https://supabase.com/dashboard → sign in with **your** Google/GitHub.
2. **New project** → name `popular-realtors-dev` → set DB password (save it) → Free → Create.
3. Wait until project is **healthy / green**.
4. Left menu → **SQL Editor** → New query.
5. Open `supabase/schema.sql` in this repo → copy **everything** → paste → **Run**.
6. Confirm:
   - **Table Editor** → `properties` exists (columns include `address`, `maps_url`)
   - **Storage** → bucket `property-images` (public)
7. (Optional) Run `supabase/seed.sql` for demo listings.
8. If the project already existed before plot fields: also run `supabase/add-plot-fields.sql`.

### Copy 3 keys
**Project Settings → API**

| Paste into Vercel / `.env.local` as | Copy from Supabase |
|------------------------------------|--------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` (secret — Reveal) |

---

## STEP 2 — Local `.env.local` (quick proof before Vercel)

Create/replace `.env.local` in the project root:

```env
ADMIN_PASSWORD=your-strong-password
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ....
SUPABASE_SERVICE_ROLE_KEY=eyJ....
```

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

Open http://localhost:3000/admin → password from `ADMIN_PASSWORD`  
Dashboard must say **backend: supabase**.

---

## STEP 3 — Vercel (your account) — production-like test URL

1. https://vercel.com → sign in with the **same GitHub** that owns `popular-realtors-cbe`.
2. **Add New → Project** → import `popular-realtors-cbe`.
3. **Environment Variables** (Production + Preview + Development):

```text
ADMIN_PASSWORD=your-strong-password
NEXT_PUBLIC_SUPABASE_URL=…from Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=…from Supabase
SUPABASE_SERVICE_ROLE_KEY=…from Supabase
```

4. Deploy → wait for Ready → open the `.vercel.app` URL.

---

## STEP 4 — Prove live sync (do this checklist)

| # | Action | Pass when |
|---|--------|-----------|
| 1 | Open `/admin` on Vercel URL | Login works |
| 2 | Dashboard header | Shows **backend: supabase** |
| 3 | **Add property** — title, price, locality, features, Maps link, upload photos | Saves without error |
| 4 | Open `/properties` | New card appears |
| 5 | Supabase → Table Editor → `properties` | New row present |
| 6 | Supabase → Storage → `property-images` | Photos present |
| 7 | Phone + desktop: browse site, open detail, Maps embed | Looks good, taps work |
| 8 | Admin on phone: edit / mark sold / delete | Works; sold hides from public |

---

## STEP 5 — UI / nativeness pass (your eyes)

**Public site (phone + desktop):** Home, Buy filters, property detail, Call/WhatsApp, About, Contact.  
**Agent dashboard (phone + desktop):** Login, list, Add with live preview, image upload, Maps paste + address, Edit, Mark sold, Delete.

---

## Tomorrow — client handover (his account)

1. New Supabase project under **his** email → run `schema.sql` again.  
2. New/transfer Vercel under **his** account → env vars = **his** keys + strong `ADMIN_PASSWORD`.  
3. Domain → his Vercel DNS.  
4. Update phone/WhatsApp/email in `src/lib/site.ts` if needed.  
5. Logo — separate session.

---

## If something fails

| Symptom | Fix |
|---------|-----|
| `backend: local` | Missing Supabase env → save vars → Redeploy / restart `npm run dev` |
| permission denied on save | Re-run bottom of `schema.sql` (grants) or `fix-permissions.sql` |
| Upload fails | Confirm `property-images` bucket exists |
| Columns missing | Re-run `schema.sql` (or `add-address-maps.sql`) |
| Empty listings | Table empty — add via admin or run `seed.sql` |
