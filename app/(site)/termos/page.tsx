import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Termos de Uso</h1>
            <p className="text-lg text-foreground/70">Última atualização: junho de 2026.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border shadow-sm p-8 md:p-10 space-y-8 text-foreground/80">
            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">1. Aceitação dos termos</h2>
              <p>
                Ao usar o Sax Tools estás a aceitar estes termos. Se não concordares com algum ponto,
                pedimos que não utilizes a plataforma.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">2. O serviço</h2>
              <p>
                O Sax Tools é uma plataforma educativa gratuita, sem fins comerciais, com ferramentas
                interativas e conteúdo de apoio ao estudo do saxofone (teoria, métodos, exercícios, play
                alongs e partituras).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">3. Contas de utilizador</h2>
              <p>
                A conta é opcional e gratuita. És responsável por manter a confidencialidade da tua
                palavra-passe e por toda a atividade realizada na tua conta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">4. Conteúdo e direitos de autor</h2>
              <p>
                O conteúdo disponibilizado tem fins exclusivamente educativos. Sempre que possível,
                priorizamos obras de domínio público ou criadas para a plataforma; quando há referência a
                obras de terceiros, é feita a indicação devida. Não é permitida a redistribuição comercial
                de qualquer material da plataforma.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">5. Conduta do utilizador</h2>
              <p>
                Pedimos que uses a plataforma de forma respeitosa, sem tentar contornar medidas de
                segurança, sobrecarregar os nossos sistemas ou utilizar a conta de outra pessoa sem
                autorização.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">6. Isenção de responsabilidade</h2>
              <p>
                O Sax Tools é fornecido "como está", enquanto projeto educativo. Não garantimos
                disponibilidade contínua nem a ausência total de erros, e não nos responsabilizamos por
                danos resultantes da utilização da plataforma.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">7. Alterações</h2>
              <p>
                Estes termos podem ser atualizados à medida que a plataforma evolui. A utilização
                continuada após uma alteração implica a aceitação dos novos termos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-card-foreground mb-3">8. Contacto</h2>
              <p>
                Questões sobre estes termos? Escreve para{' '}
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
