import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Services() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const services = [
    {
      title: "SEO Оптимізація",
      description: "Комплексна оптимізація вашого сайту для пошукових систем. Підвищення видимості та органічного трафіку.",
      features: ["Технічний аудит", "Ключові слова", "Контент стратегія", "Лінкбілдинг"],
      price: "від 15 000 грн/міс",
      icon: "🔍"
    },
    {
      title: "AI Автоматизація",
      description: "Впровадження штучного інтелекту для автоматизації бізнес-процесів та підвищення ефективності.",
      features: ["Чат-боти", "Автоматизація процесів", "Аналіз даних", "Персоналізація"],
      price: "від 25 000 грн",
      icon: "🤖"
    },
    {
      title: "Digital Стратегія",
      description: "Розробка комплексної цифрової стратегії для вашого бізнесу з урахуванням особливостей українського ринку.",
      features: ["Аналіз ринку", "Конкурентна розвідка", "Стратегія просування", "Метрики успіху"],
      price: "від 10 000 грн",
      icon: "📊"
    },
    {
      title: "Контент Маркетинг",
      description: "Створення якісного контенту, який привертає увагу та конвертує відвідувачів у клієнтів.",
      features: ["Копірайтинг", "SEO-контент", "Візуальний контент", "Контент-план"],
      price: "від 8 000 грн/міс",
      icon: "✍️"
    },
    {
      title: "Email Маркетинг",
      description: "Налаштування ефективних email-кампаній для залучення та утримання клієнтів.",
      features: ["Автоматизація", "Сегментація", "A/B тестування", "Аналітика"],
      price: "від 5 000 грн/міс",
      icon: "📧"
    },
    {
      title: "Telegram Маркетинг",
      description: "Просування вашого бізнесу в Telegram - одному з найпопулярніших месенджерів в Україні.",
      features: ["Канали", "Чат-боти", "Реклама", "Аналітика"],
      price: "від 7 000 грн/міс",
      icon: "📱"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Хедер */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl md:text-2xl font-semibold text-gray-900 hover:text-deep-teal-600 transition-colors" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>
                BlackSea
              </Link>
            </div>
            
            {/* Десктоп навігація */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-deep-teal-600 font-medium transition-colors">
                Головна
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-deep-teal-600 font-medium transition-colors">
                Блог
              </Link>
              <Link to="/services" className="text-deep-teal-600 font-medium border-b-2 border-deep-teal-600 pb-1">
                Послуги
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-deep-teal-600 font-medium transition-colors">
                Про нас
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-deep-teal-600 font-medium transition-colors">
                Контакти
              </Link>
            </nav>
            
            {/* Мобільне меню кнопка */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-deep-teal-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Мобільне меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Головна
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Блог
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-deep-teal-600 bg-deep-teal-50 font-medium rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Послуги
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Про нас
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакти
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero секція */}
      <div className="bg-hero-teal text-white py-12 md:py-20 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>
              Наші Послуги
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-1">
              Комплексні digital-рішення для українського бізнесу. Підвищуємо ефективність через сучасні технології.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12">
        {/* Секція послуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="text-deep-teal-600 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-deep-teal-600">{service.price}</span>
                <button className="bg-deep-teal-600 text-white px-4 py-2 rounded-lg hover:bg-deep-teal-700 transition-colors">
                  Замовити
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA секція */}
        <div className="bg-gradient-to-r from-deep-teal-primary to-deep-teal-accent rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готові розпочати?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Зв'яжіться з нами для безкоштовної консультації. Ми допоможемо обрати оптимальне рішення для вашого бізнесу.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Зв'язатися з нами
          </Link>
        </div>
      </div>
    </div>
  )
}