-- Habilita eventos em tempo real (Supabase Realtime) na tabela de mensagens,
-- necessário pro chat atualizar sem precisar recarregar a página.
alter publication supabase_realtime add table messages;
