import React from 'react';
import BlogLayout from '../components/blog/BlogLayout';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const HomePage = () => {
  // Mock data for blog posts - in real app this would come from CMS/database
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Як AI змінює український бізнес: Топ-5 кейсів 2024',
      excerpt: 'Досліджуємо, як українські компанії використовують штучний інтелект для оптимізації процесів та збільшення прибутку.',
      slug: 'ai-zminyuye-ukrayinskyy-biznes',
      category: 'AI для бізнесу',
      date: '2024-11-15',
      readTime: '8 хв',
      image: '/images/blog/ai-business.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'Автоматизація з Make.com: Повний гайд для початківців',
      excerpt: 'Крок за кроком налаштовуємо автоматизацію рутинних задач за допомогою популярної платформи Make.com',
      slug: 'avtomatyzaciya-make-com',
      category: 'Автоматизація процесів',
      date: '2024-11-14',
      readTime: '12 хв',
      image: '/images/blog/automation.jpg'
    },
    {
      id: '3',
      title: 'Monobank API: Як інтегрувати платежі у свій продукт',
      excerpt: 'Технічний гайд з підключення платіжної системи Monobank до вашого веб-додатку',
      slug: 'monobank-api-intehraciya',
      category: 'Цифрові продукти',
      date: '2024-11-13',
      readTime: '15 хв',
      image: '/images/blog/monobank.jpg'
    },
    {
      id: '4',
      title: 'Огляд Claude 3: Найкращий AI-асистент для контенту?',
      excerpt: 'Тестуємо нову модель від Anthropic та порівнюємо з ChatGPT для створення контенту',
      slug: 'oglyad-claude-3',
      category: 'AI-інструменти',
      date: '2024-11-12',
      readTime: '6 хв',
      image: '/images/blog/claude-review.jpg'
    },
    {
      id: '5',
      title: 'SEO для українських блогів: Повний чек-лист 2024',
      excerpt: 'Актуальні поради з оптимізації контенту для української аудиторії та пошукових систем',
      slug: 'seo-dlya-ukrayinskyh-blogiv',
      category: 'SEO і контент-маркетинг',
      date: '2024-11-11',
      readTime: '10 хв',
      image: '/images/blog/seo-ukraine.jpg'
    },
    {
      id: '6',
      title: 'Як я запустила свій перший цифровий продукт: Досвід Lali',
      excerpt: 'Особиста історія створення та запуску цифрового продукту від засновниці BlackSea',
      slug: 'miy-pershyj-czyfrovyj-produkt',
      category: 'Lali: особисте',
      date: '2024-11-10',
      readTime: '7 хв',
      image: '/images/blog/lali-story.jpg'
    }
  ];

  const popularPosts = blogPosts.slice(0, 3);
  const latestPosts = blogPosts;

  return (
    <BlogLayout>
      {/* Hero Section */}
      <section className="hero--teal py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Блог про ІІ, автоматизацію та цифрові продукти
            </h1>
            <p className="font-body text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Практичні поради, кейси та інструменти для українських підприємців, 
              які хочуть оптимізувати бізнес за допомогою технологій
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#latest-posts" className="btn--accent text-white font-medium text-lg inline-flex items-center justify-center">
                Читати блог
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              <a 
                href="https://t.me/blacksea_blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                Підписатися у Telegram
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section id="latest-posts" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Останні статті
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Свіжі матеріали про AI, автоматизацію та цифрові продукти
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article key={post.id} className="blog-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-deep-teal-primary to-deep-teal-accent flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <div className="text-sm">{post.category}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{new Date(post.date).toLocaleDateString('uk-UA')}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-deep-teal-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="font-body text-base text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="btn--accent text-white font-medium inline-flex items-center"
                  >
                    Читати
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn--accent text-white font-medium text-lg inline-flex items-center">
              Переглянути всі статті
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярне
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Найбільш читані матеріали цього місяця
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPosts.map((post, index) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-deep-teal-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Найпопулярніше</span>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-deep-teal-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="font-body text-base text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-deep-teal-primary font-medium hover:text-deep-teal-accent transition-colors"
                  >
                    Читати →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16 bg-deep-teal-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Отримайте безкоштовний гайд
          </h2>
          <p className="font-body text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            «5 AI-інструментів, які зекономлять вам 10 годин на тиждень» - практичний гайд з прикладами використання
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-deep-teal-accent"
                required
              />
              <button
                type="submit"
                className="bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Отримати гайд
              </button>
            </div>
          </form>
          
          <p className="text-sm text-gray-300 mt-4">
            Без спаму. Тільки корисний контент про AI та автоматизацію.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
};

export default HomePage;
