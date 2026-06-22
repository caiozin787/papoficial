-- Só achei domínio público pra trompete em Si♭ (Messerschmidt, dedicado a domínio público) —
-- ajusta o instrumento de sax alto pra sax tenor, que é o que a parte real serve.
update scores set
  instrument = 'sax_tenor',
  pdf_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/pdfs/partituras/au-clair-de-la-lune-messerschmidt.pdf'
where slug = 'au-clair-de-la-lune';
