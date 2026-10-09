import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const adminEmail = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "srijanprasad2006@gmail.com"
).toLowerCase();

let client;

export function getSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Blog publishing is not configured. Add the Supabase environment variables and restart the site.",
    );
  }

  client ??= createClient(supabaseUrl, supabaseKey);
  return client;
}
