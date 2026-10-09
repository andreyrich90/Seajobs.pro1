-- Comments now appear under guides as well as news, both through
-- components/ArticleComments.tsx. Anyone can post (the insert policy is open),
-- and until now nobody could remove a post: the table had no delete policy.
-- Admins get one, so the delete button in the comment list works for them
-- and only for them.
--
-- Idempotent.

drop policy if exists "admin delete news_comments" on news_comments;
create policy "admin delete news_comments"
  on news_comments for delete using (is_admin());
