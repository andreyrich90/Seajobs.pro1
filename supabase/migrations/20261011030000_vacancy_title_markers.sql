-- A shortened vacancy title keeps "urgent" and "start considered".
--
-- 20261011020000 turns a title over 90 characters into "<rank> - <vessel>".
-- Crewing posts that get pasted whole into the title usually open with the two
-- things a seafarer scans for first: "srochno" (urgent) and "rassmotrim start"
-- (a first contract in the rank is considered). The shortened title lost both.
-- Now, when the long text carries them, the title keeps them, in the language
-- they were written in:
--   urgent:  srochno (ru) / terminovo (ua) / urgent (en, ro) / pilne (pl)
--            -> "SROCHNO! " / "TERMINOVO! " / "URGENT! " / "PILNE! " in front,
--            the first two in Cyrillic capitals;
--   start:   rassmotrim start (ru) / rozglyanemo start (ua) /
--            start considered (en)
--            -> ", rassmotrim start" / ", rozglyanemo start" (in Cyrillic) /
--            ", start considered" at the end.
-- Only when the title is rebuilt from rank and vessel: a title cut at a word
-- already begins with the original text, markers and all. If the markers would
-- push it past 90, the ending goes first, then the prefix.
--
-- Everything else is unchanged from 20261011020000. ASCII only on purpose: the
-- Cyrillic is written as U&'' escapes and the dash and ellipsis as chr(), so a
-- browser that translates the page cannot change the SQL. Idempotent.

create or replace function public.tidy_vacancy_title()
returns trigger
language plpgsql
as $$
declare
  orig   text := coalesce(new.title, '');
  t      text := orig;
  pre    text := '';
  post   text := '';
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

      -- "srochn"
      if orig ~* U&'\0441\0440\043E\0447\043D' then
        pre := U&'\0421\0420\041E\0427\041D\041E! ';
      -- "terminovo|terminova"
      elsif orig ~* U&'\0442\0435\0440\043C\0456\043D\043E\0432\043E|\0442\0435\0440\043C\0456\043D\043E\0432\0430' then
        pre := U&'\0422\0415\0420\041C\0406\041D\041E\0412\041E! ';
      elsif orig ~* '\murgent' then
        pre := 'URGENT! ';
      elsif orig ~* '\mpiln(e|ie|a)\M' then
        pre := 'PILNE! ';
      end if;

      -- "rassmotr.. start" either way round
      if orig ~* U&'\0440\0430\0441\0441\043C\043E\0442\0440\005Cw*\005Cs+\0441\0442\0430\0440\0442|\0441\0442\0430\0440\0442\005Cw*\005Cs+\0440\0430\0441\0441\043C\043E\0442\0440' then
        post := U&', \0440\0430\0441\0441\043C\043E\0442\0440\0438\043C \0441\0442\0430\0440\0442';
      -- "rozglyan.. start" either way round
      elsif orig ~* U&'\0440\043E\0437\0433\043B\044F\043D\005Cw*\005Cs+\0441\0442\0430\0440\0442|\0441\0442\0430\0440\0442\005Cw*\005Cs+\0440\043E\0437\0433\043B\044F\0434' then
        post := U&', \0440\043E\0437\0433\043B\044F\043D\0435\043C\043E \0441\0442\0430\0440\0442';
      elsif orig ~* '\mstart(ers?)?\s+(in\s+rank\s+)?(is\s+|are\s+)?(considered|welcome|possible|accepted)\M' then
        post := ', start considered';
      end if;

      if length(pre || t || post) > 90 then post := ''; end if;
      if length(pre || t || post) > 90 then pre := ''; end if;
      t := pre || t || post;
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
