import { createClient } from '@supabase/supabase-js';

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = createClient(publicSupabaseUrl, publicSupabaseAnonKey);

//  const supabase = () => client;
const supabase = client;

// export default supabase;
export default supabase;