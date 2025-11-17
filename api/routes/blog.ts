import { Router } from 'express'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

router.get('/categories', async (_req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('blog_categories')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

router.get('/tags', async (_req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('blog_tags')
      .select('*')
      .eq('published', true)
      .order('name_uk', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' })
  }
})

router.get('/authors', async (_req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('blog_authors')
      .select('*')
      .eq('published', true)
      .order('name', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' })
  }
})

router.get('/posts', async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { category, tag, author, featured, published = 'true', page = 1, limit = 10 } = req.query as any

    let query: any = supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:blog_authors(*),
        tags:blog_post_tags(blog_tags(*))
      `, { count: 'exact' })

    if (category) query = query.eq('blog_categories.slug', category)
    if (tag) query = query.eq('blog_tags.slug', tag)
    if (author) query = query.eq('blog_authors.slug', author)
    if (featured === 'true') query = query.eq('featured', true)
    query = query.eq('published', published === 'true')

    const offset = (Number(page) - 1) * Number(limit)
    query = query
      .range(offset, offset + Number(limit) - 1)
      .order('published_at', { ascending: false })

    const { data, error, count } = await query
    if (error) throw error

    res.json({
      posts: data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil((count || 0) / Number(limit))
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

router.get('/posts/:slug', async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { slug } = req.params
    const { incrementViews = 'true' } = req.query as any

    const { data: post, error: postError } = await supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:blog_authors(*),
        tags:blog_post_tags(blog_tags(*))
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (postError) throw postError
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (incrementViews === 'true') {
      await supabaseAdmin
        .from('blog_posts')
        .update({ views_count: (post.views_count || 0) + 1 })
        .eq('id', post.id)
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

router.get('/posts/:slug/related', async (req, res) => {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { slug } = req.params
    const { limit = 3 } = req.query as any

    const { data: currentPost } = await supabaseAdmin
      .from('blog_posts')
      .select('category_id, tags:blog_post_tags(tag_id)')
      .eq('slug', slug)
      .single()

    if (!currentPost) return res.status(404).json({ error: 'Post not found' })

    const tagIds = currentPost.tags?.map((t: any) => t.tag_id) || []

    const { data: relatedPosts } = await supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        author:blog_authors(*)
      `)
      .neq('slug', slug)
      .eq('published', true)
      .or(`category_id.eq.${currentPost.category_id},and(tags.blog_tags.id.in.(${tagIds.join(',')}))`)
      .limit(Number(limit))
      .order('published_at', { ascending: false })

    res.json(relatedPosts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related posts' })
  }
})

export default router