import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateMetadata() {
    const slug = 'digital-products-ukraine-2026'
    const metaTitle = 'Цифрові продукти в Україні 2026: тренди, ніші, прогнози та кращі платформи для запуску'
    const metaDesc = 'Детальний аналіз ринку цифрових продуктів в Україні у 2026 році. Тренди, ніші, прогнози, попит та ключові платформи. Чому українські креатори переходять на BlackSea — локальну альтернативу Gumroad.'

    const { data, error } = await supabase
        .from('blog_posts')
        .update({
            meta_title_uk: metaTitle,
            meta_description_uk: metaDesc
        })
        .eq('slug', slug)
        .select()

    if (error) console.error('Error updating metadata:', error)
    else console.log('Success! Updated:', data)
}

updateMetadata()
