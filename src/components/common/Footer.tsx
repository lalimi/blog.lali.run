import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-deep-teal-900 via-deep-teal-800 to-deep-teal-950 text-white mt-12 md:mt-20 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-deep-teal-bright/5 via-transparent to-transparent opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          {/* Main heading */}
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 bg-gradient-to-r from-white via-deep-teal-100 to-deep-teal-200 bg-clip-text text-transparent">
            Лаліта Мірошниченко
          </h3>
          <p className="text-deep-teal-100 mb-8 max-w-2xl mx-auto font-body text-base md:text-lg px-2">
            Фаундерка української платформи для цифрових креаторів
          </p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <a
              href="https://www.threads.net/@lali.mi"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-deep-teal-bright/50 transition-all duration-300 hover:shadow-glow"
            >
              <span className="text-lg font-semibold font-display text-white group-hover:text-deep-teal-bright transition-colors">Threads</span>
              <br />
              <span className="text-sm text-deep-teal-200">@lali.mi</span>
            </a>

            <a
              href="https://t.me/lalimi"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-deep-teal-bright/50 transition-all duration-300 hover:shadow-glow"
            >
              <span className="text-lg font-semibold font-display text-white group-hover:text-deep-teal-bright transition-colors">Telegram</span>
              <br />
              <span className="text-sm text-deep-teal-200">@lalimi</span>
            </a>

            <a
              href="https://blacksea.click"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-deep-teal-bright/50 transition-all duration-300 hover:shadow-glow flex flex-col items-center"
            >
              <img
                src="/logo.svg"
                alt="BlackSea"
                className="h-10 mb-1 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
              />
              <span className="text-sm text-deep-teal-200">blacksea.click</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
            {[
              { to: '/blog', label: 'Блог' },
              { to: '/services', label: 'Послуги' },
              { to: '/about', label: 'Про нас' },
              { to: '/contact', label: 'Контакти' },
              { to: '/privacy', label: 'Політика конфіденційності' },
              { to: '/terms', label: 'Умови використання' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-deep-teal-200 hover:text-white font-body transition-all duration-300 group px-2 py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-teal-bright group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-deep-teal-300 font-body text-sm md:text-base">
              © 2025 BlackSea. Створюємо українську платформу для цифрових креаторів.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}