-- Adiciona imagem de capa aos exercícios (cartão na lista + banner no detalhe),
-- mesmo padrão usado em Métodos: um único campo para as duas exibições.
alter table exercises add column if not exists cover_image_url text;

update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-student-couch.jpg' where category = 'tecnica';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-monochrome.jpg' where category = 'escalas';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-jazz-closeup.jpg' where category = 'improvisacao';
update exercises set cover_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-vintage.jpg' where category = 'leitura';
