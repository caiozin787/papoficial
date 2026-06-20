export type ContentLevel = 'iniciante' | 'intermediario' | 'avancado';

export const CONTENT_LEVELS: ContentLevel[] = ['iniciante', 'intermediario', 'avancado'];

export const CONTENT_LEVEL_LABELS: Record<ContentLevel, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

export const CONTENT_LEVEL_COLORS: Record<ContentLevel, string> = {
  iniciante: 'bg-green-500/10 text-green-700',
  intermediario: 'bg-amber-500/10 text-amber-700',
  avancado: 'bg-red-500/10 text-red-700',
};
