import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-deep-teal-primary text-white mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center">
          <h3 className="text-lg md:text-2xl font-display font-bold mb-3 md:mb-4">Лаліта Мірошниченко</h3>
          <p className="text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto font-body text-sm md:text-base px-2">
            Фаундерка української платформи для цифрових креаторів
          </p>
          
          {/* Соціальні мережі */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 md:mb-8">
            <a
              href="https://www.threads.net/@lali.mi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors font-body text-center"
            >
              <span className="text-base md:text-lg font-semibold font-display">Threads</span>
              <br />
              <span className="text-xs md:text-sm">@lali.mi</span>
            </a>
            <a
              href="https://t.me/lalimi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors font-body text-center"
            >
              <span className="text-base md:text-lg font-semibold font-display">Telegram</span>
              <br />
              <span className="text-xs md:text-sm">@lalimi</span>
            </a>
            <a
              href="https://blacksea.click"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors font-body text-center"
            >
              <img 
                src="/logo.svg" 
                alt="BlackSea" 
                className="h-8 md:h-10 hover:opacity-80 transition-opacity"
              />
              <br />
              <span className="text-xs md:text-sm">blacksea.click</span>
            </a>
          </div>

          {/* Навігація */}
          <div className="flex flex-wrap justify-center gap-4 md:space-x-6 mb-6 md:mb-8">
            <Link to="/blog" className="text-blue-200 hover:text-white transition-colors font-body">
              Блог
            </Link>
            <Link to="/services" className="text-blue-200 hover:text-white transition-colors font-body">
              Послуги
            </Link>
            <Link to="/about" className="text-blue-200 hover:text-white transition-colors font-body">
              Про нас
            </Link>
            <Link to="/contact" className="text-blue-200 hover:text-white transition-colors font-body">
              Контакти
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
              © 2025 BlackSea. Створюємо українську платформу для цифрових креаторів.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}