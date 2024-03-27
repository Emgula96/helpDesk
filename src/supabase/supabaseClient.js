import { createClient } from '@supabase/supabase-js';
console.log(import.meta.env.VITE_SUPABASE_URL);
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);
