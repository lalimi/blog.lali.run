import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlogAdminPanel from '@/components/admin/BlogAdminPanel';
import { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, sampleBlogPosts } from '@/data/blog-posts-new';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Завантаження постів з localStorage або використання sample даних
  useEffect(() => {
    const loadPosts = () => {
      try {
        const savedPosts = localStorage.getItem('blog-posts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        } else {
          // Ініціалізація sample даними
          setPosts(sampleBlogPosts);
          localStorage.setItem('blog-posts', JSON.stringify(sampleBlogPosts));
        }
      } catch (error) {
        console.error('Помилка завантаження постів:', error);
        setPosts(sampleBlogPosts);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Збереження постів в localStorage
  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  };

  const handleCreatePost = async (postData: CreateBlogPostDTO) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: postData.status === 'published' ? new Date().toISOString() : undefined,
      meta: {
        wordCount: postData.content.split(/\s+/).filter(word => word.length > 0).length,
        revision: 1
      }
    };

    const updatedPosts = [...posts, newPost];
    savePosts(updatedPosts);
  };

  const handleUpdatePost = async (postData: UpdateBlogPostDTO) => {
    const updatedPosts = posts.map(post => 
      post.id === postData.id 
        ? { 
            ...post, 
            ...postData, 
            updatedAt: new Date().toISOString(),
            meta: {
              ...post.meta,
              wordCount: postData.content ? postData.content.split(/\s+/).filter(word => word.length > 0).length : post.meta?.wordCount,
              revision: (post.meta?.revision || 1) + 1
            }
          }
        : post
    );
    savePosts(updatedPosts);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю статтю?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
    }
  };

  const handlePublishPost = async (id: string) => {
    const updatedPosts = posts.map(post => 
      post.id === id 
        ? { 
            ...post, 
            status: 'published' as const, 
            published: true,
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : post
    );
    savePosts(updatedPosts);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Завантаження...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  На головну
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Адмін панель блогу</h1>
            </div>
            <div className="text-sm text-gray-600">
              Всього статей: {posts.length}
            </div>
          </div>
        </div>
      </div>

      {/* Основний контент */}
      <div className="container mx-auto px-6 py-8">
        <BlogAdminPanel
          posts={posts}
          onCreatePost={handleCreatePost}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          onPublishPost={handlePublishPost}
        />
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>BlackSea Blog Admin Panel © 2024</p>
            <p className="mt-1">Платформа для українських креаторів</p>
          </div>
        </div>
      </div>
    </div>
  );
}