import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Хедер */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BlackSea Digital</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
                Блог
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">
                Послуги
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                Про нас
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Контакти
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Герой секція */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI та автоматизація для{' '}
            <span className="text-blue-600">українського бізнесу</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Допомагаємо українським компаніям впроваджувати сучасні технології штучного інтелекту 
            та автоматизацію для підвищення ефективності бізнесу.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Читати блог
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Отримати консультацію
            </Link>
          </div>
        </div>

        {/* Останні статті */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Останні статті
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Як AI змінює український бізнес в 2024
                </h4>
                <p className="text-gray-600 mb-4">
                  Досліджуємо, як штучний інтелект трансформує основні галузі української економіки.
                </p>
                <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                  Читати далі →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  TOP-10 інструментів автоматизації
                </h4>
                <p className="text-gray-600 mb-4">
                  Огляд найефективніших інструментів для автоматизації бізнес-процесів.
                </p>
                <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                  Читати далі →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Повний гайд з SEO для України
                </h4>
                <p className="text-gray-600 mb-4">
                  Комплексний посібник з пошукової оптимізації для українського ринку.
                </p>
                <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                  Читати далі →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">BlackSea Digital</h3>
            <p className="text-gray-400 mb-4">
              Допомагаємо українському бізнесу впроваджувати сучасні технології та автоматизацію.
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Умови використання
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Контакти
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400">© 2024 BlackSea Digital. Всі права захищені.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}