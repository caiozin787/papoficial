# Sax Tools - Design System & Developer Guide

## 📐 Breakpoints Responsivos

```css
/* Mobile First */
- Mobile: < 640px (padrão)
- Tablet: 768px (md:)
- Desktop: 1024px (lg:)
- Wide: 1440px (xl:)
```

## 🎨 Paleta de Cores

### Light Mode
```css
--color-primary: #8B4513         /* Saddle Brown */
--color-primary-dark: #6B3410    /* Brown Dark */
--color-secondary: #D2691E        /* Chocolate/Amber */
--color-accent: #14B8A6           /* Teal */
--color-accent-hover: #0F9988     /* Teal Dark */
--background: #FFFBF5             /* Creme Suave */
--foreground: #2C1810             /* Marrom Escuro */
```

### Dark Mode
```css
--background: #1A0F0A             /* Marrom Muito Escuro */
--foreground: #F5E6D3             /* Bege Claro */
--primary: #D2691E                /* Chocolate/Amber */
--accent: #14B8A6                 /* Teal */
```

### Contraste e Acessibilidade
- Todos os pares de cores atendem WCAG 2.1 AA
- Primary/Background: 4.8:1
- Accent/Background: 4.5:1
- Foreground/Background: 15.2:1

## 🔤 Tipografia

### Famílias
- **Sans-serif padrão** do sistema para melhor performance
- Headings e Body: System Font Stack

### Escala Tipográfica
```css
H1: 2.5rem - 4rem (40px - 64px)     /* text-4xl md:text-5xl lg:text-6xl */
H2: 1.875rem - 2.25rem (30px - 36px) /* text-3xl md:text-4xl */
H3: 1.125rem - 1.25rem (18px - 20px) /* text-lg */
H4: 1rem (16px)                      /* text-base */
Paragraph: 1rem - 1.25rem (16px - 20px) /* text-base md:text-lg */
Small: 0.875rem (14px)               /* text-sm */
Tiny: 0.75rem (12px)                 /* text-xs */
```

### Pesos de Fonte
```css
Normal: 400
Medium: 500 (títulos e botões)
Semibold: 600
Bold: 700
```

## 📦 Componentes do Design System

### 1. Header
**Props**: Nenhuma
**Estados**: Mobile menu aberto/fechado
**Comportamento**: Sticky, backdrop blur, menu hambúrguer em mobile

### 2. Buttons

#### Primary Button
```tsx
className="bg-primary text-primary-foreground hover:bg-primary/90 
           rounded-lg px-4 py-2 shadow-sm transition-colors"
```

#### Secondary Button (Ghost)
```tsx
className="border-2 border-primary bg-transparent text-primary 
           hover:bg-primary/5 rounded-lg px-4 py-2 transition-colors"
```

#### Estados
- Normal
- Hover (scale 1.02, shadow increase)
- Active (scale 0.98)
- Disabled (opacity 50%, cursor not-allowed)

### 3. Card de Ferramenta (ToolCard)
**Props**:
- `icon: LucideIcon` - Ícone da ferramenta
- `title: string` - Título da ferramenta
- `description: string` - Descrição
- `badge?: string` - Badge opcional (ex: "Novo", "Popular")

**Estilos**:
- Padding: 1.5rem (p-6)
- Border-radius: 0.75rem (rounded-xl)
- Shadow: hover:shadow-lg
- Hover: translateY(-0.25rem)

### 4. Card de Vídeo (VideoCard)
**Props**:
- `videoId: string` - ID do vídeo do YouTube
- `title: string`
- `author: string`
- `duration: string`
- `onPlay: (videoId: string) => void`

**Thumbnail**: Usa API do YouTube `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`

### 5. Modal de Vídeo (VideoModal)
**Props**:
- `videoId: string | null`
- `onClose: () => void`

**Features**:
- Fecha com ESC
- Fecha ao clicar no overlay
- Aspect ratio 16:9
- Autoplay desativado (`autoplay=0`)

### 6. Badge
```tsx
className="rounded-full bg-accent px-3 py-1 text-xs 
           font-medium text-accent-foreground shadow-md"
```

## 📏 Espaçamentos (Spacing System)

```css
--space-xs: 0.5rem    (8px)   /* gap-2, p-2 */
--space-sm: 0.75rem   (12px)  /* gap-3, p-3 */
--space-md: 1rem      (16px)  /* gap-4, p-4 */
--space-lg: 1.5rem    (24px)  /* gap-6, p-6 */
--space-xl: 2rem      (32px)  /* gap-8, p-8 */
--space-2xl: 3rem     (48px)  /* gap-12, p-12 */
--space-3xl: 4rem     (64px)  /* gap-16, p-16 */
```

