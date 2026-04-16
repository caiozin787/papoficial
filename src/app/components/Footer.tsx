import { Music, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">Sax Tools</span>
            </Link>
            <p className="text-sm text-foreground/70">
              A plataforma completa para saxofonistas evoluírem sua técnica e musicalidade.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Ferramentas */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ferramentas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#ferramentas" className="text-foreground/70 hover:text-primary transition-colors">
                  Escalas Interativas
                </a>
              </li>
              <li>
                <a href="/#ferramentas" className="text-foreground/70 hover:text-primary transition-colors">
                  Metrônomo
                </a>
              </li>
              <li>
                <a href="/#ferramentas" className="text-foreground/70 hover:text-primary transition-colors">
                  Playbacks
                </a>
              </li>
              <li>
                <a href="/#ferramentas" className="text-foreground/70 hover:text-primary transition-colors">
                  Partituras
                </a>
              </li>
              <li>
                <a href="/#ferramentas" className="text-foreground/70 hover:text-primary transition-colors">
                  Afinador
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#videos" className="text-foreground/70 hover:text-primary transition-colors">
                  Vídeo-Aulas
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-foreground/70 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-foreground/70 hover:text-primary transition-colors">
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

          {/* Contato */}
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
                Segunda a Sexta<br />
                9h às 18h (horário de Brasília)
              </li>
            </ul>

            {/* Newsletter */}
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>© 2026 Sax Tools. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}