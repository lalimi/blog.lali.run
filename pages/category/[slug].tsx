import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BlogLayout from '../../../components/blog/BlogLayout';
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

interface CategoryPageProps {
  category: {
    name: string;
    slug: string;
    description: string;
  };
  posts: BlogPost[];
}

const CategoryPage = ({ category, posts }: CategoryPageProps) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Завантаження...</div>;
  }

  return (
    <BlogLayout 
      title={`${category.name} - BlackSea Blog`}
      description={`Статті з категорії "${category.name}" - практичні матеріали про ${category.name.toLowerCase()}`}
    >
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-deep-teal-primary transition-colors">
                  Головна
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-deep-teal-primary transition-colors">
                  Блог
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{category.name}</li>
            </ol>
          </nav>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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

          {/* No posts */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                Статей у цій категорії поки немає
              </h3>
              <p className="font-body text-gray-600 mb-6">
                Але ми працюємо над новими матеріалами!
              </p>
              <Link href="/blog" className="btn--accent text-white font-medium">
                Переглянути всі статті
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Schema.org CollectionPage markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: category.name,
            description: category.description,
            url: `https://blacksea-blog.com/category/${category.slug}`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://blacksea-blog.com/blog/${post.slug}`,
                name: post.title
              }))
            }
          })
        }}
      />
    </BlogLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  
  // Mock categories data - in real app this would come from database
  const categories = {
    'ai-dlya-biznesu': {
      name: 'AI для бізнесу',
      slug: 'ai-dlya-biznesu',
      description: 'Практичні матеріали про впровадження штучного інтелекту в український бізнес. Кейси, інструменти, поради з реалізації AI-рішень.'
    },
    'avtomatyzaciya-procesiv': {
      name: 'Автоматизація процесів',
      slug: 'avtomatyzaciya-procesiv',
      description: 'Гайди з автоматизації бізнес-процесів. Огляди інструментів, покрокові інструкції, кейси українських компаній.'
    },
    'czyfrovi-produkty': {
      name: 'Цифрові продукти і монетизація',
      slug: 'czyfrovi-produkty',
      description: 'Як створювати та монетизувати цифрові продукти в Україні. Платіжні системи, маркетинг, юридичні аспекти.'
    },
    'ai-instrumenty': {
      name: 'AI-інструменти (огляди)',
      slug: 'ai-instrumenty',
      description: 'Огляди сучасних AI-інструментів для бізнесу. Порівняння, тестування, рекомендації з вибору та використання.'
    },
    'seo-kontent': {
      name: 'SEO і контент-маркетинг',
      slug: 'seo-kontent',
      description: 'Практичні поради з SEO-оптимізації для українських сайтів. Стратегії контент-маркетингу, інструменти, кейси.'
    },
    'lali-osobyste': {
      name: 'Lali: особисте і шлях',
      slug: 'lali-osobyste',
      description: 'Особистий блог Lali про досвід роботи з AI, автоматизацією та цифровими продуктами. Історії, помилки, досягнення.'
    }
  };

  const category = categories[slug as keyof typeof categories];
  
  if (!category) {
    return {
      notFound: true,
    };
  }

  // Mock posts data - filter by category
  const allPosts = [
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

  const posts = allPosts.filter(post => post.categorySlug === slug);

  return {
    props: {
      category,
      posts,
    },
  };
};

export default CategoryPage;