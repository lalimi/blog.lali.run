import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'
import { BlogPost as BlogPostType } from '../../../lib/supabase'
import BlogLayout from '../../components/blog/BlogLayout'
import OptimizedImage from '../../components/blog/OptimizedImage'
import RelatedPosts from '../../components/blog/RelatedPosts'
import CTABlock from '../../components/blog/CTABlock'
import Breadcrumb from '../../components/blog/Breadcrumb'

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadPost()
    }
  }, [slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError(null)

      // Завантажити статтю
      const response = await fetch(`/blog/posts/${slug}`)
      if (!response.ok) {
        throw new Error('Статтю не знайдено')
      }

      const postData = await response.json()
      setPost(postData)

      // Завантажити схожі статті
      const relatedResponse = await fetch(`/blog/posts/${slug}/related?limit=3`)
      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json()
        setRelatedPosts(relatedData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Сталася помилка')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </BlogLayout>
    )
  }

  if (error || !post) {
    return (
      <BlogLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Статтю не знайдено</h1>
          <p className="text-gray-600 mb-6">{error || 'Статтю не знайдено або вона ще не опублікована'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Повернутись до блогу
          </Link>
        </div>
      </BlogLayout>
    )
  }

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

  // Створити JSON-LD для SEO
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://blacksea-blog.com'
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title_uk,
    "description": post.excerpt_uk,
    "image": post.featured_image_url || '/images/blog/default-og.jpg',
    "author": {
      "@type": "Person",
      "name": post.author?.name,
      "description": post.author?.bio_uk
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${origin}/blog/${post.slug}`
    }
  }

  return (
    <BlogLayout
      title={post.title_uk}
      description={post.excerpt_uk}
      keywords={post.keywords_uk || []}
      ogImage={post.featured_image_url}
    >
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <article className="max-w-4xl mx-auto">
        {/* Навігаційний ланцюжок */}
        <Breadcrumb 
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Блог', href: '/blog' },
            { label: post.title_uk }
          ]}
        />

        {/* Заголовок */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/blog" className="hover:text-blue-600">
              Блог
            </Link>
            <span>/</span>
            {post.category && (
              <>
                <span>{post.category.name_uk}</span>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{post.title_uk}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title_uk}
          </h1>

          {post.title_en && (
            <h2 className="text-2xl text-gray-600 mb-6">
              {post.title_en}
            </h2>
          )}

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              {post.author?.avatar_url && (
                <OptimizedImage
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                  loading="eager"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{post.author?.name}</p>
                <p className="text-sm">{formatDate(post.published_at || post.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getReadingTime(post.content_uk || '')} хв
              </span>
              
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views_count}
              </span>
            </div>
          </div>

          {/* Теги */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: any) => (
                <span
                  key={tag.blog_tags.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag.blog_tags.name_uk}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Основне зображення */}
        {post.featured_image_url && (
          <div className="mb-8">
            <OptimizedImage
              src={post.featured_image_url}
              alt={post.title_uk}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            />
          </div>
        )}

        {/* Зміст */}
        <div className="prose prose-lg max-w-none mb-12">
          {/* Анотація */}
          {post.excerpt_uk && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-blue-900 font-medium mb-0">
                {post.excerpt_uk}
              </p>
            </div>
          )}

          {/* Основний контент */}
          <div 
            className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                       prose-p:text-gray-700 prose-p:leading-relaxed
                       prose-ul:list-disc prose-ol:list-decimal
                       prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4
                       prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                       prose-img:rounded-lg prose-img:shadow-md
                       prose-a:text-blue-600 prose-a:hover:text-blue-800"
            dangerouslySetInnerHTML={{ __html: post.content_uk || '' }}
          />
        </div>

        {/* Про автора */}
        {post.author && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Про автора</h3>
            <div className="flex items-start gap-4">
              {post.author.avatar_url && (
                <OptimizedImage
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{post.author.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.author.bio_uk}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Схожі статті */}
        <RelatedPosts posts={relatedPosts} currentPostId={post.id} />

        {/* CTA блок */}
        <CTABlock
          title="Готові впровадити AI у свій бізнес?"
          description="Отримайте безкоштовну консультацію від наших експертів та дізнайтесь, як штучний інтелект може допомогти саме вашому бізнесу."
          buttonText="Отримати консультацію"
          buttonLink="/contact"
          variant="primary"
        />
      </article>
    </BlogLayout>
  )
}

export default BlogPost