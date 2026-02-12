import { CheckCircle2, XCircle } from 'lucide-react';

export default function IdealClientSection() {
  const idealTraits = [
    'Sua empresa depende de ERP TOTVS para operações que não podem parar',
    'Você enfrenta desafios recorrentes de performance, lentidão ou falhas',
    'Você não aceita risco operacional e busca parceiros técnicos confiáveis',
    'Você quer uma consultoria que entende tanto ERP quanto banco de dados',
    'Você valoriza atendimento direto, transparência e resultados mensuráveis'
  ];

  const notIdealTraits = [
    'Empresas que buscam apenas suporte técnico reativo',
    'Projetos que não exigem visão estratégica de tecnologia',
    'Clientes que não valorizam profundidade técnica e especialização'
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F7FF] border border-[#1DAEFF] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Perfil de Cliente
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            Você é Nosso Cliente Ideal Se...
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            A CoreDB funciona melhor com empresas que compartilham nossos valores de excelência técnica e orientação a resultados.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Ideal Clients */}
          <div>
            <h3 className="text-2xl font-bold text-[#0B1C2D] mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#1DAEFF]" />
              Você é nosso cliente ideal
            </h3>

            <div className="space-y-4">
              {idealTraits.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#E0F7FF] border border-[#1DAEFF] hover:shadow-md transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1DAEFF] flex-shrink-0 mt-0.5" />
                  <p className="text-[#0B1C2D] leading-relaxed">
                    {trait}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not Ideal Clients */}
          <div>
            <h3 className="text-2xl font-bold text-[#0B1C2D] mb-8 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-[#D1D5DB]" />
              Não somos para
            </h3>

            <div className="space-y-4">
              {notIdealTraits.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#F5F7FA] border border-[#D1D5DB] hover:shadow-md transition-all"
                >
                  <XCircle className="w-5 h-5 text-[#D1D5DB] flex-shrink-0 mt-0.5" />
                  <p className="text-[#4B5563] leading-relaxed">
                    {trait}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
              Se você se identifica com nosso perfil ideal, vamos conversar sobre como a CoreDB pode transformar sua operação TOTVS.
            </p>
            <a
              href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20iniciar%20uma%20conversa%20com%20um%20especialista%20da%20CoreDB."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Iniciar conversa com especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
