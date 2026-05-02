-- ============================================================
-- cogito.design Supabase Schema
-- Supabase の SQL Editor でこのファイルを実行してください
-- ============================================================

-- UUID 拡張を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- テーブル作成
-- ============================================================

-- Works（制作実績）テーブル
CREATE TABLE IF NOT EXISTS works (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  slug          TEXT        UNIQUE NOT NULL,
  category      TEXT        NOT NULL,           -- 表示名 例: "Webサイト"
  category_slug TEXT        NOT NULL,           -- フィルター用 例: "web"
  description   TEXT        NOT NULL DEFAULT '',
  content       TEXT,                           -- 詳細説明（任意）
  thumbnail_url TEXT,
  client        TEXT,
  period        TEXT,
  services      TEXT[]      DEFAULT '{}',
  url           TEXT,                           -- 公開 URL（任意）
  is_published  BOOLEAN     DEFAULT true,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts（ブログ記事）テーブル
CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  slug          TEXT        UNIQUE NOT NULL,
  category      TEXT        NOT NULL,           -- 表示名 例: "デザイン"
  category_slug TEXT        NOT NULL,           -- フィルター用 例: "design"
  excerpt       TEXT        NOT NULL DEFAULT '',
  content       TEXT        NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  author        TEXT        DEFAULT 'cogito.design',
  is_published  BOOLEAN     DEFAULT true,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts（お問い合わせ）テーブル
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,
  company    TEXT,
  email      TEXT        NOT NULL,
  phone      TEXT,
  service    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  is_read    BOOLEAN     DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- updated_at 自動更新トリガー
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE works      ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts   ENABLE ROW LEVEL SECURITY;

-- Works: 匿名ユーザーは公開済みのみ参照可能
CREATE POLICY "anon_read_published_works" ON works
  FOR SELECT TO anon
  USING (is_published = true);

-- Works: 認証ユーザーは全操作可能
CREATE POLICY "auth_full_access_works" ON works
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts: 匿名ユーザーは公開済みのみ参照可能
CREATE POLICY "anon_read_published_blog_posts" ON blog_posts
  FOR SELECT TO anon
  USING (is_published = true);

-- Blog Posts: 認証ユーザーは全操作可能
CREATE POLICY "auth_full_access_blog_posts" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contacts: 誰でも INSERT 可能（お問い合わせフォーム用）
CREATE POLICY "anyone_insert_contacts" ON contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Contacts: 認証ユーザーのみ参照・更新可能
CREATE POLICY "auth_read_contacts" ON contacts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "auth_update_contacts" ON contacts
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
