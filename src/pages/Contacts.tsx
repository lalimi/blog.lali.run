import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contacts() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-semibold" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>
                BlackSea
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Головна
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-gray-900 transition-colors">
                Послуги
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                Про нас
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors">
                Блог
              </Link>
              <Link to="/contacts" className="text-gray-700 hover:text-gray-900 transition-colors">
                Контакти
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Головна
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Послуги
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Про Нас
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Блог
                </Link>
                <Link to="/contacts" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Контакти
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-teal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            Контакти
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Зв'яжіться з нами для отримання консультації та замовлення послуг
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                Напишіть нам
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ім'я *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ваше ім'я"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Тема повідомлення *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Тема вашого звернення"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Повідомлення *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ваше повідомлення..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Відправити повідомлення
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                  Наші контакти
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Адреса</h3>
                      <p className="text-gray-600">м. Одеса, вул. Дерибасівська 15, офіс 304</p>
                      <p className="text-gray-600">65026, Україна</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                      <p className="text-gray-600">+380 (67) 123-45-67</p>
                      <p className="text-gray-600">+380 (48) 701-23-45</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@blacksea.ua</p>
                      <p className="text-gray-600">support@blacksea.ua</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Графік роботи</h3>
                      <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-gray-600">Сб-Нд: вихідні</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                  Соціальні мережі
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <span className="font-semibold">FB</span>
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors">
                    <span className="font-semibold">TG</span>
                  </a>
                  <a href="#" className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors">
                    <span className="font-semibold">YT</span>
                  </a>
                  <a href="#" className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors">
                    <span className="font-semibold">IN</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Як нас знайти
            </h2>
            <p className="text-lg text-gray-600">
              Ми знаходимося в центрі Одеси, поруч з Дерибасівською
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Карта буде тут</p>
                <p className="text-gray-500 text-sm mt-2">Google Maps або OpenStreetMap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            Готові розпочати співпрацю?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Зв'яжіться з нами сьогодні та отримайте безкоштовну консультацію по вашому проєкту
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+380671234567"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Подзвонити нам
            </a>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Наші послуги
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                BlackSea
              </h3>
              <p className="text-gray-400">
                Розробка веб-сайтів та цифрових рішень для вашого бізнесу.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Посилання</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Головна</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Послуги</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Про нас</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Блог</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакти</h4>
              <ul className="space-y-2 text-gray-400">
                <li>м. Одеса, вул. Дерибасівська 15</li>
                <li>+380 (67) 123-45-67</li>
                <li>info@blacksea.ua</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соціальні мережі</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  FB
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Telegram</span>
                  TG
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  YT
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlackSea. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}