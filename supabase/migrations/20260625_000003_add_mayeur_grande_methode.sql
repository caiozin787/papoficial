-- Substitui o placeholder "Virtuosismo Técnico" pela primeira edição (1868) da "Grande méthode complète de saxophones"
-- de Mayeur, obra distinta do "New and Grand Method for Saxophone" (1896) já catalogado — domínio público confirmado no IMSLP.
update methods set
  slug = 'grande-methode-complete-de-saxophones-mayeur',
  title = 'Grande méthode complète de saxophones',
  author = 'Louis Adolphe Mayeur',
  description = 'Edição original francesa (1868) do grande método de Mayeur, dedicada ao Rei Leopoldo II da Bélgica — 137 páginas de estudos e repertório avançado para domínio técnico completo do instrumento.',
  pdf_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/metodos/grande-methode-complete-de-saxophones-mayeur-1868.pdf'
where id = '94827271-f787-47fb-860a-046d38e9c1fc';
