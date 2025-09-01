import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

declare global {
  interface Window {
    __SUPABASE_URL__?: string;
    __SUPABASE_ANON_KEY__?: string;
  }
}

const LS_URL = "supabaseUrl";
const LS_KEY = "supabaseAnonKey";

export function getSupabaseKeys() {
  const url = (typeof window !== "undefined" && (window.__SUPABASE_URL__ || localStorage.getItem(LS_URL))) || "";
  const anon = (typeof window !== "undefined" && (window.__SUPABASE_ANON_KEY__ || localStorage.getItem(LS_KEY))) || "";
  return { url, anon };
}

export function isSupabaseConfigured(): boolean {
  const { url, anon } = getSupabaseKeys();
  return Boolean(url && anon);
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    const { url, anon } = getSupabaseKeys();
    client = createClient(url, anon, { auth: { persistSession: true } });
  }
  return client;
}

export function setSupabaseConfig(url: string, anon: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_URL, url);
  localStorage.setItem(LS_KEY, anon);
  client = null;
}
