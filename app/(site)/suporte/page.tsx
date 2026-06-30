import { LifeBuoy, HelpCircle, Mail, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';

export default function SuportePage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <LifeBuoy className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Como podemos ajudar?
            </h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Escolhe a opção que melhor descreve o que precisas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Link
              href="/faq"
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Perguntas Frequentes</h3>
              <p className="text-foreground/70">
                Respostas rápidas sobre contas, ferramentas e conteúdo do Sax Tools.
              </p>
            </Link>

            <Link
              href="/contato"
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <MessageSquareWarning className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Reportar um Problema</h3>
              <p className="text-foreground/70">
                Encontraste um erro, um link quebrado ou algo que não funciona como esperado?
              </p>
            </Link>

            <a
              href="mailto:saxtools1@gmail.com"
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Falar por E-mail</h3>
              <p className="text-foreground/70">saxtools1@gmail.com — respondemos em até 24 horas.</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
