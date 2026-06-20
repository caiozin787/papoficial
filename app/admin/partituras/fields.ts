import type { FieldConfig } from '@/components/admin/ContentForm';

export const SCORE_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ex: czardas' },
  { name: 'composer', label: 'Compositor', type: 'text', required: true },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    options: [
      { value: 'iniciante', label: 'Iniciante' },
      { value: 'intermediario', label: 'Intermediário' },
      { value: 'avancado', label: 'Avançado' },
      { value: 'jazz', label: 'Jazz' },
      { value: 'gospel', label: 'Gospel' },
      { value: 'estudos', label: 'Estudos' },
    ],
  },
  {
    name: 'level',
    label: 'Nível',
    type: 'select',
    required: true,
    options: [
      { value: 'iniciante', label: 'Iniciante' },
      { value: 'intermediario', label: 'Intermediário' },
      { value: 'avancado', label: 'Avançado' },
    ],
  },
  {
    name: 'instrument',
    label: 'Instrumento',
    type: 'select',
    required: true,
    options: [
      { value: 'sax_alto', label: 'Sax Alto' },
      { value: 'sax_tenor', label: 'Sax Tenor' },
      { value: 'sax_soprano', label: 'Sax Soprano' },
      { value: 'sax_baritono', label: 'Sax Barítono' },
    ],
  },
  { name: 'key', label: 'Tom', type: 'text', required: true, placeholder: 'ex: Gm, Bb' },
  { name: 'pages', label: 'Número de páginas', type: 'number' },
  { name: 'pdf_url', label: 'URL do PDF (opcional)', type: 'text' },
  { name: 'preview_image_url', label: 'URL da prévia (opcional)', type: 'text' },
  { name: 'popular', label: 'Marcar como popular', type: 'checkbox' },
  { name: 'published', label: 'Publicado', type: 'checkbox' },
];
