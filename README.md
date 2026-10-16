# Popular Realtors CBE

Professional property website + agent dashboard for **Popular Realtors CBE** (Perur, Coimbatore).

## Stack

- **Next.js** — public site + admin UI
- **Supabase-ready** data layer (uses local JSON until Supabase keys are added)
- **Vercel** — deployment target

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Agent dashboard

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Demo password: `popular@demo`

Add / edit / mark sold / delete listings — changes show on the public site immediately.

## Connect Supabase (optional, for production)

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL editor
3. Copy Project URL + anon key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_PASSWORD=choose-a-strong-password
```

4. Restart `npm run dev` — the dashboard will show backend: `supabase`

Until those keys exist, the app stores listings in `data/listings.json` (seeded with demo Coimbatore properties).

## Scripts

| Command        | Purpose              |
|----------------|----------------------|
| `npm run dev`  | Local development    |
| `npm run build`| Production build     |
| `npm run start`| Run production build |
