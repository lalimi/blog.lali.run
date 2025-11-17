import React, { useState, useEffect } from 'react';
import { BlogPost, CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from '@/data/blog-posts-new';
import { blogCategories } from '@/data/blog-categories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Search,
  Save,
  Send,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

interface BlogAdminPanelProps {
  posts: BlogPost[];
  onCreatePost: (post: CreateBlogPostDTO) => Promise<void>;
  onUpdatePost: (post: UpdateBlogPostDTO) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
  onPublishPost: (id: string) => Promise<void>;
}

export default function BlogAdminPanel({ 
  posts, 
  onCreatePost, 
  onUpdatePost, 
  onDeletePost,
  onPublishPost 
}: BlogAdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filters, setFilters] = useState<BlogPostFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Форма створення/редагування
  const [formData, setFormData] = useState<CreateBlogPostDTO>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: {
      name: 'Лалі Мірошниченко',
      bio: 'Засновниця BlackSea, експерт з цифрових продуктів',
      avatar: '/images/authors/lali-miroshnychenko.jpg'
    },
    categoryId: '1',
    tags: [],
    status: 'draft',
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });

  // Автогенерація slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\u0400-\u04FF\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Автогенерація SEO
  const generateSEO = (title: string, excerpt: string) => {
    const seoTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    const seoDescription = excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt;
    const keywords = [
      ...title.toLowerCase().split(/\s+/).filter(word => word.length > 3),
      'україна', 'креатор', 'цифровий продукт'
    ].slice(0, 5);

    return {
      title: seoTitle,
      description: seoDescription,
      keywords
    };
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo: generateSEO(title, prev.excerpt)
    }));
  };

  const handleExcerptChange = (excerpt: string) => {
    setFormData(prev => ({
      ...prev,
      excerpt,
      seo: generateSEO(prev.title, excerpt)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (activeTab === 'create') {
        await onCreatePost(formData);
      } else if (selectedPost) {
        await onUpdatePost({
          ...formData,
          id: selectedPost.id,
          updatedAt: new Date().toISOString()
        });
      }
      
      // Скидання форми
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: {
          name: 'Лалі Мірошниченко',
          bio: 'Засновниця BlackSea, експерт з цифрових продуктів',
          avatar: '/images/authors/lali-miroshnychenko.jpg'
        },
        categoryId: '1',
        tags: [],
        status: 'draft',
        seo: {
          title: '',
          description: '',
          keywords: []
        }
      });
      
      setActiveTab('list');
    } catch (error) {
      console.error('Помилка збереження:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.categoryId && post.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.status && post.status !== filters.status) {
      return false;
    }
    if (filters.author && post.author.name !== filters.author) {
      return false;
    }
    return true;
  });

  const getCategoryName = (categoryId: string) => {
    const category = blogCategories.find(cat => cat.id === categoryId);
    return category?.name || 'Без категорії';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = blogCategories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Адмін панель блогу</h1>
        <p className="text-gray-600">Управління контентом блогу BlackSea</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Всі статті
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Створити статтю
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {/* Фільтри та пошук */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Фільтри та пошук
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Пошук</Label>
                  <Input
                    id="search"
                    placeholder="Заголовок статті..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категорія</Label>
                  <Select
                    value={filters.categoryId}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, categoryId: value }))}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Всі категорії" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Всі категорії</SelectItem>
                      {blogCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Статус</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Всі статуси" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Всі статуси</SelectItem>
                      <SelectItem value="draft">Чернетка</SelectItem>
                      <SelectItem value="published">Опубліковано</SelectItem>
                      <SelectItem value="scheduled">Заплановано</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="author">Автор</Label>
                  <Input
                    id="author"
                    placeholder="Ім'я автора..."
                    value={filters.author}
                    onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Список статей */}
          <div className="grid gap-4">
            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCategoryColor(post.categoryId)} text-white`}>
                      {getCategoryName(post.categoryId)}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {post.status === 'published' && (
                        <Badge className="bg-green-500 text-white">Опубліковано</Badge>
                      )}
                      {post.status === 'draft' && (
                        <Badge className="bg-gray-500 text-white">Чернетка</Badge>
                      )}
                      {post.status === 'scheduled' && (
                        <Badge className="bg-blue-500 text-white">Заплановано</Badge>
                      )}
                      {post.featured && (
                        <Badge className="bg-yellow-500 text-white">Вибране</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: uk })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} хв
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <div className="flex gap-1 flex-wrap">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPost(post);
                          setFormData({
                            title: post.title,
                            slug: post.slug,
                            excerpt: post.excerpt,
                            content: post.content || '',
                            author: post.author,
                            categoryId: post.categoryId,
                            tags: post.tags,
                            status: post.status,
                            seo: post.seo
                          });
                          setActiveTab('edit');
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPublishPost(post.id)}
                        disabled={post.status === 'published'}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Створити нову статтю</CardTitle>
              <CardDescription>
                Заповніть форму для створення нової статті блогу
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Заголовок *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Введіть заголовок статті..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL (slug) *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-statti-ukrainskoyu"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Короткий опис *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleExcerptChange(e.target.value)}
                    placeholder="Короткий опис статті для переглядів..."
                    rows={3}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/300 символів</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="category">Категорія *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Виберіть категорію" />
                      </SelectTrigger>
                      <SelectContent>
                        {blogCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Статус *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Статус публікації" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Чернетка</SelectItem>
                        <SelectItem value="published">Опублікувати</SelectItem>
                        <SelectItem value="scheduled">Запланувати</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Теги</Label>
                    <Input
                      id="tags"
                      placeholder="тег1, тег2, тег3"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Контент статті *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Напишіть контент статті тут... (Markdown підтримується)"
                    rows={20}
                    required
                  />
                </div>

                {/* SEO блок */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold mb-4">SEO налаштування</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">SEO заголовок</Label>
                      <Input
                        id="seoTitle"
                        value={formData.seo.title}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { ...prev.seo, title: e.target.value }
                        }))}
                        placeholder="Заголовок для пошукових систем"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seoDescription">SEO опис</Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seo.description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { ...prev.seo, description: e.target.value }
                        }))}
                        placeholder="Опис для пошукових систем"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seoKeywords">Ключові слова</Label>
                      <Input
                        id="seoKeywords"
                        value={formData.seo.keywords.join(', ')}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { 
                            ...prev.seo, 
                            keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                          }
                        }))}
                        placeholder="ключове слово 1, ключове слово 2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {isLoading ? 'Збереження...' : 'Зберегти'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('list')}
                    disabled={isLoading}
                  >
                    Скасувати
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}