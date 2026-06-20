import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const email = process.argv[2];
const password = process.argv[3];
const fullName = process.argv[4] ?? 'Usuário Teste';

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: fullName },
});

if (error) {
  console.error('Erro:', error.message);
  process.exit(1);
}

console.log('Usuário criado:', data.user.id, data.user.email);
