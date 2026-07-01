-- ============================================================================
-- Forum sections: create the section set (Q&A and Crewing Reviews first) and
-- distribute the existing article-topics into thematic sections.
-- ============================================================================
-- Idempotent. Run once in the Supabase SQL editor.
-- ============================================================================

-- 1) Sections (sort_order controls display order; lower = first). --------------

-- Repurpose the earlier combined "Questions & Reviews" into "Questions & Answers".
update public.forum_categories
   set name = 'Questions & Answers',
       description = 'Ask a question — no title needed',
       sort_order = 1
 where name = 'Questions & Reviews';

insert into public.forum_categories (name, description, sort_order)
select v.name, v.description, v.sort_order
from (values
  ('Questions & Answers',      'Ask a question — no title needed',                       1),
  ('Crewing Reviews',          'Reviews and warnings about crewing agencies — no title needed', 2),
  ('Life at Sea',              'Life on board, traditions, well-being and stories',      3),
  ('Career & Employment',      'Careers, money, contracts and crewing',                  4),
  ('Documents & Visas',        'Visas, seaman documents and paperwork',                  5),
  ('Ships, Engine & Safety',   'Vessel types, engine room and safety at sea',            6)
) as v(name, description, sort_order)
where not exists (
  select 1 from public.forum_categories c where c.name = v.name
);

-- 2) Distribute existing topics into sections (first match wins). --------------
--    title is jsonb; casting to text lets ILIKE match any language variant.

update public.forum_topics t
   set category_id = (select id from public.forum_categories where name = 'Documents & Visas')
 where t.category_id is null
   and (t.title::text ilike '%виз%' or t.title::text ilike '%visa%'
        or t.title::text ilike '%шенген%' or t.title::text ilike '%документ%');

update public.forum_topics t
   set category_id = (select id from public.forum_categories where name = 'Ships, Engine & Safety')
 where t.category_id is null
   and (t.title::text ilike '%ro-ro%' or t.title::text ilike '%roro%'
        or t.title::text ilike '%машин%' or t.title::text ilike '%enclosed%'
        or t.title::text ilike '%закрыт%' or t.title::text ilike '%безопасн%');

update public.forum_topics t
   set category_id = (select id from public.forum_categories where name = 'Life at Sea')
 where t.category_id is null
   and (t.title::text ilike '%лайфхак%' or t.title::text ilike '%совет%'
        or t.title::text ilike '%шторм%' or t.title::text ilike '%женщин%'
        or t.title::text ilike '%пиратств%' or t.title::text ilike '%суевери%'
        or t.title::text ilike '%свист%' or t.title::text ilike '%традици%'
        or t.title::text ilike '%психолог%' or t.title::text ilike '%экипаж%');

update public.forum_topics t
   set category_id = (select id from public.forum_categories where name = 'Career & Employment')
 where t.category_id is null
   and (t.title::text ilike '%финанс%' or t.title::text ilike '%деньг%'
        or t.title::text ilike '%карьер%' or t.title::text ilike '%берег%'
        or t.title::text ilike '%агент%' or t.title::text ilike '%трудоустрой%'
        or t.title::text ilike '%крюинг%' or t.title::text ilike '%контакт%');
