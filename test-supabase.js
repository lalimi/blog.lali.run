// Тестовий скрипт для перевірки змінних середовища
import dotenv from 'dotenv'

// Завантажуємо змінні з .env файлу
dotenv.config()

console.log('🔍 Перевірка змінних середовища:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Існує' : '❌ Відсутній')
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✅ Існує' : '❌ Відсутній')
console.log('VITE_SUPABASE_SERVICE_ROLE_KEY:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')

// Перевірка підключення до Supabase
import { createClient } from '@supabase/supabase-js'

try {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Відсутні необхідні змінні середовища')
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  console.log('\n🔌 Тест підключення до Supabase...')
  // Проста перевірка - пробуємо отримати список таблиць
  supabase.from('blog_posts').select('*').limit(1).then(result => {
    if (result.error) {
      console.log('❌ Помилка підключення:', result.error.message)
    } else {
      console.log('✅ Підключення до Supabase успішне!')
    }
  }).catch(error => {
    console.log('❌ Помилка підключення:', error.message)
  })
  
} catch (error) {
  console.log('❌ Помилка:', error.message)
}