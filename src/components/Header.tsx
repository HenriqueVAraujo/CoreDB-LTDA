import { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

import Logo from './Logo';
import { ROUTES } from '../routes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Metodologia', href: '#methodology' },
    { label: 'Resultados', href: '#results' },
    { label: 'Contato', href: '#contact' }
  ];

  const [, setLocation] = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      setLocation('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              setLocation('/');
              setIsMenuOpen(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 300);
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo variant="header" className="w-24 h-auto max-w-full md:w-32" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                className="text-[#4B5563] hover:text-[#1DAEFF] font-medium transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20t%C3%A9cnico%20com%20a%20CoreDB."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#0B1C2D] text-white font-semibold rounded-lg hover:bg-[#1DAEFF] hover:text-[#0B1C2D] transition-all text-sm"
            >
              Agendar diagnóstico
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#0B1C2D] hover:bg-[#F5F7FA] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="md:hidden pb-6 space-y-3 border-t border-[#E5E7EB] pt-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                className="block px-4 py-2 text-[#4B5563] hover:bg-[#F5F7FA] hover:text-[#1DAEFF] rounded-lg transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20t%C3%A9cnico%20com%20a%20CoreDB."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-[#0B1C2D] text-white font-semibold rounded-lg hover:bg-[#1DAEFF] hover:text-[#0B1C2D] transition-all mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar diagnóstico
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
