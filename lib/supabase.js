import { createClient } from '@supabase/supabase-js';
const isBrowser = typeof window !== 'undefined';
let supabaseUrl = '';
let supabaseAnonKey = '';
let supabaseServiceKey = '';
try {
    if (isBrowser) {
        supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
        supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
        supabaseServiceKey = import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
    }
    else {
        supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    }
}
catch (error) {
    supabaseUrl = '';
    supabaseAnonKey = '';
    supabaseServiceKey = '';
}
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Using fallback values for local development.');
    supabaseUrl = supabaseUrl || 'https://your-project.supabase.co';
    supabaseAnonKey = supabaseAnonKey || 'your-anon-key';
    supabaseServiceKey = supabaseServiceKey || 'your-service-role-key';
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
    global: {
        headers: {
            'x-application-name': 'serpbear-ukraine',
        },
    },
});
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
    global: {
        headers: {
            'x-application-name': 'serpbear-ukraine-admin',
        },
    },
});
export { supabaseUrl };
