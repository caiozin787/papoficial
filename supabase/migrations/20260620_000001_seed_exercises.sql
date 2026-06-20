-- Seed de exemplo para o Módulo 4 (Exercícios), 4 categorias x 3 subcategorias x 2 níveis.

insert into exercises (slug, title, description, category, subcategory, level, estimated_minutes, materials_needed, published) values
  ('long-tones-fundamentacao-do-som', 'Long Tones — Fundamentação do Som', 'Sustentar notas longas com som estável, controlando ataque, sustentação e corte de forma uniforme.', 'tecnica', 'Long Tones', 'iniciante', 15, 'Saxofone, afinador e metrônomo', true),
  ('long-tones-crescendo-decrescendo', 'Long Tones com Crescendo e Decrescendo', 'Adicionar dinâmica controlada às notas longas sem perder a afinação.', 'tecnica', 'Long Tones', 'intermediario', 15, 'Saxofone e afinador', true),
  ('articulacao-staccato-basica', 'Articulação Staccato Básica', 'Desenvolver um staccato limpo e uniforme em escalas simples.', 'tecnica', 'Articulação', 'iniciante', 10, 'Saxofone e metrônomo', true),
  ('articulacao-dupla-passagens-rapidas', 'Articulação Dupla em Passagens Rápidas', 'Aplicar articulação dupla (du-gu) em sequências rápidas de colcheias.', 'tecnica', 'Articulação', 'avancado', 20, 'Saxofone e metrônomo', true),
  ('velocidade-escalas-semicolcheias', 'Velocidade: Escalas em Semicolcheias', 'Aumentar gradualmente o BPM de escalas tocadas em semicolcheias mantendo a precisão.', 'tecnica', 'Velocidade', 'intermediario', 15, 'Saxofone e metrônomo', true),
  ('velocidade-saltos-intervalares', 'Velocidade: Saltos Intervalares', 'Ganhar agilidade em saltos de quartas e quintas em andamento rápido.', 'tecnica', 'Velocidade', 'avancado', 15, 'Saxofone e metrônomo', true),

  ('escalas-maiores-todas-tonalidades', 'Escalas Maiores em Todas as Tonalidades', 'Tocar a escala maior nas 12 tonalidades, subindo e descendo, com metrônomo.', 'escalas', 'Escalas maiores', 'intermediario', 20, 'Saxofone e metrônomo', true),
  ('escalas-maiores-em-tercas', 'Escalas Maiores em Terças', 'Praticar escalas maiores tocadas em intervalos de terça para desenvolver fluência harmônica.', 'escalas', 'Escalas maiores', 'avancado', 15, 'Saxofone e metrônomo', true),
  ('escalas-menores-natural-harmonica', 'Escalas Menores Naturais e Harmônicas', 'Comparar e praticar as formas de escala menor em sequência, na mesma tonalidade.', 'escalas', 'Escalas menores', 'intermediario', 20, 'Saxofone e metrônomo', true),
  ('escala-menor-melodica-em-jazz', 'Escala Menor Melódica em Contexto de Jazz', 'Aplicar a escala menor melódica sobre acordes m7 em progressões de jazz.', 'escalas', 'Escalas menores', 'avancado', 15, 'Saxofone, metrônomo e playback de apoio', true),
  ('arpejos-triades-duas-oitavas', 'Arpejos de Tríades em Duas Oitavas', 'Tocar tríades maiores e menores em arpejo, cobrindo duas oitavas.', 'escalas', 'Arpejos', 'intermediario', 15, 'Saxofone e metrônomo', true),
  ('arpejos-tetrades-maj7-m7-dom7', 'Arpejos de Tétrades (Maj7, m7, Dom7)', 'Praticar arpejos de acordes de quatro notas nas principais tonalidades.', 'escalas', 'Arpejos', 'avancado', 20, 'Saxofone e metrônomo', true),

  ('patterns-3-notas-escala-maior', 'Patterns de 3 Notas sobre Escala Maior', 'Memorizar e aplicar pequenos padrões melódicos de 3 notas sobre a escala maior.', 'improvisacao', 'Patterns', 'iniciante', 15, 'Saxofone e playback de apoio', true),
  ('patterns-bebop-sobre-dominante', 'Patterns Bebop sobre Dominante', 'Aplicar patterns característicos do bebop sobre acordes dominantes.', 'improvisacao', 'Patterns', 'avancado', 20, 'Saxofone e playback de apoio', true),
  ('construindo-frases-2-compassos', 'Construindo Frases de 2 Compassos', 'Criar e variar frases curtas de improviso sobre um playback simples.', 'improvisacao', 'Frases', 'intermediario', 15, 'Saxofone e playback de apoio', true),
  ('frases-com-motivos-repetidos', 'Frases com Motivos Repetidos', 'Desenvolver um motivo melódico curto e repeti-lo em diferentes alturas.', 'improvisacao', 'Frases', 'avancado', 15, 'Saxofone e gravador (para se ouvir)', true),
  ('improvisando-sobre-ii-v-i', 'Improvisando sobre II-V-I', 'Aplicar escalas e arpejos apropriados sobre a progressão ii-V-I.', 'improvisacao', 'II-V-I', 'intermediario', 20, 'Saxofone e playback de apoio', true),
  ('ii-v-i-todas-tonalidades', 'II-V-I em Todas as Tonalidades', 'Praticar a progressão ii-V-I improvisada nas 12 tonalidades.', 'improvisacao', 'II-V-I', 'avancado', 25, 'Saxofone e playback de apoio', true),

  ('leitura-ritmica-seminimas-colcheias', 'Leitura Rítmica — Semínimas e Colcheias', 'Ler e reproduzir padrões rítmicos simples batendo palma antes de tocar.', 'leitura', 'Ritmo', 'iniciante', 10, 'Partitura de leitura rítmica', true),
  ('leitura-ritmica-sincopes', 'Leitura Rítmica — Síncopes', 'Ler padrões com síncope e contratempo em diferentes compassos.', 'leitura', 'Ritmo', 'intermediario', 15, 'Partitura de leitura rítmica e metrônomo', true),
  ('solfejo-intervalos-simples', 'Solfejo de Intervalos Simples', 'Cantar intervalos antes de tocá-los para desenvolver a audição interna.', 'leitura', 'Solfejo', 'iniciante', 10, 'Apenas a voz (sem instrumento)', true),
  ('solfejo-ritmico-com-nomes-de-notas', 'Solfejo Rítmico com Nomes de Notas', 'Cantar uma melodia simples com o nome das notas, mantendo o pulso.', 'leitura', 'Solfejo', 'intermediario', 15, 'Apenas a voz e metrônomo', true),
  ('primeira-vista-melodias-curtas', 'Primeira Vista — Melodias Curtas', 'Ler e tocar pequenas melodias nunca vistas antes, sem parar para corrigir.', 'leitura', 'Primeira vista', 'intermediario', 15, 'Saxofone e partituras variadas', true),
  ('primeira-vista-repertorio-de-banda', 'Primeira Vista — Repertório de Banda', 'Ler partes de naipe de banda/big band à primeira vista, mantendo o tempo.', 'leitura', 'Primeira vista', 'avancado', 20, 'Saxofone e partes de naipe', true)
on conflict (slug) do nothing;

-- relaciona algumas teorias aos exercícios que praticam o conteúdo explicado
insert into theory_exercises (theory_id, exercise_id)
select t.id, e.id from theories t, exercises e
where (t.slug, e.slug) in (
  ('escala-maior', 'escalas-maiores-todas-tonalidades'),
  ('escalas-menores', 'escalas-menores-natural-harmonica'),
  ('escala-pentatonica', 'patterns-3-notas-escala-maior'),
  ('progressoes-harmonicas', 'improvisando-sobre-ii-v-i'),
  ('progressoes-harmonicas', 'ii-v-i-todas-tonalidades'),
  ('formacao-de-acordes', 'arpejos-triades-duas-oitavas'),
  ('formacao-de-acordes', 'arpejos-tetrades-maj7-m7-dom7'),
  ('figuras-ritmicas', 'leitura-ritmica-seminimas-colcheias'),
  ('sincope-e-contratempo', 'leitura-ritmica-sincopes'),
  ('intervalos-musicais', 'solfejo-intervalos-simples')
)
on conflict do nothing;
