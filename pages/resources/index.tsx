import React from 'react';
import BlogLayout from '../../components/blog/BlogLayout';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'checklist' | 'guide' | 'template';
  category: string;
  downloadUrl: string;
  previewImage: string;
  fileSize: string;
  featured?: boolean;
}

const ResourcesPage = () => {
  const resources: Resource[] = [
    {
      id: '1',
      title: '5 AI-інструментів для економії часу',
      description: 'Практичний гайд з прикладами використання AI-інструментів, які допоможуть зекономити 10+ годин на тиждень',
      type: 'pdf',
      category: 'AI-інструменти',
      downloadUrl: '/resources/ai-tools-guide.pdf',
      previewImage: '/images/resources/ai-tools.jpg',
      fileSize: '2.3 MB',
      featured: true
    },
    {
      id: '2',
      title: 'Чек-лист автоматизації бізнесу',
      description: 'Покроковий чек-лист для перевірки готовності вашого бізнесу до автоматизації процесів',
      type: 'checklist',
      category: 'Автоматизація',
      downloadUrl: '/resources/automation-checklist.pdf',
      previewImage: '/images/resources/automation.jpg',
      fileSize: '1.1 MB'
    },
    {
      id: '3',
      title: 'Гайд з інтеграції Monobank API',
      description: 'Технічний гайд з підключення платіжної системи Monobank до вашого веб-додатку',
      type: 'guide',
      category: 'Платежі',
      downloadUrl: '/resources/monobank-api-guide.pdf',
      previewImage: '/images/resources/monobank.jpg',
      fileSize: '3.5 MB'
    },
    {
      id: '4',
      title: 'Шаблони для SEO-контенту',
      description: 'Готові шаблони для створення SEO-оптимізованого контенту для українських блогів',
      type: 'template',
      category: 'SEO',
      downloadUrl: '/resources/seo-templates.zip',
      previewImage: '/images/resources/seo-templates.jpg',
      fileSize: '850 KB'
    },
    {
      id: '5',
      title: 'Пакет AI-інструментів для бізнесу',
      description: 'Повний пакет інструментів штучного інтелекту для оптимізації бізнес-процесів',
      type: 'guide',
      category: 'AI для бізнесу',
      downloadUrl: '/resources/ai-business-package.pdf',
      previewImage: '/images/resources/ai-business.jpg',
      fileSize: '4.2 MB',
      featured: true
    },
    {
      id: '6',
      title: 'Чек-лист запуску цифрового продукту',
      description: 'Покроковий чек-лист для успішного запуску цифрового продукту на українському ринку',
      type: 'checklist',
      category: 'Цифрові продукти',
      downloadUrl: '/resources/digital-product-launch.pdf',
      previewImage: '/images/resources/digital-product.jpg',
      fileSize: '1.8 MB'
    }
  ];

  const categories = ['Всі', 'AI для бізнесу', 'AI-інструменти', 'Автоматизація', 'Платежі', 'SEO', 'Цифрові продукти'];
  const types = ['Всі типи', 'PDF-гайди', 'Чек-листи', 'Шаблони'];

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return 'PDF-гайд';
      case 'checklist': return 'Чек-лист';
      case 'guide': return 'Гайд';
      case 'template': return 'Шаблон';
      default: return type;
    }
  };

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'checklist': return '✅';
      case 'guide': return '📖';
      case 'template': return '📝';
      default: return '📎';
    }
  };

  return (
    <BlogLayout 
      title="Ресурси - BlackSea Blog"
      description="Безкоштовні PDF-гайди, чек-листи, шаблони та AI-пакети для українського бізнесу"
    >
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ресурси
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Безкоштовні гайди, чек-листи, шаблони та AI-пакети, які допоможуть оптимізувати 
              ваш бізнес та впровадити інноваційні технології
            </p>
          </div>

          {/* Lead Magnet */}
          <div className="bg-gradient-to-r from-deep-teal-primary to-deep-teal-accent rounded-2xl p-8 mb-16 text-white text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Отримайте доступ до всіх ресурсів</h2>
            <p className="font-body text-lg mb-8 max-w-2xl mx-auto">
              Підпишіться на нашу розсилку та отримайте безкоштовний доступ до всіх PDF-гайдів, 
              чек-листів та шаблонів для вашого бізнесу
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Отримати доступ
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-200 mt-4">
              Без спаму. Можете відписатися в будь-який момент.
            </p>
          </div>

          {/* Featured Resources */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">Популярні ресурси</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.filter(r => r.featured).map((resource) => (
                <div key={resource.id} className="bg-white border-2 border-deep-teal-primary rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-deep-teal-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                      Популярне
                    </span>
                    <span className="text-sm text-gray-500">{resource.fileSize}</span>
                  </div>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-3xl">{getTypeIcon(resource.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="font-body text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{getTypeLabel(resource.type)}</span>
                        <span>{resource.category}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full btn--accent text-white font-medium py-3 rounded-lg hover:filter hover:saturate-105 hover:brightness-105 transition-all">
                    Завантажити безкоштовно
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* All Resources */}
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">Всі ресурси</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        {getTypeLabel(resource.type)}
                      </span>
                      <span className="text-sm text-gray-500">{resource.fileSize}</span>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="text-2xl">{getTypeIcon(resource.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="font-body text-sm text-gray-600 mb-3">{resource.description}</p>
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{resource.category}</span>
                      </div>
                    </div>
                    <button className="w-full bg-deep-teal-primary text-white font-medium py-2 rounded-lg hover:bg-deep-teal-accent transition-colors">
                      Завантажити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center mt-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Не знайшли потрібний ресурс?</h2>
            <p className="font-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Напишіть нам, якого ресурсу вам не вистачає, і ми створимо його для вас
            </p>
            <Link href="/contacts" className="btn--accent text-white font-medium px-8 py-3 rounded-lg hover:filter hover:saturate-105 hover:brightness-105 transition-all inline-flex items-center">
              Запропонувати ідею
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default ResourcesPage;