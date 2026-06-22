-- auth.users.email é character varying(255), não text — precisa de cast explícito,
-- senão o Postgres recusa por incompatibilidade de tipo no retorno da função.
drop function if exists admin_list_users();

create function admin_list_users()
returns table(id uuid, email text, full_name text, role user_role, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    raise exception 'not authorized';
  end if;
  return query
    select p.id, u.email::text, p.full_name, p.role, p.created_at
    from profiles p
    join auth.users u on u.id = p.id
    order by p.created_at desc;
end;
$$;

grant execute on function admin_list_users() to authenticated;
