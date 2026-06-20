import type { FieldConfig } from '@/components/admin/ContentForm';

export const METHOD_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ex: metodo-iniciante' },
  { name: 'author', label: 'Autor', type: 'text', required: true },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    options: [
      { value: 'iniciante', label: 'Iniciante' },
      { value: 'intermediario', label: 'Intermediário' },
      { value: 'avancado', label: 'Avançado' },
      { value: 'tecnica', label: 'Técnica' },
      { value: 'improvisacao', label: 'Improvisação' },
      { value: 'leitura', label: 'Leitura' },
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
  { name: 'description', label: 'Descrição', type: 'textarea', required: true },
  { name: 'cover_image_url', label: 'URL da capa (opcional)', type: 'text' },
  { name: 'pdf_url', label: 'URL do PDF (opcional)', type: 'text' },
  { name: 'published', label: 'Publicado', type: 'checkbox' },
];
