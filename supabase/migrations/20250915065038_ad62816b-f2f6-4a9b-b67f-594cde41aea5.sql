-- Remove foreign key constraints temporarily to allow sample data
ALTER TABLE doctors DROP CONSTRAINT IF EXISTS doctors_user_id_fkey;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Clear existing data
DELETE FROM doctors;
DELETE FROM profiles WHERE email LIKE 'dr.%@example.com';

-- Insert sample doctors with mock user_ids
INSERT INTO public.doctors (
  user_id, 
  specialty, 
  location, 
  experience_years, 
  consultation_fee, 
  license_number, 
  hospital_affiliation, 
  education, 
  bio,
  available_from,
  available_to,
  working_days,
  is_verified,
  is_available,
  rating,
  total_reviews
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'General Practitioner',
    'Nairobi',
    8,
    2500,
    'KMP001234',
    'Nairobi Hospital',
    'MBChB - University of Nairobi, MMed Family Medicine - Aga Khan University',
    'Experienced general practitioner with a focus on preventive care and family medicine. Committed to providing comprehensive healthcare to patients of all ages.',
    '08:00:00',
    '18:00:00',
    '{1,2,3,4,5,6}',
    true,
    true,
    4.8,
    156
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Cardiologist',
    'Nairobi',
    12,
    5000,
    'KMP001235',
    'Aga Khan University Hospital',
    'MBChB - University of Nairobi, MMed Internal Medicine, Fellowship in Cardiology - Harvard Medical School',
    'Board-certified cardiologist specializing in interventional cardiology and heart disease prevention.',
    '09:00:00',
    '17:00:00',
    '{1,2,3,4,5}',
    true,
    true,
    4.9,
    203
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Pediatrician',
    'Mombasa',
    6,
    3000,
    'KMP001236',
    'Coast General Hospital',
    'MBChB - Moi University, MMed Pediatrics - University of Nairobi',
    'Dedicated pediatrician with expertise in child development and pediatric emergency care.',
    '07:30:00',
    '16:30:00',
    '{1,2,3,4,5}',
    true,
    true,
    4.7,
    98
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Orthopedic Surgeon',
    'Eldoret',
    10,
    4500,
    'KMP001237',
    'Moi Teaching and Referral Hospital',
    'MBChB - Moi University, MMed Surgery, Fellowship in Orthopedics - University of Cape Town',
    'Specialized orthopedic surgeon with expertise in sports medicine and joint replacement surgery.',
    '08:00:00',
    '17:00:00',
    '{1,2,3,4,5}',
    true,
    true,
    4.6,
    87
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Dermatologist',
    'Nakuru',
    7,
    3500,
    'KMP001238',
    'Nakuru Level 5 Hospital',
    'MBChB - University of Nairobi, MMed Dermatology - Makerere University',
    'Expert dermatologist specializing in skin cancer detection and cosmetic dermatology.',
    '09:00:00',
    '16:00:00',
    '{1,2,3,4,5}',
    true,
    true,
    4.8,
    134
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'Neurologist',
    'Kisumu',
    9,
    4000,
    'KMP001239',
    'Jaramogi Oginga Odinga Teaching and Referral Hospital',
    'MBChB - University of Nairobi, MMed Internal Medicine, Fellowship in Neurology - Johns Hopkins',
    'Neurologist with expertise in stroke management and neurodegenerative diseases.',
    '08:30:00',
    '17:30:00',
    '{1,2,3,4,5}',
    true,
    true,
    4.7,
    76
  );

-- Insert corresponding profiles
INSERT INTO public.profiles (user_id, email, full_name, phone, gender) VALUES
  ('11111111-1111-1111-1111-111111111111', 'dr.smith@example.com', 'Dr. Sarah Smith', '+254700123456', 'female'),
  ('22222222-2222-2222-2222-222222222222', 'dr.johnson@example.com', 'Dr. Michael Johnson', '+254700123457', 'male'),
  ('33333333-3333-3333-3333-333333333333', 'dr.ochieng@example.com', 'Dr. Grace Ochieng', '+254700123458', 'female'),
  ('44444444-4444-4444-4444-444444444444', 'dr.kiprop@example.com', 'Dr. Daniel Kiprop', '+254700123459', 'male'),
  ('55555555-5555-5555-5555-555555555555', 'dr.wanjiku@example.com', 'Dr. Mary Wanjiku', '+254700123460', 'female'),
  ('66666666-6666-6666-6666-666666666666', 'dr.mutua@example.com', 'Dr. Peter Mutua', '+254700123461', 'male');