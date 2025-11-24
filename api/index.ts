import type { VercelRequest, VercelResponse } from '@vercel/node'
import app from './app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API Request:', req.url);
  return app(req as any, res as any)
}