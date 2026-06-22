-- Adiciona o vídeo real à "Blue Bossa" já catalogada (o vídeo enviado roda a 150bpm).
update playbacks set youtube_id = '7H7Xg6U7P5g', bpm = 150 where slug = 'blue-bossa';

-- 5 playbacks novos a partir de vídeos do YouTube enviados pelo usuário, sem equivalente
-- genérico já catalogado.
insert into playbacks (slug, title, description, style, key, bpm, level, youtube_id, published) values
(
  'jazz-2-5-1-em-do-maior',
  'Jazz 2-5-1 em Dó Maior',
  'Backing track de jazz para praticar a progressão II-V-I em Dó Maior, no swing médio.',
  'jazz', 'C', 132, 'intermediario', 'Mss0u20GmBo', true
),
(
  'neo-soul-groove-em-do-menor',
  'Neo Soul Groove em Dó Menor',
  'Backing track de neo soul/R&B em Dó menor, clima suave pra improvisação melódica.',
  'soul', 'Cm', 91, 'intermediario', 'A5qs7lWpWZs', true
),
(
  'rock-pop-em-la-maior',
  'Rock Pop em Lá Maior',
  'Backing track de rock pop em Lá Maior, progressão A-E-Bm-D.',
  'pop', 'A', 80, 'iniciante', '78-nA8U6Rj8', true
),
(
  'isnt-she-lovely',
  'Isn''t She Lovely',
  'Backing track no estilo de Stevie Wonder ("Isn''t She Lovely"), em Mi Maior.',
  'pop', 'E', 106, 'intermediario', 'E4t6_EoWD9s', true
),
(
  'deep-soul-groove-em-la-menor',
  'Deep Soul Groove em Lá Menor',
  'Backing track de soul groove em Lá menor, clima envolvente pra frases melódicas.',
  'soul', 'Am', 85, 'intermediario', '55MTcCE6ZIk', true
);
