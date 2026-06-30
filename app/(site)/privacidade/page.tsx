import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Política de Privacidade
            </h1>
            <p className="text-lg text-foreground/70">Última atualização: junho de 2026.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border shadow-sm p-8 md:p-10 space-y-8 text-foreground/80">
            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">1. Quem somos</h2>
              <p>
                O Sax Tools é uma plataforma educativa e gratuita de apoio ao estudo e à prática do
                saxofone, desenvolvida como Prova de Aptidão Profissional. Esta página explica que dados
                recolhemos e como os usamos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">2. Que dados recolhemos</h2>
              <p>Apenas os dados necessários para o funcionamento da conta, quando crias uma:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nome e endereço de e-mail, usados para autenticação e identificação na conta.</li>
                <li>Avatar de perfil, caso optes por carregar um.</li>
                <li>
                  Favoritos, histórico de utilização e progresso (conteúdos concluídos), para que a
                  experiência fique guardada entre sessões.
                </li>
              </ul>
              <p className="mt-2">
                As ferramentas (afinador, metrónomo, escalas e restantes) não precisam de conta e não
                enviam qualquer dado para os nossos servidores.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">3. Como usamos os dados</h2>
              <p>
                Os dados servem exclusivamente para que a plataforma funcione: autenticar a tua sessão,
                guardar os teus favoritos e mostrar o teu progresso. Não vendemos nem partilhamos os teus
                dados com terceiros para fins de publicidade.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">4. Onde os dados são guardados</h2>
              <p>
                Os dados são armazenados de forma segura através do Supabase (base de dados e
                autenticação), com acesso protegido por políticas de segurança ao nível da base de dados
                (Row Level Security) — cada utilizador só pode aceder aos seus próprios dados.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">5. Cookies</h2>
              <p>
                Usamos apenas cookies essenciais ao funcionamento da conta. Detalhes na{' '}
                <Link href="/cookies" className="text-primary hover:text-primary/80 font-medium">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">6. Os teus direitos</h2>
              <p>
                Podes pedir, em qualquer momento, para consultar, corrigir ou eliminar os teus dados e a
                tua conta. Basta contactar-nos pelo e-mail abaixo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">7. Alterações a esta política</h2>
              <p>
                Esta política pode ser atualizada à medida que a plataforma evolui. Recomendamos que a
                consultes periodicamente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">8. Contacto</h2>
              <p>
                Dúvidas sobre esta política? Escreve para{' '}
                <a href="mailto:saxtools1@gmail.com" className="text-primary hover:text-primary/80 font-medium">
                  saxtools1@gmail.com
                </a>{' '}
                ou usa a página de{' '}
                <Link href="/contato" className="text-primary hover:text-primary/80 font-medium">
                  Contacto
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
