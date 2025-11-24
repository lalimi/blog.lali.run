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

async function listPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, title_uk, published')
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
        return
    }

    console.log('--- Recent Blog Posts (Top 15) ---')
    data?.slice(0, 15).forEach(post => {
        console.log(`- ${post.title_uk} (${post.slug})`)
    })
}

listPosts()

