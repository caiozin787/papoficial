**Postgres (Supabase) setup — passos rápidos**

1) Criar conta e projeto no Supabase
  - Acesse https://supabase.com e crie uma conta gratuita.
  - No painel, clique em **New project**, dê um nome (ex.: `papoficial-db`), escolha senha e região.

2) Pegar connection string
  - No projeto Supabase: Settings → Database → Connection string
  - Copie a `Connection string` do tipo `postgresql://...` (ou pegue `DATABASE_URL`).

3) Configurar variável de ambiente local
  - No projeto, copie `.env.example` para `.env`:

    Copy-Item .env.example .env

  - Abra `.env` e cole a connection string do Supabase em `DATABASE_URL`.

4) Instalar dependências e gerar Prisma Client
  - No PowerShell (dentro do projeto):

    npm install
    npx prisma generate
    npx prisma db push

  - `npx prisma db push` cria as tabelas em seu banco Supabase de acordo com `prisma/schema.prisma`.

5) Rodar e testar localmente
  - Inicie o servidor de desenvolvimento:

    npm run dev

  - Teste os endpoints:
    - GET users: `http://localhost:5173/api/users`
    - POST users: enviar JSON `{ "name":"Teste", "email":"teste@example.com" }` para `http://localhost:5173/api/users`.

6) Configurar no Vercel
  - Em Vercel → Project → Settings → Environment Variables adicione `DATABASE_URL` com a mesma connection string (adicionar para Preview e Production conforme necessário).
  - Faça o deploy; as rotas em `api/` usarão essa variável.

Notas
 - Supabase tem plano gratuito para desenvolvimento. Verifique limites do plano se o app crescer.  
 - Proteja suas credenciais — não comite `.env` no repositório.

7) Server-side inserts (recommended)
- For sensitive writes (creates/updates) do not allow `anon` to INSERT. Instead create a server-side API route (Vercel function) that performs writes using the Supabase `service_role` key stored in an environment variable.
- Example environment variables to add to Vercel:
  - `SUPABASE_URL` = https://<PROJECT_REF>.supabase.co
  - `SUPABASE_SERVICE_ROLE_KEY` = <your service_role key>

Example serverless route (placed in `api/supabase-create-user.js`) will read `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and call the Supabase REST endpoint `/rest/v1/users` with the service role key in the `Authorization` and `apikey` headers.

Keep `service_role` secret and never expose it to the browser. Use `anon` key only for public reads.
