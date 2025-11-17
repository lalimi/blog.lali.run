import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Завантажуємо змінні середовища
dotenv.config({ path: path.join(__dirname, '../../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY as string

console.log('Supabase config - URL:', supabaseUrl ? 'exists' : 'missing')
console.log('Supabase config - Service Key:', supabaseServiceKey ? 'exists' : 'missing')

let supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables. URL:', supabaseUrl, 'Service Key exists:', !!supabaseServiceKey)
    throw new Error('Missing Supabase environment variables')
  }
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
  return supabaseAdmin
}