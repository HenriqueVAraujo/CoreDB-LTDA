'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { getCtaConfig } from '@/routes';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Metodologia', href: '#methodology' },
    { label: 'Serviços', href: '#services' },
    { label: 'Resultados', href: '#results' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' }
  ];

  const pathname = usePathname();
  const ctaConfig = getCtaConfig(pathname);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') {
      setIsMenuOpen(false);
      return;
    }

    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]/50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="CoreDB — página inicial"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo variant="header" className="w-24 h-auto max-w-full md:w-32" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={pathname === '/' ? link.href : `/${link.href}`}
                onClick={e => handleNav(e, link.href)}
                className="text-[#4B5563] hover:text-[var(--coredb-dark)] hover:underline font-medium transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={ctaConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ctaConfig.label}
              className="px-6 py-2 bg-[var(--coredb-dark)] text-white font-semibold rounded-lg hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] transition-all text-sm"
            >
              Agendar triagem técnica
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[#0B1C2D] hover:bg-[#F5F7FA] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden pb-6 space-y-3 border-t border-[#E5E7EB] pt-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={pathname === '/' ? link.href : `/${link.href}`}
                onClick={e => handleNav(e, link.href)}
                className="block px-4 py-2 text-[#4B5563] hover:bg-[#F5F7FA] hover:text-[var(--coredb-dark)] hover:underline rounded-lg transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ctaConfig.label}
              className="block w-full px-4 py-3 bg-[var(--coredb-dark)] text-white text-center font-semibold rounded-lg hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] transition-all mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar triagem técnica
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
