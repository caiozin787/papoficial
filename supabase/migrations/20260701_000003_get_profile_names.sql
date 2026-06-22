-- Resolve nome de exibição de outros usuários (ex.: quem está na sua lista de conversas) —
-- profiles normalmente só é visível pro próprio usuário ou admin, então isso expõe só
-- id+nome (nunca e-mail) pra qualquer pessoa autenticada, igual ao search_users().
create or replace function get_profile_names(user_ids uuid[])
returns table(id uuid, full_name text)
language sql security definer set search_path = public stable as $$
  select p.id, p.full_name from profiles p where p.id = any(user_ids);
$$;

grant execute on function get_profile_names(uuid[]) to authenticated;
