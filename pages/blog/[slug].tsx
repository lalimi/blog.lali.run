import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlogLayout from '../../components/blog/BlogLayout';
import Link from 'next/link';
import { sanitizeHtml } from '../../src/utils/sanitizeHtml';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    bio: string;
    image: string;
    social: {
      telegram?: string;
      threads?: string;
    };
  };
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  // Mock blog post data - in real app this would come from CMS/database
  const blogPost: BlogPost = {
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
    author: {
      name: 'Lali',
      bio: 'Засновниця BlackSea, експерт з AI та автоматизації процесів. Допомагаю українському бізнесу впроваджувати інноваційні технології.',
      image: '/images/author/lali.jpg',
      social: {
        telegram: 'https://t.me/lali_blacksea',
        threads: 'https://threads.net/@lali_blacksea'
      }
    },
    content: `
<h2 id="introduction">Вступ</h2>
<p>Штучний інтелект вже не є чимось з області фантастики для українського бізнесу. У 2024 році все більше компаній впроваджують AI-рішення для оптимізації процесів, зниження витрат та підвищення ефективності.</p>

<p>У цій статті я поділюся п'ятьма реальними кейсами українських компаній, які успішно інтегрували AI у свої процеси та отримали відчутні результати.</p>

<h2 id="case-1-ecommerce">Кейс 1: E-commerce та персоналізація</h2>
<h3>Проблематика</h3>
<p>Український онлайн-магазин одягу стикнувся з проблемою низької конверсії та великої кількості повернень. Клієнти скаржилися, що складно знайти потрібний розмір та фасон.</p>

<h3>Рішення</h3>
<p>Компанія впровадила AI-систему персоналізації, яка:</p>
<ul>
<li>Аналізує поведінку користувачів на сайті</li>
<li>Рекомендує товари на основі історії переглядів</li>
<li>Підбирає розміри на основі попередніх покупок</li>
<li>Використовує віртуальну примірку</li>
</ul>

<h3>Результати</h3>
<ul>
<li>Зростання конверсії на 35%</li>
<li>Зменшення повернень на 28%</li>
<li>Збільшення середнього чеку на 22%</li>
</ul>

<h2 id="case-2-manufacturing">Кейс 2: Виробництво та прогнозування</h2>
<h3>Проблематика</h3>
<p>Український виробник металоконструкцій страждав від неефективного планування виробництва, що призводило до простоїв або перепродукції.</p>

<h3>Рішення</h3>
<p>Впровадження AI-системи прогнозування попиту, яка:</p>
<ul>
<li>Аналізує історичні дані продажів</li>
<li>Враховує сезонність та ринкові тренди</li>
<li>Прогнозує попит на 3-6 місяців вперед</li>
<li>Оптимізує виробничі графіки</li>
</ul>

<h3>Результати</h3>
<ul>
<li>Зменшення запасів на 40%</li>
<li>Зниження простоїв обладнання на 25%</li>
<li>Економія на зберіганні: 2 млн грн на рік</li>
</ul>

<h2 id="case-3-customer-service">Кейс 3: Клієнтська підтримка</h2>
<h3>Проблематика</h3>
<p>IT-компанія з Києва отримувала понад 1000 запитів на день у службу підтримки, 70% з яких були типовими питаннями.</p>

<h3>Рішення</h3>
<p>Запуск AI-чатбота, який:</p>
<ul>
<li>Відповідає на типові питання автоматично</li>
<li>Класифікує складні запити та передає фахівцям</li>
<li>Працює 24/7 українською та англійською</li>
<li>Навчається на основі історії розмов</li>
</ul>

<h3>Результати</h3>
<ul>
<li>80% типових запитів вирішується автоматично</li>
<li>Зменшення часу відповіді з 2 годин до 15 хвилин</li>
<li>Економія на персоналі: 1.5 млн грн на рік</li>
</ul>

<h2 id="case-4-agriculture">Кейс 4: Сільське господарство</h2>
<h3>Проблематика</h3>
<p>Агрокомпанія на Полтавщині мала проблеми з точним прогнозуванням врожаю та ефективним використанням добрив.</p>

<h3>Рішення</h3>
<p>AI-система точного землеробства, яка:</p>
<ul>
<li>Аналізує супутникові знімки полів</li>
<li>Прогнозує врожайність на основі погодних даних</li>
<li>Рекомендує оптимальні норми добрив</li>
<li>Виявляє хвороби та шкідників на ранніх стадіях</li>
</ul>

<h3>Результати</h3>
<ul>
<li>Збільшення врожайності на 18%</li>
<li>Зменшення витрат на добрива на 30%</li>
<li>Раннє виявлення проблем на 85% полів</li>
</ul>

<h2 id="case-5-finance">Кейс 5: Фінансові послуги</h2>
<h3>Проблематика</h3>
<p>Фінтех-стартап мав проблеми з оцінкою кредитних ризиків, що призводило до високого рівня дефолтів.</p>

<h3>Рішення</h3>
<p>AI-система скорингу, яка:</p>
<ul>
<li>Аналізує понад 500 параметрів позичальника</li>
<li>Використовує альтернативні джерела даних</li>
<li>Прогнозує ймовірність дефолту</li>
<li>Автоматично приймає рішення про видачу кредиту</li>
</ul>

<h3>Результати</h3>
<ul>
<li>Зниження рівня дефолтів на 45%</li>
<li>Збільшення схвалених заявок на 25%</li>
<li>Скорочення часу розгляду з 3 днів до 15 хвилин</li>
</ul>

<h2 id="implementation-tips">Поради з впровадження AI</h2>
<p>На основі досвіду цих компаній, можу виділити кілька ключових рекомендацій:</p>

<h3>1. Почніть з малого</h3>
<p>Не намагайтеся автоматизувати все відразу. Оберіть одну конкретну проблему та вирішіть її за допомогою AI.</p>

<h3>2. Підготуйте дані</h3>
<p>Якість даних - це 80% успіху AI-проекту. Переконайтеся, що у вас є достатньо якісних даних для навчання моделі.</p>

<h3>3. Інвестуйте в команду</h3>
<p>Необхідно мати як мінімум одного фахівця з data science в команді або залучати зовнішніх консультантів.</p>

<h3>4. Враховуйте специфіку України</h3>
<p>Багато готових AI-рішень оптимізовані під західні ринки. Адаптуйте їх під українські реалії, мову та законодавство.</p>

<h2 id="conclusion">Висновки</h2>
<p>AI вже не є розкішшю для великих корпорацій. Це доступний інструмент, який може принести реальну користь бізнесу будь-якого розміру в Україні.</p>

<p>Головне - правильно визначити проблему, обрати відповідне рішення та якісно реалізувати проект. Не бійтеся експериментувати та тестувати нові технології.</p>

<p>Якщо вам потрібна допомога з впровадженням AI у ваш бізнес, звертайтеся - буду рада поділитися досвідом та допомогти знайти оптимальне рішення.</p>

<h2 id="next-steps">Що далі?</h2>
<p>Хочете дізнатися більше про AI для бізнесу? Ось кілька рекомендацій:</p>
<ul>
<li><a href="/category/ai-dlya-biznesu">Перегляньте всі статті про AI для бізнесу</a></li>
<li><a href="/blog/avtomatyzaciya-make-com">Дізнайтеся про автоматизацію з Make.com</a></li>
<li><a href="/resources">Завантажте безкоштовні гайди та чек-листи</a></li>
</ul>
    `
  };

  // Generate table of contents from headings
  const tableOfContents: TableOfContentsItem[] = [];
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/g;
  let match;
  while ((match = headingRegex.exec(blogPost.content)) !== null) {
    tableOfContents.push({
      id: match[2],
      text: match[3],
      level: parseInt(match[1])
    });
  }

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      // Update active section in TOC
      const headings = tableOfContents.map(item => document.getElementById(item.id));
      let currentSection = '';

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.getBoundingClientRect().top <= 100) {
          currentSection = tableOfContents[i].id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  // Social sharing
  const shareOnSocial = (platform: string) => {
    const url = `https://blacksea-blog.com/blog/${blogPost.slug}`;
    const text = `Прочитайте статтю: ${blogPost.title}`;

    switch (platform) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  if (router.isFallback) {
    return <div>Завантаження...</div>;
  }

  return (
    <BlogLayout
      title={`${blogPost.title} - BlackSea Blog`}
      description={blogPost.excerpt}
      ogImage={blogPost.image}
    >
      {/* Reading Progress Bar */}
      <div className="reading-progress">
        <div
          className="reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <article className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Link
                    href={`/category/${blogPost.categorySlug}`}
                    className="text-deep-teal-primary hover:text-deep-teal-accent font-medium"
                  >
                    {blogPost.category}
                  </Link>
                  <span className="mx-2">•</span>
                  <time dateTime={blogPost.date}>
                    {new Date(blogPost.date).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{blogPost.readTime}</span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {blogPost.title}
                </h1>

                <p className="font-body text-xl text-gray-600 leading-relaxed">
                  {blogPost.excerpt}
                </p>
              </header>

              {/* Article Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <div className="w-full h-96 bg-gradient-to-br from-deep-teal-primary to-deep-teal-accent flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <div className="text-lg">{blogPost.category}</div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="blog-article-content"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(blogPost.content)
                }}
              />

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                {/* Tags */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag.toLowerCase()}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-deep-teal-primary hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Поділитися</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => shareOnSocial('telegram')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z" />
                      </svg>
                      <span>Telegram</span>
                    </button>

                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      <span>Twitter</span>
                    </button>

                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </button>

                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Ще по темі</h3>
                  <div className="space-y-4">
                    <Link href="/blog/avtomatyzaciya-make-com" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-display font-medium text-gray-900 mb-1">Автоматизація з Make.com: Повний гайд для початківців</h4>
                      <p className="text-sm text-gray-600">Крок за кроком налаштовуємо автоматизацію рутинних задач</p>
                    </Link>

                    <Link href="/blog/seo-dlya-ukrayinskyh-blogiv" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-display font-medium text-gray-900 mb-1">SEO для українських блогів: Повний чек-лист 2024</h4>
                      <p className="text-sm text-gray-600">Актуальні поради з оптимізації контенту</p>
                    </Link>

                    <Link href="/blog/monobank-api-intehraciya" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-display font-medium text-gray-900 mb-1">Monobank API: Як інтегрувати платежі у свій продукт</h4>
                      <p className="text-sm text-gray-600">Технічний гайд з підключення платіжної системи</p>
                    </Link>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-deep-teal-primary rounded-xl p-8 text-center text-white">
                  <h3 className="font-display text-2xl font-bold mb-4">Сподобалася стаття?</h3>
                  <p className="font-body text-lg mb-6">
                    Підпишіться на наш Telegram-канал, щоб не пропустити нові матеріали про AI та автоматизацію
                  </p>
                  <a
                    href="https://t.me/blacksea_blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z" />
                    </svg>
                    <span>Підписатися у Telegram</span>
                  </a>
                </div>
              </footer>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Table of Contents */}
              <div className="toc bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Зміст</h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm transition-colors ${activeSection === item.id
                        ? 'text-deep-teal-primary font-medium border-l-deep-teal-primary bg-white'
                        : 'text-gray-600 hover:text-gray-900'
                        } ${item.level === 3 ? 'pl-4' : item.level === 4 ? 'pl-6' : ''
                        }`}
                      style={{ paddingLeft: `${(item.level - 2) * 1 + 1}rem` }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Author Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Автор</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-deep-teal-primary to-deep-teal-accent rounded-full flex items-center justify-center text-white font-bold">
                    {blogPost.author.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-display font-medium text-gray-900">{blogPost.author.name}</h4>
                    <p className="text-sm text-gray-600">AI & Automation Expert</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {blogPost.author.bio}
                </p>
                <div className="flex space-x-3">
                  {blogPost.author.social.telegram && (
                    <a
                      href={blogPost.author.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z" />
                      </svg>
                    </a>
                  )}
                  {blogPost.author.social.threads && (
                    <a
                      href={blogPost.author.social.threads}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-deep-teal-primary rounded-xl p-6 text-white">
                <h3 className="font-display text-lg font-semibold mb-4">Не пропустіть нові статті</h3>
                <p className="text-sm text-gray-200 mb-4">
                  Підпишіться на розсилку та отримуйте свіжі матеріали про AI та автоматизацію
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 mb-3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-deep-teal-primary py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Підписатися
                  </button>
                </form>
                <p className="text-xs text-gray-300 mt-3">
                  Без спаму. Можете відписатися в будь-який момент.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Schema.org BlogPosting markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blogPost.title,
            description: blogPost.excerpt,
            image: [`https://blacksea-blog.com${blogPost.image}`],
            author: {
              '@type': 'Person',
              name: blogPost.author.name
            },
            publisher: {
              '@type': 'Organization',
              name: 'BlackSea Blog',
              logo: {
                '@type': 'ImageObject',
                url: 'https://blacksea-blog.com/images/logo.png'
              }
            },
            datePublished: blogPost.date,
            dateModified: blogPost.date,
            mainEntityOfPage: `https://blacksea-blog.com/blog/${blogPost.slug}`
          })
        }}
      />
    </BlogLayout>
  );
};

export default BlogPostPage;