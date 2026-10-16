-- Optional demo seed for your test Supabase project.
-- Run after schema.sql

insert into public.properties (
  title, slug, description, property_type, status, price,
  area_sqft, area_acres, location, city, locality, features, images, featured
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
  array['DTCP Approved', 'Clear Title', 'Corner Plot'],
  array['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'],
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
  array['Borewell', 'Fertile Soil', 'Farm Road Access'],
  array['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80'],
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
  array['NH Access', '3-Phase Power Nearby'],
  array['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80'],
  true
);
