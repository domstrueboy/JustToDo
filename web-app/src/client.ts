import { createClient } from '@supabase/supabase-js';

const supabaseApi = import.meta.env;

// @ts-ignore
const supabaseUrl = supabaseApi.VITE_SUPABASE_URL;
// @ts-ignore
const supabaseAnonKey = supabaseApi.VITE_SUPABASE_API_KEY;

export const client = createClient(supabaseUrl, supabaseAnonKey);