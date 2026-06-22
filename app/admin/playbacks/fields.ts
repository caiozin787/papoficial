import type { FieldConfig } from '@/components/admin/ContentForm';

export const PLAYBACK_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ex: autumn-leaves-jazz' },
  {
    name: 'style',
    label: 'Estilo',
    type: 'select',
    required: true,
    options: [
      { value: 'jazz', label: 'Jazz' },
      { value: 'blues', label: 'Blues' },
      { value: 'gospel', label: 'Gospel' },
      { value: 'pop', label: 'Pop' },
      { value: 'bossa_nova', label: 'Bossa Nova' },
      { value: 'soul', label: 'Soul' },
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
  { name: 'key', label: 'Tom', type: 'text', required: true, placeholder: 'ex: Bb, Gm' },
  { name: 'bpm', label: 'BPM', type: 'number', required: true },
  { name: 'duration_seconds', label: 'Duração (segundos)', type: 'number' },
  { name: 'description', label: 'Descrição', type: 'textarea', required: true },
  { name: 'chord_chart_url', label: 'URL da cifra (opcional)', type: 'text' },
  { name: 'audio_url', label: 'URL do áudio (opcional)', type: 'text' },
  { name: 'youtube_id', label: 'Link ou ID do vídeo no YouTube (opcional)', type: 'text', placeholder: 'ex: https://youtu.be/dQw4w9WgXcQ' },
  { name: 'published', label: 'Publicado', type: 'checkbox' },
];
