# Sax Tools - Plataforma Completa para Saxofonistas

Uma plataforma web moderna e responsiva desenvolvida para saxofonistas de todos os níveis, com ferramentas interativas, vídeo-aulas e recursos educacionais.

## 🎯 Páginas Implementadas

### 1. Home Page (`/`)
- **Hero Section**: Título impactante, CTAs e estatísticas
- **Seção de Ferramentas**: 6 cards com ferramentas (Escalas, Metrônomo, Playbacks, Partituras, Teoria Musical, Afinador)
- **Galeria de Vídeos**: Grid responsivo com vídeos reais de saxofone do YouTube
- **Modal de Vídeo**: Player do YouTube com aspecto 16:9 e controles

### 2. Login Page (`/login`)
- Formulário de login com validação
- Opção "Lembrar-me" e "Esqueceu a senha?"
- Botão "Continuar como Convidado"
- Link para página de cadastro
- Ícones e campos com visual moderno

### 3. Cadastro Page (`/cadastro`)
- Formulário completo de cadastro (Nome, E-mail, Senha, Confirmar Senha)
- Validação de senha (mínimo 6 caracteres)
- Verificação de senhas correspondentes
- Toggle para mostrar/ocultar senha
- Checkbox de aceitação de termos
- Opção "Continuar como Convidado"
- Link para página de login

### 4. Sobre Page (`/sobre`)
- História e missão do projeto
- Seção de Valores (Missão, Valores, Visão)
- Timeline de 15 anos de experiência
- Estatísticas (500+ Playbacks, 50+ Vídeos, 10k+ Usuários)
- 6 diferenciais do Sax Tools

### 5. Contato Page (`/contato`)
- Formulário de contato completo
- Cards informativos (E-mail, Chat, Horário, Localização)
- Seleção de assunto do contato
- FAQ com perguntas frequentes em accordion
- Informações de contato e horário de atendimento

## 🎨 Design System

### Paleta de Cores
```css
/* Light Mode */
--color-primary: #8B4513      /* Marrom saddle */
--color-secondary: #D2691E     /* Chocolate/Amber */
--color-accent: #14B8A6        /* Teal */
--background: #FFFBF5          /* Creme suave */
--foreground: #2C1810          /* Marrom escuro */

/* Dark Mode */
--background: #1A0F0A          /* Marrom muito escuro */
--foreground: #F5E6D3          /* Bege claro */
--primary: #D2691E             /* Chocolate/Amber */
--accent: #14B8A6              /* Teal */
```

### Tipografia
- **Font Family**: System Font Stack (sans-serif)
- **Headings**: 
  - H1: 2.5rem - 4rem (40px - 64px)
  - H2: 1.875rem - 2.25rem (30px - 36px)
  - H3: 1.125rem - 1.25rem (18px - 20px)
- **Body**: 1rem - 1.25rem (16px - 20px)

### Breakpoints
```
Mobile: < 640px
Tablet: 768px (md:)
Desktop: 1024px (lg:)
Wide: 1440px (xl:)
```

## 🎬 Vídeos do YouTube

Os vídeos na seção de vídeo-aulas são vídeos reais de saxofone do YouTube. Para substituir:

1. Abra `/src/app/components/VideosSection.tsx`
2. No array `videos`, substitua os `videoId`:

```tsx
const videos = [
  {
    videoId: 'SEU_ID_AQUI',  // Extrair de youtube.com/watch?v=SEU_ID_AQUI
    title: 'Título do Vídeo',
    author: 'Nome do Canal',
    duration: '10:30',
  },
  // ...
];
```

## 🧭 Navegação e Rotas

### Estrutura de Rotas
```
/                 → HomePage (Hero + Ferramentas + Vídeos)
/login            → LoginPage
/cadastro         → SignupPage
/sobre            → AboutPage
/contato          → ContactPage
```

