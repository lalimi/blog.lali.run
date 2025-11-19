import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="BlackSea" className="h-8 w-auto" />
          </Link>

          {/* Десктоп навігація */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${isActive('/')
                  ? 'text-deep-teal-600 border-b-2 border-deep-teal-600 pb-1'
                  : 'text-gray-700 hover:text-deep-teal-600'
                }`}
            >
              Головна
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-colors ${isActive('/blog')
                  ? 'text-deep-teal-600 border-b-2 border-deep-teal-600 pb-1'
                  : 'text-gray-700 hover:text-deep-teal-600'
                }`}
            >
              Блог
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
              className={`block px-3 py-2 rounded-md transition-colors ${isActive('/')
                  ? 'text-deep-teal-600 bg-deep-teal-50 font-medium'
                  : 'text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Головна
            </Link>
            <Link
              to="/blog"
              className={`block px-3 py-2 rounded-md transition-colors ${isActive('/blog')
                  ? 'text-deep-teal-600 bg-deep-teal-50 font-medium'
                  : 'text-gray-700 hover:text-deep-teal-600 hover:bg-gray-50'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Блог
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}