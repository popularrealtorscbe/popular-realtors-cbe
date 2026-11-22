-- Optional demo seed for your test Supabase project.
-- Run after schema.sql
-- Safe to re-run: skips rows whose slug already exists.

insert into public.properties (
  title, slug, description, property_type, status, price,
  area_sqft, area_acres, location, city, locality, address, maps_url, features, thumbnail, images, featured
) values
(
  'DTCP Approved Residential Plot – Perur',
  'dtcp-approved-residential-plot-perur',
  'Prime residential plot in Perur. Clear title, DTCP layout, wide approach road.',
  'residential_plot',
  'available',
  2850000,
  2400,
  null,
  'Perur, Coimbatore',
  'Coimbatore',
  'Perur',
  '',
  '',
  array['DTCP Approved', 'Clear Title', 'Corner Plot'],
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  array['https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=1200&q=80'],
  true
),
(
  '5 Acre Fertile Farmland – Thondamuthur',
  '5-acre-fertile-farmland-thondamuthur',
  'Lush agricultural land with rich soil and natural water access.',
  'agricultural',
  'available',
  12500000,
  null,
  5,
  'Thondamuthur, Coimbatore',
  'Coimbatore',
  'Thondamuthur',
  '',
  '',
  array['Borewell', 'Fertile Soil', 'Farm Road Access'],
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
  array['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80'],
  true
),
(
  'Industrial Land near NH – Madukkarai',
  'industrial-land-near-nh-madukkarai',
  'Industrial parcel near the national highway corridor.',
  'industrial',
  'available',
  18000000,
  43560,
  1,
  'Madukkarai, Coimbatore',
  'Coimbatore',
  'Madukkarai',
  '',
  '',
  array['NH Access', '3-Phase Power Nearby'],
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
  array['https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80'],
  true
)
on conflict (slug) do nothing;
