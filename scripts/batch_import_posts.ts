import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { marked } from 'marked'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const AUTHOR_ID = '431ed258-c527-41d5-a422-bc229ca1375b' // BlackSea Team

const CATEGORIES = {
    MARKETING: 'ef9e5264-005a-461a-9b87-e82dfd6e1d4f',
    PRODUCT: 'eb915d82-0c8c-496c-bd28-2ff841fe262a',
    BUSINESS: 'f84d31db-b059-48ad-afc8-4c806f577204',
    AI_TOOLS: '4fced956-aef7-413c-bd58-aa38eab9bbc3',
    SEO_MARKETING: 'd27ba432-b7db-4d45-9da0-399c94eb205e',
    TECHNOLOGY: '6de8466c-677e-490e-b50e-f1bc1f88ca85'
}

const POSTS_MAP = [
    {
        file: '#2.md',
        slug: 'ecosystem-ukrainian-creators-2026',
        categoryId: CATEGORIES.MARKETING,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
    },
    {
        file: '#3.md',
        slug: 'notion-templates-business-2026',
        categoryId: CATEGORIES.PRODUCT,
        image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1'
    },
    {
        file: '#4.md',
        slug: 'visual-products-2026',
        categoryId: CATEGORIES.PRODUCT,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'
    },
    {
        file: '#5.md',
        slug: 'etsy-gumroad-blacksea-comparison-2026',
        categoryId: CATEGORIES.BUSINESS,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d'
    },
    {
        file: '#6.md',
        slug: 'payments-taxes-ukraine-2026',
        categoryId: CATEGORIES.BUSINESS,
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c'
    },
    {
        file: '#7.md',
        slug: 'ai-creator-economy-2026',
        categoryId: CATEGORIES.AI_TOOLS,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    },
    {
        file: '#8.md',
        slug: 'seo-for-creators-2026',
        categoryId: CATEGORIES.SEO_MARKETING,
        image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6'
    },
    {
        file: '#9.md',
        slug: 'selling-courses-pdf-ukraine-2026',
        categoryId: CATEGORIES.PRODUCT,
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8'
    },
    {
        file: '#10.md',
        slug: 'blacksea-platform-guide-2026',
        categoryId: CATEGORIES.TECHNOLOGY,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
    }
]

async function processPost(postConfig: typeof POSTS_MAP[0]) {
    const filePath = path.resolve(process.cwd(), 'статті ', postConfig.file)

    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${postConfig.file}`)
        return
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const lines = fileContent.split('\n')

    // Extract Title (first line starting with #)
    const titleLine = lines.find(l => l.startsWith('# '))
    const title = titleLine ? titleLine.replace('# ', '').trim().replace(/^\*\*/, '').replace(/\*\*$/, '') : 'Untitled'

    // Extract SEO Title
    const seoTitleIndex = lines.findIndex(l => l.includes('SEO-Title:'))
    let seoTitle = ''
    if (seoTitleIndex !== -1) {
        // Usually on the next line or same line
        let nextLine = lines[seoTitleIndex + 1] || ''
        if (nextLine.trim() === '') nextLine = lines[seoTitleIndex + 2] || ''
        seoTitle = nextLine.trim()
    }

    // Extract Meta Description
    const metaDescIndex = lines.findIndex(l => l.includes('Meta-description:'))
    let metaDescription = ''
    if (metaDescIndex !== -1) {
        let nextLine = lines[metaDescIndex + 1] || ''
        if (nextLine.trim() === '') nextLine = lines[metaDescIndex + 2] || ''
        metaDescription = nextLine.trim()
    }

    // Extract Content (everything after meta description block)
    // Assuming body starts after meta description + a few lines
    let bodyStartIndex = metaDescIndex + 3
    if (bodyStartIndex >= lines.length) bodyStartIndex = 0 // Fallback

    // Refine body start: look for the first header after meta description
    for (let i = metaDescIndex + 1; i < lines.length; i++) {
        if (lines[i].trim().startsWith('#')) {
            bodyStartIndex = i
            break
        }
    }

    const markdownContent = lines.slice(bodyStartIndex).join('\n').trim()
    const htmlContent = await marked.parse(markdownContent)

    // Calculate read time (approx 200 words per min)
    const wordCount = markdownContent.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    console.log(`Processing ${postConfig.file}...`)
    console.log(`Title: ${title}`)
    console.log(`Slug: ${postConfig.slug}`)

    const { error } = await supabase
        .from('blog_posts')
        .upsert({
            slug: postConfig.slug,
            title_uk: title,
            meta_title_uk: seoTitle,
            meta_description_uk: metaDescription,
            content_uk: htmlContent,
            excerpt_uk: metaDescription, // Use meta desc as excerpt
            featured_image_url: postConfig.image,
            published: true,
            published_at: new Date().toISOString(),
            author_id: AUTHOR_ID,
            category_id: postConfig.categoryId,
            read_time: readTime,
            featured: false
        }, { onConflict: 'slug' })

    if (error) {
        console.error(`Error inserting ${postConfig.file}:`, error)
    } else {
        console.log(`Successfully inserted ${postConfig.file}`)
    }
}

async function runBatch() {
    for (const post of POSTS_MAP) {
        await processPost(post)
    }
}

runBatch()
