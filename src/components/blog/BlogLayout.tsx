import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../common/Header'
import Footer from '../common/Footer'

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
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* Основний контент */}
        <main className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}

export default BlogLayout