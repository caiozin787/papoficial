-- Bucket público para imagens de capa (teorias, métodos, partituras, etc.).
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Leitura pública de imagens"
  on storage.objects for select
  using (bucket_id = 'images');

create policy "Admin gerencia imagens"
  on storage.objects for all
  using (bucket_id = 'images' and is_admin())
  with check (bucket_id = 'images' and is_admin());
