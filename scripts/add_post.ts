import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addPost() {
    const filePath = path.resolve(process.cwd(), 'statti.md')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const lines = fileContent.split('\n')

    // Parse content
    const title = lines[0].trim()

    // Find SEO Title
    const seoTitleIndex = lines.findIndex(l => l.startsWith('SEO-Title:'))
    const seoTitle = lines[seoTitleIndex + 2].trim()

    // Find Meta Description
    const metaDescIndex = lines.findIndex(l => l.startsWith('Meta-description:'))
    const metaDescription = lines[metaDescIndex + 2].trim()

    // Body starts after Meta Description (approx line 10 in original file, but let's be dynamic)
    // The body starts at line 10 in the file provided (index 9)
    const bodyStartIndex = metaDescIndex + 4
    const content = lines.slice(bodyStartIndex).join('\n').trim()

    const slug = 'digital-products-ukraine-2026'
    const imageUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
    const authorId = '431ed258-c527-41d5-a422-bc229ca1375b' // BlackSea Team
    const categoryId = 'eb915d82-0c8c-496c-bd28-2ff841fe262a' // Product

    const excerpt = content.split('\n')[0].substring(0, 200) + '...'

    console.log('Inserting post:', { title, slug, categoryId, authorId })

    const { data, error } = await supabase
        .from('blog_posts')
        .insert({
            slug,
            title_uk: title,
            meta_title_uk: seoTitle,
            meta_description_uk: metaDescription,
            content_uk: content,
            excerpt_uk: excerpt,
            featured_image_url: imageUrl,
            published: true,
            published_at: new Date().toISOString(),
            author_id: authorId,
            category_id: categoryId,
            featured: false
        })
        .select()

    if (error) {
        console.error('Error inserting post:', error)
    } else {
        console.log('Success! Post inserted:', data)
    }
}

addPost()
