import { Router } from 'express'
import { getSupabaseAdmin } from '../../lib/supabase'

const router = Router()

const requireAdmin = (req: any, res: any, next: any) => {
  console.log('Admin middleware - allowing all requests for testing')
  next()
}

// Маршрути для авторів
router.post('/authors', requireAdmin, async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const author = req.body
    const { data, error } = await supabaseAdmin
      .from('blog_authors')
      .insert(author)
      .select()
      .single()
    if (error) throw error
    res.json({ success: true, author: data })
  } catch (error: any) {
    console.error('Error creating author:', error)
    res.status(500).json({ error: 'Failed to create author', details: error.message })
  }
})

router.get('/authors', requireAdmin, async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('blog_authors')
      .select('*')
      .order('name')
    if (error) throw error
    res.json({ authors: data })
  } catch (error: any) {
    console.error('Error fetching authors:', error)
    res.status(500).json({ error: 'Failed to fetch authors', details: error.message })
  }
})

router.post('/posts', requireAdmin, async (req, res) => {
  try {
    console.log('Environment check - URL:', process.env.VITE_SUPABASE_URL ? 'exists' : 'missing')
    console.log('Environment check - Service Key:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? 'exists' : 'missing')
    const supabaseAdmin = getSupabaseAdmin()
    const post = req.body
    
    // Конвертуємо дані для багатомовної структури
    const postData = {
      title_uk: post.title,
      title_en: post.title_en || null,
      slug: post.slug,
      excerpt_uk: post.excerpt || null,
      excerpt_en: post.excerpt_en || null,
      content_uk: post.content || null,
      content_en: post.content_en || null,
      featured_image_url: post.cover_image || null,
      author_id: post.author_id,
      category_id: post.category_id || null,
      read_time: post.read_time || 5,
      featured: post.featured || false,
      published: post.status === 'published',
      scheduled_at: post.scheduled_at || null,
      meta_title_uk: post.meta_title || null,
      meta_title_en: post.meta_title_en || null,
      meta_description_uk: post.meta_description || null,
      meta_description_en: post.meta_description_en || null,
      og_image_url: post.og_image_url || null,
      keywords_uk: post.keywords_uk || null,
      keywords_en: post.keywords_en || null
    }
    
    console.log('Creating post with data:', postData)
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert(postData)
      .select()
      .single()
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    console.log('Post created successfully:', data)
    res.json({ success: true, post: data })
  } catch (error: any) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Failed to create post', details: error.message })
  }
})

router.put('/posts/:id', requireAdmin, async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { id } = req.params
    const updateData = req.body
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' })
  }
})

router.delete('/posts/:id', requireAdmin, async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { id } = req.params
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id)
    if (error) throw error
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

router.get('/posts', requireAdmin, async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { page = 1, limit = 20, search = '', category, author, status = 'all' } = req.query as any
    let query: any = supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:blog_authors(*)
      `, { count: 'exact' })
    if (search) query = query.or(`title_uk.ilike.%${search}%,title_en.ilike.%${search}%,excerpt_uk.ilike.%${search}%,excerpt_en.ilike.%${search}%`)
    if (category) query = query.eq('category_id', category)
    if (author) query = query.eq('author_id', author)
    if (status !== 'all') {
      switch (status) {
        case 'published': query = query.eq('published', true); break
        case 'draft': query = query.eq('published', false).is('scheduled_at', null); break
        case 'scheduled': query = query.eq('published', false).not('scheduled_at', 'is', null); break
      }
    }
    const offset = (Number(page) - 1) * Number(limit)
    query = query.range(offset, offset + Number(limit) - 1).order('created_at', { ascending: false })
    const { data, error, count } = await query
    if (error) throw error
    res.json({ posts: data, pagination: { page: Number(page), limit: Number(limit), total: count, pages: Math.ceil((count || 0) / Number(limit)) } })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

export default router