-- Permite que admins atualizem o perfil de qualquer usuário (hoje só dava pra editar o próprio) —
-- necessário pra promover/remover admin a partir do painel.
create policy "profiles_update_admin"
  on profiles for update
  using (is_admin())
  with check (is_admin());

-- Lista de usuários com e-mail (não dá pra ler auth.users direto via RLS normal),
-- restrita a admins internamente.
create or replace function admin_list_users()
returns table(id uuid, email text, full_name text, role user_role, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    raise exception 'not authorized';
  end if;
  return query
    select p.id, u.email, p.full_name, p.role, p.created_at
    from profiles p
    join auth.users u on u.id = p.id
    order by p.created_at desc;
end;
$$;

grant execute on function admin_list_users() to authenticated;

-- Conteúdo mais favoritado (somando as 4 tabelas de favorito), restrito a admins.
create or replace function admin_top_favorites(limit_count int default 5)
returns table(content_type text, content_id uuid, favorite_count bigint, title text)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    raise exception 'not authorized';
  end if;
  return query
    select * from (
      select 'method'::text as content_type, fm.method_id as content_id, count(*) as favorite_count, m.title
      from favorite_methods fm join methods m on m.id = fm.method_id
      group by fm.method_id, m.title
      union all
      select 'exercise', fe.exercise_id, count(*), e.title
      from favorite_exercises fe join exercises e on e.id = fe.exercise_id
      group by fe.exercise_id, e.title
      union all
      select 'playback', fp.playback_id, count(*), p.title
      from favorite_playbacks fp join playbacks p on p.id = fp.playback_id
      group by fp.playback_id, p.title
      union all
      select 'score', fs.score_id, count(*), s.title
      from favorite_scores fs join scores s on s.id = fs.score_id
      group by fs.score_id, s.title
    ) combined
    order by favorite_count desc
    limit limit_count;
end;
$$;

grant execute on function admin_top_favorites(int) to authenticated;
