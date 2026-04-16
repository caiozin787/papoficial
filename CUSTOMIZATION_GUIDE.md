# Guia de Personalização - Sax Tools

Este guia mostra como personalizar elementos-chave do site de forma rápida e fácil.

## 🎬 Como Substituir Vídeos do YouTube

### Passo 1: Encontrar o ID do Vídeo

O ID do vídeo está na URL do YouTube:
```
https://www.youtube.com/watch?v=9SDT5XVKiG4
                                  └─────────┘
                                   Video ID
```

### Passo 2: Atualizar o Array de Vídeos

Edite o arquivo `/src/app/components/VideosSection.tsx`:

```tsx
const videos = [
  {
    videoId: '9SDT5XVKiG4',  // ← Cole o ID aqui
    title: 'Como Tocar Saxofone - Aula 1 para Iniciantes',
    author: 'Aprenda Saxofone',
    duration: '15:42',  // Formato MM:SS
  },
  // Adicione mais vídeos aqui...
];
```

### Exemplo Completo de Substituição

```tsx
// Vídeo antigo
{
  videoId: 'dQw4w9WgXcQ',
  title: 'Vídeo Antigo',
  author: 'Canal Antigo',
  duration: '10:00',
}

// Vídeo novo
{
  videoId: 'kxopViU98Xo',  // ← Novo ID
  title: 'Summertime - George Gershwin',
  author: 'Jazz Classics',
  duration: '8:30',
}
```

## 🎨 Alterar Cores do Site

### Paleta de Cores Principal

Edite `/src/styles/theme.css` na seção `:root`:

```css
:root {
  /* Cor primária (botões, links, destaques) */
  --color-primary: #8B4513;       /* ← Altere aqui */
  
  /* Cor secundária (backgrounds suaves) */
  --color-secondary: #D2691E;     /* ← Altere aqui */
  
  /* Cor de destaque (CTAs, badges) */
  --color-accent: #14B8A6;        /* ← Altere aqui */
  
  /* Cor de fundo */
  --background: #FFFBF5;          /* ← Altere aqui */
  
  /* Cor de texto */
  --foreground: #2C1810;          /* ← Altere aqui */
}
```

### Modo Escuro

Para alterar as cores do dark mode, edite a seção `.dark`:

```css
.dark {
  --background: #1A0F0A;    /* Fundo escuro */
  --foreground: #F5E6D3;    /* Texto claro */
  --primary: #D2691E;       /* Primária no dark */
  --accent: #14B8A6;        /* Accent no dark */
}
```

### Exemplo de Nova Paleta (Azul/Verde)

```css
:root {
  --color-primary: #2563EB;       /* Azul */
  --color-secondary: #60A5FA;     /* Azul claro */
  --color-accent: #10B981;        /* Verde */
  --background: #F8FAFC;          /* Cinza muito claro */
  --foreground: #1E293B;          /* Cinza escuro */
}
```

## 📝 Personalizar Textos

### Hero Section

Edite `/src/app/components/Hero.tsx`:

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
  Aprimore sua técnica com{' '}
  <span className="text-primary">Sax Tools</span>
  {/* ↑ Altere este texto */}
</h1>

<p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
  A plataforma completa com ferramentas interativas...
  {/* ↑ Altere esta descrição */}
</p>
```

### Estatísticas

Altere os números no Hero:

```tsx
<div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
<div className="text-sm text-foreground/60">Playbacks</div>
{/* ↑ Altere o número e descrição */}
```

## 🛠 Adicionar/Remover Ferramentas

Edite `/src/app/components/ToolsSection.tsx`:

```tsx
const tools = [
  {
    icon: Music2,              // Ícone do Lucide
    title: 'Nova Ferramenta',  // Nome da ferramenta
    description: 'Descrição...', // Descrição curta
    badge: 'Novo'              // Badge opcional
  },
  // Adicione mais aqui...
];
```

### Ícones Disponíveis

Importe do `lucide-react`:
```tsx
import { 
  Music2, Clock, Radio, Download, 
  BookOpen, Headphones, Guitar, 
  Mic, Volume2, Settings 
} from 'lucide-react';
```

## 📧 Alterar Informações de Contato

### E-mail

Substitua em 3 lugares:

1. **Footer** (`/src/app/components/Footer.tsx`):
```tsx
<a href="mailto:contato@saxtools.com">
  contato@saxtools.com
  {/* ↑ Altere aqui */}
</a>
```

2. **ContactPage** (`/src/app/pages/ContactPage.tsx`):
```tsx
<a href="mailto:contato@saxtools.com">
  contato@saxtools.com
  {/* ↑ Altere aqui */}
</a>
```

### Horário de Atendimento

No Footer e ContactPage:
```tsx
<p className="text-sm text-foreground/70">
  Segunda a Sexta<br />
  9h às 18h (horário de Brasília)
  {/* ↑ Altere o horário */}
