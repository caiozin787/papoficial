-- Bucket público para PDFs (métodos, partituras, etc.) de domínio público ou licenciados pela plataforma.
insert into storage.buckets (id, name, public)
values ('pdfs', 'pdfs', true)
on conflict (id) do nothing;

create policy "Leitura pública de PDFs"
  on storage.objects for select
  using (bucket_id = 'pdfs');

create policy "Admin gerencia PDFs"
  on storage.objects for all
  using (bucket_id = 'pdfs' and is_admin())
  with check (bucket_id = 'pdfs' and is_admin());
