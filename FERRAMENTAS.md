# Ferramentas do Sax Tools

Este documento descreve as 5 principais ferramentas interativas implementadas no site Sax Tools.

## 1. Escalas Interativas
**Rota:** `/ferramentas/escalas`

### Funcionalidades:
- Seletor de tonalidade (C, D, F, G)
- Seletor de tipo de escala (Maior, Menor Natural, Pentatônica, Dórico, Mixolídio)
- Visualização das notas da escala com indicação de digitação
- Metrônomo integrado com BPM ajustável (40-240)
- Dicas de prática

### Tecnologias:
- React hooks (useState)
- Radix UI Select
- Slider component

---

## 2. Metrônomo Pro
**Rota:** `/ferramentas/metronomo`

### Funcionalidades:
- Controle de BPM de 40 a 240
- Múltiplos compassos (2/4, 3/4, 4/4, 5/4, 6/8, 7/8)
- Indicadores visuais de batida em tempo real
- Opção de acento no primeiro tempo
- Subdivisões (colcheias)
- Controle de volume (0-100%)
- Botões de tempos rápidos pré-definidos
- Som real usando Web Audio API

### Tecnologias:
- Web Audio API (AudioContext, OscillatorNode, GainNode)
- React hooks (useState, useEffect, useRef)
- Intervalos precisos com setInterval
- Radix UI Select, Slider, Switch

---

## 3. Playbacks
**Rota:** `/ferramentas/playbacks`

### Funcionalidades:
- 25+ playbacks profissionais organizados por estilo
- 6 categorias: Jazz, Blues, Bossa Nova, Ballads, Funk/Soul, Rock
- Informações detalhadas: tom, tempo (BPM), duração, nível de dificuldade
- Badges coloridos por dificuldade (Iniciante, Intermediário, Avançado)
- Links diretos para vídeos no YouTube
- Sistema de tabs para navegação entre estilos
- Indicação de dificuldade com cores

### Playbacks incluídos:
**Jazz:** Autumn Leaves, All The Things You Are, Blue Bossa, Summertime, Take Five
**Blues:** Blues em Bb, F, Gm, C e Eb
**Bossa Nova:** Girl from Ipanema, Águas de Março, Desafinado, Corcovado, Samba de Uma Nota Só
**E mais...**

### Tecnologias:
- Radix UI Tabs
- React Router para navegação
- YouTube integration

---

## 4. Partituras
**Rota:** `/ferramentas/partituras`

### Funcionalidades:
- 18 partituras catalogadas
- Sistema de busca por título, compositor ou estilo
- Filtros por nível de dificuldade (Iniciante, Intermediário, Avançado)
- Indicação de número de páginas
- Marcador de partituras populares (estrela dourada)
- Botão de download para cada partitura
- Layout em grid responsivo

### Partituras incluídas:
- Girl from Ipanema (Tom Jobim)
- Summertime (George Gershwin)
- Careless Whisper (George Michael)
- Take Five (Dave Brubeck)
- Autumn Leaves (Joseph Kosma)
- Baker Street (Gerry Rafferty)
- E mais 12 partituras...

### Tecnologias:
- Radix UI Tabs, Input
- Sistema de busca em tempo real
- Badges com cores customizadas

---

## 5. Afinador Cromático
**Rota:** `/ferramentas/afinador`

### Funcionalidades:
- Detecção de frequência em tempo real via microfone
- Algoritmo de auto-correlação para detecção precisa de pitch
- Display de nota musical detectada (com oitava)
- Indicação de frequência em Hz
- Medidor visual de afinação com agulha animada
- Indicação de cents (-50 a +50 cents)
- Feedback visual por cores:
  - Verde: perfeitamente afinado (±5 cents)
  - Amarelo: quase afinado (±15 cents)
  - Vermelho: desafinado (>15 cents)
- Instruções detalhadas de uso
- Proteção para caso de negação de acesso ao microfone

### Algoritmo:
O afinador usa o algoritmo de **auto-correlação** para detectar a frequência fundamental da nota tocada:
1. Captura áudio do microfone via getUserMedia
2. Analisa o sinal com Web Audio API
3. Aplica auto-correlação no buffer de áudio
4. Calcula a frequência fundamental
5. Converte para nota musical usando a fórmula: `noteNum = 12 * log₂(freq/440)`
6. Calcula os cents de desvio

### Tecnologias:
- Web Audio API (AudioContext, AnalyserNode, MediaStreamAudioSourceNode)
- getUserMedia API
- React hooks (useState, useEffect, useRef)
- requestAnimationFrame para análise em tempo real
- Algoritmo de auto-correlação customizado

---

## Integração

Todas as ferramentas estão:
- Totalmente integradas ao sistema de roteamento (React Router DOM)
- Acessíveis via página `/ferramentas` com cards clicáveis
- Responsivas para desktop, tablet e mobile
- Seguindo o design system com cores quentes (marrom/âmbar e teal)
- Com Header e Footer consistentes
- Incluindo instruções de uso e dicas

## Próximos Passos Sugeridos

1. **Escalas:** Adicionar mais tonalidades e escalas exóticas
2. **Metrônomo:** Adicionar padrões rítmicos pré-programados
3. **Playbacks:** Integrar player de áudio embutido
4. **Partituras:** Adicionar sistema de upload e gerenciamento de PDFs
5. **Afinador:** Adicionar histórico de afinação e calibração customizada
