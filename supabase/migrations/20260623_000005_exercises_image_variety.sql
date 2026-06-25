-- Reduz a repetição de fotos nos exercícios: em vez de 1 imagem por categoria (4, repetida
-- 6x cada), passa a ser 1 imagem por subcategoria (12, repetida só 2x cada).
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-closeup-keys.jpg' where category = 'tecnica' and subcategory = 'Articulação';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-bw-portrait.jpg' where category = 'tecnica' and subcategory = 'Long Tones';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-studio-performance.jpg' where category = 'tecnica' and subcategory = 'Velocidade';

update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-monochrome.jpg' where category = 'escalas' and subcategory = 'Arpejos';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-gold-black.jpg' where category = 'escalas' and subcategory = 'Escalas maiores';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-sunset-silhouette.jpg' where category = 'escalas' and subcategory = 'Escalas menores';

update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-jazz-closeup.jpg' where category = 'improvisacao' and subcategory = 'Frases';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-player.jpg' where category = 'improvisacao' and subcategory = 'II-V-I';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-student-couch.jpg' where category = 'improvisacao' and subcategory = 'Patterns';

update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-vintage.jpg' where category = 'leitura' and subcategory = 'Primeira vista';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-notes.jpg' where category = 'leitura' and subcategory = 'Ritmo';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-closeup2.jpg' where category = 'leitura' and subcategory = 'Solfejo';
