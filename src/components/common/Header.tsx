import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-premium'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.svg"
              alt="BlackSea"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${isActive('/')
                  ? 'text-deep-teal-700'
                  : 'text-gray-700 hover:text-deep-teal-600'
                }`}
            >
              <span className="relative z-10">Головна</span>
              {isActive('/') && (
                <span className="absolute inset-0 bg-gradient-teal opacity-10 rounded-lg" />
              )}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-teal-bright transition-all duration-300 group-hover:w-full w-0" />
            </Link>

            <Link
              to="/blog"
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${isActive('/blog')
                  ? 'text-deep-teal-700'
                  : 'text-gray-700 hover:text-deep-teal-600'
                }`}
            >
              <span className="relative z-10">Блог</span>
              {isActive('/blog') && (
                <span className="absolute inset-0 bg-gradient-teal opacity-10 rounded-lg" />
              )}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-teal-bright transition-all duration-300 group-hover:w-full w-0" />
            </Link>

            {/* Premium CTA Button */}
            <Link
              to="/admin/blog"
              className="ml-4 relative px-6 py-2.5 font-medium text-white bg-gradient-teal rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-glow"
            >
              <span className="relative z-10">Адмін</span>
              <span className="absolute inset-0 bg-gradient-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:text-deep-teal-600 hover:bg-deep-teal-50 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive('/')
                  ? 'text-deep-teal-700 bg-gradient-teal bg-opacity-10'
                  : 'text-gray-700 hover:text-deep-teal-600 hover:bg-deep-teal-50'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Головна
            </Link>
            <Link
              to="/blog"
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive('/blog')
                  ? 'text-deep-teal-700 bg-gradient-teal bg-opacity-10'
                  : 'text-gray-700 hover:text-deep-teal-600 hover:bg-deep-teal-50'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Блог
            </Link>
            <Link
              to="/admin/blog"
              className="block px-4 py-3 rounded-xl font-medium text-white bg-gradient-teal hover:shadow-glow transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Адмін
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}