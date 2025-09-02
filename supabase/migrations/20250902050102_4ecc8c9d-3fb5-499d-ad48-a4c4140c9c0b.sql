-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  license_number TEXT UNIQUE NOT NULL,
  specialty TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  education TEXT,
  certifications TEXT[],
  consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  bio TEXT,
  location TEXT NOT NULL,
  hospital_affiliation TEXT,
  available_from TIME DEFAULT '09:00:00',
  available_to TIME DEFAULT '17:00:00',
  working_days INTEGER[] DEFAULT '{1,2,3,4,5}', -- Monday to Friday
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')) DEFAULT 'scheduled',
  consultation_type TEXT CHECK (consultation_type IN ('in_person', 'video_call', 'phone_call')) DEFAULT 'in_person',
  chief_complaint TEXT,
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(doctor_id, appointment_date, appointment_time)
);

-- Create doctor reviews table
CREATE TABLE public.doctor_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(doctor_id, patient_id, appointment_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Doctors policies (public read, doctors can update their own)
CREATE POLICY "Anyone can view verified doctors" ON public.doctors
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Doctors can update their own profile" ON public.doctors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert their own profile" ON public.doctors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = patient_id OR auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients and doctors can update appointments" ON public.appointments
  FOR UPDATE USING (auth.uid() = patient_id OR auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.doctor_reviews
  FOR SELECT USING (true);

CREATE POLICY "Patients can create reviews" ON public.doctor_reviews
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own reviews" ON public.doctor_reviews
  FOR UPDATE USING (auth.uid() = patient_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update doctor rating when review is added/updated
CREATE OR REPLACE FUNCTION public.update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.doctors
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.doctor_reviews
      WHERE doctor_id = COALESCE(NEW.doctor_id, OLD.doctor_id)
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.doctor_reviews
      WHERE doctor_id = COALESCE(NEW.doctor_id, OLD.doctor_id)
    )
  WHERE id = COALESCE(NEW.doctor_id, OLD.doctor_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for rating updates
CREATE TRIGGER update_doctor_rating_on_insert
  AFTER INSERT ON public.doctor_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_doctor_rating();

CREATE TRIGGER update_doctor_rating_on_update
  AFTER UPDATE ON public.doctor_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_doctor_rating();

CREATE TRIGGER update_doctor_rating_on_delete
  AFTER DELETE ON public.doctor_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_doctor_rating();