import type { FieldConfig } from '@/components/admin/ContentForm';

export const EXERCISE_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ex: long-tones-fundamentacao' },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    options: [
      { value: 'tecnica', label: 'Técnica' },
      { value: 'escalas', label: 'Escalas' },
      { value: 'improvisacao', label: 'Improvisação' },
      { value: 'leitura', label: 'Leitura' },
    ],
  },
  { name: 'subcategory', label: 'Subcategoria (ex: Long Tones, Patterns)', type: 'text' },
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
  { name: 'description', label: 'Objetivo', type: 'textarea', required: true },
  { name: 'estimated_minutes', label: 'Tempo estimado (minutos)', type: 'number' },
  { name: 'materials_needed', label: 'Material necessário', type: 'text' },
  { name: 'pdf_url', label: 'URL do PDF (opcional)', type: 'text' },
  { name: 'audio_url', label: 'URL do áudio (opcional)', type: 'text' },
  { name: 'published', label: 'Publicado', type: 'checkbox' },
];
