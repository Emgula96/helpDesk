import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://dpowthczmfwzvijdtrpb.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwb3d0aGN6bWZ3enZpamR0cnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTAyODk3OSwiZXhwIjoyMDI2NjA0OTc5fQ.QKXC7ygI8F4JjiG0YfbQzhNwjvCONEd08rYH1AMihfI'
export const supabase = createClient(supabaseUrl, supabaseKey);
