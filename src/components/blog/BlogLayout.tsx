import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface BlogLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  locale?: 'uk_UA' | 'en_US'
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  children, 
  title = 'Блог про AI та автоматизацію бізнесу',
  description = 'Актуальні статті, гайди та кейси для українського бізнесу. Дізнавайтесь першими про нові технології та можливості автоматизації.',
  keywords = ['AI', 'автоматизація', 'бізнес', 'Україна', 'digital', 'технології'],
  ogImage = '/images/blog/default-og.jpg',
  locale = 'uk_UA'
}) => {
  const siteName = 'BlackSea Digital'
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://blacksea-blog.com'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <>
      <Helmet>
        {/* Основні мета-теги */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="author" content="BlackSea Digital" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:url" content={`${siteUrl}${currentUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={locale} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
        <meta name="twitter:site" content="@BlackSeaDigital" />
        
        {/* Канонічний URL */}
        <link rel="canonical" href={`${siteUrl}${currentUrl}`} />
        
        {/* Альтернативні мови */}
        <link rel="alternate" hrefLang="uk" href={`${siteUrl}${currentUrl}`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${currentUrl}`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${currentUrl}`} />
        
        {/* Додаткові SEO мета-теги */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Language" content="uk" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Dublin Core */}
        <meta name="DC.Title" content={fullTitle} />
        <meta name="DC.Description" content={description} />
        <meta name="DC.Language" content="uk" />
        <meta name="DC.Publisher" content={siteName} />
        
        {/* Schema.org для Article */}
        <meta itemProp="name" content={fullTitle} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={`${siteUrl}${ogImage}`} />
        <meta itemProp="datePublished" content={new Date().toISOString()} />
        <meta itemProp="dateModified" content={new Date().toISOString()} />
        
        {/* Додаткові українські SEO мета-теги */}
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Підтвердження для пошукових систем */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        
        {/* Канонічний URL для української версії */}
        <link rel="canonical" href={`${siteUrl}${currentUrl}`} />
        
        {/* hreflang для української мови */}
        <link rel="alternate" hrefLang="uk" href={`${siteUrl}${currentUrl}`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${currentUrl}`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Хедер */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                  BlackSea Digital
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8 items-center">
                <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                  Головна
                </Link>
                <Link to="/blog" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                  Блог
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-gray-900 font-medium">
                  Послуги
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                  Про нас
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                  Контакти
                </Link>
                <Link 
                  to="/admin/blog" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Адмін
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Основний контент */}
        <main className="flex-1">
          {children}
        </main>

        {/* Футер */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">BlackSea Digital</h3>
                <p className="text-gray-400">
                  Допомагаємо українському бізнесу впроваджувати сучасні технології та автоматизацію.
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Послуги</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/services/ai" className="hover:text-white">AI автоматизація</Link></li>
                  <li><Link to="/services/development" className="hover:text-white">Веб розробка</Link></li>
                  <li><Link to="/services/marketing" className="hover:text-white">Digital маркетинг</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Контент</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/blog" className="hover:text-white">Блог</Link></li>
                  <li><Link to="/guides" className="hover:text-white">Гайди</Link></li>
                  <li><Link to="/cases" className="hover:text-white">Кейси</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Контакти</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: hello@blacksea.digital</li>
                  <li>Телефон: +380 (XX) XXX-XX-XX</li>
                  <li>Telegram: @blacksea_digital</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 BlackSea Digital. Всі права захищені.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default BlogLayout