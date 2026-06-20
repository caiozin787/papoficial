-- Mais 4 métodos reais de domínio público (confirmados "Public Domain" pelo IMSLP),
-- todos compositores falecidos há mais de 100 anos.

insert into methods (slug, title, description, author, category, level, pdf_url, published) values
  (
    'methode-complete-des-saxophones-klose',
    'Méthode complète des saxophones',
    'Método clássico e completo de saxofone (1866), dedicado a Adolphe Sax, o inventor do instrumento. Obra de domínio público.',
    'Hyacinthe Klosé',
    'intermediario',
    'intermediario',
    'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/klose-methode-complete-saxophones-1866.pdf',
    true
  ),
  (
    'new-and-grand-method-for-saxophone-mayeur',
    'New and Grand Method for Saxophone',
    'Método extenso e avançado de saxofone (1896), com 113 páginas de exercícios e repertório. Obra de domínio público.',
    'Louis Adolphe Mayeur',
    'avancado',
    'avancado',
    'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/mayeur-new-grand-method-saxophone-1896.pdf',
    true
  ),
  (
    '25-exercicios-diarios-klose',
    '25 Exercícios Diários para Saxofone',
    'Coletânea clássica de 25 estudos diários para manutenção técnica, de Hyacinthe Klosé. Obra de domínio público.',
    'Hyacinthe Klosé',
    'tecnica',
    'intermediario',
    'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/klose-25-exercices-journaliers.pdf',
    true
  ),
  (
    '25-estudos-de-mecanismo-klose',
    '25 Estudos de Mecanismo para Saxofone',
    'Estudos técnicos avançados de mecanismo e agilidade digital, de Hyacinthe Klosé. Obra de domínio público.',
    'Hyacinthe Klosé',
    'tecnica',
    'avancado',
    'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/klose-25-etudes-mecanisme.pdf',
    true
  )
on conflict (slug) do update set pdf_url = excluded.pdf_url;
