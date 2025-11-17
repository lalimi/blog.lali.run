import { createClient } from '@supabase/supabase-js'

// Перевіряємо, чи працюємо в браузері чи на сервері
const isBrowser = typeof window !== 'undefined'

// Отримуємо змінні залежно від середовища
let supabaseUrl: string = ''
let supabaseAnonKey: string = ''
let supabaseServiceKey: string = ''

try {
  if (isBrowser) {
    // Браузер - використовуємо import.meta.env
    supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL || ''
    supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    supabaseServiceKey = (import.meta as any).env?.VITE_SUPABASE_SERVICE_ROLE_KEY || (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY || ''
  } else {
    // Сервер - використовуємо process.env
    supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  }
} catch (error) {
  // Запасний варіант, якщо виникає помилка
  supabaseUrl = ''
  supabaseAnonKey = ''
  supabaseServiceKey = ''
}

// Запасний варіант для локальної розробки без реальних ключів
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using fallback values for local development.')
  supabaseUrl = supabaseUrl || 'https://your-project.supabase.co'
  supabaseAnonKey = supabaseAnonKey || 'your-anon-key'
  supabaseServiceKey = supabaseServiceKey || 'your-service-role-key'
}

// Створюємо клієнта для браузера (анонімний)
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
})

// Створюємо клієнта для сервера (з service role ключем)
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
})

// Експортуємо URL для використання в компонентах
export { supabaseUrl }

// Типи для TypeScript
export type BlogPost = {
  id: string
  title_uk: string
  title_en: string
  slug: string
  excerpt_uk: string
  excerpt_en: string
  content_uk: string
  content_en: string
  featured_image_url: string | null
  category_id: string
  author_id: string
  category?: BlogCategory
  author?: BlogAuthor
  tags: string[]
  featured: boolean
  published: boolean
  published_at?: string | null
  scheduled_at: string | null
  meta_title_uk: string | null
  meta_title_en: string | null
  meta_description_uk: string | null
  meta_description_en: string | null
  keywords_uk: string[]
  keywords_en: string[]
  views: number
  views_count?: number
  reading_time: number
  created_at: string
  updated_at: string
}

export type BlogCategory = {
  id: string
  name_uk: string
  name_en: string
  slug: string
  description_uk: string | null
  description_en: string | null
  color: string
  published: boolean
  sort_order?: number
  created_at: string
  updated_at: string
}

export type BlogTag = {
  id: string
  name_uk: string
  name_en: string
  slug: string
  color: string
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogAuthor = {
  id: string
  name: string
  bio_uk: string | null
  bio_en: string | null
  avatar_url: string | null
  position_uk: string | null
  position_en: string | null
  published: boolean
  created_at: string
  updated_at: string
}