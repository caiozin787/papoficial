-- Inclui o slug no retorno de admin_top_favorites(), pra linkar direto pro item (não só pra lista).
drop function if exists admin_top_favorites(int);

create function admin_top_favorites(limit_count int default 5)
returns table(content_type text, content_id uuid, favorite_count bigint, title text, slug text)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    raise exception 'not authorized';
  end if;
  return query
    select * from (
      select 'method'::text as content_type, fm.method_id as content_id, count(*) as favorite_count, m.title, m.slug
      from favorite_methods fm join methods m on m.id = fm.method_id
      group by fm.method_id, m.title, m.slug
      union all
      select 'exercise', fe.exercise_id, count(*), e.title, e.slug
      from favorite_exercises fe join exercises e on e.id = fe.exercise_id
      group by fe.exercise_id, e.title, e.slug
      union all
      select 'playback', fp.playback_id, count(*), p.title, p.slug
      from favorite_playbacks fp join playbacks p on p.id = fp.playback_id
      group by fp.playback_id, p.title, p.slug
      union all
      select 'score', fs.score_id, count(*), s.title, s.slug
      from favorite_scores fs join scores s on s.id = fs.score_id
      group by fs.score_id, s.title, s.slug
    ) combined
    order by favorite_count desc
    limit limit_count;
end;
$$;

grant execute on function admin_top_favorites(int) to authenticated;
