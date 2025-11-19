import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../../../lib/supabase'
import { BlogPost, BlogCategory, BlogTag, BlogAuthor } from '../../../../lib/supabase'
import SEOGenerator from '../../../components/admin/SEOGenerator'
import ImageUpload from '../../../components/admin/ImageUpload'
import { useAhrefsTracking } from '../../../hooks/useAhrefsTracking'

interface PostFormData {
  title_uk: string
  title_en: string
  slug: string
  excerpt_uk: string
  excerpt_en: string
  content_uk: string
  content_en: string
  category_id: string
  author_id: string
  tags: string[]
  featured: boolean
  published: boolean
  scheduled_at: string
  meta_title_uk: string
  meta_title_en: string
  meta_description_uk: string
  meta_description_en: string
  keywords_uk: string[]
  keywords_en: string[]
  featured_image_url: string
}

const AdminBlogPostForm: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [authors, setAuthors] = useState<BlogAuthor[]>([])
  const [showSEOGenerator, setShowSEOGenerator] = useState(false)
  const { trackFormInteraction, trackSEOEvent } = useAhrefsTracking()
  
  const [formData, setFormData] = useState<PostFormData>({
    title_uk: '',
    title_en: '',
    slug: '',
    excerpt_uk: '',
    excerpt_en: '',
    content_uk: '',
    content_en: '',
    category_id: '',
    author_id: '',
    tags: [],
    featured: false,
    published: false,
    scheduled_at: '',
    meta_title_uk: '',
    meta_title_en: '',
    meta_description_uk: '',
    meta_description_en: '',
    keywords_uk: [],
    keywords_en: [],
    featured_image_url: ''
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      // Завантажити категорії
      const { data: categoriesData } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('published', true)
        .order('name_uk')

      // Завантажити теги
      const { data: tagsData } = await supabase
        .from('blog_tags')
        .select('*')
        .eq('published', true)
        .order('name_uk')

      // Завантажити авторів
      const { data: authorsData } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('published', true)
        .order('name')

      setCategories(categoriesData || [])
      setTags(tagsData || [])
      setAuthors(authorsData || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0400-\u04FF]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (field: 'title_uk' | 'title_en', value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Автоматично генерувати slug з української назви
      if (field === 'title_uk' && !prev.slug) {
        newData.slug = generateSlug(value)
      }
      
      // Автоматично генерувати meta title
      if (!prev.meta_title_uk && field === 'title_uk') {
        newData.meta_title_uk = value
      }
      if (!prev.meta_title_en && field === 'title_en') {
        newData.meta_title_en = value
      }
      
      return newData
    })
  }

  const handleSEOGenerated = (seoData: {
    meta_title_uk: string
    meta_title_en: string
    meta_description_uk: string
    meta_description_en: string
    keywords_uk: string[]
    keywords_en: string[]
    slug: string
  }) => {
    setFormData(prev => ({
      ...prev,
      meta_title_uk: seoData.meta_title_uk,
      meta_title_en: seoData.meta_title_en,
      meta_description_uk: seoData.meta_description_uk,
      meta_description_en: seoData.meta_description_en,
      keywords_uk: seoData.keywords_uk,
      keywords_en: seoData.keywords_en,
      slug: seoData.slug || prev.slug
    }))
    setShowSEOGenerator(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Відстежуємо спробу збереження
      trackFormInteraction('blog_post_form', 'submit_attempt', {
        title_length: formData.title_uk.length,
        content_length: formData.content_uk.length,
        has_seo: !!formData.meta_title_uk,
        is_published: formData.published
      })

      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      // Відстежуємо успішне збереження
      trackFormInteraction('blog_post_form', 'submit_success', {
        title: formData.title_uk,
        published: formData.published
      })

      navigate('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      
      // Відстежуємо помилку
      trackFormInteraction('blog_post_form', 'submit_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      alert('Помилка при створенні статті')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Навігація форми */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Створити нову статтю</h1>
        <Link
          to="/blog"
          className="bg-gradient-to-r from-[#0E2931] to-[#12484C] text-[#E2E2E0] px-4 py-2 rounded-lg hover:from-[#12484C] hover:to-[#2B7574] transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12.586l-4.293-4.293a1 1 0 011.414-1.414L10 9.758l2.879-2.879a1 1 0 111.414 1.414L11.414 12.586l4.293 4.293a1 1 0 01-1.414 1.414L10 15.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 12.586z"/>
          </svg>
          Перейти до блогу
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Основна інформація */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Основна інформація</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Назва (українською) *</label>
              <input
                type="text"
                value={formData.title_uk}
                onChange={(e) => handleTitleChange('title_uk', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Назва (англійською)</label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) => handleTitleChange('title_en', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">URL (slug) *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Категорія *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Оберіть категорію</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name_uk}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Автор *</label>
              <select
                value={formData.author_id}
                onChange={(e) => setFormData(prev => ({ ...prev, author_id: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Оберіть автора</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Теги</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <label key={tag.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={formData.tags.includes(tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({ ...prev, tags: [...prev.tags, tag.id] }))
                      } else {
                        setFormData(prev => ({ ...prev, tags: prev.tags.filter(id => id !== tag.id) }))
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{tag.name_uk}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm font-medium">Відібрана стаття</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm font-medium">Опублікувати одразу</span>
            </label>
          </div>

          {!formData.published && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Запланувати публікацію</label>
              <input
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Контент</h2>
          
          <div>
            <ImageUpload
              value={formData.featured_image_url}
              onChange={(url) => setFormData(prev => ({ ...prev, featured_image_url: url }))}
              label="URL зображення"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Короткий опис (українською)</label>
            <textarea
              value={formData.excerpt_uk}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt_uk: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              maxLength={200}
              required
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.excerpt_uk.length}/200 символів
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Короткий опис (англійською)</label>
            <textarea
              value={formData.excerpt_en}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt_en: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              maxLength={200}
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.excerpt_en.length}/200 символів
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Контент (українською)</label>
            <textarea
              value={formData.content_uk}
              onChange={(e) => setFormData(prev => ({ ...prev, content_uk: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={20}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Контент (англійською)</label>
            <textarea
              value={formData.content_en}
              onChange={(e) => setFormData(prev => ({ ...prev, content_en: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              rows={20}
            />
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">SEO налаштування</h2>
            <button
              type="button"
              onClick={() => {
                setShowSEOGenerator(true)
                trackSEOEvent('seo_generator_opened', {
                  has_title: !!formData.title_uk,
                  has_content: !!formData.content_uk
                })
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium"
            >
              🤖 Згенерувати SEO
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title (українською)</label>
              <input
                type="text"
                value={formData.meta_title_uk}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title_uk: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={60}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.meta_title_uk.length}/60 символів
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title (англійською)</label>
              <input
                type="text"
                value={formData.meta_title_en}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title_en: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={60}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.meta_title_en.length}/60 символів
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description (українською)</label>
              <textarea
                value={formData.meta_description_uk}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description_uk: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                maxLength={160}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.meta_description_uk.length}/160 символів
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description (англійською)</label>
              <textarea
                value={formData.meta_description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description_en: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                maxLength={160}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.meta_description_en.length}/160 символів
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ключові слова (українською)</label>
              <input
                type="text"
                value={formData.keywords_uk.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  keywords_uk: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SEO, блог, Україна"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Ключові слова (англійською)</label>
              <input
                type="text"
                value={formData.keywords_en.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  keywords_en: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SEO, blog, Ukraine"
              />
            </div>
          </div>
        </div>

        {/* Кнопки дій */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Збереження...' : 'Зберегти статтю'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
          >
            Скасувати
          </button>
        </div>
      </form>

      {/* SEO Generator Modal */}
      {showSEOGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <SEOGenerator
              title={formData.title_uk}
              content={formData.content_uk}
              currentSlug={formData.slug}
              onGenerated={handleSEOGenerated}
              onClose={() => setShowSEOGenerator(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlogPostForm