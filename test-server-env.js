// Тест перевірки змінних на сервері
import dotenv from 'dotenv'

// Завантажуємо змінні
dotenv.config()

console.log('🔍 Перевірка змінних середовища на сервері:')
console.log('📋 Всі змінні process.env:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Існує' : '❌ Відсутній')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')
console.log('VITE_SUPABASE_SERVICE_ROLE_KEY:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')

// Перевірка, що бачить getSupabaseAdmin
const { getSupabaseAdmin } = await import('./dist/api/lib/supabase.js')

try {
  console.log('\n🔌 Тест виклику getSupabaseAdmin...')
  const supabase = getSupabaseAdmin()
  console.log('✅ getSupabaseAdmin працює!')
} catch (error) {
  console.log('❌ getSupabaseAdmin помилка:', error.message)
}