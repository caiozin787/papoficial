import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente com a service role key — só pode ser usado dentro de código que corre
 * exclusivamente no servidor (Server Actions, Route Handlers). Nunca importar
 * isto a partir de um Client Component.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
