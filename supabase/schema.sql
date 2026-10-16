-- Popular Realtors CBE — Supabase schema
-- Run this in the Supabase SQL editor when you connect a project.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.property_type as enum (
    'residential_plot',
    'agricultural',
    'industrial',
    'house',
    'commercial'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.property_status as enum (
    'available',
    'sold',
    'reserved'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  property_type public.property_type not null,
  status public.property_status not null default 'available',
  price numeric not null check (price >= 0),
  area_sqft numeric,
  area_acres numeric,
  location text not null,
  city text not null default 'Coimbatore',
  locality text not null,
  features text[] not null default '{}',
  thumbnail text not null default '',
  images text[] not null default '{}',
  featured boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe if table already existed without thumbnail
alter table public.properties
  add column if not exists thumbnail text not null default '';

create index if not exists properties_status_idx on public.properties (status);
create index if not exists properties_type_idx on public.properties (property_type);
create index if not exists properties_featured_idx on public.properties (featured);

alter table public.properties enable row level security;

drop policy if exists "Public read available properties" on public.properties;
create policy "Public read available properties"
  on public.properties
  for select
  to anon, authenticated
  using (status = 'available');

drop policy if exists "Admin full access" on public.properties;
create policy "Admin full access"
  on public.properties
  for all
  to authenticated
  using (true)
  with check (true);

-- Public image bucket for property photos
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read property images" on storage.objects;
create policy "Public read property images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'property-images');

drop policy if exists "Service role uploads property images" on storage.objects;
create policy "Service role uploads property images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'property-images');
