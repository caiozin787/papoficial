export const FAVORITE_TABLE_MAP = {
  method: { table: 'favorite_methods', column: 'method_id' },
  exercise: { table: 'favorite_exercises', column: 'exercise_id' },
  playback: { table: 'favorite_playbacks', column: 'playback_id' },
  score: { table: 'favorite_scores', column: 'score_id' },
} as const;

export type FavoritableType = keyof typeof FAVORITE_TABLE_MAP;
