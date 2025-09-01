// Minimal types used in the UI for Supabase rows
export interface ProviderRow {
  id: string | number;
  name: string;
  specialty: string | null;
  location: string | null;
  rating: number | null;
  reviews: number | null;
  experience_years: number | null;
  availability_text: string | null;
  fee_kes: number | null;
}
