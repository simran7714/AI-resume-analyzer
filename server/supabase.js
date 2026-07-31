const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://fzQP58AKRGteCNRzkZ1.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_fzQP58AKRGteCNRzkZ1_9w_MjwGYu5e';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
