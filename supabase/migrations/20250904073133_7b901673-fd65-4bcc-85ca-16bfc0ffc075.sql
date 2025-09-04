-- Sample data seed for demo: profiles, doctors, and reviews
-- This migration inserts verified doctors and matching profiles plus reviews

-- 1) Insert sample profiles
WITH profiles_data AS (
  SELECT * FROM (VALUES
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c001'::uuid, 'alice.chen@demo.health', 'Dr. Alice Chen', '+1-415-555-0101', 'female'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c002'::uuid, 'brian.patel@demo.health', 'Dr. Brian Patel', '+1-415-555-0102', 'male'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c003'::uuid, 'carla-gomez@demo.health', 'Dr. Carla Gomez', '+1-415-555-0103', 'female'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c004'::uuid, 'daniel.nguyen@demo.health', 'Dr. Daniel Nguyen', '+1-415-555-0104', 'male'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c005'::uuid, 'emma-ross@demo.health', 'Dr. Emma Ross', '+1-415-555-0105', 'female'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c006'::uuid, 'frank-lam@demo.health', 'Dr. Frank Lam', '+1-415-555-0106', 'male'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c007'::uuid, 'grace.kim@demo.health', 'Dr. Grace Kim', '+1-415-555-0107', 'female'),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c008'::uuid, 'hassan-ali@demo.health', 'Dr. Hassan Ali', '+1-415-555-0108', 'male')
  ) AS t(user_id, email, full_name, phone, gender)
)
INSERT INTO public.profiles (user_id, email, full_name, phone, gender)
SELECT user_id, email, full_name, phone, gender FROM profiles_data;

-- 2) Insert sample doctors linked to the above profiles
WITH doctor_data AS (
  SELECT * FROM (VALUES
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c001'::uuid, 'San Francisco, CA', 'Cardiology', 'CA-123456', 200.00, 12, 'SF General Hospital', 'Stanford University School of Medicine', 'Board-certified cardiologist focusing on heart failure and preventive care.', ARRAY['Board Certified in Cardiology','ACLS','BLS']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c002'::uuid, 'San Jose, CA', 'Dermatology', 'CA-654321', 150.00, 9, 'Valley Medical Center', 'UCSF School of Medicine', 'Dermatologist specializing in acne, eczema, and cosmetic dermatology.', ARRAY['Board Certified in Dermatology','Mohs Surgery']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c003'::uuid, 'Oakland, CA', 'Pediatrics', 'CA-789012', 120.00, 7, 'Children''s Hospital Oakland', 'Harvard Medical School', 'Pediatrician passionate about child wellness and adolescent medicine.', ARRAY['PALS','Board Certified in Pediatrics']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c004'::uuid, 'Sacramento, CA', 'Orthopedics', 'CA-210987', 220.00, 15, 'UC Davis Medical Center', 'Duke University School of Medicine', 'Orthopedic surgeon with expertise in sports injuries and joint replacement.', ARRAY['Board Certified in Orthopedic Surgery']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c005'::uuid, 'Los Angeles, CA', 'Neurology', 'CA-345678', 230.00, 11, 'Cedars-Sinai Medical Center', 'Johns Hopkins University', 'Neurologist treating migraines, epilepsy, and movement disorders.', ARRAY['Board Certified in Neurology','EEG Certification']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c006'::uuid, 'San Diego, CA', 'Internal Medicine', 'CA-980123', 140.00, 8, 'Scripps Mercy Hospital', 'UC San Diego School of Medicine', 'Internist focused on chronic disease management and preventive care.', ARRAY['Board Certified in Internal Medicine']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c007'::uuid, 'Irvine, CA', 'OB/GYN', 'CA-567890', 180.00, 10, 'UCI Medical Center', 'Yale School of Medicine', 'Obstetrician-gynecologist providing comprehensive women''s health services.', ARRAY['Board Certified in OB/GYN','Ultrasound Certification']),
    ('2b1a4b38-8c50-4cf5-9a3c-11e6a6f2c008'::uuid, 'Fresno, CA', 'Psychiatry', 'CA-432109', 160.00, 6, 'Community Regional Medical Center', 'Columbia University', 'Psychiatrist experienced in mood and anxiety disorders, adult ADHD.', ARRAY['Board Certified in Psychiatry'])
  ) AS t(user_id, location, specialty, license_number, consultation_fee, experience_years, hospital_affiliation, education, bio, certifications)
)
INSERT INTO public.doctors (
  user_id, location, is_verified, is_available, specialty, license_number,
  consultation_fee, experience_years, hospital_affiliation, education, bio,
  certifications, available_from, available_to, working_days, rating, total_reviews
)
SELECT 
  user_id, location, true, true, specialty, license_number,
  consultation_fee, experience_years, hospital_affiliation, education, bio,
  certifications, '09:00'::time, '17:00'::time, ARRAY[1,2,3,4,5], 4.6, 5
FROM doctor_data
RETURNING id;

-- 3) Add sample reviews for each doctor
WITH doctors_list AS (
  SELECT id FROM public.doctors
),
ins_reviews AS (
  INSERT INTO public.doctor_reviews (doctor_id, patient_id, rating, review_text)
  SELECT d.id, gen_random_uuid(), r.rating, r.text
  FROM doctors_list d
  CROSS JOIN LATERAL (VALUES
    (5, 'Excellent care and attention to detail.'),
    (4, 'Very helpful and explained everything clearly.'),
    (5, 'Professional and compassionate. Highly recommended!')
  ) AS r(rating, text)
  RETURNING doctor_id
)
-- 4) Optionally refresh ratings to align with reviews (manual update for demo)
UPDATE public.doctors doc
SET rating = sub.avg_rating, total_reviews = sub.cnt
FROM (
  SELECT doctor_id, ROUND(AVG(rating)::numeric, 2) AS avg_rating, COUNT(*) AS cnt
  FROM public.doctor_reviews
  GROUP BY doctor_id
) sub
WHERE doc.id = sub.doctor_id;