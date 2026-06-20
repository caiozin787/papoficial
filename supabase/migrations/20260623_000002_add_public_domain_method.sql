-- Primeiro método com PDF real: obra de domínio público (publicada em 1908,
-- autor falecido há mais de 70 anos — confirmado "Not In Copyright" pelo Internet Archive).
insert into methods (slug, title, description, author, category, level, pdf_url, published) values
  (
    'universal-method-for-saxophone-paul-de-ville',
    'Universal Method for the Saxophone',
    'Método histórico completo (1908), baseado nas obras clássicas de A. Mayeur, H. Klosé e outros — cobre desde os fundamentos até dedilhados avançados. Obra de domínio público.',
    'Paul de Ville',
    'iniciante',
    'iniciante',
    'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/universal-method-saxophone-paul-de-ville-1908.pdf',
    true
  )
on conflict (slug) do update set pdf_url = excluded.pdf_url;