</p>
```

### Localização

Na ContactPage:
```tsx
<h3 className="font-semibold text-card-foreground mb-2">Localização</h3>
<p className="text-sm text-muted-foreground">
  São Paulo, SP<br />
  Brasil
  {/* ↑ Altere a localização */}
</p>
```

## 🔗 Alterar Links de Redes Sociais

No Footer (`/src/app/components/Footer.tsx`):

```tsx
<a href="https://facebook.com/seuperfil" 
   className="flex h-9 w-9 items-center...">
  <Facebook className="h-4 w-4" />
</a>

<a href="https://instagram.com/seuperfil">
  <Instagram className="h-4 w-4" />
</a>

<a href="https://youtube.com/seucanal">
  <Youtube className="h-4 w-4" />
</a>

<a href="https://twitter.com/seuperfil">
  <Twitter className="h-4 w-4" />
</a>
```

## 📱 Alterar Logo e Nome

### Texto do Logo

Substitua "Sax Tools" em:
- `/src/app/components/Header.tsx`
- `/src/app/components/Footer.tsx`
- `/src/app/pages/LoginPage.tsx`
- `/src/app/pages/SignupPage.tsx`

```tsx
<Link to="/" className="flex items-center gap-2">
  <Music className="h-8 w-8 text-primary" />
  <span className="text-xl font-semibold text-foreground">
    Seu Nome Aqui
    {/* ↑ Altere o nome */}
  </span>
</Link>
```

### Ícone do Logo

Troque o componente `Music` por outro ícone do Lucide:

```tsx
import { Music, Guitar, Mic, Radio } from 'lucide-react';

// Use outro ícone:
<Guitar className="h-8 w-8 text-primary" />
```

## 📋 Adicionar Novas Páginas

### Passo 1: Criar o Componente

Crie `/src/app/pages/MinhaPage.tsx`:

```tsx
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function MinhaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Seu conteúdo aqui */}
      </main>
      <Footer />
    </div>
  );
}
```

### Passo 2: Adicionar Rota

Em `/src/app/App.tsx`:

```tsx
import { MinhaPage } from './pages/MinhaPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... rotas existentes ... */}
        <Route path="/minha-pagina" element={<MinhaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Passo 3: Adicionar Link no Header

Em `/src/app/components/Header.tsx`:

```tsx
<nav className="hidden md:flex items-center gap-8">
  {/* ... links existentes ... */}
  <Link to="/minha-pagina" className="text-sm font-medium...">
    Minha Página
  </Link>
</nav>
```

## 🎯 Customizar Badges e Tags

### Badges nas Ferramentas

```tsx
{
  icon: Music2,
  title: 'Escalas Interativas',
  description: '...',
  badge: 'Popular'  // Mude para: 'Novo', 'Premium', 'Beta', etc.
}
```

### Remover Badge

```tsx
{
  icon: Music2,
  title: 'Escalas Interativas',
  description: '...',
  // Remova ou comente a linha badge
}
```

## 🔧 FAQ - Página de Contato

Edite `/src/app/pages/ContactPage.tsx`:

```tsx
<details className="bg-card rounded-lg border border-border p-6 group">
  <summary className="font-medium text-card-foreground cursor-pointer...">
    Sua Pergunta Aqui?
  </summary>
  <p className="mt-4 text-sm text-muted-foreground">
    Sua resposta detalhada aqui...
  </p>
</details>
```

## 💡 Dicas de Personalização

### Modificar Espaçamentos

Use as classes do Tailwind:
- `p-4` → `p-6` (aumentar padding)
- `gap-6` → `gap-8` (aumentar espaço entre itens)
- `mb-4` → `mb-6` (aumentar margin bottom)

### Modificar Bordas Arredondadas

- `rounded-lg` → `rounded-xl` (mais arredondado)
- `rounded-xl` → `rounded-2xl` (muito arredondado)
- `rounded-lg` → `rounded-md` (menos arredondado)

### Modificar Sombras

- `shadow-sm` → `shadow-md` (sombra média)
- `shadow-md` → `shadow-lg` (sombra grande)
- `shadow-lg` → `shadow-xl` (sombra extra grande)

## 🚨 Avisos Importantes

### Não Editar
- `/src/app/components/figma/ImageWithFallback.tsx` (arquivo protegido)
- `/src/styles/tailwind.css` (configuração automática)

### Sempre Testar
Após fazer alterações:
1. Verifique em diferentes tamanhos de tela
2. Teste dark mode (se implementado)
3. Verifique responsividade mobile
4. Teste todos os links

### Backup
Antes de grandes mudanças:
1. Faça commit no Git
2. Ou copie os arquivos que vai modificar

## 📞 Suporte

Se precisar de ajuda com personalizações:
- Consulte a documentação do Tailwind CSS
- Veja exemplos no código existente
- Use os comentários inline como guia

---

**Lembre-se**: Pequenas mudanças podem ter grande impacto visual!
