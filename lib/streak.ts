import { createClient } from '@/lib/supabase/server';

function toDateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Constrói uma Date ancorada em meia-noite UTC a partir de uma string 'YYYY-MM-DD'. */
function parseDateOnlyUTC(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function previousDay(d: Date): Date {
  return new Date(d.getTime() - 24 * 60 * 60 * 1000);
}

/**
 * Dias consecutivos estudando. Conta a partir de hoje (ou de ontem, se ainda não
 * estudou hoje mas estudou ontem — a sequência continua "viva" até o fim do dia).
 * Tudo em UTC para bater com a data gravada pelo CompleteButton (`toISOString().slice(0, 10)`),
 * evitando deslocamento de 1 dia em fusos horários à frente de UTC.
 */
export async function getStreak(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_study_log')
    .select('study_date')
    .eq('user_id', userId)
    .order('study_date', { ascending: false })
    .limit(366);
  if (error) throw error;

  const studyDates = new Set((data ?? []).map((row) => row.study_date as string));
  if (studyDates.size === 0) return 0;

  let cursor = parseDateOnlyUTC(toDateOnly(new Date()));

  if (!studyDates.has(toDateOnly(cursor))) {
    cursor = previousDay(cursor);
    if (!studyDates.has(toDateOnly(cursor))) return 0;
  }

  let streak = 0;
  while (studyDates.has(toDateOnly(cursor))) {
    streak++;
    cursor = previousDay(cursor);
  }
  return streak;
}
