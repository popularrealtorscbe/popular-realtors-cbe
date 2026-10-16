-- Popular Realtors CBE — Supabase schema
-- Run this in the Supabase SQL editor when you connect a project.

create extension if not exists "pgcrypto";

create type public.property_type as enum (
  'residential_plot',
  'agricultural',
  'industrial',
  'house',
  'commercial'
);

create type public.property_status as enum (
  'available',
  'sold',
  'reserved'
);

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
  images text[] not null default '{}',
  featured boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_status_idx on public.properties (status);
create index if not exists properties_type_idx on public.properties (property_type);
create index if not exists properties_featured_idx on public.properties (featured);

alter table public.properties enable row level security;

-- Public can read available listings only
create policy "Public read available properties"
  on public.properties
  for select
  to anon, authenticated
  using (status = 'available');

-- Authenticated admin can manage all listings
create policy "Admin full access"
  on public.properties
  for all
  to authenticated
  using (true)
  with check (true);
