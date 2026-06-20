-- Seed de exemplo para o Módulo 6 (Partituras), 6 categorias x 3 cada.

insert into scores (slug, title, composer, category, level, key, instrument, pages, popular, published) values
  ('au-clair-de-la-lune', 'Au Clair de la Lune', 'Tradicional francesa', 'iniciante', 'iniciante', 'C', 'sax_alto', 1, false, true),
  ('ode-a-alegria', 'Ode à Alegria', 'Ludwig van Beethoven', 'iniciante', 'iniciante', 'F', 'sax_alto', 2, true, true),
  ('greensleeves', 'Greensleeves', 'Tradicional inglesa', 'iniciante', 'iniciante', 'G', 'sax_alto', 2, false, true),

  ('amazing-grace', 'Amazing Grace', 'Trad. (New Britain)', 'intermediario', 'intermediario', 'Bb', 'sax_tenor', 2, true, true),
  ('ave-maria', 'Ave Maria', 'Charles Gounod (sobre Bach)', 'intermediario', 'intermediario', 'C', 'sax_alto', 3, false, true),
  ('meditation-thais', 'Méditation (Thaïs)', 'Jules Massenet', 'intermediario', 'intermediario', 'D', 'sax_tenor', 3, false, true),

  ('czardas', 'Czardas', 'Vittorio Monti', 'avancado', 'avancado', 'Gm', 'sax_alto', 6, true, true),
  ('carnaval-de-veneza', 'Carnaval de Veneza', 'Tradicional / Variações', 'avancado', 'avancado', 'Bb', 'sax_soprano', 5, false, true),
  ('capriccio-no-24', 'Capriccio Nº 24 (adaptação)', 'Niccolò Paganini', 'avancado', 'avancado', 'Am', 'sax_tenor', 7, false, true),

  ('blues-original', 'Blues Original', 'Sax Tools', 'jazz', 'intermediario', 'Bb', 'sax_tenor', 2, false, true),
  ('swing-facil', 'Swing Fácil', 'Sax Tools', 'jazz', 'intermediario', 'F', 'sax_alto', 2, false, true),
  ('estudo-em-bebop', 'Estudo em Bebop', 'Sax Tools', 'jazz', 'avancado', 'C', 'sax_tenor', 4, false, true),

  ('hino-de-adoracao', 'Hino de Adoração', 'Sax Tools', 'gospel', 'iniciante', 'D', 'sax_alto', 2, false, true),
  ('louvor-instrumental', 'Louvor Instrumental', 'Sax Tools', 'gospel', 'intermediario', 'Eb', 'sax_tenor', 3, false, true),
  ('gospel-solo-avancado', 'Gospel Solo Avançado', 'Sax Tools', 'gospel', 'avancado', 'Bb', 'sax_soprano', 4, false, true),

  ('estudo-1-articulacao', 'Estudo Nº 1 — Articulação', 'Sax Tools', 'estudos', 'iniciante', 'C', 'sax_alto', 1, false, true),
  ('estudo-5-intervalos', 'Estudo Nº 5 — Intervalos', 'Sax Tools', 'estudos', 'intermediario', 'G', 'sax_tenor', 2, false, true),
  ('estudo-12-tecnica-avancada', 'Estudo Nº 12 — Técnica Avançada', 'Sax Tools', 'estudos', 'avancado', 'F#m', 'sax_alto', 3, false, true)
on conflict (slug) do nothing;
