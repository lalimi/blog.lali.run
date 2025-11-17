import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  accept?: string
  maxSize?: number // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Завантажити зображення',
  accept = 'image/*',
  maxSize = 5
}) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    
    if (!validTypes.includes(file.type)) {
      setError('Недопустимий формат файлу. Дозволені формати: JPEG, PNG, WebP, GIF')
      return false
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Файл занадто великий. Максимальний розмір: ${maxSize} МБ`)
      return false
    }
    
    return true
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    
    if (!validateFile(file)) {
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Помилка при завантаженні зображення')
      }

      const data = await response.json()
      
      if (data.success && data.imageUrl) {
        onChange(data.imageUrl)
      } else {
        throw new Error(data.error || 'Помилка при завантаженні зображення')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Помилка при завантаженні зображення')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {value ? (
        <div className="relative">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Не вдалося завантажити зображення</p>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            title="Видалити зображення"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={uploading}
            >
              <Upload className="w-4 h-4" />
              Завантажити інше
            </button>
            <button
              type="button"
              onClick={() => window.open(value, '_blank')}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Переглянути
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            {uploading ? 'Завантаження...' : 'Клацніть або перетягніть зображення'}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Підтримуються формати: JPEG, PNG, WebP, GIF (макс. {maxSize} МБ)
          </p>
          <button
            type="button"
            onClick={handleUploadClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={uploading}
          >
            <Upload className="w-4 h-4" />
            Вибрати файл
          </button>
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {error}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

export default ImageUpload