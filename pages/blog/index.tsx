import React, { useState, useMemo } from 'react';
import BlogLayout from '../../components/blog/BlogLayout';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: string;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Mock data for blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Як AI змінює український бізнес: Топ-5 кейсів 2024',
      excerpt: 'Досліджуємо, як українські компанії використовують штучний інтелект для оптимізації процесів та збільшення прибутку.',
      slug: 'ai-zminyuye-ukrayinskyy-biznes',
      category: 'AI для бізнесу',
      categorySlug: 'ai-dlya-biznesu',
      date: '2024-11-15',
      readTime: '8 хв',
      image: '/images/blog/ai-business.jpg',
      tags: ['AI', 'бізнес', 'автоматизація', 'Україна'],
      author: 'Lali'
    },
    {
      id: '2',
      title: 'Автоматизація з Make.com: Повний гайд для початківців',
      excerpt: 'Крок за кроком налаштовуємо автоматизацію рутинних задач за допомогою популярної платформи Make.com',
      slug: 'avtomatyzaciya-make-com',
      category: 'Автоматизація процесів',
      categorySlug: 'avtomatyzaciya-procesiv',
      date: '2024-11-14',
      readTime: '12 хв',
      image: '/images/blog/automation.jpg',
      tags: ['Make.com', 'автоматизація', 'no-code', 'процеси'],
      author: 'Lali'
    },
    {
      id: '3',
      title: 'Monobank API: Як інтегрувати платежі у свій продукт',
      excerpt: 'Технічний гайд з підключення платіжної системи Monobank до вашого веб-додатку',
      slug: 'monobank-api-intehraciya',
      category: 'Цифрові продукти',
      categorySlug: 'czyfrovi-produkty',
      date: '2024-11-13',
      readTime: '15 хв',
      image: '/images/blog/monobank.jpg',
      tags: ['Monobank', 'API', 'платежі', 'розробка'],
      author: 'Lali'
    },
    {
      id: '4',
      title: 'Огляд Claude 3: Найкращий AI-асистент для контенту?',
      excerpt: 'Тестуємо нову модель від Anthropic та порівнюємо з ChatGPT для створення контенту',
      slug: 'oglyad-claude-3',
      category: 'AI-інструменти',
      categorySlug: 'ai-instrumenty',
      date: '2024-11-12',
      readTime: '6 хв',
      image: '/images/blog/claude-review.jpg',
      tags: ['Claude', 'AI', 'контент', 'огляд'],
      author: 'Lali'
    },
    {
      id: '5',
      title: 'SEO для українських блогів: Повний чек-лист 2024',
      excerpt: 'Актуальні поради з оптимізації контенту для української аудиторії та пошукових систем',
      slug: 'seo-dlya-ukrayinskyh-blogiv',
      category: 'SEO і контент-маркетинг',
      categorySlug: 'seo-kontent',
      date: '2024-11-11',
      readTime: '10 хв',
      image: '/images/blog/seo-ukraine.jpg',
      tags: ['SEO', 'контент', 'Україна', 'маркетинг'],
      author: 'Lali'
    },
    {
      id: '6',
      title: 'Як я запустила свій перший цифровий продукт: Досвід Lali',
      excerpt: 'Особиста історія створення та запуску цифрового продукту від засновниці BlackSea',
      slug: 'miy-pershyj-czyfrovyj-produkt',
      category: 'Lali: особисте',
      categorySlug: 'lali-osobyste',
      date: '2024-11-10',
      readTime: '7 хв',
      image: '/images/blog/lali-story.jpg',
      tags: ['старт', 'продукт', 'досвід', 'історія'],
      author: 'Lali'
    }
  ];

  const categories = [
    { name: 'Всі категорії', slug: 'all' },
    { name: 'AI для бізнесу', slug: 'ai-dlya-biznesu' },
    { name: 'Автоматизація процесів', slug: 'avtomatyzaciya-procesiv' },
    { name: 'Цифрові продукти', slug: 'czyfrovi-produkty' },
    { name: 'AI-інструменти', slug: 'ai-instrumenty' },
    { name: 'SEO і контент-маркетинг', slug: 'seo-kontent' },
    { name: 'Lali: особисте', slug: 'lali-osobyste' },
  ];

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  const tags = ['all', ...allTags];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const categoryMatch = selectedCategory === 'all' || post.categorySlug === selectedCategory;
      const tagMatch = selectedTag === 'all' || post.tags.includes(selectedTag);
      return categoryMatch && tagMatch;
    });
  }, [selectedCategory, selectedTag, blogPosts]);

  return (
    <BlogLayout title="Блог - BlackSea" description="Всі статті блогу BlackSea про AI, автоматизацію та цифрові продукти">
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Блог BlackSea
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
              Практичні матеріали про штучний інтелект, автоматизацію процесів та цифрові продукти для українського бізнесу
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категорія
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тег
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'Всі теги' : tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-8">
            <p className="font-body text-gray-600">
              Знайдено {filteredPosts.length} {filteredPosts.length === 1 ? 'статтю' : filteredPosts.length < 5 ? 'статті' : 'статей'}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <h2 className="font-display text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-deep-teal-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="font-body text-base text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full cursor-pointer hover:bg-deep-teal-primary hover:text-white transition-colors"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
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

          {/* No results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                Статей не знайдено
              </h3>
              <p className="font-body text-gray-600 mb-6">
                Спробуйте змінити фільтри або переглянути всі статті
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                className="btn--accent text-white font-medium"
              >
                Показати всі статті
              </button>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogPage;