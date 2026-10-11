-- A vacancy title is a title: at most 90 characters, and no contacts in it.
--
-- A company pasted a whole Telegram post into the title field: 679 characters
-- with the crewing phone and e-mail in them, and Telegram's own "show less"
-- button. It filled the home page and the vacancy heading, and it printed the
-- agency's contacts to everyone, past the profile gate the vacancy page now
-- keeps them behind (lib/profileGate.ts).
--
-- This trigger tidies every title on the way in, whoever writes it (the
-- company form, the importer, the admin screens):
--   - e-mail addresses and "+" phone numbers are removed;
--   - separator lines ("-----") are removed and whitespace is collapsed;
--   - a title still longer than 90 characters becomes "<rank> - <vessel type>"
--     (with an em dash; both are separate columns), or, without a rank, is cut
--     at a word and ends with an ellipsis.
-- When a long title is replaced and the vacancy has no description, the
-- original text becomes the description, so nothing written is lost.
--
-- The limit is TITLE_MAX in lib/vacancyTitle.ts too (the company form's
-- maxLength). Change both together.
--
-- ASCII only on purpose: the dash and the ellipsis are chr(8212) and chr(8230),
-- so a browser that translates the page cannot change the SQL. Idempotent.

create or replace function public.tidy_vacancy_title()
returns trigger
language plpgsql
as $$
declare
  t      text := coalesce(new.title, '');
  dashes text := chr(8212) || chr(8211);           -- em and en dash
  ends   text := '[\s,;:/|' || chr(183) || chr(8226) || dashes || '-]+';
begin
  t := regexp_replace(t, '(mailto:)?[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', ' ', 'g');
  t := regexp_replace(t, '\+\d[0-9 ()\t-]{7,}\d', ' ', 'g');
  t := regexp_replace(t, '[-=_' || dashes || ']{4,}', ' ', 'g');
  t := btrim(regexp_replace(t, '\s+', ' ', 'g'));
  -- Separators left dangling at either end once the contacts are gone.
  t := regexp_replace(t, '^' || ends || '|' || ends || '$', '', 'g');

  if length(t) > 90 or t = '' then
    if coalesce(btrim(new.rank), '') <> '' then
      t := btrim(new.rank) || coalesce(' ' || chr(8212) || ' ' || nullif(btrim(new.vessel_type), ''), '');
    end if;
    if length(t) > 90 then
      t := regexp_replace(left(t, 89), '\s+\S*$', '') || chr(8230);
    end if;
    if t = '' then
      t := 'Vacancy';
    end if;
  end if;

  if t is distinct from new.title then
    if length(coalesce(new.title, '')) > 90 and coalesce(btrim(new.description), '') = '' then
      new.description := new.title;
    end if;
    new.title := t;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_vacancy_tidy_title on public.vacancies;
create trigger trg_vacancy_tidy_title
  before insert or update of title, rank, vessel_type on public.vacancies
  for each row execute function public.tidy_vacancy_title();

-- The titles already stored that break the rule: the trigger does the work.
update public.vacancies
   set title = title
 where length(title) > 90
    or title ~* '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}'
    or title ~ '\+\d[0-9 ()\t-]{7,}\d';
