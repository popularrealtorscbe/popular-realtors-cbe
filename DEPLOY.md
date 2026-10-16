# Deploy test: Your Supabase + Vercel

Goal: Admin add/edit/sold → saved in **Supabase** → public website updates immediately.

Your repo: `https://github.com/dhanwanth-dev/popular-realtors-cbe`

---

## Part 1 — Supabase (your account)

### 1. Login
Open: https://supabase.com/dashboard  
Sign in (GitHub/Google) with **your** account.

### 2. Create project
1. **New project**
2. Name: `popular-realtors-dev`
3. Database password: save it
4. Region: closest available
5. Plan: **Free** → Create (wait until green/ready)

### 3. Create table + storage bucket
1. Left menu → **SQL Editor** → New query  
2. Open this file in your project: `supabase/schema.sql`  
3. Copy **all** → paste → **Run**  
4. Confirm: **Table Editor** shows `properties`  
5. Confirm: **Storage** shows bucket `property-images` (public)

Optional demo rows: run `supabase/seed.sql` the same way.

### 4. Copy keys
**Project Settings → API**

Copy these 3 values (keep service_role secret):

| Name | Copy from |
|------|-----------|
| Project URL | Project URL |
| anon public | `anon` `public` key |
| service_role | `service_role` secret key |

You will paste them into Vercel next (not into GitHub).

---

## Part 2 — Vercel (your account)

### 1. Login & import
1. Open: https://vercel.com  
2. Sign in with **GitHub** (same account that owns the repo)  
3. **Add New… → Project**  
4. Import `popular-realtors-cbe`  
5. **Do not deploy yet** — first add env vars (or deploy then add + redeploy)

### 2. Environment variables
In the import screen (or **Project → Settings → Environment Variables**), add for **Production, Preview, Development**:

```text
ADMIN_PASSWORD = popular@demo
NEXT_PUBLIC_SUPABASE_URL = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ....
SUPABASE_SERVICE_ROLE_KEY = eyJ....
```

- Use your real Supabase values  
- `SUPABASE_SERVICE_ROLE_KEY` must **not** start with `NEXT_PUBLIC_`

### 3. Deploy
Click **Deploy**. Wait for “Ready”. Open the `.vercel.app` URL.

---

## Part 3 — Prove live sync (this is the test)

1. Open live site: `https://your-app.vercel.app/properties`  
2. Open admin: `https://your-app.vercel.app/admin`  
   Password: `popular@demo`  
3. Dashboard should show **backend: supabase**  
   (If it says `local`, env vars are missing → fix vars → Redeploy)  
4. **Add property** with thumbnail + gallery → Save  
5. Refresh `/properties` — new listing appears  
6. In Supabase → **Table Editor → properties** — new row is there  
7. In Supabase → **Storage → property-images** — uploaded photos appear  
8. In admin → **Mark sold** → refresh public site — listing gone  
9. Supabase table still has the row with `status = sold`

That proves: admin → Supabase → website.

---

## If something fails

| Symptom | Fix |
|---------|-----|
| Site builds but listings empty | Run `schema.sql` (and optional `seed.sql`) |
| backend still `local` on Vercel | Env vars not set / wrong project → Redeploy after saving |
| Upload fails | Confirm `property-images` bucket exists (from schema.sql) |
| Can’t add listing | Check `SUPABASE_SERVICE_ROLE_KEY` is correct |
| Images broken | Wait for deploy with latest `next.config` image hosts |

---

## Localhost tip

If local tab hangs: hard refresh, or use the Vercel URL instead.  
Local only uses Supabase after you put the same 3 keys in `.env.local` and restart `npm run dev`.
