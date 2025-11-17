import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../../lib/supabase'
import { BlogPost, BlogCategory, BlogAuthor } from '../../../../lib/supabase'

const AdminBlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [authors, setAuthors] = useState<BlogAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Завантажити статті
      const { data: postsData } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:blog_authors(*)
        `)
        .order('created_at', { ascending: false })

      // Завантажити категорії
      const { data: categoriesData } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('published', true)
        .order('name_uk')

      // Завантажити авторів
      const { data: authorsData } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('published', true)
        .order('name')

      setPosts(postsData || [])
      setCategories(categoriesData || [])
      setAuthors(authorsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublishToggle = async (postId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/blog/posts/${postId}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update publish status')
      }

      // Оновити локальний стан
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, published: !currentStatus }
          : post
      ))
    } catch (error) {
      console.error('Error updating publish status:', error)
      alert('Помилка при оновленні статусу публікації')
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цю статтю?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      // Видалити з локального стану
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Помилка при видаленні статті')
    }
  }

  const getStatusBadge = (post: BlogPost) => {
    if (post.published) {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Опубліковано</span>
    } else if (post.scheduled_at) {
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Заплановано</span>
    } else {
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Чернетка</span>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA')
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title_uk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title_en?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === '' || post.category_id === selectedCategory
    const matchesAuthor = selectedAuthor === '' || post.author_id === selectedAuthor
    
    let matchesStatus = true
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'published') {
        matchesStatus = post.published
      } else if (selectedStatus === 'draft') {
        matchesStatus = !post.published && !post.scheduled_at
      } else if (selectedStatus === 'scheduled') {
        matchesStatus = !post.published && !!post.scheduled_at
      }
    }

    return matchesSearch && matchesCategory && matchesAuthor && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управління блогом</h1>
        <Link
          to="/admin/blog/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          Нова стаття
        </Link>
      </div>

      {/* Фільтри */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Пошук</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Пошук за назвою..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Категорія</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Всі категорії</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name_uk}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Автор</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Всі автори</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Статус</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Всі статуси</option>
              <option value="published">Опубліковано</option>
              <option value="draft">Чернетка</option>
              <option value="scheduled">Заплановано</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблиця статей */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Стаття
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категорія
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Автор
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map(post => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title_uk}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.title_en}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {post.category?.name_uk}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {post.author?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(post.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/blog/edit/${post.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Редагувати
                      </Link>
                      
                      <button
                        onClick={() => handlePublishToggle(post.id, post.published)}
                        className={`${post.published ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                      >
                        {post.published ? 'Зняти' : 'Опублікувати'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Статті не знайдено</p>
        </div>
      )}
    </div>
  )
}

export default AdminBlogPosts