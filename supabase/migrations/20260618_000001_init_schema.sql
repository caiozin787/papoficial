-- Sax Tools — schema inicial completo (todos os módulos).
-- Rodar uma única vez. As telas vão sendo construídas módulo por módulo,
-- mas o desenho do banco é feito de uma vez para evitar migrações repetidas.

-- ============================================================
-- ENUMS
-- ============================================================
create type content_level as enum ('iniciante', 'intermediario', 'avancado');
create type user_role as enum ('student', 'admin');
create type instrument as enum ('sax_alto', 'sax_tenor', 'sax_soprano', 'sax_baritono');
create type playback_style as enum ('jazz', 'blues', 'gospel', 'pop', 'bossa_nova');
create type theory_category as enum ('fundamentos', 'escalas', 'harmonia', 'leitura');
create type method_category as enum ('iniciante', 'intermediario', 'avancado', 'tecnica', 'improvisacao', 'leitura');
create type exercise_category as enum ('tecnica', 'escalas', 'improvisacao', 'leitura');
create type score_category as enum ('iniciante', 'intermediario', 'avancado', 'jazz', 'gospel', 'estudos');
create type activity_type as enum ('theory', 'method', 'exercise', 'playback', 'score', 'tool');
create type activity_action as enum ('viewed', 'completed');
create type completable_type as enum ('theory', 'method', 'exercise');

-- ============================================================
-- USUÁRIOS
-- ============================================================
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  role user_role not null default 'student',
  created_at timestamptz not null default now()
);

create function handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

create function is_admin() returns boolean
  language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ============================================================
-- MÓDULO 1 — FERRAMENTAS (metadado leve, sem CRUD de conteúdo)
-- ============================================================
create table tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  icon_name text not null,
  order_index int not null default 0,
  is_featured boolean not null default false
);

-- ============================================================
-- MÓDULO 2 — TEORIA
-- ============================================================
create table theories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  content text not null,
  category theory_category not null,
  pdf_url text,
  cover_image_url text,
  order_index int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index theories_category_idx on theories (category);

create table theory_relations (
  theory_id uuid not null references theories (id) on delete cascade,
  related_theory_id uuid not null references theories (id) on delete cascade,
  primary key (theory_id, related_theory_id)
);

