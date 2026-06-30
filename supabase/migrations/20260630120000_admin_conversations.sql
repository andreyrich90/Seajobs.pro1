-- ============================================================================
-- Let an admin start a direct chat with any user (seafarer or company).
-- ============================================================================
-- The admin is stored as a participant of the existing conversations table:
--   * messaging a seafarer  → company_id  = admin id, seafarer_id = user id
--   * messaging a company   → seafarer_id = admin id, company_id  = user id
-- so the user sees the thread in their normal Messages page and can reply.
--
-- The existing participant-based policies already cover admins for SELECT,
-- message INSERT/UPDATE and the last_message_at UPDATE (admin = auth.uid() in
-- one of the columns). The only gap is the conversation INSERT, whose
-- company-only rule requires a prior job application — so add an admin rule.
--
-- Idempotent. Run once in the Supabase SQL editor.
-- ============================================================================

drop policy if exists "conv_insert_admin" on conversations;
create policy "conv_insert_admin" on conversations for insert
  to authenticated
  with check (
    public.is_admin()
    and (company_id = auth.uid() or seafarer_id = auth.uid())
  );

notify pgrst, 'reload schema';
