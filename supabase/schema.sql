-- Daktari Dial Hub - Supabase schema & seed
-- Run this in your Supabase SQL editor

-- 1) Tables
create table if not exists clinics (
  id bigint generated always as identity primary key,
  name text not null,
  address text,
  city text,
  phone text,
  website text,
  created_at timestamptz default now()
);

create table if not exists providers (
  id bigint generated always as identity primary key,
  name text not null,
  specialty text,
  location text,
  rating numeric,
  reviews integer,
  experience_years integer,
  availability_text text,
  fee_kes integer,
  clinic_id bigint references clinics(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists appointments (
  id bigint generated always as identity primary key,
  provider_id bigint references providers(id) on delete set null,
  provider_name text,
  clinic_id bigint references clinics(id) on delete set null,
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  start_time timestamptz not null,
  status text check (status in ('pending','confirmed','cancelled')) default 'pending',
  notes text,
  created_at timestamptz default now()
);

-- 2) RLS
alter table clinics enable row level security;
alter table providers enable row level security;
alter table appointments enable row level security;

-- Publicly readable provider/clinic data (for discovery)
create policy if not exists clinics_select_public on clinics for select using (true);
create policy if not exists providers_select_public on providers for select using (true);

-- Allow anyone to create an appointment (write-only) - protect PII
create policy if not exists appointments_insert_public on appointments for insert with check (true);

-- 3) Seeds
insert into clinics (name, city, address, phone) values
  ('Nairobi Central Medical', 'Nairobi', 'Kenyatta Ave', '+254700000001'),
  ('Westlands Health Hub', 'Nairobi', 'Westlands Rd', '+254700000002'),
  ('Mombasa Coast Clinic', 'Mombasa', 'Moi Ave', '+254700000003')
on conflict do nothing;

insert into providers (name, specialty, location, rating, reviews, experience_years, availability_text, fee_kes, clinic_id) values
  ('Sarah Wanjiku', 'General Practitioner', 'Nairobi CBD', 4.8, 124, 8, 'Available Today', 2500, 1),
  ('James Ochieng', 'Cardiologist', 'Westlands, Nairobi', 4.9, 89, 12, 'Next Slot: Tomorrow', 5000, 2),
  ('Grace Akinyi', 'Pediatrician', 'Karen, Nairobi', 4.7, 156, 6, 'Available Today', 3000, 1),
  ('Michael Kiprop', 'Orthopedic Surgeon', 'Mombasa', 4.6, 73, 15, 'Next Slot: Monday', 6500, 3),
  ('Catherine Muthoni', 'Dermatologist', 'Kisumu', 4.8, 91, 9, 'Available Today', 4000, null),
  ('David Wekesa', 'Neurologist', 'Nakuru', 4.9, 67, 11, 'Next Slot: Wednesday', 7000, null)
  on conflict do nothing;

-- 4) Indexes for performance
create index if not exists idx_providers_specialty on providers(specialty);
create index if not exists idx_providers_location on providers(location);
create index if not exists idx_providers_rating on providers(rating desc);
