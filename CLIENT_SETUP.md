# Client handoff — GitHub → Supabase → test → Netlify

Do this **in order**. Do not open Netlify until local admin + listings work on the client Supabase.

---

## A — GitHub (client account)

1. Sign in to GitHub as the **client** account.
2. Create a new **private** repo, e.g. `popular-realtors-cbe` (empty — no README).
3. Copy the repo URL, e.g. `https://github.com/CLIENT_USER/popular-realtors-cbe.git`
4. Tell the agent that URL (or paste it in chat).

We will then:

- commit the latest site code (no `.env.local`)
- point `origin` (or add `client`) at that repo
- push `main`

---

## B — Supabase (client account)

1. https://supabase.com/dashboard → sign in with **client** Google/GitHub.
2. **New project** → name `popular-realtors` → set DB password (save it) → Free → Create.
3. Wait until project is **healthy**.
4. **SQL Editor** → New query → paste **entire** `supabase/schema.sql` → **Run**.
5. Confirm:
   - **Table Editor** → `properties` exists
   - **Storage** → bucket `property-images` is public
6. If anything fails on plot columns, also run `supabase/add-plot-fields.sql`.
7. Optional: run `supabase/fix-permissions.sql` if uploads/admin writes fail.

### Copy 3 values (Settings → API)

| `.env.local` key | Where in Supabase |
|------------------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` (Reveal) |

Also set a strong:

```text
ADMIN_PASSWORD=…client chooses…
```

Paste those four into chat (or update `.env.local` yourself). We will restart local `npm run dev` and verify.

---

## C — Local proof (before Netlify)

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

Checklist:

| Check | Pass when |
|-------|-----------|
| Home `/` | Loads, logo + listings |
| Admin `/admin` | Login with `ADMIN_PASSWORD` |
| Dashboard | Shows **backend: supabase** |
| Add one test property | Saves; shows on `/properties` |
| Supabase Table Editor | New row present |

---

## D — Netlify (only after C passes)

1. Client Netlify account → **Add new site** → Import from **client GitHub** repo.
2. Build: from `netlify.toml` (`@netlify/plugin-nextjs` already in package).
3. Env vars (Production) = same four as `.env.local`.
4. Deploy → share `https://….netlify.app`.

---

## Do not commit

- `.env.local`
- Any real `SUPABASE_SERVICE_ROLE_KEY` / passwords
