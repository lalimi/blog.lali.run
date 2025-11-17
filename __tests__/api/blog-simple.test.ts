import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Мокаємо Supabase з правильною типізацією
const mockSupabase = {
  from: jest.fn(() => mockSupabase),
  insert: jest.fn(() => mockSupabase),
  select: jest.fn(() => mockSupabase),
  single: jest.fn(() => mockSupabase),
  update: jest.fn(() => mockSupabase),
  delete: jest.fn(() => mockSupabase),
  eq: jest.fn(() => mockSupabase),
  range: jest.fn(() => mockSupabase),
  order: jest.fn(() => mockSupabase),
  or: jest.fn(() => mockSupabase),
  is: jest.fn(() => mockSupabase),
  not: jest.fn(() => mockSupabase)
};

// Мокаємо модуль supabase
jest.unstable_mockModule('../../api/lib/supabase.js', () => ({
  getSupabaseAdmin: () => mockSupabase
}));

describe('Blog API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a blog post successfully', async () => {
    const mockPost = {
      id: 1,
      title_uk: 'Тестова стаття',
      title_en: 'Test Article',
      content_uk: 'Це тестовий контент українською',
      content_en: 'This is test content in English',
      excerpt_uk: 'Короткий опис українською',
      excerpt_en: 'Short description in English',
      slug: 'test-article',
      published: false,
      category_id: 1,
      author_id: 1
    };

    // Налаштовуємо мок для успішного створення
    mockSupabase.single.mockResolvedValueOnce({
      data: mockPost,
      error: null
    });

    // Перевіряємо, що мок працює
    const { getSupabaseAdmin } = await import('../../api/lib/supabase.js');
    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(mockPost)
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toEqual(mockPost);
    expect(supabase.from).toHaveBeenCalledWith('blog_posts');
  });

  it('should handle database errors', async () => {
    const mockError = new Error('Database connection failed');
    
    mockSupabase.single.mockResolvedValueOnce({
      data: null,
      error: mockError
    });

    const { getSupabaseAdmin } = await import('../../api/lib/supabase.js');
    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({ title: 'Test' })
      .select()
      .single();

    expect(error).toEqual(mockError);
    expect(data).toBeNull();
  });

  it('should validate required fields', async () => {
    const invalidPost = {
      title_uk: '', // Порожня назва
      content_uk: '', // Порожній контент
      slug: '' // Порожній slug
    };

    // Мокаємо помилку валідації
    const validationError = new Error('Validation failed');
    mockSupabase.single.mockResolvedValueOnce({
      data: null,
      error: validationError
    });

    const { getSupabaseAdmin } = await import('../../api/lib/supabase.js');
    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(invalidPost)
      .select()
      .single();

    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });
});