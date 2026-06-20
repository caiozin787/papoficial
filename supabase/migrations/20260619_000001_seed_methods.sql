-- Seed de exemplo para o Módulo 3 (Métodos). Conteúdo original da plataforma
-- (capa/PDF ficam null por enquanto, até existir upload real via painel admin).

insert into methods (slug, title, description, author, category, level, published) values
  ('primeiros-passos-no-saxofone', 'Primeiros Passos no Saxofone', 'Método completo para quem está começando do zero: postura, embocadura, respiração e as primeiras notas.', 'Sax Tools', 'iniciante', 'iniciante', true),
  ('saxofone-para-criancas-e-adolescentes', 'Saxofone para Crianças e Adolescentes', 'Abordagem lúdica para os primeiros meses de estudo, com músicas simples e exercícios curtos.', 'Sax Tools', 'iniciante', 'iniciante', true),
  ('fundamentos-do-som', 'Fundamentos do Som', 'Como produzir um som limpo e estável desde a primeira aula, com long tones guiados.', 'Sax Tools', 'iniciante', 'iniciante', true),

  ('construindo-repertorio', 'Construindo Repertório', 'Coletânea de peças de nível intermediário para expandir leitura e musicalidade.', 'Sax Tools', 'intermediario', 'intermediario', true),
  ('escalas-e-arpejos-no-dia-a-dia', 'Escalas e Arpejos no Dia a Dia', 'Rotina estruturada de escalas e arpejos para quem já passou do básico.', 'Sax Tools', 'intermediario', 'intermediario', true),
  ('saxofone-em-conjunto', 'Saxofone em Conjunto', 'Introdução à prática em grupo: afinação coletiva, dinâmica e balanço sonoro.', 'Sax Tools', 'intermediario', 'intermediario', true),

  ('virtuosismo-tecnico', 'Virtuosismo Técnico', 'Exercícios avançados de velocidade, articulação e extensão de registro.', 'Sax Tools', 'avancado', 'avancado', true),
  ('repertorio-solo-avancado', 'Repertório Solo Avançado', 'Peças de concerto e estudos avançados para saxofonistas em nível avançado.', 'Sax Tools', 'avancado', 'avancado', true),
  ('preparacao-para-audicoes', 'Preparação para Audições', 'Material de estudo dirigido para quem está se preparando para provas e audições.', 'Sax Tools', 'avancado', 'avancado', true),

  ('long-tones-e-controle-de-ar', 'Long Tones e Controle de Ar', 'Construção de uma base sólida de respiração e sustentação de notas longas.', 'Sax Tools', 'tecnica', 'iniciante', true),
  ('velocidade-e-agilidade-digital', 'Velocidade e Agilidade Digital', 'Exercícios progressivos para ganhar agilidade nos dedos sem perder precisão.', 'Sax Tools', 'tecnica', 'intermediario', true),
  ('articulacao-avancada', 'Articulação Avançada', 'Staccato, legato e articulação dupla aplicados a passagens rápidas.', 'Sax Tools', 'tecnica', 'avancado', true),

  ('primeiros-passos-na-improvisacao', 'Primeiros Passos na Improvisação', 'Como improvisar suas primeiras frases usando a escala pentatônica.', 'Sax Tools', 'improvisacao', 'iniciante', true),
  ('improvisacao-sobre-ii-v-i', 'Improvisação sobre II-V-I', 'Vocabulário e padrões para improvisar com fluência sobre a progressão mais comum do jazz.', 'Sax Tools', 'improvisacao', 'intermediario', true),
  ('linguagem-bebop-avancada', 'Linguagem Bebop Avançada', 'Frases, encadeamentos e substituições harmônicas no estilo bebop.', 'Sax Tools', 'improvisacao', 'avancado', true),

  ('leitura-a-primeira-vista-nivel-1', 'Leitura à Primeira Vista — Nível 1', 'Exercícios curtos e progressivos para destravar a leitura à primeira vista.', 'Sax Tools', 'leitura', 'iniciante', true),
  ('ritmos-e-sincopes', 'Ritmos e Síncopes', 'Leitura rítmica focada em síncopes, contratempos e subdivisões.', 'Sax Tools', 'leitura', 'intermediario', true),
  ('leitura-avancada-em-big-band', 'Leitura Avançada em Big Band', 'Repertório de leitura no estilo de naipe de big band, com dinâmica e articulação detalhadas.', 'Sax Tools', 'leitura', 'avancado', true)
on conflict (slug) do nothing;
