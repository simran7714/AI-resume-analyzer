import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fzQP58AKRGteCNRzkZ1.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fzQP58AKRGteCNRzkZ1_9w_MjwGYu5e';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
