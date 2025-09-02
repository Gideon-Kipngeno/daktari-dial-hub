-- Insert sample doctors data
-- First, let's create some sample user accounts for doctors
INSERT INTO public.profiles (user_id, email, full_name, phone) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'sarah.wanjiku@example.com', 'Sarah Wanjiku', '+254701234567'),
  ('00000000-0000-0000-0000-000000000002', 'james.ochieng@example.com', 'James Ochieng', '+254701234568'),
  ('00000000-0000-0000-0000-000000000003', 'grace.akinyi@example.com', 'Grace Akinyi', '+254701234569'),
  ('00000000-0000-0000-0000-000000000004', 'michael.kiprop@example.com', 'Michael Kiprop', '+254701234570'),
  ('00000000-0000-0000-0000-000000000005', 'catherine.muthoni@example.com', 'Catherine Muthoni', '+254701234571'),
  ('00000000-0000-0000-0000-000000000006', 'david.wekesa@example.com', 'David Wekesa', '+254701234572')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample doctors
INSERT INTO public.doctors (
  user_id, 
  license_number, 
  specialty, 
  experience_years, 
  consultation_fee, 
  bio, 
  location, 
  hospital_affiliation,
  rating,
  total_reviews,
  is_verified,
  is_available
) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'KMP-001-2023',
  'General Practitioner',
  8,
  2500.00,
  'Experienced general practitioner with a passion for primary healthcare.',
  'Nairobi CBD',
  'Nairobi Hospital',
  4.8,
  124,
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000002',
  'KMP-002-2023',
  'Cardiologist',
  12,
  5000.00,
  'Specialist in cardiovascular diseases with extensive experience in interventional cardiology.',
  'Westlands, Nairobi',
  'Aga Khan University Hospital',
  4.9,
  89,
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000003',
  'KMP-003-2023',
  'Pediatrician',
  6,
  3000.00,
  'Dedicated pediatrician committed to child health and development.',
  'Karen, Nairobi',
  'MP Shah Hospital',
  4.7,
  156,
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000004',
  'KMP-004-2023',
  'Orthopedic Surgeon',
  15,
  6500.00,
  'Expert orthopedic surgeon specializing in joint replacement and sports medicine.',
  'Mombasa',
  'Coast General Hospital',
  4.6,
  73,
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000005',
  'KMP-005-2023',
  'Dermatologist',
  9,
  4000.00,
  'Dermatologist with expertise in medical and cosmetic dermatology.',
  'Kisumu',
  'Jaramogi Oginga Odinga Teaching and Referral Hospital',
  4.8,
  91,
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000006',
  'KMP-006-2023',
  'Neurologist',
  11,
  7000.00,
  'Neurologist specializing in brain and nervous system disorders.',
  'Nakuru',
  'Provincial General Hospital Nakuru',
  4.9,
  67,
  true,
  true
)
ON CONFLICT (user_id) DO NOTHING;