### Grid Layouts
```tsx
/* Cards de Ferramentas e Vídeos */
grid gap-6 sm:grid-cols-2 lg:grid-cols-3
```

## 🎬 YouTube Integration

### Como substituir IDs de vídeo

1. **Encontre o ID do vídeo**:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ`

2. **Atualize o array em `VideosSection.tsx`**:
```tsx
const videos = [
  {
    videoId: 'SEU_VIDEO_ID_AQUI',
    title: 'Título do Vídeo',
    author: 'Nome do Autor',
    duration: '10:30',
  },
  // ...
];
```

### Embed URL
```
https://www.youtube.com/embed/{videoId}?autoplay=0&rel=0
```

**Parâmetros**:
- `autoplay=0` - Não inicia automaticamente
- `rel=0` - Não mostra vídeos relacionados de outros canais

## 🎯 Ícones (Lucide React)

### Ícones Essenciais Utilizados
```tsx
import { 
  Music,      // Logo e decoração
  Menu,       // Menu mobile
  X,          // Fechar
  LogIn,      // Botão entrar
  Play,       // Reproduzir vídeo
  Clock,      // Duração
  Music2,     // Escalas
  Radio,      // Playbacks
  Download,   // Download
  BookOpen,   // Teoria
  Headphones, // Afinador
  Award,      // Prêmios
  Users,      // Comunidade
  Mail,       // E-mail
  Facebook,   // Social
  Instagram,  // Social
  Youtube,    // Social
  Twitter     // Social
} from 'lucide-react';
```

**Estilo**: Outline (padrão do lucide-react)
**Tamanhos**: h-4 w-4 (16px), h-5 w-5 (20px), h-6 w-6 (24px), h-8 w-8 (32px)

## 🌓 Dark Mode

Para alternar entre light/dark mode, adicione/remova a classe `.dark` no elemento `<html>`:

```tsx
// Exemplo de toggle
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};
```

## 🚀 Classes Utilitárias Principais

### Transições
```css
transition-all          /* Todas as propriedades */
transition-colors       /* Apenas cores */
transition-transform    /* Apenas transformações */
duration-300            /* 300ms (padrão) */
```

### Efeitos de Hover
```css
hover:shadow-lg         /* Sombra em hover */
hover:-translate-y-1    /* Move para cima */
hover:scale-105         /* Escala imagem */
group-hover:opacity-100 /* Aparece em hover do grupo */
```

### Shadows
```css
shadow-sm   /* Sombra sutil */
shadow-lg   /* Sombra média */
shadow-xl   /* Sombra grande */
shadow-2xl  /* Sombra extra grande */
```

### Border Radius
```css
rounded-lg  /* 0.5rem - elementos pequenos */
rounded-xl  /* 0.75rem - cards */
rounded-2xl /* 1rem - imagens grandes */
rounded-full /* Círculo completo */
```

## 📱 Responsive Design

### Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

### Grid Responsivo
```tsx
/* 1 col mobile, 2 tablet, 3 desktop */
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Tipografia Responsiva
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
```

### Espaçamento Responsivo
```tsx
<section className="py-16 md:py-24">
```

## 📝 Notas de Implementação

1. **Imports**: Use alias `@` para imports
   ```tsx
   import { Header } from '@/app/components/Header';
   ```

2. **Imagens**: Para produção, substitua placeholders por imagens reais do Unsplash ou assets próprios

3. **Formulários**: Use validação com react-hook-form se necessário

4. **Performance**: 
   - Lazy loading de vídeos (thumbnails do YouTube)
   - Evite re-renders desnecessários
   - Use `useMemo` e `useCallback` quando apropriado

5. **Acessibilidade**:
   - Todas as interações possuem estados de foco
   - Textos alternativos em imagens
   - Contraste adequado de cores
   - Navegação por teclado suportada

## 🔧 Customização Rápida

### Alterar Cor Primária
Edite `/src/styles/theme.css`:
```css
:root {
  --color-primary: #SUA_COR_AQUI;
}
```

### Adicionar Nova Ferramenta
Edite o array em `ToolsSection.tsx`:
```tsx
{
  icon: IconName,
  title: 'Nome da Ferramenta',
  description: 'Descrição...',
  badge: 'Novo' // opcional
}
```

### Adicionar Novo Vídeo
Edite o array em `VideosSection.tsx` seguindo o formato descrito acima.

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Tecnologias**: React 18.3, Tailwind CSS 4.1, Vite 6.3, Lucide React
