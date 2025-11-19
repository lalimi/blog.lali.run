import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const team = [
    {
      name: "Олександр Коваль",
      position: "CEO & Founder",
      bio: "Експерт з 8-річним досвідом в digital маркетингу. Спеціалізується на SEO та стратегічному плануванні.",
      avatar: "👨‍💼"
    },
    {
      name: "Ірина Петренко",
      position: "AI Розробниця",
      bio: "Інженерка з машинного навчання. Розробляє інноваційні рішення для автоматизації бізнес-процесів.",
      avatar: "👩‍💻"
    },
    {
      name: "Михайло Сидоренко",
      position: "Контент Менеджер",
      bio: "Копірайтер з фокусом на SEO-оптимізований контент. Створює тексти, які продають.",
      avatar: "👨‍🎨"
    }
  ]

  const stats = [
    { number: "50+", label: "Задоволених клієнтів" },
    { number: "8", label: "Років досвіду" },
    { number: "200+", label: "Успішних проєктів" },
    { number: "95%", label: "Клієнтів повертаються" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />

      {/* Hero секція */}
      <div className="bg-hero-teal py-12 md:py-20 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6 text-deep-teal-primary" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>
              Про BlackSea
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-deep-teal-primary/90 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-1">
              Ми - українська digital-компанія, що спеціалізується на сучасних технологіях маркетингу та автоматизації.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12">
        {/* Секція про компанію */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Наша місія
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                BlackSea була заснована з метою допомогти українському бізнесу адаптуватися до цифрової ери. Ми віримо, що сучасні технології повинні бути доступними кожному підприємцю.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Наша команда поєднує глибоку технічну експертизу з розумінням українського ринку. Ми не просто впроваджуємо рішення - ми створюємо стратегії, які працюють саме тут і зараз.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-deep-teal-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E2E2E0] to-[#2B7574] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#0E2931] mb-6">Наші цінності</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-deep-teal-600 mr-4 mt-1">🎯</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Результативність</h4>
                    <p className="text-gray-600 text-sm">Фокус на реальні бізнес-результати, а не на красиві звіти</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-deep-teal-600 mr-4 mt-1">🤝</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Партнерство</h4>
                    <p className="text-gray-600 text-sm">Довгострокові відносини важливіші за одноразові проєкти</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-deep-teal-600 mr-4 mt-1">🚀</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Інновації</h4>
                    <p className="text-gray-600 text-sm">Завжди в пошуку нових рішень для наших клієнтів</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-deep-teal-600 mr-4 mt-1">🇺🇦</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Українськість</h4>
                    <p className="text-gray-600 text-sm">Глибоке розуміння локального ринку та культури</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секція команди */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-deep-teal-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA секція */}
        <div className="bg-gradient-to-r from-[#0E2931] to-[#12484C] rounded-2xl p-8 text-center text-[#E2E2E0]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готові до співпраці?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-[#E2E2E0]">
            Долучайтесь до числа наших задоволених клієнтів. Разом ми зробимо ваш бізнес ще успішнішим!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-deep-teal-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Зв'язатися з нами
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}