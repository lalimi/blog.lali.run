-- Початкові категорії для блогу
INSERT INTO blog_categories (name_uk, name_en, slug, description_uk, description_en, color, icon, sort_order) VALUES
('AI для бізнесу', 'AI for Business', 'ai-business', 'Статті про застосування штучного інтелекту в бізнесі', 'Articles about AI applications in business', '#3B82F6', '🤖', 1),
('Автоматизація процесів', 'Process Automation', 'automation', 'Як автоматизувати бізнес-процеси', 'How to automate business processes', '#10B981', '⚙️', 2),
('AI-інструменти', 'AI Tools', 'ai-tools', 'Огляди та порівняння AI інструментів', 'Reviews and comparisons of AI tools', '#8B5CF6', '🛠️', 3),
('SEO маркетинг', 'SEO Marketing', 'seo-marketing', 'Пошукова оптимізація для українського бізнесу', 'Search engine optimization for Ukrainian business', '#F59E0B', '🔍', 4),
('Digital стратегії', 'Digital Strategies', 'digital-strategies', 'Цифрові стратегії для зростання бізнесу', 'Digital strategies for business growth', '#EF4444', '📈', 5),
('Telegram маркетинг', 'Telegram Marketing', 'telegram-marketing', 'Монетизація та просування в Telegram', 'Monetization and promotion in Telegram', '#229ED9', '✈️', 6),
('YouTube стратегії', 'YouTube Strategies', 'youtube-strategies', 'Створення та просування YouTube каналу', 'Creating and promoting YouTube channel', '#FF0000', '📺', 7),
('Email маркетинг', 'Email Marketing', 'email-marketing', 'Стратегії email маркетингу', 'Email marketing strategies', '#1F2937', '✉️', 8);

-- Початкові теги
INSERT INTO blog_tags (name_uk, name_en, slug, color) VALUES
('AI', 'AI', 'ai', '#3B82F6'),
('бізнес', 'business', 'business', '#10B981'),
('автоматизація', 'automation', 'automation', '#8B5CF6'),
('Україна', 'Ukraine', 'ukraine', '#F59E0B'),
('оптимізація', 'optimization', 'optimization', '#EF4444'),
('підприємці', 'entrepreneurs', 'entrepreneurs', '#6366F1'),
('технології', 'technology', 'technology', '#06B6D4'),
('маркетинг', 'marketing', 'marketing', '#EC4899'),
('SEO', 'SEO', 'seo', '#84CC16'),
('пошукова оптимізація', 'search optimization', 'search-optimization', '#A855F7'),
('Make.com', 'Make.com', 'make-com', '#00D4AA'),
('Zapier', 'Zapier', 'zapier', '#FF4F00'),
('no-code', 'no-code', 'no-code', '#FBBF24'),
('інструменти', 'tools', 'tools', '#6B7280'),
('продуктивність', 'productivity', 'productivity', '#14B8A6'),
('Telegram', 'Telegram', 'telegram', '#229ED9'),
('YouTube', 'YouTube', 'youtube', '#FF0000'),
('email', 'email', 'email', '#1F2937'),
('монетизація', 'monetization', 'monetization', '#F97316'),
('контент', 'content', 'content', '#8B5CF6');

-- Початковий автор
INSERT INTO blog_authors (name, bio_uk, bio_en, email, social_links) VALUES
('Lali', 'Експерт з автоматизації бізнесу та штучного інтелекту. Допомагаю українським компаніям впроваджувати сучасні технології для зростання та оптимізації процесів.', 'Business automation and AI expert. I help Ukrainian companies implement modern technologies for growth and process optimization.', 'lali@blacksea.digital', '[{"platform": "telegram", "url": "https://t.me/lali_blacksea"}, {"platform": "linkedin", "url": "https://linkedin.com/in/lali-blacksea"}]');

-- Дозволи для публічного доступу
GRANT SELECT ON blog_categories TO anon, authenticated;
GRANT SELECT ON blog_tags TO anon, authenticated;
GRANT SELECT ON blog_authors TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON blog_post_tags TO anon, authenticated;
GRANT SELECT ON blog_post_revisions TO anon, authenticated;