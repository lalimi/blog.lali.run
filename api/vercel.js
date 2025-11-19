const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = req.url || '';
    console.log('API Request:', url);

    // Парсинг URL для витягування ID поста
    const urlParts = url.split('/');
    const postId = urlParts[urlParts.length - 1];
    const isPostEndpoint = url.startsWith('/api/admin/blog/posts/');

    // Healthcheck
    if (url === '/api/health' || url === '/health') {
      return res.status(200).json({ success: true, message: 'ok' });
    }

    // ============ PUBLIC BLOG ROUTES ============

    // Get categories
    if (url === '/api/blog/categories' && req.method === 'GET') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return res.status(200).json(data);
    }

    // Get posts list
    if (url.startsWith('/api/blog/posts') && req.method === 'GET' && !url.includes('/related')) {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Parse query parameters
      const urlObj = new URL(url, `http://${req.headers.host}`);
      const limit = parseInt(urlObj.searchParams.get('limit') || '10');
      const category = urlObj.searchParams.get('category');

      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:blog_authors(*)
        `)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (category) {
        query = query.eq('category_id', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return res.status(200).json({ posts: data });
    }

    // Get single post by slug
    if (url.match(/^\/api\/blog\/posts\/[^\/]+$/) && req.method === 'GET') {
      const slug = url.split('/').pop();
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:blog_authors(*)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    // Get related posts
    if (url.match(/^\/api\/blog\/posts\/[^\/]+\/related/) && req.method === 'GET') {
      const slug = url.split('/')[4];
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Get current post to find its category
      const { data: currentPost } = await supabase
        .from('blog_posts')
        .select('category_id')
        .eq('slug', slug)
        .single();

      if (!currentPost) {
        return res.status(200).json([]);
      }

      // Get related posts from same category
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:blog_authors(*)
        `)
        .eq('category_id', currentPost.category_id)
        .eq('published', true)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // ============ ADMIN ROUTES ============

    // Створення поста
    if (url === '/api/admin/blog/posts' && req.method === 'POST') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const postData = {
        title_uk: req.body.title_uk,
        title_en: req.body.title_en || null,
        slug: req.body.slug,
        excerpt_uk: req.body.excerpt_uk || null,
        excerpt_en: req.body.excerpt_en || null,
        content_uk: req.body.content_uk || null,
        content_en: req.body.content_en || null,
        featured_image_url: req.body.featured_image_url || null,
        author_id: req.body.author_id,
        category_id: req.body.category_id || null,
        read_time: req.body.read_time || 5,
        featured: req.body.featured || false,
        published: req.body.published || false,
        scheduled_at: req.body.scheduled_at || null,
        meta_title_uk: req.body.meta_title_uk || null,
        meta_title_en: req.body.meta_title_en || null,
        meta_description_uk: req.body.meta_description_uk || null,
        meta_description_en: req.body.meta_description_en || null,
        og_image_url: req.body.og_image_url || null,
        keywords_uk: req.body.keywords_uk || null,
        keywords_en: req.body.keywords_en || null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ success: true, post: data });
    }

    // Видалення поста
    if (isPostEndpoint && req.method === 'DELETE') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ success: true, message: 'Пост видалено успішно' });
    }

    // Зміна статусу поста (публікація/зняття)
    if (isPostEndpoint && req.method === 'PATCH') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      let updateData = {};

      // Визначаємо що саме оновлюємо
      if (url.endsWith('/publish')) {
        updateData = {
          published: true,
          published_at: new Date().toISOString()
        };
      } else if (url.endsWith('/unpublish')) {
        updateData = {
          published: false,
          published_at: null
        };
      } else {
        // Загальне оновлення поста
        updateData = {
          title_uk: req.body.title_uk,
          title_en: req.body.title_en || null,
          slug: req.body.slug,
          excerpt_uk: req.body.excerpt_uk || null,
          excerpt_en: req.body.excerpt_en || null,
          content_uk: req.body.content_uk || null,
          content_en: req.body.content_en || null,
          featured_image_url: req.body.featured_image_url || null,
          author_id: req.body.author_id,
          category_id: req.body.category_id || null,
          read_time: req.body.read_time || 5,
          featured: req.body.featured || false,
          published: req.body.published || false,
          scheduled_at: req.body.scheduled_at || null,
          meta_title_uk: req.body.meta_title_uk || null,
          meta_title_en: req.body.meta_title_en || null,
          meta_description_uk: req.body.meta_description_uk || null,
          meta_description_en: req.body.meta_description_en || null,
          og_image_url: req.body.og_image_url || null,
          keywords_uk: req.body.keywords_uk || null,
          keywords_en: req.body.keywords_en || null
        };
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ success: true, post: data });
    }

    // Отримання авторів
    if (url === '/api/admin/blog/authors' && req.method === 'GET') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error } = await supabase
        .from('blog_authors')
        .select('*')
        .order('name');

      if (error) throw error;

      return res.status(200).json({ authors: data });
    }

    // Створення автора
    if (url === '/api/admin/blog/authors' && req.method === 'POST') {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data, error } = await supabase
        .from('blog_authors')
        .insert(req.body)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ success: true, author: data });
    }

    // Обробка невідомих маршрутів
    if (isPostEndpoint) {
      return res.status(404).json({ success: false, error: 'Метод не підтримується для цього маршруту' });
    }

    return res.status(404).json({ success: false, error: 'API not found: ' + url });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};