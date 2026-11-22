-- Fix: "permission denied for table properties"
-- Run once in Supabase → SQL Editor → Run
-- No code change / no Vercel redeploy needed.
-- Also run add-address-maps.sql so address / maps_url columns exist.

-- Give API roles permission on the table
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete
  on table public.properties
  to anon, authenticated, service_role;

-- Keep RLS on
alter table public.properties enable row level security;

-- Public site: only available listings
drop policy if exists "Public read available properties" on public.properties;
create policy "Public read available properties"
  on public.properties
  for select
  to anon, authenticated
  using (status = 'available');

-- Authenticated users (if used later)
drop policy if exists "Admin full access" on public.properties;
drop policy if exists "Authenticated manage properties" on public.properties;
create policy "Authenticated manage properties"
  on public.properties
  for all
  to authenticated
  using (true)
  with check (true);

-- IMPORTANT:
-- Your app writes with the SERVICE ROLE key, which bypasses RLS.
-- "permission denied for table" is almost always missing GRANT (fixed above).
--
-- If save STILL fails after this, your Vercel SUPABASE_SERVICE_ROLE_KEY
-- may actually be the anon key. Check in Supabase → Settings → API
-- that Vercel has the service_role secret (not the anon/public key).
-- Changing that env var needs a redeploy later — try this SQL first.
