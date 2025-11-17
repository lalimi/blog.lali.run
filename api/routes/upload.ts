import { Router } from 'express'
import multer from 'multer'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

router.post('/image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ success: false, error: 'Файл не надіслано' })

    const ext = file.originalname.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin.storage
      .from('images')
      .upload(fileName, file.buffer, { contentType: file.mimetype, upsert: true })

    if (error) throw error

    const { data } = supabaseAdmin.storage.from('images').getPublicUrl(fileName)
    res.json({ success: true, imageUrl: data.publicUrl })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message || 'Помилка завантаження' })
  }
})

export default router