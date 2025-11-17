/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: 'standalone',
  publicRuntimeConfig: {
   version,
 },
  // SEO and performance optimizations
  images: {
    domains: ['blacksea-blog.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Internationalization for Ukrainian
  i18n: {
    locales: ['uk'],
    defaultLocale: 'uk',
  },
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  // Redirects for common typos and old URLs
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/resource',
        destination: '/resources',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
