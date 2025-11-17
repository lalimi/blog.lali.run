import React from 'react';
import BlogLayout from '../../components/blog/BlogLayout';

const ContactsPage = () => {
  return (
    <BlogLayout 
      title="Контакти - BlackSea Blog"
      description="Зв'яжіться з нами для консультацій з AI, автоматизації та цифрових продуктів для вашого бізнесу"
    >
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Зв'яжіться з нами
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Маєте питання про AI, автоматизацію або цифрові продукти? 
              Хочете консультацію для вашого бізнесу? Напишіть нам!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Напишіть нам</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше ім'я
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон (необов'язково)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+380XXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                    Тема звернення
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent"
                    required
                  >
                    <option value="">Оберіть тему</option>
                    <option value="ai-consultation">Консультація з AI</option>
                    <option value="automation">Автоматизація процесів</option>
                    <option value="digital-product">Цифровий продукт</option>
                    <option value="partnership">Партнерство</option>
                    <option value="other">Інше</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Повідомлення
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal-primary focus:border-transparent resize-none"
                    placeholder="Розкажіть про ваш проект або поставте запитання..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn--accent text-white font-medium py-3 rounded-lg hover:filter hover:saturate-105 hover:brightness-105 transition-all"
                >
                  Надіслати повідомлення
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-4">
                Відповідаємо протягом 24 годин у робочі дні.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Контактна інформація</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="font-body text-gray-600">hello@blacksea-blog.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 mb-1">Telegram</h3>
                    <p className="font-body text-gray-600">@blacksea_blog</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-light rounded-full flex items-center justify-center text-white flex-shrink-0">
                    🌐
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 mb-1">Соціальні мережі</h3>
                    <div className="space-y-2">
                      <a href="https://threads.net/@blacksea_blog" target="_blank" rel="noopener noreferrer" className="block text-deep-teal-primary hover:text-deep-teal-accent transition-colors">
                        Threads: @blacksea_blog
                      </a>
                      <a href="https://t.me/blacksea_blog" target="_blank" rel="noopener noreferrer" className="block text-deep-teal-primary hover:text-deep-teal-accent transition-colors">
                        Telegram-канал
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-support rounded-full flex items-center justify-center text-white flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 mb-1">Години роботи</h3>
                    <p className="font-body text-gray-600">
                      Пн-Пт: 9:00 - 18:00<br />
                      Сб-Нд: вихідні
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Часті запитання</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Скільки коштує консультація?</h4>
                    <p className="text-sm text-gray-600">
                      Перша консультація (30 хв) - безкоштовна. Після цього вартість залежить від складності проекту.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Чи працюєте з малим бізнесом?</h4>
                    <p className="text-sm text-gray-600">
                      Так! У нас є рішення для бізнесу будь-якого розміру - від стартапів до великих компаній.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Чи є гарантія на результати?</h4>
                    <p className="text-sm text-gray-600">
                      Ми гарантуємо якість наших рішень та надаємо підтримку після впровадження.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-deep-teal-primary rounded-2xl p-8 text-center text-white mt-16">
            <h2 className="font-display text-2xl font-bold mb-4">Готові почати?</h2>
            <p className="font-body text-lg text-gray-200 mb-6">
              Отримайте безкоштовну консультацію та дізнайтеся, як AI може покращити ваш бізнес
            </p>
            <a
              href="https://t.me/blacksea_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z"/>
              </svg>
              <span>Зв'язатися у Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default ContactsPage;