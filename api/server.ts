import dotenv from 'dotenv'
import path from 'path'
import app from './app'

// Завантажуємо змінні середовища з правильним шляхом
dotenv.config({ path: path.join(__dirname, '../.env') })

const port = Number(process.env.PORT || 3001)

// Тест змінних середовища
console.log('🧪 Тест змінних середовища:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Існує' : '❌ Відсутній')
console.log('VITE_SUPABASE_SERVICE_ROLE_KEY:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✅ Існує' : '❌ Відсутній')

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})