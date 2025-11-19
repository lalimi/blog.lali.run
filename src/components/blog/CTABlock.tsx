import React from 'react'
import { Link } from 'react-router-dom'

interface CTABlockProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  variant?: 'primary' | 'secondary' | 'accent'
}

const CTABlock: React.FC<CTABlockProps> = ({
  title = 'Готові автоматизувати свій бізнес?',
  description = 'Отримайте безкоштовну консультацію від наших експертів та дізнайтесь, як AI може допомогти саме вашому бізнесу.',
  buttonText = 'Отримати консультацію',
  buttonLink = '/contact',
  variant = 'primary'
}) => {
  const variants = {
    primary: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-white'
    },
    secondary: {
      bg: 'bg-gray-800',
      hover: 'hover:bg-gray-900',
      text: 'text-white'
    },
    accent: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-white'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className="bg-gradient-to-r from-[#E2E2E0] to-[#2B7574] rounded-lg p-8 my-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#0E2931] mb-4">
          {title}
        </h3>
        <p className="text-[#0E2931] mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        <Link
          to={buttonLink}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            currentVariant.bg
          } ${currentVariant.hover} ${currentVariant.text}`}
        >
          {buttonText}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default CTABlock