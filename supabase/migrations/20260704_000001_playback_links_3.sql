-- Vincula os vídeos enviados aos placeholders existentes que combinam exatamente (Autumn Leaves, Tune Up).
update playbacks set youtube_id = 'Xjf2kiDO19Y', bpm = 120, duration_seconds = 387 where slug = 'autumn-leaves-jazz';
update playbacks set youtube_id = '4eZpgLdola0', bpm = 120, duration_seconds = 375 where slug = 'tune-up';

-- Sem equivalente no catálogo (J-Pop em Lá menor).
insert into playbacks (slug, title, description, style, key, bpm, level, youtube_id, duration_seconds, published) values
(
  'j-pop-em-la-menor',
  'J-Pop em Lá Menor',
  'Backing track no estilo J-Pop em Lá menor, sem guitarra na mixagem — bom espaço pra improvisar.',
  'pop', 'Am', 80, 'iniciante', 'IWCg0U9Uli0', 631, true
);

-- Preenche a duração que ficou em branco nos playbacks adicionados antes.
update playbacks set duration_seconds = 324 where slug = 'jazz-2-5-1-em-do-maior';
update playbacks set duration_seconds = 663 where slug = 'neo-soul-groove-em-do-menor';
update playbacks set duration_seconds = 336 where slug = 'rock-pop-em-la-maior';
update playbacks set duration_seconds = 765 where slug = 'isnt-she-lovely';
update playbacks set duration_seconds = 493 where slug = 'deep-soul-groove-em-la-menor';
update playbacks set duration_seconds = 703 where slug = 'bossa-nova-em-do-maior';
update playbacks set duration_seconds = 348 where slug = 'blues-lento-em-la';
