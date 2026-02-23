import { TrendingUp } from "lucide-react";

export default function ResultsSection() {
  const cases = [
    {
      industry: "Manufatura",
      challenge:
        "Processamento crítico de pedidos apresentando lentidão severa, impactando diretamente o faturamento diário.",
      action:
        "Diagnóstico técnico identificou queries não otimizadas e ausência de índices estratégicos. Foi realizado tuning estrutural no banco de dados e ajustes no Protheus.",
      result: "Redução de 87% no tempo de processamento",
      impact: "Recuperação estimada de R$ 2,5M/ano em capacidade operacional",
    },
    {
      industry: "Distribuição",
      challenge:
        "Falhas recorrentes na sincronização de estoque entre ERP e sistemas externos, gerando inconsistências operacionais.",
      action:
        "Redesenho da arquitetura de integrações com monitoramento contínuo e rotinas automáticas de recuperação.",
      result: "Redução de 95% nas falhas de sincronização",
      impact: "Disponibilidade operacional estabilizada em 99,8%",
    },
    {
      industry: "Serviços",
      challenge:
        "Ausência de plano estruturado de backup e recuperação de desastres, com alto risco de indisponibilidade prolongada.",
      action:
        "Implementação de política formal de backup, monitoramento contínuo e plano de Disaster Recovery (DR).",
      result: "Monitoramento ativo 24/7 com alertas automáticos",
      impact: "RTO reduzido de 24h para 2h",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Resultados Técnicos
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Impacto Mensurável em Operações Críticas
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Exemplos de intervenções técnicas estruturadas que resultaram em
            ganho operacional, redução de risco e aumento de previsibilidade.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              {/* Industry */}
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-[var(--coredb-cyan)]" />
                <h3 className="text-lg font-semibold text-[var(--coredb-dark)]">
                  {caseItem.industry}
                </h3>
              </div>

              {/* Challenge */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Contexto Técnico
                </p>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {caseItem.challenge}
                </p>
              </div>

              {/* Action */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Intervenção
                </p>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {caseItem.action}
                </p>
              </div>

              {/* Result */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Resultado Obtido
                </p>
                <p className="text-sm font-semibold text-[var(--coredb-dark)] mb-1">
                  {caseItem.result}
                </p>
                <p className="text-xs text-gray-600">
                  {caseItem.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="max-w-2xl">
            <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
              Resultados obtidos a partir de diagnóstico técnico estruturado e
              aplicação de metodologia de governança operacional.
            </p>

            <a
              href="https://wa.me/553191873435?text=Olá, gostaria de agendar um diagnóstico técnico."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--coredb-cyan)] text-white px-8 py-4 rounded-md font-semibold hover:opacity-90 transition"
            >
              Solicitar Diagnóstico Técnico
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}