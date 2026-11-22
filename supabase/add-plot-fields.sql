-- Coimbatore plot fields (safe to re-run)
-- Run in Supabase → SQL Editor after schema.sql

alter table public.properties
  add column if not exists area_cents numeric;

alter table public.properties
  add column if not exists price_per_cent numeric;

alter table public.properties
  add column if not exists dimensions text not null default '';

alter table public.properties
  add column if not exists site_no text not null default '';

alter table public.properties
  add column if not exists facing text not null default '';

alter table public.properties
  add column if not exists negotiable boolean not null default false;
