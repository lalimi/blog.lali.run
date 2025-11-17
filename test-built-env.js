// Тест перевірки змінних у зібраному файлі
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

console.log('📍 Поточна директорія:', __dirname)
console.log('📍 Шлях до .env:', path.join(__dirname, '../.env'))
console.log('🔍 Перевірка змінних:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Існує' : '❌ Відсутній')
console.log('VITE_SUPABASE_SERVICE_ROLE_KEY:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')

// Тест getSupabaseAdmin
const { getSupabaseAdmin } = require('./dist/api/lib/supabase.js')

try {
  console.log('\n🔌 Тест getSupabaseAdmin...')
  const supabase = getSupabaseAdmin()
  console.log('✅ getSupabaseAdmin працює!')
} catch (error) {
  console.log('❌ getSupabaseAdmin помилка:', error.message)
}