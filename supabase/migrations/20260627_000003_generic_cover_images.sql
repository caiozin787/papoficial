-- Imagens genéricas (fotos livres de uso, Pexels) para conteúdo sem PDF/capa real própria.

-- Teoria: 1 imagem por categoria
update theories set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-notes.jpg' where category = 'fundamentos';
update theories set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-closeup-keys.jpg' where category = 'escalas';
update theories set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/piano-chords.jpg' where category = 'harmonia';
update theories set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-closeup2.jpg' where category = 'leitura';

-- Métodos sem PDF próprio (placeholders "Sax Tools"), agrupados por tema
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-player.jpg'
  where pdf_url is null and (category = 'iniciante' or category = 'improvisacao');
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-closeup-keys.jpg'
  where pdf_url is null and category = 'intermediario';
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-gold-black.jpg'
  where pdf_url is null and category = 'avancado';
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-monochrome.jpg'
  where pdf_url is null and category = 'tecnica';
update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-closeup2.jpg'
  where pdf_url is null and category = 'leitura';

-- Partituras (nenhuma tem PDF/capa próprio ainda), por categoria
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/piano-chords.jpg' where category = 'gospel';
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-player.jpg' where category = 'jazz';
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-vintage.jpg'
  where category in ('intermediario', 'estudos', 'iniciante', 'avancado');