-- ============================================================
-- MÓDULO 3 — MÉTODOS
-- ============================================================
create table methods (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  author text not null,
  category method_category not null,
  level content_level not null,
  cover_image_url text,
  pdf_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index methods_category_idx on methods (category);
create index methods_level_idx on methods (level);

-- ============================================================
-- MÓDULO 4 — EXERCÍCIOS
-- ============================================================
create table exercises (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  category exercise_category not null,
  subcategory text,
  level content_level not null,
  estimated_minutes int,
  materials_needed text,
  pdf_url text,
  audio_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index exercises_category_idx on exercises (category);
create index exercises_level_idx on exercises (level);

create table theory_exercises (
  theory_id uuid not null references theories (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete cascade,
  primary key (theory_id, exercise_id)
);

-- ============================================================
-- MÓDULO 5 — PLAY ALONG
-- ============================================================
create table playbacks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  style playback_style not null,
  key text not null,
  bpm int not null,
  level content_level not null,
  chord_chart_url text,
  audio_url text,
  youtube_id text,
  duration_seconds int,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index playbacks_style_idx on playbacks (style);
create index playbacks_level_idx on playbacks (level);
create index playbacks_bpm_idx on playbacks (bpm);

-- ============================================================
-- MÓDULO 6 — PARTITURAS
-- ============================================================
create table scores (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  composer text not null,
  category score_category not null,
  level content_level not null,
  key text not null,
  instrument instrument not null,
  pdf_url text,
  preview_image_url text,
  pages int,
  popular boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index scores_category_idx on scores (category);
create index scores_level_idx on scores (level);

-- ============================================================
-- TRILHAS DE ESTUDO ("Por onde começar?")
-- ============================================================
create table learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  icon_name text not null,
  order_index int not null default 0
);

create table learning_path_items (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references learning_paths (id) on delete cascade,
  content_type activity_type not null,
  content_id uuid not null,
  order_index int not null default 0
);

-- ============================================================
-- FAVORITOS (uma tabela por tipo de conteúdo, com FK real)
-- ============================================================
create table favorite_methods (
  user_id uuid not null references profiles (id) on delete cascade,
  method_id uuid not null references methods (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, method_id)
);

create table favorite_exercises (
  user_id uuid not null references profiles (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

create table favorite_playbacks (
  user_id uuid not null references profiles (id) on delete cascade,
  playback_id uuid not null references playbacks (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, playback_id)
);

create table favorite_scores (
  user_id uuid not null references profiles (id) on delete cascade,
  score_id uuid not null references scores (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, score_id)
);

-- ============================================================
-- HISTÓRICO, PROGRESSO E GAMIFICAÇÃO
-- ============================================================
create table activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  content_type activity_type not null,
  content_id uuid not null,
  action activity_action not null,
  created_at timestamptz not null default now()
);
create index activity_log_user_created_idx on activity_log (user_id, created_at desc);

create table completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  content_type completable_type not null,
  content_id uuid not null,
  completed_at timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);

create table daily_study_log (
  user_id uuid not null references profiles (id) on delete cascade,
  study_date date not null,
  primary key (user_id, study_date)
);

-- ============================================================
-- RLS
-- ============================================================
alter table profiles enable row level security;
alter table tools enable row level security;
alter table theories enable row level security;
alter table theory_relations enable row level security;
alter table methods enable row level security;
alter table exercises enable row level security;
alter table theory_exercises enable row level security;
alter table playbacks enable row level security;
alter table scores enable row level security;
alter table learning_paths enable row level security;
alter table learning_path_items enable row level security;
alter table favorite_methods enable row level security;
alter table favorite_exercises enable row level security;
alter table favorite_playbacks enable row level security;
alter table favorite_scores enable row level security;
alter table activity_log enable row level security;
alter table completions enable row level security;
alter table daily_study_log enable row level security;

-- profiles: cada um vê/edita o próprio perfil; admin vê todos
create policy profiles_select_own on profiles for select using (auth.uid() = id or is_admin());
create policy profiles_update_own on profiles for update using (auth.uid() = id);

-- conteúdo público: leitura liberada onde published = true; escrita só admin
create policy tools_read on tools for select using (true);
create policy tools_admin_write on tools for all using (is_admin()) with check (is_admin());

create policy theories_read on theories for select using (published or is_admin());
create policy theories_admin_write on theories for all using (is_admin()) with check (is_admin());
create policy theory_relations_read on theory_relations for select using (true);
create policy theory_relations_admin_write on theory_relations for all using (is_admin()) with check (is_admin());

create policy methods_read on methods for select using (published or is_admin());
create policy methods_admin_write on methods for all using (is_admin()) with check (is_admin());

create policy exercises_read on exercises for select using (published or is_admin());
create policy exercises_admin_write on exercises for all using (is_admin()) with check (is_admin());
create policy theory_exercises_read on theory_exercises for select using (true);
create policy theory_exercises_admin_write on theory_exercises for all using (is_admin()) with check (is_admin());

create policy playbacks_read on playbacks for select using (published or is_admin());
create policy playbacks_admin_write on playbacks for all using (is_admin()) with check (is_admin());

create policy scores_read on scores for select using (published or is_admin());
create policy scores_admin_write on scores for all using (is_admin()) with check (is_admin());

create policy learning_paths_read on learning_paths for select using (true);
create policy learning_paths_admin_write on learning_paths for all using (is_admin()) with check (is_admin());
create policy learning_path_items_read on learning_path_items for select using (true);
create policy learning_path_items_admin_write on learning_path_items for all using (is_admin()) with check (is_admin());

-- dados de usuário: só o próprio dono
create policy favorite_methods_owner on favorite_methods for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy favorite_exercises_owner on favorite_exercises for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy favorite_playbacks_owner on favorite_playbacks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy favorite_scores_owner on favorite_scores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy activity_log_owner on activity_log for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy completions_owner on completions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy daily_study_log_owner on daily_study_log for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- SEED — Módulo 1 (ferramentas) e Módulo 2 (teorias)
-- ============================================================
insert into tools (slug, title, description, icon_name, order_index, is_featured) values
  ('afinador', 'Afinador', 'Afinador cromático com detecção de frequência em tempo real via microfone.', 'Headphones', 1, true),
  ('metronomo', 'Metrônomo Pro', 'BPM ajustável, subdivisões, compassos e acentuação.', 'Clock', 2, false),
  ('escalas', 'Escalas Interativas', 'Escolha tom e escala, veja os graus e ouça a reprodução.', 'Music2', 3, true),
  ('circulo-das-quintas', 'Círculo das Quintas', 'Tonalidades, relativas menores e campos harmônicos interativos.', 'CircleDot', 4, false),
  ('progressoes', 'Gerador de Progressões', 'II-V-I, Gospel, Jazz e Pop em qualquer tom.', 'Repeat', 5, false),
  ('arpejos', 'Gerador de Arpejos', 'Tríades, tétrades e acordes com tensões.', 'Waves', 6, false),
  ('dedilhados', 'Tabela de Dedilhados', 'Dedilhado padrão para sax alto, tenor e soprano.', 'Hand', 7, false),
  ('treino-auditivo', 'Treino Auditivo', 'Reconhecimento de intervalos, acordes e escalas.', 'Ear', 8, true);

insert into theories (slug, title, description, content, category, order_index) values
  ('notas-musicais', 'Notas Musicais', 'As sete notas naturais e os acidentes que completam a escala cromática.',
   'A música ocidental usa sete notas naturais: Dó, Ré, Mi, Fá, Sol, Lá e Si. Entre a maioria delas existe um tom inteiro, exceto entre Mi-Fá e Si-Dó, onde existe apenas um semitom.' || chr(10) || chr(10) ||
   'Os acidentes (sustenido # e bemol b) preenchem esses espaços, formando a escala cromática de 12 sons: Dó, Dó#/Réb, Ré, Ré#/Mib, Mi, Fá, Fá#/Solb, Sol, Sol#/Láb, Lá, Lá#/Sib, Si.' || chr(10) || chr(10) ||
   'No saxofone, cada uma dessas notas corresponde a um dedilhado específico — veja a Tabela de Dedilhados nas Ferramentas para praticar.',
   'fundamentos', 1),

  ('intervalos-musicais', 'Intervalos Musicais', 'A distância entre duas notas é a base de escalas, acordes e melodias.',
   'Um intervalo é a distância entre duas notas, medida em tons e semitons. Os principais são: 2ª menor (1 semitom), 2ª Maior (2 semitons), 3ª menor (3), 3ª Maior (4), 4ª Justa (5), 5ª Justa (7), 6ª menor (8), 6ª Maior (9), 7ª menor (10), 7ª Maior (11) e 8ª/Oitava (12).' || chr(10) || chr(10) ||
   'A 3ª Maior e a 3ª menor são especialmente importantes: são elas que definem se um acorde ou escala tem qualidade maior ou menor.' || chr(10) || chr(10) ||
   'Pratique reconhecendo intervalos de ouvido na ferramenta Treino Auditivo.',
   'fundamentos', 2),

  ('formacao-de-escalas', 'Como as Escalas são Formadas', 'Toda escala é uma sequência de intervalos a partir de uma nota fundamental.',
   'Uma escala é construída aplicando uma fórmula fixa de intervalos (em semitons) a partir de uma nota fundamental (tônica). Por exemplo, a escala maior segue o padrão Tom-Tom-Semitom-Tom-Tom-Tom-Semitom.' || chr(10) || chr(10) ||
   'Aplicando essa fórmula a partir de qualquer nota, você obtém a escala maior correspondente — é por isso que todas as escalas maiores "soam parecidas", apesar de usarem notas diferentes.' || chr(10) || chr(10) ||
   'Use a ferramenta Escalas Interativas para ouvir e visualizar qualquer escala em qualquer tonalidade.',
   'fundamentos', 3),

  ('escala-maior', 'Escala Maior', 'A escala mais fundamental da música ocidental, base para a harmonia tonal.',
   'A escala maior segue a fórmula de intervalos T-T-st-T-T-T-st (sendo T = tom e st = semitom). Em Dó Maior, isso resulta exatamente nas teclas brancas do piano: C D E F G A B C.' || chr(10) || chr(10) ||
   'Cada grau da escala maior tem uma função: o 1º grau (tônica) é o ponto de repouso, o 5º grau (dominante) cria tensão que resolve na tônica, e assim por diante. Essas funções são a base de toda a harmonia tonal.' || chr(10) || chr(10) ||
   'Veja também o Campo Harmônico para entender quais acordes nascem naturalmente de cada escala maior.',
   'escalas', 1),

  ('escalas-menores', 'Escalas Menores (Natural, Harmônica e Melódica)', 'Três variações da escala menor, cada uma com um caráter sonoro diferente.',
   'A escala menor natural usa a fórmula T-st-T-T-st-T-T e tem um som melancólico — é a relativa menor de uma escala maior (mesmas notas, tônica diferente).' || chr(10) || chr(10) ||
   'A escala menor harmônica eleva o 7º grau em um semitom, criando uma tensão característica usada em música clássica, flamenco e klezmer.' || chr(10) || chr(10) ||
   'A escala menor melódica eleva tanto o 6º quanto o 7º grau (na subida), sendo muito usada em jazz sobre acordes menores com 7ª maior.',
   'escalas', 2),

  ('escala-pentatonica', 'Escala Pentatônica', 'Uma escala de apenas 5 notas, presente em quase todas as tradições musicais do mundo.',
   'A pentatônica maior usa os graus 1, 2, 3, 5 e 6 da escala maior (sem o 4º e o 7º grau, que são os mais "tensos"). Isso faz com que praticamente qualquer combinação dessas notas soe bem.' || chr(10) || chr(10) ||
   'É extremamente usada em improvisação de blues, rock e pop justamente por ser "à prova de erros" — funciona sobre boa parte da harmonia de uma música sem precisar pensar em cada acorde individualmente.' || chr(10) || chr(10) ||
   'A pentatônica menor é a relativa menor da pentatônica maior (graus 1, b3, 4, 5, b7).',
   'escalas', 3),

  ('escala-blues', 'Escala Blues', 'A pentatônica menor com uma nota extra que define o som do blues.',
   'A escala blues é a pentatônica menor (1, b3, 4, 5, b7) com a adição da 5ª diminuta (b5), chamada de "blue note". Essa nota, tocada entre o 4º e o 5º grau, é a responsável pelo caráter tenso e expressivo do blues.' || chr(10) || chr(10) ||
   'No saxofone, é comum "bender" essa nota ligeiramente para cima ou para baixo, em vez de tocá-la afinada de forma exata — isso é parte da expressividade do estilo.',
   'escalas', 4),

  ('campo-harmonico', 'Campo Harmônico', 'O conjunto de acordes que nascem naturalmente de uma escala.',
   'O campo harmônico é formado empilhando terças sobre cada grau de uma escala. Na escala maior, isso gera a sequência: I (maior), ii (menor), iii (menor), IV (maior), V (maior), vi (menor), vii° (diminuto).' || chr(10) || chr(10) ||
   'Esses acordes são "naturais" daquela tonalidade — é por isso que progressões como I-IV-V ou ii-V-I soam tão bem: todos os acordes pertencem ao mesmo campo harmônico.' || chr(10) || chr(10) ||
   'Explore o campo harmônico de qualquer tom na ferramenta Círculo das Quintas.',
   'harmonia', 1),

  ('formacao-de-acordes', 'Formação de Acordes (Tríades e Tétrades)', 'Como empilhar terças constrói os acordes mais usados na música.',
   'Uma tríade é formada por 3 notas: fundamental, terça e quinta. A qualidade da tríade (maior, menor, diminuta, aumentada) depende do tamanho dessas terças.' || chr(10) || chr(10) ||
   'Uma tétrade adiciona uma quarta nota, geralmente uma sétima, criando acordes como maj7, m7, dom7 (7), m7b5 e dim7 — a base harmônica do jazz.' || chr(10) || chr(10) ||
   'Pratique a construção de qualquer tríade ou tétrade na ferramenta Gerador de Arpejos.',
   'harmonia', 2),

  ('progressoes-harmonicas', 'Progressões Harmônicas Comuns', 'Sequências de acordes que aparecem repetidamente em diferentes estilos.',
   'Algumas sequências de acordes são tão eficazes que se tornaram a espinha dorsal de estilos inteiros: o ii-V-I é onipresente no jazz, o I-vi-ii-V aparece em gospel e turnarounds, e o I-V-vi-IV é a progressão mais comum do pop.' || chr(10) || chr(10) ||
   'Entender essas progressões pelo grau (numeral romano), e não só pelo nome do acorde, permite transportar qualquer progressão para qualquer tom instantaneamente.' || chr(10) || chr(10) ||
   'Gere e ouça essas progressões em qualquer tom na ferramenta Gerador de Progressões.',
   'harmonia', 3),

  ('tensoes-harmonicas', 'Tensões e Acordes Estendidos', '9ª, 11ª e 13ª: as notas que dão cor e sofisticação à harmonia.',
   'Tensões são notas adicionadas além da sétima de um acorde: 9ª (2ª uma oitava acima), 11ª (4ª uma oitava acima) e 13ª (6ª uma oitava acima).' || chr(10) || chr(10) ||
   'Elas não mudam a função básica do acorde, mas adicionam cor harmônica — muito usadas em jazz e música popular brasileira para enriquecer acordes dominantes e maiores.' || chr(10) || chr(10) ||
   'Algumas tensões são "naturais" (soam consonantes) e outras "alteradas" (b9, #9, #11, b13), criando ainda mais tensão sobre acordes dominantes.',
   'harmonia', 4),

  ('figuras-ritmicas', 'Figuras Rítmicas e Pausas', 'A notação que representa duração de som e de silêncio na partitura.',
   'Cada figura rítmica representa uma duração: semibreve (4 tempos), mínima (2), semínima (1), colcheia (1/2), semicolcheia (1/4), e assim por diante — cada uma vale a metade da anterior.' || chr(10) || chr(10) ||
   'Para cada figura de som existe uma pausa equivalente, representando silêncio pela mesma duração. Ler ritmo com fluência significa reconhecer essas durações instantaneamente, sem precisar contar manualmente.',
   'leitura', 1),

  ('formulas-de-compasso', 'Fórmulas de Compasso', 'Como a música é organizada em grupos regulares de tempos.',
   'A fórmula de compasso (ex: 4/4, 3/4, 6/8) indica quantos tempos há em cada compasso e qual figura representa um tempo. Em 4/4, há 4 tempos por compasso e a semínima vale um tempo.' || chr(10) || chr(10) ||
   'Compassos simples (2/4, 3/4, 4/4) dividem cada tempo em duas partes; compassos compostos (6/8, 9/8, 12/8) dividem cada tempo em três partes, dando uma sensação rítmica diferente.' || chr(10) || chr(10) ||
   'Pratique compassos diferentes no Metrônomo Pro, que suporta de 2/4 a 7/8.',
   'leitura', 2),

  ('sincope-e-contratempo', 'Síncope e Contratempo', 'Recursos rítmicos que criam a sensação de "swing" e groove.',
   'Contratempo é tocar uma nota na parte fraca do tempo (no "e" da contagem), em vez da parte forte. Síncope é quando uma nota começa numa parte fraca e se prolonga até a parte forte seguinte, "amarrando" os dois tempos.' || chr(10) || chr(10) ||
   'Esses recursos são essenciais em jazz, samba, funk e praticamente todo estilo com groove — eles criam a sensação de impulso rítmico que faz a música "balançar".',
   'leitura', 3)
on conflict (slug) do nothing;

-- relações entre teorias (mesma área de estudo)
insert into theory_relations (theory_id, related_theory_id)
select t1.id, t2.id from theories t1, theories t2
where (t1.slug, t2.slug) in (
  ('escala-maior', 'campo-harmonico'),
  ('campo-harmonico', 'escala-maior'),
  ('escala-maior', 'formacao-de-escalas'),
  ('formacao-de-escalas', 'intervalos-musicais'),
  ('formacao-de-acordes', 'campo-harmonico'),
  ('formacao-de-acordes', 'tensoes-harmonicas'),
  ('progressoes-harmonicas', 'campo-harmonico'),
  ('escalas-menores', 'escala-maior'),
  ('escala-blues', 'escalas-menores'),
  ('escala-pentatonica', 'escalas-menores'),
  ('formulas-de-compasso', 'figuras-ritmicas'),
  ('sincope-e-contratempo', 'figuras-ritmicas')
)
on conflict do nothing;
