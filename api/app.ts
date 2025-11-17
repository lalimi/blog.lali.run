import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import adminBlogRoutes from './routes/admin/blog.js'
import uploadRoutes from './routes/upload.js'

// Завантажуємо змінні середовища з правильним шляхом
dotenv.config({ path: path.join(__dirname, '../.env') })

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/auth', authRoutes)
app.use('/blog', blogRoutes)
app.use('/admin/blog', adminBlogRoutes)
app.use('/upload', uploadRoutes)

app.get('/health', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, message: 'ok' })
})

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ success: false, error: 'Server internal error' })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API not found: ' + req.path })
})

export default app