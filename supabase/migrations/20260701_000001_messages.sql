-- Mensagens privadas (DM) entre usuários, e entre usuário e a equipe Sax Tools (= o admin).
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id) on delete cascade,
  recipient_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index messages_conversation_idx on messages (sender_id, recipient_id, created_at);
create index messages_recipient_idx on messages (recipient_id, created_at);

alter table messages enable row level security;

create policy "messages_select_own"
  on messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "messages_insert_own"
  on messages for insert
  with check (auth.uid() = sender_id);

create policy "messages_update_own_as_recipient"
  on messages for update
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- Busca de usuários por nome pra iniciar uma conversa nova — profiles normalmente só é
-- visível pro próprio usuário ou admin, então isso expõe só id+nome (nunca e-mail) pra
-- qualquer pessoa autenticada poder encontrar alguém pra conversar.
create or replace function search_users(query text)
returns table(id uuid, full_name text)
language sql security definer set search_path = public stable as $$
  select p.id, p.full_name
  from profiles p
  where p.id != auth.uid()
    and p.full_name ilike '%' || query || '%'
  order by p.full_name
  limit 10;
$$;

grant execute on function search_users(text) to authenticated;

-- Id de um admin (= "equipe Sax Tools"), pra abrir o botão "Falar com a equipe" sem expor
-- a lista inteira de admins.
create or replace function get_support_user_id()
returns uuid
language sql security definer set search_path = public stable as $$
  select id from profiles where role = 'admin' order by created_at limit 1;
$$;

grant execute on function get_support_user_id() to authenticated;
