import React from 'react';
import BlogLayout from '../../components/blog/BlogLayout';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <BlogLayout 
      title="Про мене - Lali, засновниця BlackSea Blog"
      description="Дізнайтеся більше про Lali - експерта з AI, автоматизації та цифрових продуктів для українського бізнесу"
    >
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-br from-deep-teal-primary to-deep-teal-accent rounded-full mx-auto mb-8 flex items-center justify-center text-white text-4xl font-bold">
              L
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Привіт, я Lali 👋
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Засновниця BlackSea Blog, експерт з штучного інтелекту, автоматизації процесів та цифрових продуктів. 
              Допомагаю українському бізнесу впроваджувати інноваційні технології та оптимізувати процеси.
            </p>
          </div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Моя історія</h2>
              <div className="prose prose-lg max-w-none font-body text-gray-700">
                <p>
                  Мій шлях у світ технологій розпочався 8 років тому, коли я вперше дізналася про можливості 
                  автоматизації для бізнесу. З того часу я допомогла понад 100 українським компаніям впровадити 
                  AI-рішення та оптимізувати їхні процеси.
                </p>
                
                <p>
                  У 2022 році я заснувала BlackSea - платформу, яка об'єднує експертів з AI, автоматизації та 
                  цифрового маркетингу для допомоги українському бізнесу.
                </p>
                
                <p>
                  Моя місія - зробити передові технології доступними для кожного українського підприємця, 
                  незалежно від розміру його бізнесу.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Що я роблю</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Консультації з AI</h3>
                    <p className="font-body text-gray-600">
                      Допомагаю компаніям зрозуміти, як штучний інтелект може покращити їхній бізнес
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Автоматизація процесів</h3>
                    <p className="font-body text-gray-600">
                      Створюю автоматизовані системи, які економлять час та ресурси
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-light rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Цифрові продукти</h3>
                    <p className="font-body text-gray-600">
                      Розробляю цифрові рішення для українського ринку
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-deep-teal-support rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    📝
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Освітній контент</h3>
                    <p className="font-body text-gray-600">
                      Ділюся знаннями через блог, вебінари та онлайн-курси
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">Мої результати</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-teal-primary mb-2">100+</div>
                <div className="font-body text-gray-600">компаній допомогла</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-teal-accent mb-2">50+</div>
                <div className="font-body text-gray-600">AI-проектів реалізовано</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-teal-light mb-2">1000+</div>
                <div className="font-body text-gray-600">читачів блогу</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-teal-medium mb-2">8</div>
                <div className="font-body text-gray-600">років досвіду</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Залишайтеся на зв'язку</h2>
            <p className="font-body text-lg text-gray-600 mb-8">
              Слідкуйте за мною в соціальних мережах, щоб не пропустити корисний контент
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://t.me/lali_blacksea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.18 1.58-.76 5.92-1.07 7.86-.13.78-.39 1.04-.64.95-.56-.18-.98-.82-1.52-1.6-.85-1.18-1.18-1.54-1.93-2.47-.43-.52-.32-.8.22-1.24.52-.42 2.21-1.53 2.29-1.61.08-.08.04-.24-.12-.24s-1.68.42-2.88.72c-.82.2-1.5.02-1.88-.48-.4-.5-.96-1.68-1.32-2.32-.36-.64-.72-.56-1.02-.54-.28.02-.96.08-1.52.44-1.18.72-1.22 2.02-1.2 2.32.02.3.04.64.32 1.18.3.54 1.46 2.52 2.08 3.42.62.9 1.22 1.48.76 1.88-.46.4-1.52.04-2.1-.3-1.18-.68-2.24-1.68-2.34-1.78-.1-.1-.18-.22-.28-.12-.1.1-.1.28.02.5.1.22 1.08 2.98 2.32 4.18 1.24 1.2 2.78 1.6 2.78 1.6s.68.12 1.56-.32c.88-.44 2.1-1.68 2.58-2.22.48-.54 1.04-1.52 1.04-1.52s.16-.32.02-.68z"/>
                </svg>
                <span>Telegram</span>
              </a>
              
              <a
                href="https://threads.net/@lali_blacksea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <span>Threads</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-deep-teal-primary rounded-2xl p-8 text-white">
            <h2 className="font-display text-3xl font-bold mb-4">Хочете співпрацювати?</h2>
            <p className="font-body text-lg text-gray-200 mb-8">
              Якщо у вас є ідея для AI-проекту або потрібна консультація з автоматизації, 
              напишіть мені - буду рада допомогти!
            </p>
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  placeholder="Розкажіть про ваш проект"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-deep-teal-primary py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Надіслати повідомлення
              </button>
            </form>
            <p className="text-center text-sm text-gray-300 mt-4">
              Відповім протягом 24 годин
            </p>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default AboutPage;