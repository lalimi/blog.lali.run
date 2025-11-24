import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars from root .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function listMetadata() {
    console.log('--- Categories ---')
    const { data: categories, error: catError } = await supabase
        .from('blog_categories')
        .select('*')

    if (catError) console.error(catError)
    else console.table(categories)

    console.log('\n--- Blog Posts (Columns) ---')
    const { data: posts, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .limit(1)

    if (postError) console.error(postError)
    else console.log(Object.keys(posts[0] || {}))

    console.log('\n--- Authors ---')
    const { data: authors, error: authError } = await supabase
        .from('blog_authors')
        .select('id, name, slug')

    if (authError) console.error(authError)
    else console.table(authors)
}

listMetadata()
