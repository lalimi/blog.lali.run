-- Таблиця категорій блогу
create table blog_categories (
  id uuid default gen_random_uuid() primary key,
  name_uk text not null,
  name_en text,
  slug text not null unique,
  description_uk text,
  description_en text,
  meta_title_uk text,
  meta_title_en text,
  meta_description_uk text,
  meta_description_en text,
  color text default '#3B82F6',
  icon text,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Таблиця тегів
create table blog_tags (
  id uuid default gen_random_uuid() primary key,
  name_uk text not null,
  name_en text,
  slug text not null unique,
  description_uk text,
  description_en text,
  color text default '#6B7280',
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Таблиця авторів
create table blog_authors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  bio_uk text,
  bio_en text,
  avatar_url text,
  email text,
  social_links jsonb default '[]'::jsonb,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Головна таблиця статей блогу
create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  title_uk text not null,
  title_en text,
  slug text not null unique,
  excerpt_uk text,
  excerpt_en text,
  content_uk text,
  content_en text,
  featured_image_url text,
  author_id uuid references blog_authors(id) on delete set null,
  category_id uuid references blog_categories(id) on delete set null,
  read_time integer default 5,
  featured boolean default false,
  published boolean default false,
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,
  meta_title_uk text,
  meta_title_en text,
  meta_description_uk text,
  meta_description_en text,
  og_image_url text,
  keywords_uk text[],
  keywords_en text[],
  views_count integer default 0,
  likes_count integer default 0,
  shares_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Зв'язуюча таблиця для тегів статей
create table blog_post_tags (
  post_id uuid references blog_posts(id) on delete cascade,
  tag_id uuid references blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Таблиця для збереження історії змін
create table blog_post_revisions (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references blog_posts(id) on delete cascade,
  title_uk text,
  title_en text,
  content_uk text,
  content_en text,
  excerpt_uk text,
  excerpt_en text,
  revision_number integer default 1,
  created_by text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Індекси для оптимізації пошуку та фільтрації
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_published on blog_posts(published, published_at desc);
create index idx_blog_posts_category on blog_posts(category_id, published desc);
create index idx_blog_posts_author on blog_posts(author_id, published desc);
create index idx_blog_posts_featured on blog_posts(featured, published desc);
create index idx_blog_posts_scheduled on blog_posts(scheduled_at) where published = false;

create index idx_blog_categories_slug on blog_categories(slug);
create index idx_blog_tags_slug on blog_tags(slug);

-- Тригери для оновлення updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger update_blog_categories_updated_at before update on blog_categories
  for each row execute function update_updated_at_column();

create trigger update_blog_tags_updated_at before update on blog_tags
  for each row execute function update_updated_at_column();

create trigger update_blog_authors_updated_at before update on blog_authors
  for each row execute function update_updated_at_column();

create trigger update_blog_posts_updated_at before update on blog_posts
  for each row execute function update_updated_at_column();