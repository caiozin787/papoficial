-- Amazing Grace: o arranjo PD encontrado (trompete em Si♭) já bate exatamente com o
-- instrumento/tom já cadastrados (sax tenor, Si♭).
update scores set pdf_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/partituras/amazing-grace-messerschmidt.pdf'
where slug = 'amazing-grace';

-- Carnaval de Veneza: achei a peça real, escrita por Mayeur especificamente para sax alto e
-- piano (1869, domínio público) — corrige composer/instrumento/páginas pra refletir a obra real
-- em vez do placeholder genérico "Tradicional / Variações" em sax soprano.
update scores set
  composer = 'Louis Adolphe Mayeur',
  instrument = 'sax_alto',
  pages = 14,
  pdf_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/partituras/carnaval-de-veneza-mayeur-1869.pdf'
where slug = 'carnaval-de-veneza';
