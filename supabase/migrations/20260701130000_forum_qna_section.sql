-- Add a "Questions & Reviews" forum section. Posting in this section doesn't
-- require a title — the UI auto-derives it from the question text.
-- Idempotent. Run once in the Supabase SQL editor.

insert into public.forum_categories (name, description, sort_order)
select 'Questions & Reviews', 'Ask a question or leave a review — no title needed', 100
where not exists (
  select 1 from public.forum_categories where name = 'Questions & Reviews'
);
