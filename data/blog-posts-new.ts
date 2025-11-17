export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Контент буде завантажуватись окремо
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  categoryId: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  readTime: number;
  views: number;
  likes: number;
  commentsCount: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  meta: {
    wordCount?: number;
    lastModifiedBy?: string;
    revision?: number;
  };
}

// Прикладова структура для демонстрації, без повного контенту
export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Як створити цифровий продукт, який купують в Україні: Повний гайд для креаторів',
    slug: 'yak-stvoryty-tsyfrovyj-produkt-povnyj-gajd',
    excerpt: 'Покрокова інструкція створення цифрового продукту від ідеї до першого продажу. Вибір ніші, створення контенту, ціноутворення, просування.',
    author: {
      name: 'Лалі Мірошниченко',
      bio: 'Засновниця BlackSea, експерт з цифрових продуктів та креаторської економіки. Допомогла 100+ креаторам запустити успішні продукти.',
      avatar: '/images/authors/lali-miroshnychenko.jpg'
    },
    categoryId: '1',
    tags: ['цифрові продукти', 'створення продукту', 'український ринок', 'гайд'],
    featured: true,
    published: true,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-15',
    readTime: 12,
    views: 1250,
    likes: 89,
    commentsCount: 23,
    seo: {
      title: 'Як створити цифровий продукт, який купують в Україні: Повний гайд для креаторів',
      description: 'Покрокова інструкція створення цифрового продукту від ідеї до першого продажу. Вибір ніші, створення контенту, ціноутворення.',
      keywords: ['цифровий продукт Україна', 'створення продукту', 'креатор гайд', 'продаж цифрових товарів']
    },
    meta: {
      wordCount: 2800,
      revision: 2
    }
  },
  {
    id: '2',
    title: 'Креаторська економіка в Україні 2024: Скільки заробляють топові креатори',
    slug: 'kreatorska-ekonomika-ukraine-2024-zarobitok',
    excerpt: 'Дослідження доходів українських креаторів. Реальні цифри, платформи, стратегії монетизації, прогнози на рік.',
    author: {
      name: 'Олександр Коваль',
      bio: 'Аналітик креаторської економіки, дослідник цифрових трендів. Спеціалізується на українському ринку цифрових продуктів.',
      avatar: '/images/authors/oleksandr-koval.jpg'
    },
    categoryId: '2',
    tags: ['креаторська економіка', 'доходи креаторів', 'український ринок', 'аналітика'],
    featured: false,
    published: true,
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    publishedAt: '2024-01-12',
    readTime: 15,
    views: 980,
    likes: 67,
    commentsCount: 18,
    seo: {
      title: 'Креаторська економіка в Україні 2024: Доходи топових креаторів',
      description: 'Дослідження доходів українських креаторів. Реальні цифри, платформи, стратегії монетизації.',
      keywords: ['креаторська економіка Україна', 'доходи креаторів', 'топові креатори', 'монетизація контенту']
    },
    meta: {
      wordCount: 3200,
      revision: 1
    }
  },
  {
    id: '3',
    title: 'Нові функції BlackSea: Як використовувати систему знижок для підвищення продажів',
    slug: 'blacksea-novi-funkciyi-systema-znyzhok',
    excerpt: 'Огляд нової системи знижок BlackSea. Як налаштувати, які стратегії використовувати, приклади успішних кампаній.',
    author: {
      name: 'Команда BlackSea',
      bio: 'Офіційний блог платформи BlackSea. Новини, оновлення, гайди по використанню платформи.',
      avatar: '/images/authors/blacksea-team.jpg'
    },
    categoryId: '3',
    tags: ['BlackSea', 'нові функції', 'система знижок', 'продажі'],
    featured: false,
    published: true,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    publishedAt: '2024-01-10',
    readTime: 8,
    views: 567,
    likes: 34,
    commentsCount: 12,
    seo: {
      title: 'Нові функції BlackSea: Система знижок для підвищення продажів',
      description: 'Огляд нової системи знижок BlackSea. Як налаштувати, які стратегії використовувати.',
      keywords: ['BlackSea оновлення', 'система знижок', 'нові функції', 'продажі через BlackSea']
    },
    meta: {
      wordCount: 1500,
      revision: 1
    }
  },
  {
    id: '4',
    title: 'Як правильно оформити доходи від цифрових продуктів: Податки та платежі для ФОП 2024',
    slug: 'yak-pravylno-oformyty-dokhody-fop-2024',
    excerpt: 'Повний гайд по оподаткуванню доходів від цифрових продуктів для ФОП в Україні. Які групи вибрати, як звітувати, поради від бухгалтера.',
    author: {
      name: 'Марія Шевченко',
      bio: 'Сертифікований бухгалтер, спеціаліст з оподаткування цифрового бізнесу. Допомогла 200+ креаторам налаштувати бухгалтерію.',
      avatar: '/images/authors/mariya-shevchenko.jpg'
    },
    categoryId: '4',
    tags: ['податки', 'ФОП', 'цифрові продукти', 'юридичні аспекти', 'бухгалтерія'],
    featured: true,
    published: true,
    status: 'published',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    publishedAt: '2024-01-08',
    readTime: 18,
    views: 2100,
    likes: 156,
    commentsCount: 45,
    seo: {
      title: 'Як оформити доходи від цифрових продуктів: Податки ФОП 2024',
      description: 'Повний гайд по оподаткуванню доходів від цифрових продуктів для ФОП в Україні.',
      keywords: ['податки ФОП 2024', 'цифрові продукти оподаткування', 'як оформити доходи', 'ФОП для креаторів']
    },
    meta: {
      wordCount: 3500,
      revision: 3
    }
  }
];

// Схема для створення нових постів
export interface CreateBlogPostDTO {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  categoryId: string;
  tags: string[];
  featured?: boolean;
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Схема для оновлення постів
export interface UpdateBlogPostDTO extends Partial<CreateBlogPostDTO> {
  id: string;
  updatedAt: string;
}

// Фільтри для пошуку постів
export interface BlogPostFilters {
  categoryId?: string;
  author?: string;
  status?: 'draft' | 'published' | 'scheduled';
  featured?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Параметри пагінації
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}