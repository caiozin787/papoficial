import { Music, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';

const FERRAMENTAS_LINKS = [
  { href: '/ferramentas/escalas', label: 'Escalas Interativas' },
  { href: '/ferramentas/metronomo', label: 'Metrônomo' },
  { href: '/ferramentas/afinador', label: 'Afinador' },
  { href: '/ferramentas', label: 'Ver todas' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">Sax Tools</span>
            </Link>
            <p className="text-sm text-foreground/70">
              A plataforma completa para saxofonistas evoluírem sua técnica e musicalidade.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ferramentas</h4>
            <ul className="space-y-2 text-sm">
              {FERRAMENTAS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teoria" className="text-foreground/70 hover:text-primary transition-colors">
                  Teoria Musical
                </Link>
              </li>
              <li>
                <Link href="/metodos" className="text-foreground/70 hover:text-primary transition-colors">
                  Métodos
                </Link>
              </li>
              <li>
                <Link href="/exercicios" className="text-foreground/70 hover:text-primary transition-colors">
                  Exercícios
                </Link>
              </li>
              <li>
                <Link href="/playalong" className="text-foreground/70 hover:text-primary transition-colors">
                  Play Along
                </Link>
              </li>
              <li>
                <Link href="/partituras" className="text-foreground/70 hover:text-primary transition-colors">
                  Partituras
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-foreground/70 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-foreground/70 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@saxtools.com" className="text-foreground/70 hover:text-primary transition-colors">
                  contato@saxtools.com
                </a>
              </li>
              <li className="text-foreground/70">
                Segunda a Sexta
                <br />
                9h às 18h (horário de Brasília)
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-foreground/70 mb-2">Receba novidades</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>© 2026 Sax Tools. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
