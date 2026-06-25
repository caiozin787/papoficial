-- Separa a imagem da miniatura (lista /teoria) da imagem do banner (detalhe do artigo).
-- cover_image_url continua a ser usado no banner da página de detalhe (o diagrama).
-- card_image_url passa a ser usado no cartão da listagem (a foto genérica antiga).
alter table theories add column if not exists card_image_url text;

update theories set card_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-notes.jpg' where category = 'fundamentos';
update theories set card_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sax-closeup-keys.jpg' where category = 'escalas';
update theories set card_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/piano-chords.jpg' where category = 'harmonia';
update theories set card_image_url = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/generico/sheet-music-closeup2.jpg' where category = 'leitura';
