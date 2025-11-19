import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'
import { BlogPost as BlogPostType, BlogCategory } from '../../../lib/supabase'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Завантажити категорії через API
      const categoriesResponse = await fetch('/api/blog/categories')
      const categoriesData = await categoriesResponse.json()

      // Завантажити пости через API
      const postsResponse = await fetch('/api/blog/posts?limit=10')
      const postsResult = await postsResponse.json()
      const postsData = postsResult.posts || []

      // Якщо немає даних з API, використовуємо мокові дані
      if (!postsData || postsData.length === 0) {
        console.log('Використовуємо мокові дані для локального тестування')
        setCategories([
          { id: '1', name_uk: 'AI та автоматизація', name_en: 'AI & Automation', slug: 'ai-automation', color: '#134E5E', sort_order: 1, description_uk: 'Статті про штучний інтелект та автоматизацію бізнесу', description_en: 'Articles about artificial intelligence and business automation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '2', name_uk: 'SEO маркетинг', name_en: 'SEO Marketing', slug: 'seo-marketing', color: '#0b6e74', sort_order: 2, description_uk: 'Поради з пошукової оптимізації та цифрового маркетингу', description_en: 'SEO and digital marketing tips', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '3', name_uk: 'Digital трансформація', name_en: 'Digital Transformation', slug: 'digital-transformation', color: '#0f8f98', sort_order: 3, description_uk: 'Цифрова трансформація бізнесу', description_en: 'Business digital transformation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
        ])

        setPosts([
          {
            id: '1',
            slug: 'ai-ukraine-business-2024',
            title_uk: 'Як AI змінює український бізнес в 2024 році',
            title_en: 'How AI is Changing Ukrainian Business in 2024',
            excerpt_uk: 'Досліджуємо, як штучний інтелект трансформує основні галузі української економіки та допомагає компаніям залишатися конкурентоспроможними.',
            excerpt_en: 'Exploring how artificial intelligence is transforming key sectors of the Ukrainian economy and helping companies stay competitive.',
            content_uk: '<p>Штучний інтелект стає невід\'ємною частиною сучасного українського бізнесу...</p>',
            content_en: '<p>Artificial intelligence is becoming an integral part of modern Ukrainian business...</p>',
            category_id: '1',
            category: { id: '1', name_uk: 'AI та автоматизація', name_en: 'AI & Automation', slug: 'ai-automation', color: '#134E5E', sort_order: 1, description_uk: 'Статті про штучний інтелект та автоматизацію бізнесу', description_en: 'Articles about artificial intelligence and business automation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            author_id: '1',
            author: { id: '1', name: 'Олександр Коваль', bio_uk: 'Експерт з AI та автоматизації', bio_en: 'AI & Automation Expert', avatar_url: null, position_uk: 'Головний редактор', position_en: 'Chief Editor', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            featured_image_url: '/images/blog/ai-ukraine-2024.jpg',
            published: true,
            published_at: new Date().toISOString(),
            scheduled_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            views: 1250,
            tags: [],
            featured: true,
            meta_title_uk: null,
            meta_title_en: null,
            meta_description_uk: null,
            meta_description_en: null,
            keywords_uk: ['AI', 'Україна', 'бізнес', 'автоматизація'],
            keywords_en: [],
            reading_time: 8
          },
          {
            id: '2',
            slug: 'seo-ukraine-complete-guide',
            title_uk: 'Повний гайд з SEO для українського бізнесу',
            title_en: 'Complete SEO Guide for Ukrainian Business',
            excerpt_uk: 'Комплексний посібник з пошукової оптимізації для українського ринку з практичними порадами та кейсами.',
            excerpt_en: 'Comprehensive SEO guide for the Ukrainian market with practical tips and case studies.',
            content_uk: '<p>Пошукова оптимізація є критично важливою для успіху українського бізнесу...</p>',
            content_en: '<p>Search engine optimization is critical for the success of Ukrainian business...</p>',
            category_id: '2',
            category: { id: '2', name_uk: 'SEO маркетинг', name_en: 'SEO Marketing', slug: 'seo-marketing', color: '#0b6e74', sort_order: 2, description_uk: 'Поради з пошукової оптимізації та цифрового маркетингу', description_en: 'SEO and digital marketing tips', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            author_id: '1',
            author: { id: '1', name: 'Олександр Коваль', bio_uk: 'Експерт з AI та автоматизації', bio_en: 'AI & Automation Expert', avatar_url: null, position_uk: 'Головний редактор', position_en: 'Chief Editor', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            featured_image_url: '/images/blog/seo-guide-ukraine.jpg',
            published: true,
            published_at: new Date(Date.now() - 86400000).toISOString(), // вчора
            scheduled_at: null,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
            views: 980,
            tags: [],
            featured: false,
            meta_title_uk: null,
            meta_title_en: null,
            meta_description_uk: null,
            meta_description_en: null,
            keywords_uk: ['SEO', 'Україна', 'маркетинг', 'пошукова оптимізація'],
            keywords_en: [],
            reading_time: 12
          },
          {
            id: '3',
            slug: 'automation-tools-top-10',
            title_uk: 'TOP-10 інструментів автоматизації для українського бізнесу',
            title_en: 'TOP-10 Automation Tools for Ukrainian Business',
            excerpt_uk: 'Огляд найефективніших інструментів для автоматизації бізнес-процесів з прикладами використання.',
            excerpt_en: 'Review of the most effective tools for business process automation with usage examples.',
            content_uk: '<p>Автоматизація бізнес-процесів допомагає українським компаніям...</p>',
            content_en: '<p>Business process automation helps Ukrainian companies...</p>',
            category_id: '1',
            category: { id: '1', name_uk: 'AI та автоматизація', name_en: 'AI & Automation', slug: 'ai-automation', color: '#134E5E', sort_order: 1, description_uk: 'Статті про штучний інтелект та автоматизацію бізнесу', description_en: 'Articles about artificial intelligence and business automation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            author_id: '1',
            author: { id: '1', name: 'Олександр Коваль', bio_uk: 'Експерт з AI та автоматизації', bio_en: 'AI & Automation Expert', avatar_url: null, position_uk: 'Головний редактор', position_en: 'Chief Editor', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
            featured_image_url: '/images/blog/automation-tools.jpg',
            published: true,
            published_at: new Date(Date.now() - 172800000).toISOString(), // позавчора
            scheduled_at: null,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            updated_at: new Date(Date.now() - 172800000).toISOString(),
            views: 750,
            tags: [],
            featured: false,
            meta_title_uk: null,
            meta_title_en: null,
            meta_description_uk: null,
            meta_description_en: null,
            keywords_uk: ['автоматизація', 'інструменти', 'бізнес', 'ефективність'],
            keywords_en: [],
            reading_time: 10
          }
        ])
      } else {
        setCategories(categoriesData || [])
        setPosts(postsData || [])
      }
    } catch (error) {
      console.error('Error loading blog data:', error)
      // Якщо виникла помилка, все одно використовуємо мокові дані
      setCategories([
        { id: '1', name_uk: 'AI та автоматизація', name_en: 'AI & Automation', slug: 'ai-automation', color: '#134E5E', sort_order: 1, description_uk: 'Статті про штучний інтелект та автоматизацію бізнесу', description_en: 'Articles about artificial intelligence and business automation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '2', name_uk: 'SEO маркетинг', name_en: 'SEO Marketing', slug: 'seo-marketing', color: '#0b6e74', sort_order: 2, description_uk: 'Поради з пошукової оптимізації та цифрового маркетингу', description_en: 'SEO and digital marketing tips', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '3', name_uk: 'Digital трансформація', name_en: 'Digital Transformation', slug: 'digital-transformation', color: '#0f8f98', sort_order: 3, description_uk: 'Цифрова трансформація бізнесу', description_en: 'Business digital transformation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ])
      setPosts([
        {
          id: '1',
          slug: 'ai-ukraine-business-2024',
          title_uk: 'Як AI змінює український бізнес в 2024 році',
          title_en: 'How AI is Changing Ukrainian Business in 2024',
          excerpt_uk: 'Досліджуємо, як штучний інтелект трансформує основні галузі української економіки та допомагає компаніям залишатися конкурентоспроможними.',
          excerpt_en: 'Exploring how artificial intelligence is transforming key sectors of the Ukrainian economy and helping companies stay competitive.',
          content_uk: '<p>Штучний інтелект стає невід\'ємною частиною сучасного українського бізнесу...</p>',
          content_en: '<p>Artificial intelligence is becoming an integral part of modern Ukrainian business...</p>',
          category_id: '1',
          category: { id: '1', name_uk: 'AI та автоматизація', name_en: 'AI & Automation', slug: 'ai-automation', color: '#3B82F6', sort_order: 1, description_uk: 'Статті про штучний інтелект та автоматизацію бізнесу', description_en: 'Articles about artificial intelligence and business automation', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          author_id: '1',
          author: { id: '1', name: 'Олександр Коваль', bio_uk: 'Експерт з AI та автоматизації', bio_en: 'AI & Automation Expert', avatar_url: null, position_uk: 'Головний редактор', position_en: 'Chief Editor', published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          featured_image_url: '/images/blog/ai-ukraine-2024.jpg',
          published: true,
          published_at: new Date().toISOString(),
          scheduled_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          views: 1250,
          tags: [],
          featured: true,
          meta_title_uk: null,
          meta_title_en: null,
          meta_description_uk: null,
          meta_description_en: null,
          keywords_uk: ['AI', 'Україна', 'бізнес', 'автоматизація'],
          keywords_en: [],
          reading_time: 8
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory
    const matchesSearch = !searchTerm ||
      post.title_uk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt_uk?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />

      {/* Hero секція */}
      <div className="bg-hero-teal py-12 md:py-20 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6 text-deep-teal-primary" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>
              BlackSea
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-deep-teal-primary/90 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-1">
              Актуальні статті, гайди та кейси для українського бізнесу.
              Дізнавайтесь першими про нові технології та можливості автоматизації.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12">
        {/* Кнопка повернення */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-deep-teal-600 text-white rounded-lg hover:bg-deep-teal-700 transition-colors font-medium shadow-md text-sm md:text-base"
          >
            ← Повернутися на головну
          </Link>
        </div>

        {/* Пошук та фільтри */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Пошук по статтях..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-500 focus:border-transparent text-sm md:text-base"
              />
            </div>
            <div className="w-full sm:w-48 md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-500 focus:border-transparent text-sm md:text-base"
              >
                <option value="">Всі категорії</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name_uk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Категорії */}
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${!selectedCategory
                ? 'bg-deep-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
            >
              Всі категорії
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${selectedCategory === category.id
                  ? 'bg-deep-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
              >
                {category.name_uk}
              </button>
            ))}
          </div>
        </div>

        {/* Статті */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {post.featured_image_url && (
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title_uk}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category badge on image */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-gradient-teal backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                      {post.category?.name_uk}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  {!post.featured_image_url && (
                    <span className="inline-block bg-gradient-teal text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      {post.category?.name_uk}
                    </span>
                  )}
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {getReadingTime(post.content_uk || '')} хв
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-deep-teal-700 transition-colors duration-300">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title_uk}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-6 text-base line-clamp-3 leading-relaxed">
                  {post.excerpt_uk}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    {post.author?.avatar_url && (
                      <img
                        src={post.author.avatar_url}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full ring-2 ring-deep-teal-100"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.author?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(post.published_at || post.created_at)}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-deep-teal-600 hover:text-deep-teal-800 font-medium text-sm group/link"
                  >
                    <span>Читати</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Статті не знайдено</p>
            <p className="text-gray-400 mt-2">Спробуйте змінити параметри пошуку</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default BlogIndex