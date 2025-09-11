-- 1) Ensure the signup trigger function bypasses RLS and can insert into profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- 2) Allow the auth trigger role to insert into profiles despite RLS
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Allow auth admin to insert profiles'
  ) THEN
    CREATE POLICY "Allow auth admin to insert profiles"
    ON public.profiles
    FOR INSERT
    TO supabase_auth_admin
    WITH CHECK (true);
  END IF;
END $$;
