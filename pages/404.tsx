import React from 'react';
import BlogLayout from '../components/blog/BlogLayout';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <BlogLayout 
      title="Сторінку не знайдено - 404 - BlackSea Blog"
      description="Сторінку, яку ви шукаєте, не знайдено. Поверніться на головну або скористайтеся пошуком."
    >
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-deep-teal-primary mb-4">404</div>
            <div className="text-6xl mb-6">🔍</div>
          </div>

          {/* Error Message */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ой! Сторінку не знайдено
          </h1>
          
          <p className="font-body text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Вибачте, але сторінку, яку ви шукаєте, не існує або була переміщена. 
            Можливо, ви зробили помилку в URL або посилання застаріло.
          </p>

          {/* Search Suggestions */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Що ви можете зробити:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-gray-900 mb-2">Повернутися на головну</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Перейдіть на головну сторінку та знайдіть потрібну інформацію там
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-2 btn--accent text-white font-medium px-6 py-2 rounded-lg hover:filter hover:saturate-105 hover:brightness-105 transition-all"
                >
                  <span>На головну</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-semibold text-gray-900 mb-2">Переглянути блог</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Знайдіть цікаві статті про AI, автоматизацію та цифрові продукти
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center space-x-2 bg-deep-teal-accent text-white font-medium px-6 py-2 rounded-lg hover:bg-deep-teal-primary transition-colors"
                >
                  <span>До блогу</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Популярні сторінки:
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/about"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-deep-teal-primary hover:text-white transition-colors"
              >
                Про мене
              </Link>
              <Link 
                href="/resources"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-deep-teal-primary hover:text-white transition-colors"
              >
                Ресурси
              </Link>
              <Link 
                href="/contacts"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-deep-teal-primary hover:text-white transition-colors"
              >
                Контакти
              </Link>
              <Link 
                href="/category/ai-dlya-biznesu"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-deep-teal-primary hover:text-white transition-colors"
              >
                AI для бізнесу
              </Link>
              <Link 
                href="/category/avtomatyzaciya-procesiv"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-deep-teal-primary hover:text-white transition-colors"
              >
                Автоматизація
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-deep-teal-primary rounded-2xl p-8 text-white">
            <h2 className="font-display text-2xl font-bold mb-4">Все ще потрібна допомога?</h2>
            <p className="font-body text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Якщо ви не можете знайти потрібну інформацію, зв'яжіться з нами - ми з радістю допоможемо
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/blacksea_blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z"/>
                </svg>
                <span>Написати у Telegram</span>
              </a>
              <Link 
                href="/contacts"
                className="inline-flex items-center space-x-2 bg-deep-teal-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-deep-teal-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Контактна форма</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default Custom404;