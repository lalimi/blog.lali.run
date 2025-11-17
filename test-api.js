import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test route
app.post('/admin/blog/posts', (req, res) => {
  console.log('Received POST data:', req.body);
  res.json({ success: true, message: 'Test route working', data: req.body });
});

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API not found: ' + req.path });
});

const port = 3007;
app.listen(port, () => {
  console.log(`Test API server running on port ${port}`);
});