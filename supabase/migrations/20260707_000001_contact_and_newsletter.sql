-- Mensagens do formulário de Contacto: qualquer visitante (mesmo sem conta) pode
-- enviar, mas só o admin pode ler — protege a privacidade de quem escreve.
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy contact_messages_insert on contact_messages for insert with check (true);
create policy contact_messages_admin_read on contact_messages for select using (is_admin());

-- Subscrições da newsletter do rodapé: mesma lógica, inserção pública e leitura
-- restrita ao admin. E-mail único para evitar duplicados ao subscrever de novo.
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

create policy newsletter_subscribers_insert on newsletter_subscribers for insert with check (true);
create policy newsletter_subscribers_admin_read on newsletter_subscribers for select using (is_admin());
