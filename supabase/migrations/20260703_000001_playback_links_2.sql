-- Mais 2 playbacks a partir de vídeos do YouTube enviados pelo usuário, sem equivalente
-- genérico já catalogado (Bossa Nova em Dó Maior, Blues Lento em Lá).
insert into playbacks (slug, title, description, style, key, bpm, level, youtube_id, published) values
(
  'bossa-nova-em-do-maior',
  'Bossa Nova em Dó Maior',
  'Backing track de bossa nova em Dó Maior, progressão clássica de jazz bossa.',
  'bossa_nova', 'C', 130, 'intermediario', '4riDIWsISjI', true
),
(
  'blues-lento-em-la',
  'Blues Lento em Lá',
  'Backing track de blues lento (slow blues) em Lá, bom pra trabalhar phrasing e dinâmica.',
  'blues', 'A', 70, 'iniciante', '0Yu9sN7E194', true
);
