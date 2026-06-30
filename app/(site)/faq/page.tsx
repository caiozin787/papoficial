import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'O Sax Tools é gratuito?',
    a: 'Sim. Todas as ferramentas, a teoria, os métodos, os exercícios, os play alongs e as partituras estão disponíveis gratuitamente.',
  },
  {
    q: 'Preciso de criar conta para usar as ferramentas?',
    a: 'Não. O afinador, o metrónomo e as restantes ferramentas funcionam sem conta. Criar uma conta grátis permite guardar favoritos, acompanhar o teu progresso e o histórico de estudo.',
  },
  {
    q: 'As ferramentas funcionam para sax alto, tenor e soprano?',
    a: 'Sim. O afinador, a tabela de dedilhados e as restantes ferramentas têm em conta a transposição de cada instrumento.',
  },
  {
    q: 'O Afinador precisa de acesso ao microfone?',
    a: 'Sim, o afinador cromático usa o microfone do teu dispositivo para detetar a frequência da nota em tempo real. O acesso só é pedido quando ligas o afinador e nada é guardado ou enviado para fora do teu navegador.',
  },
  {
    q: 'Posso usar o Sax Tools no telemóvel ou tablet?',
    a: 'Sim, o site foi feito para se adaptar a qualquer tamanho de ecrã, incluindo telemóvel e tablet.',
  },
  {
    q: 'Os PDFs e áudios dos exercícios podem ser descarregados?',
    a: 'Sim. Cada exercício, método ou partitura com material de apoio tem um link para abrir ou guardar o PDF e, quando aplicável, o áudio de referência.',
  },
  {
    q: 'Encontrei um erro ou tenho uma sugestão. Como reporto?',
    a: (
      <>
        Escreve-nos através da página de{' '}
        <Link href="/contato" className="text-primary hover:text-primary/80 font-medium">
          Contacto
        </Link>
        . Lemos e respondemos a todas as mensagens.
      </>
    ),
  },
  {
    q: 'Os meus dados ficam guardados em algum lado?',
    a: (
      <>
        Sim, de forma segura, apenas o necessário para o funcionamento da conta (perfil, favoritos,
        progresso). Detalhes completos na{' '}
        <Link href="/privacidade" className="text-primary hover:text-primary/80 font-medium">
          Política de Privacidade
        </Link>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Tudo o que precisas de saber sobre o Sax Tools.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((item, i) => (
              <details
                key={i}
                className="group bg-card rounded-2xl border border-border shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-6 font-semibold text-card-foreground">
                  {item.q}
                  <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-foreground/70 -mt-2">{item.a}</p>
              </details>
            ))}
          </div>

          <p className="text-center text-foreground/70 mt-12">
            Não encontraste resposta à tua pergunta?{' '}
            <Link href="/suporte" className="text-primary hover:text-primary/80 font-medium">
              Visita a página de Suporte
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