### Header Inteligente
O header detecta automaticamente a página atual:
- Na **Home**: mostra links âncora (#ferramentas, #videos)
- Em **outras páginas**: mostra link "Início" + links de navegação

## 🎯 Funcionalidades

### Modo Convidado
- Disponível nas páginas de Login e Cadastro
- Botão "Continuar como Convidado" redireciona para home
- Permite explorar a plataforma sem criar conta

### Formulários
- Validação nativa HTML5
- Estados visuais (hover, focus, error)
- Feedback visual para campos obrigatórios
- Toggle de visibilidade de senha

### Modal de Vídeo
- Abre ao clicar em qualquer card de vídeo
- Fecha com ESC, clique fora ou botão X
- Aspect ratio 16:9 fixo
- Autoplay desativado
- Bloqueia scroll do body quando aberto

## 🎨 Componentes Reutilizáveis

### Core Components
- `Header.tsx` - Navegação principal com menu mobile
- `Footer.tsx` - Rodapé com links e newsletter
- `Hero.tsx` - Seção hero da homepage

### Feature Components
- `ToolCard.tsx` - Card de ferramenta com ícone e descrição
- `ToolsSection.tsx` - Grid de ferramentas
- `VideoCard.tsx` - Card de vídeo com thumbnail do YouTube
- `VideoModal.tsx` - Modal para reprodução de vídeos
- `VideosSection.tsx` - Galeria de vídeos

## 🚀 Como Usar

### Navegação entre Páginas
```tsx
import { Link } from 'react-router-dom';

<Link to="/login">Entrar</Link>
<Link to="/cadastro">Criar Conta</Link>
<Link to="/sobre">Sobre</Link>
<Link to="/contato">Contato</Link>
```

### Usar Componentes
```tsx
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

function MyPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Seu conteúdo */}
      </main>
      <Footer />
    </div>
  );
}
```

## 📱 Responsividade

Todos os componentes são totalmente responsivos:

- **Mobile First**: Design otimizado para mobile
- **Tablet**: Grid adaptativo (2 colunas)
- **Desktop**: Grid completo (3 colunas)
- **Menu Mobile**: Hambúrguer com animação suave

## 🔒 Boas Práticas

### Formulários
- Validação client-side antes do envio
- Mensagens de erro claras
- Campos obrigatórios marcados com `*`
- Autocomplete desabilitado em campos sensíveis

### Acessibilidade
- Contraste adequado de cores (WCAG AA)
- Labels em todos os inputs
- Estados de foco visíveis
- Navegação por teclado
- Textos alternativos em imagens

### Performance
- Lazy loading de imagens
- Thumbnails do YouTube (cacheadas pelo Google)
- Componentes otimizados
- CSS modular

## 📝 Próximos Passos Sugeridos

1. **Integração com Backend**
   - Conectar formulários a API
   - Autenticação JWT
   - Persistência de dados

2. **Funcionalidades Adicionais**
   - Sistema de favoritos
   - Progresso de aprendizado
   - Comunidade/Forum
   - Notificações

3. **Ferramentas Interativas**
   - Implementar escalas interativas
   - Metrônomo funcional
   - Player de playbacks
   - Afinador cromático

4. **Melhorias UX**
   - Animações com Motion
   - Loading states
   - Toast notifications
   - Dark mode toggle manual

## 🛠 Tecnologias Utilizadas

- **React 18.3** - Framework UI
- **React Router DOM 7.12** - Roteamento
- **Tailwind CSS 4.1** - Estilização
- **Lucide React** - Ícones
- **Vite 6.3** - Build tool
- **TypeScript** - Type safety

## 📚 Documentação Adicional

Para mais informações sobre o design system e componentes, consulte:
- `/DESIGN_SYSTEM.md` - Guia completo do design system
- Comentários inline nos componentes
- Props e types documentados

---

**Versão**: 2.0  
**Data**: Janeiro 2026  
**Status**: ✅ Produção Ready
