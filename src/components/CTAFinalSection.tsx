import { ArrowRight, Phone } from 'lucide-react';

export default function CTAFinalSection() {
  const whatsappUrl =
     'https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20t%C3%A9cnico%20com%20a%20CoreDB.';

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#0B1C2D] to-[#1DAEFF] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Se o Seu ERP é Crítico,
            <span className="block text-[#E0F7FF]">Ele Precisa de Especialistas</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Não deixe a performance e a segurança do seu ERP ao acaso. A CoreDB está pronta para diagnosticar, otimizar e garantir que sua operação rode com velocidade, estabilidade e segurança máximas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#0B1C2D] font-bold rounded-lg hover:bg-[#E0F7FF] transition-all duration-300 flex items-center gap-2 group"
            >
              Agendar diagnóstico técnico
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Fale com nosso time
            </a>
          </div>

          {/* Additional Message */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <span className="text-sm text-white/80">
              ✓ Diagnóstico inicial sem custo • Sem compromisso • Apenas uma conversa honesta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
