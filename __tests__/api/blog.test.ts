import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';

// Mock Supabase
const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  or: jest.fn().mockReturnThis(),
  is: jest.fn().mockReturnThis(),
  not: jest.fn().mockReturnThis()
};

// Mock the supabase module
jest.mock('../api/lib/supabase', () => ({
  getSupabaseAdmin: () => mockSupabase
}));

describe('Blog API Tests', () => {
  let app: express.Application;
  let server: any;

  beforeAll(async () => {
    // Import the app after mocking
    const { default: createApp } = await import('../api/app');
    app = createApp;
    server = app.listen(0); // Use random port
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /admin/blog/posts', () => {
    it('should create a new blog post successfully', async () => {
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
        author_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockPost,
        error: null
      });

      const response = await request(app)
        .post('/admin/blog/posts')
        .send({
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
        })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        post: mockPost
      });

      expect(mockSupabase.from).toHaveBeenCalledWith('blog_posts');
      expect(mockSupabase.insert).toHaveBeenCalled();
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(mockSupabase.single).toHaveBeenCalled();
    });

    it('should handle missing required fields', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Missing required field: title_uk' }
      });

      const response = await request(app)
        .post('/admin/blog/posts')
        .send({
          title_en: 'Test Article',
          content_uk: 'Це тестовий контент українською'
        })
        .expect(500);

      expect(response.body.error).toContain('Failed to create post');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Database connection failed' }
      });

      const response = await request(app)
        .post('/admin/blog/posts')
        .send({
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
        })
        .expect(500);

      expect(response.body.error).toContain('Failed to create post');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'ok'
      });
    });
  });

  describe('404 Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body.error).toContain('API not found');
    });
  });
});

// Integration test with real data
const testPostData = {
  title_uk: 'Тестова стаття про AI',
  title_en: 'Test Article About AI',
  content_uk: 'Це тестовий контент про штучний інтелект українською мовою для перевірки функціональності API.',
  content_en: 'This is test content about artificial intelligence in English for API functionality testing.',
  excerpt_uk: 'Короткий опис про AI українською мовою',
  excerpt_en: 'Short description about AI in English',
  slug: 'test-ai-article-integration',
  published: false,
  category_id: 1,
  author_id: 1,
  meta_title_uk: 'AI Тестова Стаття',
  meta_title_en: 'AI Test Article',
  meta_description_uk: 'Мета опис для тестової статті про AI',
  meta_description_en: 'Meta description for AI test article',
  keywords_uk: 'AI, тест, стаття',
  keywords_en: 'AI, test, article',
  featured_image: 'https://example.com/image.jpg'
};

console.log('Test data for manual API testing:');
console.log(JSON.stringify(testPostData, null, 2));

console.log('\nExample curl command for testing:');
console.log(`curl -X POST http://localhost:3001/admin/blog/posts \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testPostData, null, 2).replace(/'/g, "\\'")}'`);