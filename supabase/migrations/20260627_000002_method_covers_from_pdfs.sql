-- Capas reais extraídas da página de rosto de cada PDF de domínio público já catalogado.
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/metodos/' || slug || '-cover.jpg'
where slug in (
  '25-estudos-de-mecanismo-klose',
  '25-exercicios-diarios-klose',
  '32-etudes-loyon',
  'grande-methode-complete-de-saxophones-mayeur',
  'methode-complete-de-saxophone-cokken',
  'methode-complete-des-saxophones-klose',
  'methode-pour-tous-les-saxophones-thiels',
  'methode-saxophone-baryton-klose-duos',
  'new-and-grand-method-for-saxophone-mayeur',
  'universal-method-for-saxophone-paul-de-ville'
);
