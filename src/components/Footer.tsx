import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { ROUTES } from '../routes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Scroll suave para as seções
  const handleFooterNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B1C2D] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center gap-1 h-full justify-center">
            <Logo variant="footer" className="w-24 h-auto max-w-[96px] sm:w-28 sm:max-w-[112px] md:w-32 md:max-w-full" />
            <p className="text-white/70 text-xs sm:text-sm leading-snug mt-1 text-center md:text-left max-w-[180px] sm:max-w-xs md:max-w-none">
              Especialistas que resolvem. Parceiros que acompanham.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-4 text-center md:text-left">Navegação</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li>
                <a href="#about" onClick={e => handleFooterNav(e, 'about')} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => handleFooterNav(e, 'services')} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#methodology" onClick={e => handleFooterNav(e, 'methodology')} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Metodologia
                </a>
              </li>
              <li>
                <a href="#results" onClick={e => handleFooterNav(e, 'results')} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Resultados
                </a>
              </li>
              <li>
                <a href="#contact" onClick={e => handleFooterNav(e, 'contact')} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-4 text-center md:text-left">Serviços</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li>
                <a href={ROUTES.SERVICE_TOTVS} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Consultoria Especializada TOTVS
                </a>
              </li>
              <li>
                <a href={ROUTES.SERVICE_CUSTOM} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Desenvolvimento e Customizações
                </a>
              </li>
              <li>
                <a href={ROUTES.SERVICE_DBA} className="text-white/70 hover:text-[#1DAEFF] transition-colors">
                  Administração de Bancos de Dados
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-4 text-center md:text-left">Contato</h4>
            <div className="space-y-3 text-sm w-full">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-[#1DAEFF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70">comercial@coredb.com.br</p>
                </div>
              </div>
              <a
                href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20t%C3%A9cnico%20com%20a%20CoreDB."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 hover:text-[#1DAEFF] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#1DAEFF] flex-shrink-0 mt-0.5" />
                <span className="text-white/70">(31) 99187-3435</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <p>
            &copy; {currentYear} CoreDB. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#1DAEFF] transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-[#1DAEFF] transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
