-- Add cover photo URL to news_articles
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS cover_url TEXT;
