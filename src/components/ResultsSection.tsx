import { TrendingUp, BarChart2, Gauge, Shield } from "lucide-react";

const autoridade = [
  {
    icon: BarChart2,
    valor: "Experiência",
    label: "Em ambientes TOTVS e bancos de dados",
    descricao: "Capacidade técnica aplicada conforme o escopo do ambiente",
  },
  {
    icon: Gauge,
    valor: "Diagnóstico",
    label: "De performance e gargalos",
    descricao: "Análise baseada em métricas do ambiente",
  },
  {
    icon: Shield,
    valor: "Disponibilidade",
    label: "Acompanhada por indicadores",
    descricao: "Definidos conforme cada ambiente",
  },
];

export default function ResultsSection() {
  const cases = [
    {
      industry: "Performance e processamento",
      challenge:
        "Rotinas críticas podem apresentar gargalos que afetam o processamento e a operação.",
      action:
        "Diagnóstico técnico de queries, índices e configurações, com definição de ajustes conforme medições do ambiente.",
      result: "Análise de gargalos no tempo de processamento",
      impact: "Priorização de melhorias com base em métricas do ambiente",
    },
    {
      industry: "Integrações e sincronização",
      challenge:
        "Falhas de sincronização entre ERP e sistemas externos podem gerar inconsistências operacionais.",
      action:
        "Revisão da arquitetura de integrações, dos mecanismos de monitoramento e das rotinas de recuperação.",
      result: "Revisão técnica de falhas de sincronização e integração",
      impact: "Acompanhamento da disponibilidade após intervenções",
    },
    {
      industry: "Continuidade e recuperação",
      challenge:
        "Ambientes sem plano estruturado de backup e recuperação ficam mais expostos a indisponibilidades prolongadas.",
      action:
        "Definição de políticas de backup, monitoramento automatizado e plano de Disaster Recovery (DR) conforme escopo técnico.",
      result: "Monitoramento automatizado por ferramentas, 24/7, com alertas conforme configuração contratada",
      impact: "RTO definido após análise do ambiente e formalizado no plano de recuperação",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Authority Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {autoridade.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[var(--coredb-dark)] rounded-xl p-8 border border-white/10 flex items-start gap-5"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--coredb-cyan)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--coredb-cyan)]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{item.valor}</p>
                  <p className="text-sm font-semibold text-[var(--coredb-cyan)] mb-1">{item.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{item.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[var(--coredb-cyan)] uppercase tracking-widest text-xs font-semibold mb-6 inline-block">
            Frentes de Atuação Técnica
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--coredb-dark)] mb-8">
            Atuação Técnica em Ambientes Críticos
          </h2>

          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Capacidades aplicadas a diagnóstico, estabilização e continuidade de ambientes TOTVS e bancos de dados,
            conforme escopo e métricas definidos para cada projeto.
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
                  Abordagem Técnica
                </p>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {caseItem.action}
                </p>
              </div>

              {/* Result */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Frente de Atuação
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
              Atuação orientada por diagnóstico técnico estruturado e
              aplicação de metodologia de governança operacional.
            </p>

            <a
              href="https://wa.me/553191873435?text=Olá, gostaria de agendar um diagnóstico técnico."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--coredb-cyan)] text-[var(--coredb-dark)] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition"
            >
              Identificar os Gargalos do Meu Ambiente
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
