import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ochdvsvkbinqunywmqde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaGR2c3ZrYmlucXVueXdtcWRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTMyMTIxNCwiZXhwIjoyMDcwODk3MjE0fQ.I5g9ymSjCxoHmA61zVLSH6krdMccU6hiVc2573ybPok';

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Anon Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
