-- Bucket público para vídeos (ex.: vídeo de destaque na Home).
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

create policy "Leitura pública de vídeos"
  on storage.objects for select
  using (bucket_id = 'videos');

create policy "Admin gerencia vídeos"
  on storage.objects for all
  using (bucket_id = 'videos' and is_admin())
  with check (bucket_id = 'videos' and is_admin());
