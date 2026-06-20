-- Reduz repetição de fotos genéricas: dá imagens próprias para "improvisação" (métodos)
-- e para cada categoria de Partituras, que antes concentrava 12 das 18 linhas na mesma foto.

update methods set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-sunset-silhouette.jpg'
  where pdf_url is null and category = 'improvisacao';

update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-student-couch.jpg' where category = 'iniciante';
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-studio-performance.jpg' where category = 'intermediario';
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-jazz-closeup.jpg' where category = 'estudos';
update scores set preview_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-bw-portrait.jpg' where category = 'avancado';
