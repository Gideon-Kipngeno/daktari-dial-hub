-- Secure appointments and doctor_reviews access

-- Ensure RLS is enabled
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_reviews ENABLE ROW LEVEL SECURITY;

-- Appointments: tighten/standardize SELECT policy so only the patient or assigned doctor can read
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'appointments' 
      AND policyname = 'Users can view their own appointments'
  ) THEN
    DROP POLICY "Users can view their own appointments" ON public.appointments;
  END IF;
END $$;

CREATE POLICY "Patients and assigned doctor can view appointments"
ON public.appointments
FOR SELECT
USING (
  auth.uid() = patient_id OR auth.uid() IN (
    SELECT d.user_id FROM public.doctors d WHERE d.id = appointments.doctor_id
  )
);

-- Keep existing INSERT and UPDATE policies as-is; they already restrict by patient/doctor

-- Doctor Reviews: remove public visibility and restrict to patient or assigned doctor
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'doctor_reviews' 
      AND policyname = 'Anyone can view reviews'
  ) THEN
    DROP POLICY "Anyone can view reviews" ON public.doctor_reviews;
  END IF;
END $$;

CREATE POLICY "Patients and assigned doctor can view reviews"
ON public.doctor_reviews
FOR SELECT
USING (
  auth.uid() = patient_id OR auth.uid() IN (
    SELECT d.user_id FROM public.doctors d WHERE d.id = doctor_reviews.doctor_id
  )
);

-- Optional: ensure UPDATE policy on reviews remains patient-only (already present)
