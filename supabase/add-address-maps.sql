-- Add address + Google Maps URL columns (safe to re-run)
-- Run in Supabase → SQL Editor → Run

alter table public.properties
  add column if not exists address text not null default '';

alter table public.properties
  add column if not exists maps_url text not null default '';
