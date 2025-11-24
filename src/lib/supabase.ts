import { createClient } from '@supabase/supabase-js'

// Перевіряємо, чи працюємо в браузері чи на сервері
const isBrowser = typeof window !== 'undefined'

// Отримуємо змінні залежно від середовища
let supabaseUrl: string = ''
let supabaseAnonKey: string = ''
let supabaseServiceKey: string = ''

try {
  if (isBrowser) {
    // Браузер - використовуємо import.meta.env або хардкод (якщо змінні не підтягнулися при збірці)
    const VITE_SUPABASE_URL = 'https://zasrpfuhptepwxdvlhoe.supabase.co'
    const VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphc3JwZnVocHRlcHd4ZHZsaG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDQxNDIsImV4cCI6MjA3ODkyMDE0Mn0.XNTj6VC_cK-gQiOHnYHa7DNHiC7B7VISVkjt35RCmJw'

    supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL || VITE_SUPABASE_URL
    supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || VITE_SUPABASE_ANON_KEY
    supabaseServiceKey = (import.meta as any).env?.VITE_SUPABASE_SERVICE_ROLE_KEY || (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY || ''
  } else {
    // Сервер - використовуємо process.env
    supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  }
} catch (error) {
  console.warn('Попередження: Не вдалося завантажити змінні середовища для Supabase', error)
}

// Створюємо клієнтів Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'blacksea-blog'
    }
  },
  db: {
    schema: 'public'
  }
})

// Адмін клієнт з service role key (тільки для серверних операцій)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'x-application-name': 'blacksea-blog-admin'
    }
  }
})

export { supabaseUrl }

// Типи для блогу
export type BlogCategory = {
  id: string
  name_uk: string
  name_en: string
  slug: string
  color: string
  sort_order: number
  description_uk: string
  description_en: string
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogAuthor = {
  id: string
  name: string
  bio_uk: string
  bio_en: string
  avatar_url: string | null
  position_uk: string
  position_en: string
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogTag = {
  id: string
  name_uk: string
  name_en: string
  slug: string
  color: string
  description_uk: string
  description_en: string
  published: boolean
  created_at: string
  updated_at: string
}

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