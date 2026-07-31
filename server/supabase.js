const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://fzQP58AKRGteCNRzkZ1.supabase.co';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

// Initialize Supabase Admin client using environment variable
const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = { supabaseAdmin };
