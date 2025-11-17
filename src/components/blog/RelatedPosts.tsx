import React from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../../../lib/supabase'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostId?: string
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, currentPostId }) => {
  if (!posts || posts.length === 0) return null

  const filteredPosts = currentPostId 
    ? posts.filter(post => post.id !== currentPostId)
    : posts

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Рекомендовані статті
      </h3>
      <div className="space-y-4">
        {filteredPosts.slice(0, 3).map((post) => (
          <article key={post.id} className="flex gap-4">
            {post.featured_image_url && (
              <div className="flex-shrink-0">
                <img
                  src={post.featured_image_url}
                  alt={post.title_uk}
                  className="w-20 h-20 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title_uk}
                </Link>
              </h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {post.excerpt_uk}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString('uk-UA')}</span>
                <span>•</span>
                <span>{post.reading_time || 5} хв</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts