# Dev setup (your GitHub + your Supabase) → later switch to client

Use **your accounts** for building and testing. At deployment / handover, move the project to **his** GitHub/Vercel/Supabase (or keep code on yours and only put production keys under his Vercel).

---

## Phase A — Your testing setup (do this now)

### 1. Push code to your GitHub

1. Create a **private** repo on GitHub (e.g. `popular-realtors-cbe`).
2. From this project folder:

```bash
git add .
git status   # confirm .env.local is NOT listed
git commit -m "Initial Popular Realtors CBE site with admin dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/popular-realtors-cbe.git
git push -u origin main
```

Never commit `.env.local`. It is gitignored.

---

### 2. Create your test Supabase project

1. Go to [https://supabase.com](https://supabase.com) → sign in with **your** account.
2. **New project** → name e.g. `popular-realtors-dev` → set a DB password → create.
3. Wait until the project is ready.

### 3. Create the database table

1. In Supabase: **SQL Editor** → New query.
2. Paste everything from `supabase/schema.sql` → **Run**.
3. (Optional) Paste `supabase/seed.sql` → **Run** for demo listings.

### 4. Copy API keys into `.env.local`

Supabase → **Project Settings → API**:

| Env var | Where |
|---------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (secret) |
| `ADMIN_PASSWORD` | Any password you want for `/admin` |

Example `.env.local`:

```env
ADMIN_PASSWORD=popular@demo

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

Restart the app:

```bash
npm run dev
```

Open `/admin` → dashboard should show **backend: supabase**.  
Add a property → check it on `/properties` and in Supabase → **Table Editor → properties**.

---

### 5. (Optional) Deploy a test site on your Vercel

1. [vercel.com](https://vercel.com) → sign in with **your** GitHub.
2. **Import** the repo → Deploy.
3. **Project → Settings → Environment Variables** — add the same 4 vars as `.env.local`.
4. Redeploy. Test the live URL + `/admin`.

This test URL is for you/client preview only. Final domain can move later.

---

## Phase B — Switch to client accounts (at handover)

Do this when he is ready to own the site.

### Option 1 (recommended): Client owns Vercel + Supabase + domain

| Piece | Action |
|--------|--------|
| **Supabase** | Create project under **his** email (or transfer org). Run `schema.sql` again. Seed real listings. |
| **Vercel** | Create/import project under **his** Vercel (or transfer project). |
| **Env vars** | Put **his** Supabase URL + anon + service_role + a strong `ADMIN_PASSWORD` in **his** Vercel env. |
| **Domain** | Buy domain in his name → add in his Vercel → DNS as Vercel shows. |
| **GitHub** | Keep repo on your GitHub and invite him, **or** transfer repo to him. |

You stay as collaborator on Vercel/GitHub if he wants ongoing updates.

### Option 2: You keep GitHub; production keys are his

- Code stays on your GitHub.
- Production Vercel project uses **his** Supabase keys + domain under his Vercel team.
- Your local `.env.local` stays on **your** test Supabase (never overwrite with his service role in a shared chat/doc).

---

## Checklist: what must change for “client live”

- [ ] His Supabase project + `schema.sql` run  
- [ ] Real listings added (or seeded) in his DB  
- [ ] Vercel env vars point to **his** Supabase (not yours)  
- [ ] Strong new `ADMIN_PASSWORD` (not `popular@demo`)  
- [ ] Domain DNS → his Vercel  
- [ ] Phone / WhatsApp / email / address updated in `src/lib/site.ts`  
- [ ] Your test Supabase can be paused/deleted later  

---

## Quick troubleshooting

| Issue | Fix |
|--------|-----|
| Dashboard still says `backend: local` | Missing one of the 3 Supabase env vars → restart `npm run dev` |
| Can read listings but cannot add | `SUPABASE_SERVICE_ROLE_KEY` missing or wrong |
| Forgot to gitignore secrets | Rotate Supabase keys in dashboard immediately |
| Client demo on your Vercel URL | Fine for testing; move env + domain before calling it “his site” |
