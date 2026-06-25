import type { FieldConfig } from '@/components/admin/ContentForm';

export const THEORY_FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ex: escala-maior' },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    options: [
      { value: 'fundamentos', label: 'Fundamentos' },
      { value: 'escalas', label: 'Escalas' },
      { value: 'harmonia', label: 'Harmonia' },
      { value: 'leitura', label: 'Leitura' },
    ],
  },
  { name: 'description', label: 'Descrição curta', type: 'textarea', required: true },
  { name: 'content', label: 'Conteúdo completo (parágrafos separados por linha em branco)', type: 'textarea', required: true },
  { name: 'pdf_url', label: 'URL do PDF (opcional)', type: 'text' },
  { name: 'cover_image_url', label: 'URL da imagem do artigo (banner na página de detalhe)', type: 'text' },
  { name: 'card_image_url', label: 'URL da miniatura (cartão na listagem)', type: 'text' },
  { name: 'order_index', label: 'Ordem de exibição', type: 'number' },
  { name: 'published', label: 'Publicado', type: 'checkbox' },
];
