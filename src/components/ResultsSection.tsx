import { TrendingUp } from 'lucide-react';

export default function ResultsSection() {
  const cases = [
    {
      industry: 'Manufatura',
      challenge: 'Lentidão crítica em processamento de pedidos, impactando faturamento diário. Processamento que deveria levar 30 minutos levava 4 horas.',
      action: 'Diagnóstico profundo identificou queries mal otimizadas e índices ausentes. Implementamos otimização estrutural em banco de dados e tuning de Protheus.',
      result: 'Redução de 87% no tempo de processamento',
      impact: '+R$ 2.5M em faturamento anual recuperado'
    },
    {
      industry: 'Distribuição',
      challenge: 'Falhas recorrentes em rotinas de sincronização de estoque entre Protheus e sistemas externos, causando inconsistências operacionais.',
      action: 'Redesenho completo da arquitetura de integrações, implementação de monitoramento em tempo real e rotinas de recuperação automática.',
      result: 'Redução de 95% em falhas de sincronização',
      impact: '99.8% de disponibilidade operacional'
    },
    {
      industry: 'Serviços',
      challenge: 'Ausência de monitoramento de banco de dados, riscos de perda de dados e impossibilidade de recuperação rápida em caso de falha.',
      action: 'Implementação de plano de backup estruturado, monitoramento contínuo e plano de recuperação de desastres (DR).',
      result: 'Monitoramento 24/7 com alertas automáticos',
      impact: 'RTO reduzido de 24h para 2h'
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#F5F7FA]">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DAEFF] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] mb-6">
            <span className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider">
              Resultados
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-6">
            Impacto Real em Operações Críticas
          </h2>
          
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Conheça como a CoreDB transformou desafios técnicos em resultados mensuráveis para empresas que não aceitam risco operacional.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden border border-[#E5E7EB] hover:border-[#1DAEFF] transition-all duration-300 hover:shadow-lg"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B1C2D] to-[#1DAEFF] p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-bold text-white">
                    {caseItem.industry}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Challenge */}
                <div>
                  <p className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider mb-2">
                    Desafio
                  </p>
                  <p className="text-sm text-[#4B5563]">
                    {caseItem.challenge}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E5E7EB]" />

                {/* Action */}
                <div>
                  <p className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider mb-2">
                    Atuação CoreDB
                  </p>
                  <p className="text-sm text-[#4B5563]">
                    {caseItem.action}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E5E7EB]" />

                {/* Results */}
                <div className="bg-[#E0F7FF] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#0B5A7D] uppercase tracking-wider mb-2">
                    Resultado
                  </p>
                  <p className="text-sm font-bold text-[#0B1C2D] mb-2">
                    {caseItem.result}
                  </p>
                  <p className="text-xs text-[#0B5A7D]">
                    {caseItem.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4B5563] mb-8">
              Estes são exemplos reais de como a CoreDB transforma desafios técnicos em <span className="font-bold text-[#0B1C2D]">vantagem competitiva</span>.
            </p>
              <a
                href="https://wa.me/553191873435?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20t%C3%A9cnico%20com%20a%20CoreDB."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Agendar diagnóstico técnico
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
