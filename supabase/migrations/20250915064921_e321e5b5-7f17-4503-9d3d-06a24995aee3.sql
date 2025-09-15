-- Add some mock doctor profiles by creating fake users first in a safe way
-- Since we can't insert into auth.users directly, let's create doctors with mock data temporarily

-- Delete any existing doctors first
DELETE FROM doctors;

-- Insert sample doctors with temporary user_ids (these will be replaced when real users sign up)
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
    gen_random_uuid(),
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
    gen_random_uuid(),
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
    gen_random_uuid(),
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
    gen_random_uuid(),
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
    gen_random_uuid(),
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
    gen_random_uuid(),
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

-- Now create corresponding profiles for these doctors
INSERT INTO public.profiles (user_id, email, full_name, phone, gender) 
SELECT 
  user_id,
  CASE 
    WHEN specialty = 'General Practitioner' THEN 'dr.smith@example.com'
    WHEN specialty = 'Cardiologist' THEN 'dr.johnson@example.com'
    WHEN specialty = 'Pediatrician' THEN 'dr.ochieng@example.com'
    WHEN specialty = 'Orthopedic Surgeon' THEN 'dr.kiprop@example.com'
    WHEN specialty = 'Dermatologist' THEN 'dr.wanjiku@example.com'
    WHEN specialty = 'Neurologist' THEN 'dr.mutua@example.com'
  END as email,
  CASE 
    WHEN specialty = 'General Practitioner' THEN 'Dr. Sarah Smith'
    WHEN specialty = 'Cardiologist' THEN 'Dr. Michael Johnson'
    WHEN specialty = 'Pediatrician' THEN 'Dr. Grace Ochieng'
    WHEN specialty = 'Orthopedic Surgeon' THEN 'Dr. Daniel Kiprop'
    WHEN specialty = 'Dermatologist' THEN 'Dr. Mary Wanjiku'
    WHEN specialty = 'Neurologist' THEN 'Dr. Peter Mutua'
  END as full_name,
  CASE 
    WHEN specialty = 'General Practitioner' THEN '+254700123456'
    WHEN specialty = 'Cardiologist' THEN '+254700123457'
    WHEN specialty = 'Pediatrician' THEN '+254700123458'
    WHEN specialty = 'Orthopedic Surgeon' THEN '+254700123459'
    WHEN specialty = 'Dermatologist' THEN '+254700123460'
    WHEN specialty = 'Neurologist' THEN '+254700123461'
  END as phone,
  CASE 
    WHEN specialty IN ('General Practitioner', 'Pediatrician', 'Dermatologist') THEN 'female'
    ELSE 'male'
  END as gender
FROM doctors;