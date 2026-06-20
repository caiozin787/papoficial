-- Seed de exemplo para o Módulo 5 (Play Along), 5 estilos x 3 cada.
-- audio_url/chord_chart_url/youtube_id ficam null por enquanto (sem faixas reais hospedadas ainda).

insert into playbacks (slug, title, description, style, key, bpm, level, duration_seconds, published) values
  ('autumn-leaves-jazz', 'Autumn Leaves', 'Standard de jazz clássico, ótimo para praticar ii-V-i em tonalidades menores.', 'jazz', 'Gm', 120, 'intermediario', 210, true),
  ('blue-bossa', 'Blue Bossa', 'Mistura de bossa nova com harmonia de jazz, muito tocada em jam sessions.', 'jazz', 'Cm', 130, 'intermediario', 195, true),
  ('tune-up', 'Tune Up', 'Estudo clássico de ii-V-I em movimento descendente por tons inteiros.', 'jazz', 'D', 140, 'avancado', 180, true),

  ('blues-em-do', 'Blues em Dó', 'O blues de 12 compassos mais tocado para começar a improvisar.', 'blues', 'C', 100, 'iniciante', 200, true),
  ('blues-rapido-em-fa', 'Blues Rápido em Fá', 'Blues acelerado para treinar articulação e fluência em andamento rápido.', 'blues', 'F', 180, 'avancado', 170, true),
  ('blues-lento-em-sol', 'Blues Lento em Sol', 'Blues arrastado, ótimo para trabalhar expressividade e bend de notas.', 'blues', 'G', 70, 'intermediario', 230, true),

  ('balada-gospel-em-re', 'Balada Gospel em Ré', 'Andamento de balada com a clássica progressão I-vi-ii-V do gospel.', 'gospel', 'D', 75, 'intermediario', 240, true),
  ('gospel-up-tempo-em-mib', 'Gospel Up-Tempo em Mi♭', 'Levada animada de gospel contemporâneo, boa para treinar resposta rítmica.', 'gospel', 'Eb', 110, 'avancado', 200, true),
  ('hino-tradicional-em-sib', 'Hino Tradicional em Si♭', 'Estrutura simples de hino, ideal para tocar a melodia com expressão.', 'gospel', 'Bb', 80, 'iniciante', 220, true),

  ('balada-pop-em-do', 'Balada Pop em Dó', 'Progressão I-V-vi-IV, a mais comum no pop atual.', 'pop', 'C', 90, 'iniciante', 210, true),
  ('pop-dancante-em-la', 'Pop Dançante em Lá', 'Levada animada para praticar groove e tempo constante.', 'pop', 'A', 120, 'intermediario', 195, true),
  ('pop-rock-em-mi', 'Pop Rock em Mi', 'Base de pop rock com guitarras, boa para um solo de sax mais energético.', 'pop', 'E', 128, 'intermediario', 200, true),

  ('bossa-em-re-menor', 'Bossa em Ré Menor', 'Bossa nova clássica em tom menor, inspirada nos standards brasileiros.', 'bossa_nova', 'Dm', 130, 'intermediario', 215, true),
  ('bossa-lenta-em-fa', 'Bossa Lenta em Fá', 'Andamento confortável para iniciar na bossa nova, com levada suave.', 'bossa_nova', 'F', 100, 'iniciante', 225, true),
  ('bossa-em-sol-com-modulacao', 'Bossa em Sol com Modulação', 'Bossa com mudança de tom no meio da forma, desafio harmônico interessante.', 'bossa_nova', 'G', 140, 'avancado', 190, true)
on conflict (slug) do nothing;
