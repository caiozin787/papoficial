import { Music, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">Sax Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/ferramentas" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Ferramentas
            </Link>
            <Link to="/videos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Vídeos
            </Link>
            <Link to="/teoria" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Teoria Musical
            </Link>
            <Link to="/chat" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Chat
            </Link>
            <Link to="/sobre" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link to="/contato" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
              <LogIn className="h-4 w-4" />
              Entrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Início
            </Link>
            <Link
              to="/ferramentas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Ferramentas
            </Link>
            <Link
              to="/videos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Vídeos
            </Link>
            <Link
              to="/teoria"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Teoria Musical
            </Link>
            <Link
              to="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Chat
            </Link>
            <Link
              to="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              Contato
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}