import type { VercelRequest, VercelResponse } from '@vercel/node'
import app from './app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Видаляємо префікс /api з URL для внутрішньої маршрутизації
  const originalUrl = req.url;
  if (req.url?.startsWith('/api')) {
    req.url = req.url.slice(4); // Видаляємо '/api'
  }
  
  console.log('API Request:', originalUrl, '->', req.url);
  
  return app(req as any, res as any)
}