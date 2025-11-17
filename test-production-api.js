// Тест створення поста з перевіркою відповіді
const testPost = {
  title_uk: 'Тестова стаття з продакшену',
  title_en: 'Test Article from Production',
  content_uk: 'Це тестовий контент українською мовою для перевірки створення поста',
  content_en: 'This is test content in English to verify post creation',
  excerpt_uk: 'Короткий опис українською',
  excerpt_en: 'Short description in English',
  slug: 'test-article-production-' + Date.now(),
  published: false,
  category_id: 1,
  author_id: 1
};

console.log('📤 Тестові дані для створення поста:')
console.log(JSON.stringify(testPost, null, 2))

console.log('\n📋 Команда для тестування:')
console.log(`curl -X POST https://traeserpbearltg3-miroshnichenkolalita-7559s-projects.vercel.app/admin/blog/posts \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testPost)}'`)

console.log('\n💡 Якщо отримаєте помилку про змінні середовища - це підтвердить проблему.')
console.log('🔧 Після встановлення змінних у Vercel dashboard, команда повинна працювати.')