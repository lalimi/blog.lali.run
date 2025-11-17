import React from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes
}) => {
  // Генеруємо srcset для різних розмірів зображень
  const generateSrcSet = (src: string) => {
    if (!src || src.startsWith('data:')) return src
    
    const baseUrl = src.split('?')[0]
    const params = src.includes('?') ? `?${src.split('?')[1]}` : ''
    
    return [
      `${baseUrl}${params ? params + '&' : '?'}w=320 320w`,
      `${baseUrl}${params ? params + '&' : '?'}w=640 640w`,
      `${baseUrl}${params ? params + '&' : '?'}w=768 768w`,
      `${baseUrl}${params ? params + '&' : '?'}w=1024 1024w`,
      `${baseUrl}${params ? params + '&' : '?'}w=1280 1280w`
    ].join(', ')
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      sizes={sizes || '(max-width: 640px) 100vw, (max-width: 768px) 90vw, 800px'}
      srcSet={generateSrcSet(src)}
      decoding="async"
    />
  )
}

export default OptimizedImage