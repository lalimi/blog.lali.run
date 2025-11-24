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

async function updatePostContent() {
    const filePath = path.resolve(process.cwd(), 'statti.md')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const lines = fileContent.split('\n')

    // Find Meta Description to locate start of body
    const metaDescIndex = lines.findIndex(l => l.startsWith('Meta-description:'))

    if (metaDescIndex === -1) {
        console.error('Could not find Meta-description marker')
        return
    }

    // Body starts after meta description. 
    // Meta-description: (line X)
    // [Description text] (line X+1)
    // [Empty line] (line X+2)
    // [Start of body] (line X+3)

    // Let's find the first line starting with '#' after meta description
    let bodyStartIndex = metaDescIndex + 1
    while (bodyStartIndex < lines.length && !lines[bodyStartIndex].startsWith('##')) {
        bodyStartIndex++
    }

    // Actually, the first header is "## 1. Вступ..."
    // But we want to capture everything after the meta description block.
    // Let's just say body starts at metaDescIndex + 3 (skipping description line and one empty line)
    // Adjusting based on file look:
    // Line 6: Meta-description:
    // Line 7: Text
    // Line 8: Empty
    // Line 9: ## 1. Вступ...

    const content = lines.slice(metaDescIndex + 3).join('\n').trim()
    const htmlContent = await marked.parse(content)
    const slug = 'digital-products-ukraine-2026'

    console.log('Updating content for slug:', slug)
    console.log('Content preview (HTML):', htmlContent.substring(0, 100))

    const { data, error } = await supabase
        .from('blog_posts')
        .update({
            content_uk: htmlContent
        })
        .eq('slug', slug)
        .select()

    if (error) console.error('Error updating content:', error)
    else console.log('Success! Updated post content.')
}

updatePostContent()
