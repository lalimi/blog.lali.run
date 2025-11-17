const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Пряме підключення маршрутів
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'ok' });
});

app.post('/admin/blog/posts', async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const postData = {
      title_uk: req.body.title,
      title_en: req.body.title_en || null,
      slug: req.body.slug,
      excerpt_uk: req.body.excerpt || null,
      excerpt_en: req.body.excerpt_en || null,
      content_uk: req.body.content || null,
      content_en: req.body.content_en || null,
      featured_image_url: req.body.cover_image || null,
      author_id: req.body.author_id,
      category_id: req.body.category_id || null,
      read_time: req.body.read_time || 5,
      featured: req.body.featured || false,
      published: req.body.status === 'published',
      scheduled_at: req.body.scheduled_at || null,
      meta_title_uk: req.body.meta_title || null,
      meta_title_en: req.body.meta_title_en || null,
      meta_description_uk: req.body.meta_description || null,
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
    
    res.json({ success: true, post: data });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

app.get('/admin/blog/authors', async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
      
    if (error) throw error;
    
    res.json({ authors: data });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Failed to fetch authors', details: error.message });
  }
});

app.post('/admin/blog/authors', async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
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
    
    res.json({ success: true, author: data });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Failed to create author', details: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API not found: ' + req.path });
});

module.exports = app;