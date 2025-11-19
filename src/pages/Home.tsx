import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BlogPost as BlogPostType } from '@/lib/supabase'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLatestPosts()
  }, [])

  const loadLatestPosts = async () => {
    try {
      setLoading(true)
      
      // Завантажуємо останні 3 статті з Supabase
      const { data: postsData } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:blog_authors(*)
        `)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3)

      // Якщо немає даних з Supabase, використовуємо мокові дані
      if (!postsData || postsData.length === 0) {
        console.log('Використовуємо мокові дані для останніх статей')
        setLatestPosts([
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
        setLatestPosts(postsData || [])
      }
    } catch (error) {
      console.error('Error loading latest posts:', error)
      // Якщо виникла помилка, все одно використовуємо мокові дані
      setLatestPosts([
        {
          id: '1',
          slug: 'ai-ukraine-business-2024',
          title_uk: 'Як AI змінює український бізнес в 2024 році',
          title_en: 'How AI is Changing Ukrainian Business in 2024',
          excerpt_uk: 'Досліджуємо, як штучний інтелект трансформує основні галузі української економіки.',
          excerpt_en: 'Exploring how artificial intelligence is transforming key sectors of the Ukrainian economy.',
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
          keywords_uk: ['AI', 'Україна', 'бізнес'],
          keywords_en: [],
          reading_time: 8
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <div className="min-h-screen bg-brand-bg font-body">
      <Header />

      {/* Герой секція */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 mt-16">
        <div className="bg-gradient-to-r from-[#0E2931] via-[#12484C] to-[#2B7574] rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-20 text-center mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-[#E2E2E0] mb-4 md:mb-6 leading-tight">
              Лаліта Мірошниченко
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-display font-semibold text-[#E2E2E0] mb-6 md:mb-8">
              Фаундерка BlackSea
            </h2>
          </div>
          <p className="text-base md:text-xl text-[#E2E2E0] mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed font-body px-2">
            Я створюю BlackSea — українську платформу для цифрових креаторів. 
            Будую продукт, який замінить Gumroad для України. 
            Пишу про ІІ, автоматизацію та запуск стартапів у воєнний час.
          </p>
          <p className="text-sm md:text-lg text-[#E2E2E0] mb-8 md:mb-12 max-w-2xl mx-auto font-body px-2">
            Просто. Прямо. По ділу.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              to="/blog"
              className="btn--accent inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium rounded-large text-white bg-deep-teal-accent hover:bg-deep-teal-light transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Читати блог
              <svg className="ml-2 -mr-1 w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 md:px-6 py-3 border-2 border-[#E2E2E0] text-sm md:text-base font-medium rounded-large text-[#E2E2E0] bg-transparent hover:bg-[#E2E2E0] hover:bg-opacity-10 transition-all duration-200 w-full sm:w-auto"
            >
              Отримати консультацію
            </Link>
          </div>
        </div>

        {/* Хто я секція */}
        <div className="mt-12 md:mt-20 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-text text-center mb-6 md:mb-8">
            Хто я
          </h3>
          <div className="max-w-4xl mx-auto px-2">
            <p className="text-base md:text-lg text-brand-text mb-4 md:mb-6 leading-relaxed font-body text-center md:text-left">
              Я Лаліта — фаундерка BlackSea. 
              Підприємиця, яка прийшла з нуля, без інвестицій і без "ідеальних умов".
            </p>
            <p className="text-base md:text-lg text-brand-text mb-4 md:mb-6 leading-relaxed font-body text-center md:text-left">
              Працюю в реальності, де:
            </p>
            <ul className="text-base md:text-lg text-brand-text mb-4 md:mb-6 space-y-2 md:space-y-3 max-w-2xl mx-auto font-body">
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-2 md:mr-3 mt-1">•</span>
                <span className="flex-1">PayPal не працює,</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-2 md:mr-3 mt-1">•</span>
                <span className="flex-1">Stripe недоступний,</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-2 md:mr-3 mt-1">•</span>
                <span className="flex-1">українським авторам важко продавати цифрові продукти,</span>
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-2 md:mr-3 mt-1">•</span>
                <span className="flex-1">а більшість сервісів не адаптовані під наше законодавство.</span>
              </li>
            </ul>
            <p className="text-base md:text-lg text-brand-text leading-relaxed font-body text-center md:text-left">
              Мій шлях — це постійне вивчення, інтуїція, експерименти й готовність робити руками те, що інші делегують п'ятьом командам.
            </p>
          </div>
        </div>

        {/* Місія секція */}
        <div className="mt-12 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-text text-center mb-6 md:mb-8">
            Моя місія
          </h3>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0E2931] to-[#12484C] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
            <p className="text-base md:text-xl text-[#E2E2E0] mb-4 md:mb-6 leading-relaxed text-center font-body px-2">
              Я хочу, щоб українські креатори могли продавати свої продукти без обходних схем, VPN і хаосу з податками.
            </p>
            <p className="text-base md:text-xl text-[#E2E2E0] mb-4 md:mb-6 leading-relaxed text-center font-body px-2">
              Щоб україномовні автори мали свою платформу.
            </p>
            <p className="text-base md:text-xl text-[#E2E2E0] leading-relaxed text-center font-semibold font-body px-2">
              Щоб їхні продукти купували в гривні, швидко, офіційно й без технічних бар'єрів.
            </p>
            <div className="mt-6 md:mt-8 text-center">
              <p className="text-sm md:text-lg text-[#E2E2E0] italic font-body px-2">
                BlackSea — це не просто стартап. 
                Це спроба змінити правила гри на локальному ринку.
              </p>
            </div>
          </div>
        </div>

        {/* Останні статті */}
        <div className="mt-12 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-text text-center mb-8 md:mb-12">Останні статті</h3>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-teal-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {latestPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image_url && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={post.featured_image_url}
                        alt={post.title_uk}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-deep-teal-100 text-deep-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                        {post.category?.name_uk}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link to={`/blog/${post.slug}`} className="hover:text-deep-teal-600">
                        {post.title_uk}
                      </Link>
                    </h4>
                    
                    <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">
                      {post.excerpt_uk}
                    </p>
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-deep-teal-600 hover:text-deep-teal-800 font-medium text-sm md:text-base"
                    >
                      Читати далі →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {!loading && latestPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Статті не знайдено</p>
              <p className="text-gray-400 mt-2">Нові статті з'являться найближчим часом</p>
            </div>
          )}
        </div>

        {/* CTA секція */}
        <div className="mt-12 md:mt-20 bg-gradient-to-r from-[#0E2931] via-[#12484C] to-[#2B7574] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-[#E2E2E0]">
          <div className="text-center max-w-3xl mx-auto px-2">
            <h3 className="text-xl md:text-3xl font-display font-bold mb-4 md:mb-6">
              Я веду свій шлях публічно
            </h3>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90 font-body">
              Якщо хочеш стежити за тим, як створюється BlackSea — підписуйся
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <a
                href="https://www.threads.net/@lali.mi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-[#12484C] via-[#0E2931] to-[#2B7574] text-[#E2E2E0] font-semibold rounded-3xl hover:from-[#0E2931] hover:via-[#2B7574] hover:to-[#12484C] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="text-center">
                  <div className="font-medium text-sm md:text-base">Threads</div>
                  <div className="text-xs md:text-sm opacity-90">@lali.mi</div>
                </span>
                <svg className="ml-2 md:ml-3 w-4 md:w-5 h-4 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
              <a
                href="https://t.me/lalimi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-[#0E2931] via-[#2B7574] to-[#12484C] text-[#E2E2E0] font-semibold rounded-3xl hover:from-[#2B7574] hover:via-[#12484C] hover:to-[#0E2931] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="text-center">
                  <div className="font-medium text-sm md:text-base">Telegram</div>
                  <div className="text-xs md:text-sm opacity-90">@lalimi</div>
                </span>
                <svg className="ml-2 md:ml-3 w-4 md:w-5 h-4 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
              <a
                href="https://blacksea.click"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-[#2B7574] via-[#0f8f98] to-[#12484C] text-[#E2E2E0] font-semibold rounded-3xl hover:from-[#0f8f98] hover:via-[#12484C] hover:to-[#2B7574] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="text-center">
                  <div className="font-medium text-sm md:text-base">Стати раннім креатором</div>
                  <div className="text-xs md:text-sm opacity-90">BlackSea</div>
                </span>
                <svg className="ml-2 md:ml-3 w-4 md:w-5 h-4 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-deep-teal-primary text-white mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-display font-bold mb-3 md:mb-4">Лаліта Мірошниченко</h3>
            <p className="text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto font-body text-sm md:text-base px-2">
              Фаундерка української платформи для цифрових креаторів
            </p>
            
            {/* Соціальні мережі */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 md:mb-8">
              <a
                href="https://www.threads.net/@lali.mi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body text-center"
              >
                <span className="text-base md:text-lg font-semibold font-display">Threads</span>
                <br />
                <span className="text-xs md:text-sm">@lali.mi</span>
              </a>
              <a
                href="https://t.me/lalimi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body text-center"
              >
                <span className="text-base md:text-lg font-semibold font-display">Telegram</span>
                <br />
                <span className="text-xs md:text-sm">@lalimi</span>
              </a>
              <a
                href="https://blacksea.click"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body text-center"
              >
                <span className="text-base md:text-lg font-semibold" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>BlackSea</span>
                <br />
                <span className="text-xs md:text-sm">blacksea.click</span>
              </a>
            </div>

            {/* Навігація */}
            <div className="flex flex-wrap justify-center gap-4 md:space-x-6 mb-6 md:mb-8">
              <Link to="/blog" className="text-blue-200 hover:text-white transition-colors font-body">
                Блог
              </Link>
              <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors font-body">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors font-body">
                Умови використання
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-deep-teal-accent">
              <p className="text-blue-200 font-body">
                © 2025 BlackSea. Створюємо українську платформу для цифрових креаторів.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}