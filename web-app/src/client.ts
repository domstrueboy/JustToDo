import { createClient } from '@supabase/supabase-js';

const supabaseApi = process.env.__api;

// @ts-ignore
const supabaseUrl = supabaseApi.env.SUPABASE_URL;
// @ts-ignore
const supabaseAnonKey = supabaseApi.env.SUPABASE_API_KEY;

export const client = createClient(supabaseUrl, supabaseAnonKey);