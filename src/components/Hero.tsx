import { ShieldCheck, Timer, Lock } from 'lucide-react';

export default function Hero() {
  const handleCTAClick = () => {
    const url =
      'https://wa.me/553191873435?text=' +
      encodeURIComponent(
        'Olá, gostaria de solicitar um diagnóstico técnico do meu ambiente TOTVS e banco de dados para avaliar riscos operacionais.'
      );
    window.open(url, '_blank');
  };

  const handleMethodologyClick = () => {
    const methodologySection = document.getElementById('methodology');
    if (methodologySection) {
      methodologySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0B1C2D] min-h-[85vh] flex items-center py-24 lg:py-32 overflow-hidden">
      
      {/* Fundo sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[var(--coredb-cyan)] to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-white relative z-10">

        {/* OVERLINE */}
        <span className="inline-block text-[var(--coredb-cyan)] font-semibold tracking-widest uppercase text-xs mb-6 border-l-2 border-[var(--coredb-cyan)] pl-3">
          Foco em Missão Crítica
        </span>

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8">
          Blindamos ambientes TOTVS <br className="hidden md:block" />
          que <span className="text-[var(--coredb-cyan)]">não podem parar.</span>
        </h1>

        {/* SUBHEADLINE */}
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl leading-relaxed">
          Sustentação estratégica para <strong>Protheus, RM e Fluig</strong> com foco em
          continuidade operacional, estabilidade e segurança de banco de dados.
          Atuamos preventivamente com responsabilidade técnica formal e SLA contratual.
        </p>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <button
            onClick={handleCTAClick}
            className="font-bold tracking-wide rounded-lg px-10 py-5 text-lg transition-all duration-300 bg-[var(--coredb-cyan)] text-[#0B1C2D] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,174,255,0.5)]"
          >
            Solicitar Diagnóstico Técnico
            <span className="block text-[11px] uppercase tracking-wider opacity-70 font-medium mt-1">
              Avaliação inicial estruturada
            </span>
          </button>

          <button
            onClick={handleMethodologyClick}
            className="font-semibold rounded-lg px-10 py-5 text-lg transition-all duration-300 border border-white/20 hover:bg-white/5 text-white"
          >
            Entender Nossa Metodologia
          </button>
        </div>

        {/* TRUST BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-white/10">
          
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[var(--coredb-cyan)] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Responsabilidade Contratual</h4>
              <p className="text-xs text-white/60">
                SLA formalizado e compromisso técnico assumido.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Timer className="w-8 h-8 text-[var(--coredb-cyan)] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Atuação Preventiva</h4>
              <p className="text-xs text-white/60">
                Monitoramento contínuo e mitigação de riscos críticos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-[var(--coredb-cyan)] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Segurança e Conformidade</h4>
              <p className="text-xs text-white/60">
                Boas práticas de mercado e aderência à LGPD.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}