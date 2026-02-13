import { Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { ROUTES } from '../routes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo variant="footer" className="w-32 h-auto" />
            <p className="text-white/70 text-sm leading-relaxed text-center md:text-left">
              Especialistas que resolvem. <br />
              Parceiros que acompanham.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navegação</h4>
            <ul className="space-y-3 text-sm text-center md:text-left">
              {['about', 'services', 'methodology', 'results', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    onClick={e => handleFooterNav(e, item)} 
                    className="text-white/60 hover:text-[#1DAEFF] transition-colors capitalize"
                  >
                    {item === 'about' ? 'Sobre' : 
                     item === 'services' ? 'Serviços' : 
                     item === 'methodology' ? 'Metodologia' : 
                     item === 'results' ? 'Resultados' : 'Contato'}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Especialidades</h4>
            <ul className="space-y-3 text-sm text-center md:text-left">
              <li><a href={ROUTES.SERVICE_TOTVS} className="text-white/60 hover:text-[#1DAEFF] transition-colors">Consultoria TOTVS®</a></li>
              <li><a href={ROUTES.SERVICE_CUSTOM} className="text-white/60 hover:text-[#1DAEFF] transition-colors">Desenvolvimento ADVPL/TL++</a></li>
              <li><a href={ROUTES.SERVICE_DBA} className="text-white/60 hover:text-[#1DAEFF] transition-colors">Gestão de Dados & DBA</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Fale Conosco</h4>
            <div className="space-y-4 w-full">
              <a href="mailto:comercial@coredb.com.br" className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#1DAEFF]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#1DAEFF]" />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">comercial@coredb.com.br</span>
              </a>
              <a
                href="https://wa.me/553191873435?text=Olá, gostaria de agendar um diagnóstico técnico com a CoreDB."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 group"
              >
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#1DAEFF]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#1DAEFF]" />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">(31) 99187-3435</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-8" />

        {/* Texto Jurídico - Estilo CRM Services */}
        <div className="text-[10px] md:text-xs text-white/40 leading-relaxed text-center md:text-left mb-8 space-y-2">
          <p><strong>COREDB LTDA.</strong> Todos os direitos Reservados.</p>
          <p>
            Protheus, RM, Fluig e TOTVS® são produtos e marcas registradas de propriedade da TOTVS® S.A. 
            Logotipos TOTVS® e Microsiga são de propriedade da TOTVS® S.A.
          </p>
          <p className="font-medium text-white/50">
            A COREDB LTDA é uma empresa de consultoria independente e não tem nenhum vínculo direto ou indireto com a TOTVS®, 
            qualquer uma das suas franquias ou qualquer um de seus representantes.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] text-white/30 uppercase tracking-widest">
          <p>© {currentYear} COREDB — Belo Horizonte / MG</p>
          <div className="flex items-center gap-6">
            <a href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</a>
            <a href="/termos-de-uso" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}