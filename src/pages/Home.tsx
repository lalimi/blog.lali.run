import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg font-body">
      {/* Хедер */}
      <header className="bg-deep-teal-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>BlackSea</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/blog" className="text-blue-100 hover:text-white font-medium transition-colors">
                Блог
              </Link>
              <Link to="/services" className="text-blue-100 hover:text-white font-medium transition-colors">
                Послуги
              </Link>
              <Link to="/about" className="text-blue-100 hover:text-white font-medium transition-colors">
                Про нас
              </Link>
              <Link to="/contact" className="text-blue-100 hover:text-white font-medium transition-colors">
                Контакти
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Герой секція */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-deep-teal-primary via-deep-teal-accent to-deep-teal-muted rounded-3xl p-12 md:p-20 text-center mb-20">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Лаліта Мірошниченко
            </h1>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-blue-200 mb-8">
              Фаундерка BlackSea
            </h2>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed font-body">
            Я створюю BlackSea — українську платформу для цифрових креаторів. 
            Будую продукт, який замінить Gumroad для України. 
            Пишу про ІІ, автоматизацію та запуск стартапів у воєнний час.
          </p>
          <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto font-body">
            Просто. Прямо. По ділу.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="btn--accent inline-flex items-center px-8 py-4 text-lg font-medium rounded-large text-white bg-deep-teal-accent hover:bg-deep-teal-light transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Читати блог
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-200 text-base font-medium rounded-large text-blue-100 bg-transparent hover:bg-blue-900 hover:bg-opacity-20 transition-all duration-200"
            >
              Отримати консультацію
            </Link>
          </div>
        </div>

        {/* Хто я секція */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-3xl font-display font-bold text-brand-text text-center mb-8">
            Хто я
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-brand-text mb-6 leading-relaxed font-body text-base">
              Я Лаліта — фаундерка BlackSea. 
              Підприємиця, яка прийшла з нуля, без інвестицій і без "ідеальних умов".
            </p>
            <p className="text-lg text-brand-text mb-6 leading-relaxed font-body text-base">
              Працюю в реальності, де:
            </p>
            <ul className="text-lg text-brand-text mb-6 space-y-3 max-w-2xl mx-auto font-body text-base">
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-3 mt-1">•</span>
                PayPal не працює,
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-3 mt-1">•</span>
                Stripe недоступний,
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-3 mt-1">•</span>
                українським авторам важко продавати цифрові продукти,
              </li>
              <li className="flex items-start">
                <span className="text-deep-teal-accent mr-3 mt-1">•</span>
                а більшість сервісів не адаптовані під наше законодавство.
              </li>
            </ul>
            <p className="text-lg text-brand-text leading-relaxed font-body text-base">
              Мій шлях — це постійне вивчення, інтуїція, експерименти й готовність робити руками те, що інші делегують п'ятьом командам.
            </p>
          </div>
        </div>

        {/* Місія секція */}
        <div className="mt-20">
          <h3 className="text-3xl font-display font-bold text-brand-text text-center mb-8">
            Моя місія
          </h3>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-deep-teal-primary to-deep-teal-accent rounded-2xl p-8 md:p-12">
            <p className="text-xl text-blue-100 mb-6 leading-relaxed text-center font-body">
              Я хочу, щоб українські креатори могли продавати свої продукти без обходних схем, VPN і хаосу з податками.
            </p>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed text-center font-body">
              Щоб україномовні автори мали свою платформу.
            </p>
            <p className="text-xl text-blue-100 leading-relaxed text-center font-semibold font-body">
              Щоб їхні продукти купували в гривні, швидко, офіційно й без технічних бар'єрів.
            </p>
            <div className="mt-8 text-center">
              <p className="text-lg text-blue-200 italic font-body">
                BlackSea — це не просто стартап. 
                Це спроба змінити правила гри на локальному ринку.
              </p>
            </div>
          </div>
        </div>

        {/* Останні статті */}
        <div className="mt-20">
          <h3 className="text-3xl font-display font-bold text-brand-text text-center mb-12">
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

        {/* Мої проекти */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-display font-bold text-brand-text text-center mb-12">
            Мої проекти
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-blue-600 mb-4">BlackSea</h4>
              <p className="text-gray-700 mb-4">
                Українська платформа для продажу цифрових продуктів.
              </p>
              <p className="text-gray-600 text-sm">
                Мета — стати локальним лідером для всіх UA-креаторів.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-purple-600 mb-4">AI-логія</h4>
              <p className="text-gray-700 mb-4">
                Блог про AI & автоматизацію для підприємців, які хочуть працювати швидше й ефективніше.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-green-600 mb-4">Контент-еко</h4>
              <p className="text-gray-700 mb-4">
                Досліджую алгоритми Threads, будую експериментальний контент-потік.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-orange-600 mb-4">DevOps Roadmap UA</h4>
              <p className="text-gray-700 mb-4">
                PDF guides та корисні продукти для української аудиторії.
              </p>
            </div>
          </div>
        </div>

        {/* Філософія роботи */}
        <div className="mt-20">
          <h3 className="text-3xl font-display font-bold text-brand-text text-center mb-12">
            Моя філософія роботи
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Принципи</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">→</span>
                    Якщо не можеш знайти інструмент — створюй свій.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">→</span>
                    Якщо ринок перенасичений — знайди те, що працює тут, в Україні.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">→</span>
                    Якщо боїшся стартувати — починай із маленьких запусків.
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Підхід</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">→</span>
                    Ти можеш бути одночасно і студентом, і фаундером, і маркетологом свого продукту.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">→</span>
                    Найкращий прогрес — той, який видно вчора, сьогодні і завтра. Не через рік.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA секція */}
        <div className="mt-20 bg-gradient-to-r from-deep-teal-primary via-deep-teal-accent to-deep-teal-muted rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6">
              Я веду свій шлях публічно
            </h3>
            <p className="text-xl mb-8 opacity-90 font-body">
              Якщо хочеш стежити за тим, як створюється BlackSea — підписуйся
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.threads.net/@lali.mi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-gradient-from-support to-teal-gradient-to-light text-white font-semibold rounded-large hover:from-teal-gradient-to-light hover:to-teal-gradient-from-accent transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-center">
                  <div className="font-medium">Threads</div>
                  <div className="text-sm opacity-90">@lali.mi</div>
                </span>
                <svg className="ml-3 w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
              <a
                href="https://t.me/lalimi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-gradient-from-accent to-teal-gradient-to-primary text-white font-semibold rounded-large hover:from-teal-gradient-to-primary hover:to-teal-gradient-from-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-center">
                  <div className="font-medium">Telegram</div>
                  <div className="text-sm opacity-90">@lalimi</div>
                </span>
                <svg className="ml-3 w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
              <a
                href="https://blacksea.click"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-gradient-from-muted to-teal-gradient-to-support text-white font-semibold rounded-large hover:from-teal-gradient-to-support hover:to-teal-gradient-from-light transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-center">
                  <div className="font-medium">Стати раннім креатором</div>
                  <div className="text-sm opacity-90">BlackSea</div>
                </span>
                <svg className="ml-3 w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-4.293 4.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-deep-teal-primary text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-4">Лаліта Мірошниченко</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto font-body">
              Фаундерка BlackSea — української платформи для цифрових креаторів
            </p>
            
            {/* Соціальні мережі */}
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://www.threads.net/@lali.mi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body"
              >
                <span className="text-lg font-semibold font-display">Threads</span>
                <br />
                <span className="text-sm">@lali.mi</span>
              </a>
              <a
                href="https://t.me/lalimi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body"
              >
                <span className="text-lg font-semibold font-display">Telegram</span>
                <br />
                <span className="text-sm">@lalimi</span>
              </a>
              <a
                href="https://blacksea.click"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors font-body"
              >
                <span className="text-lg font-semibold" style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 600 }}>BlackSea</span>
                <br />
                <span className="text-sm">blacksea.click</span>
              </a>
            </div>

            {/* Навігація */}
            <div className="flex justify-center space-x-6 mb-8">
              <Link to="/blog" className="text-blue-200 hover:text-white transition-colors font-body">
                Блог
              </Link>
              <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors font-body">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors font-body">
                Умови використання
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-deep-teal-accent">
              <p className="text-blue-200 font-body">
                © 2024 BlackSea. Створюємо українську платформу для цифрових креаторів.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}