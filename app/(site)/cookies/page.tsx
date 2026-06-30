import { Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <Cookie className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Política de Cookies</h1>
            <p className="text-lg text-foreground/70">Última atualização: junho de 2026.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border shadow-sm p-8 md:p-10 space-y-8 text-foreground/80">
            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">1. O que são cookies</h2>
              <p>
                Cookies são pequenos ficheiros guardados pelo teu navegador que permitem a um site
                lembrar-se de ti entre visitas, por exemplo para manteres a sessão iniciada.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">2. Cookies que usamos</h2>
              <p>Usamos apenas cookies essenciais:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Cookies de sessão de autenticação (Supabase), para manteres a conta ligada.</li>
                <li>Cookie de preferência de tema (claro/escuro), para lembrar a tua escolha visual.</li>
              </ul>
              <p className="mt-2">Não usamos cookies de publicidade ou de rastreio de terceiros.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">3. Cookies de terceiros</h2>
              <p>
                Algumas faixas de Play Along são reproduzidas através de um leitor incorporado do
                YouTube, que pode definir os seus próprios cookies de acordo com a política de privacidade
                do YouTube/Google. Isto só acontece nas páginas onde esse leitor é usado.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">4. Como gerir cookies</h2>
              <p>
                Podes apagar ou bloquear cookies nas configurações do teu navegador. Tem em conta que,
                ao bloquear os cookies essenciais, a tua sessão poderá não se manter iniciada.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">5. Contacto</h2>
              <p>
                Dúvidas sobre cookies? Escreve para{' '}
                <a href="mailto:saxtools1@gmail.com" className="text-primary hover:text-primary/80 font-medium">
                  saxtools1@gmail.com
                </a>{' '}
                ou consulta também a nossa{' '}
                <Link href="/privacidade" className="text-primary hover:text-primary/80 font-medium">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
