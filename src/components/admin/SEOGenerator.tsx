import React, { useState } from 'react'
import { useAhrefsTracking } from '../../hooks/useAhrefsTracking'

interface SEOGeneratorProps {
  title: string
  content: string
  currentSlug?: string
  onGenerated: (seoData: {
    meta_title_uk: string
    meta_title_en: string
    meta_description_uk: string
    meta_description_en: string
    keywords_uk: string[]
    keywords_en: string[]
    slug: string
  }) => void
  onClose: () => void
}

const SEOGenerator: React.FC<SEOGeneratorProps> = ({ title, content, currentSlug, onGenerated, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { trackSEOEvent } = useAhrefsTracking()
  const [generatedSEO, setGeneratedSEO] = useState<{
    meta_title_uk: string
    meta_title_en: string
    meta_description_uk: string
    meta_description_en: string
    keywords_uk: string[]
    keywords_en: string[]
    slug: string
  } | null>(null)

  const generateSEO = async () => {
    setIsGenerating(true)
    
    try {
      // Відстежуємо подію генерації SEO
      trackSEOEvent('seo_generation_started', {
        title_length: title.length,
        content_length: content.length,
        has_current_slug: !!currentSlug
      })

      // Проста генерація на основі контенту (без AI API)
      const generatedData = {
        meta_title_uk: generateMetaTitle(title, 'uk'),
        meta_title_en: generateMetaTitle(title, 'en'),
        meta_description_uk: generateMetaDescription(content, 'uk'),
        meta_description_en: generateMetaDescription(content, 'en'),
        keywords_uk: generateKeywords(title + ' ' + content, 'uk'),
        keywords_en: generateKeywords(title + ' ' + content, 'en'),
        slug: currentSlug || generateSlug(title)
      }
      
      setGeneratedSEO(generatedData)
      
      // Відстежуємо успішну генерацію
      trackSEOEvent('seo_generation_completed', {
        meta_title_uk_length: generatedData.meta_title_uk.length,
        meta_title_en_length: generatedData.meta_title_en.length,
        meta_description_uk_length: generatedData.meta_description_uk.length,
        meta_description_en_length: generatedData.meta_description_en.length,
        keywords_uk_count: generatedData.keywords_uk.length,
        keywords_en_count: generatedData.keywords_en.length
      })

      onGenerated(generatedData)
    } catch (error) {
      console.error('Помилка генерації SEO:', error)
      
      // Відстежуємо помилку
      trackSEOEvent('seo_generation_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMetaTitle = (title: string, lang: 'uk' | 'en'): string => {
    const maxLength = 60
    const suffix = ' | BlackSea Digital'
    const cleanTitle = title.replace(/<[^>]*>/g, '').trim()
    
    if (lang === 'uk') {
      const variations = [
        cleanTitle,
        `${cleanTitle} - повний гайд`,
        `${cleanTitle} для українського бізнесу`,
        `${cleanTitle} 2024`
      ]
      
      for (const variation of variations) {
        if ((variation + suffix).length <= maxLength) {
          return variation + suffix
        }
      }
    } else {
      const variations = [
        cleanTitle,
        `${cleanTitle} - Complete Guide`,
        `${cleanTitle} for Ukrainian Business`,
        `${cleanTitle} 2024`
      ]
      
      for (const variation of variations) {
        if ((variation + suffix).length <= maxLength) {
          return variation + suffix
        }
      }
    }
    
    return (cleanTitle.substring(0, maxLength - suffix.length - 3) + '...' + suffix)
  }

  const generateMetaDescription = (content: string, lang: 'uk' | 'en'): string => {
    const maxLength = 160
    const cleanContent = content.replace(/<[^>]*>/g, '').trim()
    const sentences = cleanContent.split(/[.!?]/).filter(s => s.trim().length > 10)
    
    if (lang === 'uk') {
      const introPhrases = [
        'Дізнайтеся, ',
        'Повний гайд: ',
        'Експертні поради: ',
        'Як ',
        'Практичний посібник: '
      ]
      
      for (const phrase of introPhrases) {
        const description = phrase + sentences[0]?.trim()
        if (description.length <= maxLength) {
          return description
        }
      }
    } else {
      const introPhrases = [
        'Learn ',
        'Complete guide: ',
        'Expert tips: ',
        'How to ',
        'Practical guide: '
      ]
      
      for (const phrase of introPhrases) {
        const description = phrase + sentences[0]?.trim()
        if (description.length <= maxLength) {
          return description
        }
      }
    }
    
    return cleanContent.substring(0, maxLength - 3) + '...'
  }

  const generateKeywords = (text: string, lang: 'uk' | 'en'): string[] => {
    const stopWords = {
      uk: ['і', 'та', 'в', 'на', 'з', 'для', 'про', 'що', 'як', 'це', 'при', 'до', 'за', 'над', 'під', 'через', 'між', 'але', 'або', 'тому', 'також', 'більше', 'менше', 'дуже', 'так', 'ні'],
      en: ['and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']
    }
    
    const words = text.toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords[lang].includes(word))
    
    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const updateGeneratedSEO = (field: keyof typeof generatedSEO, value: any) => {
    if (generatedSEO) {
      setGeneratedSEO({ ...generatedSEO, [field]: value })
    }
  }

  const addKeyword = (lang: 'uk' | 'en', keyword: string) => {
    if (generatedSEO && keyword.trim()) {
      const field = lang === 'uk' ? 'keywords_uk' : 'keywords_en'
      const currentKeywords = generatedSEO[field]
      if (!currentKeywords.includes(keyword.trim())) {
        updateGeneratedSEO(field, [...currentKeywords, keyword.trim()])
      }
    }
  }

  const removeKeyword = (lang: 'uk' | 'en', keyword: string) => {
    if (generatedSEO) {
      const field = lang === 'uk' ? 'keywords_uk' : 'keywords_en'
      const currentKeywords = generatedSEO[field]
      updateGeneratedSEO(field, currentKeywords.filter(k => k !== keyword))
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">🤖 AI SEO Генератор</h3>
          <p className="text-sm text-gray-600 mt-1">
            Автоматично створює оптимізовані SEO налаштування для вашої статті
          </p>
        </div>
        <button
          onClick={generateSEO}
          disabled={isGenerating || !title || !content}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Генерація...
            </>
          ) : (
            <>
              <span>⚡</span>
              Згенерувати SEO
            </>
          )}
        </button>
      </div>
      
      {!title && !content && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <span>⚠️</span>
            <span className="text-sm">Заповніть назву та контент статті для генерації SEO</span>
          </div>
        </div>
      )}
      
      {generatedSEO && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-800">
                <span>✅</span>
                <span className="text-sm font-medium">SEO налаштування успішно згенеровано!</span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-green-700 hover:text-green-900 text-sm font-medium flex items-center gap-1"
              >
                <span>{isEditing ? '🔒' : '✏️'}</span>
                {isEditing ? 'Завершити' : 'Редагувати'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇺🇦</span>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title (українською)
                </label>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={generatedSEO.meta_title_uk}
                    onChange={(e) => updateGeneratedSEO('meta_title_uk', e.target.value)}
                    className="w-full text-sm text-gray-900 bg-gray-50 p-3 rounded border font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    maxLength={60}
                  />
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_title_uk.length > 60 ? 'text-red-600' : 
                    generatedSEO.meta_title_uk.length > 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_title_uk.length}/60 символів
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded border font-medium">
                    {generatedSEO.meta_title_uk}
                  </div>
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_title_uk.length > 60 ? 'text-red-600' : 
                    generatedSEO.meta_title_uk.length > 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_title_uk.length}/60 символів
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇬🇧</span>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title (англійською)
                </label>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={generatedSEO.meta_title_en}
                    onChange={(e) => updateGeneratedSEO('meta_title_en', e.target.value)}
                    className="w-full text-sm text-gray-900 bg-gray-50 p-3 rounded border font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    maxLength={60}
                  />
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_title_en.length > 60 ? 'text-red-600' : 
                    generatedSEO.meta_title_en.length > 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_title_en.length}/60 символів
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded border font-medium">
                    {generatedSEO.meta_title_en}
                  </div>
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_title_en.length > 60 ? 'text-red-600' : 
                    generatedSEO.meta_title_en.length > 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_title_en.length}/60 символів
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇺🇦</span>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description (українською)
                </label>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={generatedSEO.meta_description_uk}
                    onChange={(e) => updateGeneratedSEO('meta_description_uk', e.target.value)}
                    className="w-full text-sm text-gray-900 bg-gray-50 p-3 rounded border leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    maxLength={160}
                  />
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_description_uk.length > 160 ? 'text-red-600' : 
                    generatedSEO.meta_description_uk.length > 140 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_description_uk.length}/160 символів
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded border leading-relaxed">
                    {generatedSEO.meta_description_uk}
                  </div>
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_description_uk.length > 160 ? 'text-red-600' : 
                    generatedSEO.meta_description_uk.length > 140 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_description_uk.length}/160 символів
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇬🇧</span>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description (англійською)
                </label>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={generatedSEO.meta_description_en}
                    onChange={(e) => updateGeneratedSEO('meta_description_en', e.target.value)}
                    className="w-full text-sm text-gray-900 bg-gray-50 p-3 rounded border leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    maxLength={160}
                  />
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_description_en.length > 160 ? 'text-red-600' : 
                    generatedSEO.meta_description_en.length > 140 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_description_en.length}/160 символів
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded border leading-relaxed">
                    {generatedSEO.meta_description_en}
                  </div>
                  <div className={`text-xs mt-1 ${
                    generatedSEO.meta_description_en.length > 160 ? 'text-red-600' : 
                    generatedSEO.meta_description_en.length > 140 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {generatedSEO.meta_description_en.length}/160 символів
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇺🇦</span>
                <label className="block text-sm font-medium text-gray-700">
                  Ключові слова (українською)
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedSEO.keywords_uk.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    {keyword}
                    {isEditing && (
                      <button
                        onClick={() => removeKeyword('uk', keyword)}
                        className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Додати ключове слово..."
                    className="text-xs px-2 py-1 border rounded"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addKeyword('uk', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                {generatedSEO.keywords_uk.length} ключових слів для SEO
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600">🇬🇧</span>
                <label className="block text-sm font-medium text-gray-700">
                  Ключові слова (англійською)
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedSEO.keywords_en.map((keyword, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    {keyword}
                    {isEditing && (
                      <button
                        onClick={() => removeKeyword('en', keyword)}
                        className="ml-1 text-green-600 hover:text-green-800 font-bold"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Add keyword..."
                    className="text-xs px-2 py-1 border rounded"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addKeyword('en', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                {generatedSEO.keywords_en.length} keywords for SEO
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={generatedSEO.slug}
                  onChange={(e) => updateGeneratedSEO('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))}
                  className="w-full text-sm text-gray-900 bg-gray-50 p-3 rounded border font-mono text-blue-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seo-friendly-url"
                />
              </div>
            ) : (
              <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded border font-mono text-blue-600 break-all">
                {generatedSEO.slug}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              SEO-дружній URL для пошукових систем. Скорочено та оптимізовано.
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onGenerated(generatedSEO)
                // Відстежуємо застосування SEO налаштувань
                trackSEOEvent('seo_settings_applied', {
                  meta_title_uk_length: generatedSEO.meta_title_uk.length,
                  meta_title_en_length: generatedSEO.meta_title_en.length,
                  meta_description_uk_length: generatedSEO.meta_description_uk.length,
                  meta_description_en_length: generatedSEO.meta_description_en.length,
                  keywords_uk_count: generatedSEO.keywords_uk.length,
                  keywords_en_count: generatedSEO.keywords_en.length,
                  slug_length: generatedSEO.slug.length
                })
              }}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <span>✅</span>
              Застосувати SEO налаштування
            </button>
            <button
              onClick={() => setGeneratedSEO(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
            >
              Очистити
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SEOGenerator