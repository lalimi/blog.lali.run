import { GetServerSideProps } from 'next';

interface SitemapPost {
  slug: string;
  updatedAt: string;
}

interface SitemapCategory {
  slug: string;
  updatedAt: string;
}

function generateSiteMap(
  posts: SitemapPost[],
  categories: SitemapCategory[],
  tags: string[]
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Головна сторінка -->
  <url>
    <loc>https://blacksea-blog.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Основні сторінки -->
  <url>
    <loc>https://blacksea-blog.com/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://blacksea-blog.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://blacksea-blog.com/contacts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://blacksea-blog.com/resources</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Статті блогу -->
  ${posts.map((post) => `
  <url>
    <loc>https://blacksea-blog.com/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
  
  <!-- Категорії -->
  ${categories.map((category) => `
  <url>
    <loc>https://blacksea-blog.com/category/${category.slug}</loc>
    <lastmod>${category.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
  
  <!-- Теги -->
  ${tags.map((tag) => `
  <url>
    <loc>https://blacksea-blog.com/tag/${tag.toLowerCase()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  `).join('')}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Mock data - in real app this would come from database/CMS
  const posts = [
    { slug: 'ai-zminyuye-ukrayinskyy-biznes', updatedAt: '2024-11-15T00:00:00.000Z' },
    { slug: 'avtomatyzaciya-make-com', updatedAt: '2024-11-14T00:00:00.000Z' },
    { slug: 'monobank-api-intehraciya', updatedAt: '2024-11-13T00:00:00.000Z' },
    { slug: 'oglyad-claude-3', updatedAt: '2024-11-12T00:00:00.000Z' },
    { slug: 'seo-dlya-ukrayinskyh-blogiv', updatedAt: '2024-11-11T00:00:00.000Z' },
    { slug: 'miy-pershyj-czyfrovyj-produkt', updatedAt: '2024-11-10T00:00:00.000Z' }
  ];
  
  const categories = [
    { slug: 'ai-dlya-biznesu', updatedAt: '2024-11-15T00:00:00.000Z' },
    { slug: 'avtomatyzaciya-procesiv', updatedAt: '2024-11-14T00:00:00.000Z' },
    { slug: 'czyfrovi-produkty', updatedAt: '2024-11-13T00:00:00.000Z' },
    { slug: 'ai-instrumenty', updatedAt: '2024-11-12T00:00:00.000Z' },
    { slug: 'seo-kontent', updatedAt: '2024-11-11T00:00:00.000Z' },
    { slug: 'lali-osobyste', updatedAt: '2024-11-10T00:00:00.000Z' }
  ];
  
  const tags = ['AI', 'бізнес', 'автоматизація', 'Україна', 'Make.com', 'no-code', 'Monobank', 'API', 'Claude', 'контент', 'SEO', 'маркетинг', 'старт', 'продукт'];

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, categories, tags);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;