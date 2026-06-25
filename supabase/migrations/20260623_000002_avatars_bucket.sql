-- Bucket público para fotos de perfil dos utilizadores. Cada utilizador só pode
-- escrever dentro da sua própria pasta (<user_id>/...), mas qualquer pessoa pode
-- ler (necessário para mostrar o avatar a outros utilizadores, ex. nas mensagens).
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Leitura pública de avatares"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Utilizador gerencia o próprio avatar"
  on storage.objects for all
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
